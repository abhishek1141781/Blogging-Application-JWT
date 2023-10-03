package com.app.service;

import java.util.List;

import com.app.dto.SigninRequest;
import com.app.dto.SigninResponse;
import com.app.entities.Employee;

public interface EmployeeService {
	List<Employee> getAllEmps();
	Employee addEmpDetails(Employee newEmp);
	Employee getEmpDetailsById(Long empId);
	String removeEmpDetails(Long empId);
	Employee updateDetails(Employee detachedEmp);
	SigninResponse authenticate(SigninRequest request);
}
