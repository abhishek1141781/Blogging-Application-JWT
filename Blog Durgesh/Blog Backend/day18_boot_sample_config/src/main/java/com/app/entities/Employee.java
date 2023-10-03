package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "emps")
@NoArgsConstructor // generates def ctor
@AllArgsConstructor // all args ctor
@Getter // all getters
@Setter // setters
@ToString(exclude = "password") // toString with all the props : excluding password
public class Employee extends BaseEntity {
	@Column(length = 30)
	private String firstName;
	@Column(length = 30)
	private String lastName;
	@Column(length = 30, unique = true) // =>unique
	private String email;
	@Column(nullable = false) // =>NOT NULL
	private String password;
//	@Transient // => skip from persistence , NO column for confirmPassword
//	private String confirmPassword;	
	private LocalDate joinDate;
	private double salary;
	@Column(length = 100)
	private String location;
	@Column(length = 30)
	private String department;
}
