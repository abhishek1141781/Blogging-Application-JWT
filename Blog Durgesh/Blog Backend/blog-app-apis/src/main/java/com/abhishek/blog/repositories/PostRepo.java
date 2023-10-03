package com.abhishek.blog.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.abhishek.blog.entities.Category;
import com.abhishek.blog.entities.Post;
import com.abhishek.blog.entities.User;

public interface PostRepo extends JpaRepository<Post, Integer>{

	//custom finder methods in repository
	Page<Post> findByUser(User user, Pageable p);
	Page<Post> findByCategory(Category category, Pageable p);
	
//	@Query("select p from Post p where p.title like: key")
//	List<Post> searchByTitle(@Param("key") String title);
	List<Post> findByTitleContaining(String title);
	
}
