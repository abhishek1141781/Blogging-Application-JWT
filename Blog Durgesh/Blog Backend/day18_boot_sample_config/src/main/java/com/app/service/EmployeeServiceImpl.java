package com.app.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_excceptions.ResourceNotFoundException;
import com.app.dto.SigninRequest;
import com.app.dto.SigninResponse;
import com.app.entities.Employee;
import com.app.repository.EmployeeRepository;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {
	// dep
	@Autowired
	private EmployeeRepository empRepo;

	// dep : mapper
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<Employee> getAllEmps() {
		return empRepo.findAll();
	}// service layer rets list of DETACHED emps to the caller

	@Override
	public Employee addEmpDetails(Employee newEmp) {
		// TODO Auto-generated method stub
		return empRepo.save(newEmp);// rets PERSISTENT entity
	}// rets DETACHED emp to the caller

	@Override
	public Employee getEmpDetailsById(Long empId) {

		return empRepo.findById(empId).orElseThrow(() -> new ResourceNotFoundException("Invalid emp id !!!!!"));
	}// in case of valid id : service layer rets -- tx.commit
		// : detached emp to the caller
		// on case invalid id -- tx.rollback -- exc is thrown !

	@Override
	public String removeEmpDetails(Long empId) {
		Employee employee = empRepo.findById(empId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid emp id !!!!!"));
		// => id found!
		empRepo.delete(employee);
		return "Emp " + employee.getLastName() + "'s  details deleted!";
	}

	@Override
	public Employee updateDetails(Employee detachedEmp) {
		// TODO Auto-generated method stub
		return empRepo.save(detachedEmp);
	}

	@Override
	public SigninResponse authenticate(SigninRequest request) {
		// invoke dao's method
		Employee emp = empRepo.findByEmailAndPassword(request.getEmail(), request.getPassword())
				.orElseThrow(() -> new ResourceNotFoundException("Bad Credentials , Invalid Login!!!!!!!!!!!!!"));
		// map Emp --> SigninResp DTO (Entity --> DTO)
		// id , firstname,lastname , salary
		return modelMapper.map(emp, SigninResponse.class);
	}

}
