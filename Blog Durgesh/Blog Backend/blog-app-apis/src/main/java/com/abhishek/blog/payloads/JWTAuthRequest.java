package com.abhishek.blog.payloads;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JWTAuthRequest {
	
	//email is sleceted as username here
	private String username;
	
	private String password;

}
