package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SigninRequest {
	@NotBlank(message = "Email can't be blank")
	@Email(message = "Invalid email format")
	private String email;
	@Length(min = 5,max=20,message = "Invalid password length")
	private String password;
}
