package com.abhishek.blog.services;

import java.util.List;

import com.abhishek.blog.payloads.PostDto;
import com.abhishek.blog.payloads.PostResponse;

public interface PostService {

	PostDto createPost(PostDto postDto, Integer userId, Integer categoryId);

	PostDto updatePost(PostDto postDto, Integer postId);

	void deletePost(Integer postId);

	PostDto getPostById(Integer postId);

	PostResponse getAllPosts(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);

	PostResponse getPostsByCategory(Integer categoryId, Integer pageNumber, Integer pageSize);

	PostResponse getPostsByUser(Integer userId, Integer pageNumber, Integer pageSize);

	// search Posts
	List<PostDto> searchPosts(String keyword);
}
