package com.abhishek.blog.exceptions;

public class ApiException extends RuntimeException{
	
	public ApiException(String message) {
		super(message);
	}

	public ApiException() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
