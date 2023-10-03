package com.abhishek.blog.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.abhishek.blog.entities.Category;

public interface CategoryRepo extends JpaRepository<Category, Integer>{


	
}
