package com.abhishek.blog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.abhishek.blog.entities.Comment;

public interface CommentRepo extends JpaRepository<Comment, Integer>{
	
	
}
