package com.abhishek.blog.payloads;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JWTAuthResponse {
	
	private String token;
	
	private UserDto user;

}
