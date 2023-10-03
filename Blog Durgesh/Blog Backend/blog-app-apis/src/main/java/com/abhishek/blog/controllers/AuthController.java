package com.abhishek.blog.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abhishek.blog.entities.User;
import com.abhishek.blog.exceptions.ApiException;
import com.abhishek.blog.payloads.JWTAuthRequest;
import com.abhishek.blog.payloads.JWTAuthResponse;
import com.abhishek.blog.payloads.UserDto;
import com.abhishek.blog.security.JWTTokenHelper;
import com.abhishek.blog.services.UserService;
import com.mysql.cj.xdevapi.Schema.CreateCollectionOptions;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

	@Autowired
	private JWTTokenHelper jwtTokenHelper;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private UserService userService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private ModelMapper modelMapper;

	@PostMapping("/login")
	public ResponseEntity<JWTAuthResponse> createToken(
			@RequestBody JWTAuthRequest request
			) throws Exception{
		
		this.authenticate(request.getUsername(), request.getPassword());
		
		//if authentication done and completed we would need to generate token
		
			//load userdetails first
		UserDetails userDetails = this.userDetailsService.loadUserByUsername(request.getUsername());
		String token = this.jwtTokenHelper.generateToken(userDetails);
		
		JWTAuthResponse response = new JWTAuthResponse();
		response.setToken(token);
		response.setUser(this.modelMapper.map((User)userDetails, UserDto.class));
		return new ResponseEntity<JWTAuthResponse>(response,HttpStatus.OK);
		
	}

	private void authenticate(String username, String password) throws Exception {

		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
				password);

		try {
			this.authenticationManager.authenticate(authenticationToken);

		} catch (BadCredentialsException e) {
			System.out.println("Invalid username or password");
			throw new ApiException("Invalid Username or Password Exception");
		}

	}

	// register new user
	@PostMapping("/register")
	public ResponseEntity<UserDto> registerUser(@RequestBody UserDto userDto) {
		UserDto registeredUser = this.userService.registerNewUser(userDto);
		return new ResponseEntity<UserDto>(registeredUser, HttpStatus.CREATED);
	}

}
