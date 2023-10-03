package com.abhishek.blog.controllers;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FileController {
	
	private Logger logger = LoggerFactory.getLogger(FileController.class);

	@PostMapping("/upload-multiple-files")
	public ResponseEntity<?> uploadMultipleFiles(
			@RequestParam("images") MultipartFile[] files){
		
		this.logger.info("{} no of files uploaded", files.length);
		
		Arrays.stream(files).forEach(multipartFile -> 
			logger.info("file name: {}",multipartFile.getOriginalFilename())
		);
		
		return ResponseEntity.ok("file upload");
	}
}
