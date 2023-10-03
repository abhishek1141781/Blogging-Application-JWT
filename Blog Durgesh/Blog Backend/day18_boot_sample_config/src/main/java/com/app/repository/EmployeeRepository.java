package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Employee;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {
//add a finder method for emp auth
	Optional<Employee> findByEmailAndPassword(String em,String pass);
}
