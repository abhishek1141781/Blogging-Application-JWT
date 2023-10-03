package com.abhishek.blog.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import com.abhishek.blog.entities.Category;
import com.abhishek.blog.exceptions.ResourceNotFoundException;
import com.abhishek.blog.payloads.CategoryDto;
import com.abhishek.blog.repositories.CategoryRepo;
import com.abhishek.blog.services.CategoryService;
@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepo categoryRepo;
	
	@Autowired
	private ModelMapper modelMapper;

	
	@Override
	public CategoryDto createCategory(CategoryDto categoryDto) {
		Category category = this.modelMapper.map(categoryDto, Category.class);
		Category addedCategory = this.categoryRepo.save(category);
		return this.modelMapper.map(addedCategory, CategoryDto.class);
	}

	@Override
	public CategoryDto updateCategory(CategoryDto categoryDto, Integer categoryId) {
		Category cat = this.categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category", " Category Id ", categoryId));
		cat.setCategoryTitle(categoryDto.getCategoryTitle());
		cat.setCategoryDescription(categoryDto.getCategoryDescription());
		Category savedCat = this.categoryRepo.save(cat);
		return this.modelMapper.map(savedCat, CategoryDto.class);
	}

	@Override
	public void deleteCategory(Integer categoryId) {
		Category cat = this.categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category", " CategoryId ", categoryId));
		this.categoryRepo.delete(cat);
	}

	@Override
	public List<CategoryDto> getCategories() {
		List<Category> allCategories = this.categoryRepo.findAll();
		List<CategoryDto> categoryListDto = allCategories.stream().map((cat) -> this.modelMapper.map(cat, CategoryDto.class))
		.collect(Collectors.toList());
		return categoryListDto;
	}

	@Override
	public CategoryDto getCategory(Integer categoryId) {
		Category cat = this.categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category", " CategoryId ", categoryId));
		return this.modelMapper.map(cat, CategoryDto.class);
	}


}
