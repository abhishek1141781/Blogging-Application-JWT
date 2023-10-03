package com.abhishek.blog.exceptions;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashMap;
import java.util.Map;

import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import com.abhishek.blog.payloads.ApiResponse;
import com.mysql.cj.x.protobuf.Mysqlx.Error;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiResponse> resourceNotFoundExceptionHandler(ResourceNotFoundException ex) {
		String message = ex.getMessage();
		ApiResponse apiResponse = new ApiResponse(message, false);
		return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, String>> handleMethodArgsNotValidException(MethodArgumentNotValidException ex) {
		Map<String, String> resp = new HashMap<>();

		ex.getBindingResult().getAllErrors().forEach((error) -> {
			String fieldName = ((FieldError) error).getField();
			String message = "Error: " + error.getDefaultMessage();
			resp.put(fieldName, message);
		});
		return new ResponseEntity<Map<String, String>>(resp, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<Map<String, String>> handleMethodConstraintViolationException(
			ConstraintViolationException ex) {
		Map<String, String> resp = new HashMap<>();

		ex.getConstraintViolations().forEach((violations) -> {
			String fieldName = violations.getPropertyPath().toString();
			String message = "Violation: " + violations.getMessage();
			resp.put(fieldName, message);
		});
		return new ResponseEntity<Map<String, String>>(resp, HttpStatus.BAD_REQUEST);
	}
	
	//implement these
//	@ExceptionHandler(HttpRequestMethodNotSupportedException.class)
//	@ExceptionHandler(MethodArgumentTypeMismatchException.class)
//	@ExceptionHandler(HttpMessageNotReadableException.class)
//	@ExceptionHandler(MissingPathVariableException.class)
//	@ExceptionHandler(SQLIntegrityConstraintViolationException.class)
	
	@ExceptionHandler(ApiException.class)
	public ResponseEntity<ApiResponse> apiExceptionHandler(ApiException ex) {
		String message = ex.getMessage();
		ApiResponse apiResponse = new ApiResponse(message, true);
		return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler(SQLIntegrityConstraintViolationException.class)
	public ResponseEntity<ApiResponse> SQLIntegrityConstraintViolationExceptionHandler(SQLIntegrityConstraintViolationException ex) {
	    String message = "Duplicate Email: email already exists";
	    ApiResponse apiResponse = new ApiResponse(message, true);
	    return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
	}


	
	
}
