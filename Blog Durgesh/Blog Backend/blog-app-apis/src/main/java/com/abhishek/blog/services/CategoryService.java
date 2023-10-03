package com.abhishek.blog.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.abhishek.blog.payloads.CategoryDto;


public interface CategoryService {

	
	//create
	CategoryDto createCategory(CategoryDto categoryDto);
	//update
	CategoryDto updateCategory(CategoryDto categoryDto, Integer categoryId);
	
	//delete
	void deleteCategory(Integer categoryId);
	
	//getall
	List<CategoryDto> getCategories();
	//getone
	CategoryDto getCategory(Integer categoryId);
	
	
}
