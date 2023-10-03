package com.abhishek.blog.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.abhishek.blog.payloads.UserDto;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/users")
public class UserDetailsAndImageController {
	
	@Autowired
	private ObjectMapper objectMapper;
	
	private Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@PostMapping
	public ResponseEntity<?> addUserInformation(
			@RequestParam("file") MultipartFile file,
			@RequestParam("userData") String userData
			){
		
		this.logger.info("add user request");
		logger.info("File information {}",file.getOriginalFilename());
		logger.info("user JSON: {}", userData);
		
		//converting string into json
		UserDto user = null;
		try {
			user = this.objectMapper.readValue(userData, UserDto.class);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Request");
		}
		
		//file save
		//user save
		this.logger.info("User data POJO is : {}", user);

		return ResponseEntity.ok(user);
	}
}
