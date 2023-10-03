package com.abhishek.blog.payloads;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class UserDto {

	private int id;
	private String name;
	private String email;
	
	//don't let password show in userdto useing Jsonignore and jsonignore properties
	private String password;
	private String about;
	
	private Set<RoleDto> roles = new HashSet<>();

	@Override
	public String toString() {
		return "UserDto [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + ", about="
				+ about + ", roles=" + roles + "]";
	}

	@JsonIgnore 		// ignore while deserialization
	public String getPassword() {
		return this.password;
	}

	@JsonProperty 		// consider during serialization
	public void setPassword(String password) {
		this.password = password;
	}
	
}
