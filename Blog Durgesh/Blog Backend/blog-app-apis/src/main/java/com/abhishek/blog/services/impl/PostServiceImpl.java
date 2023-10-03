package com.abhishek.blog.services.impl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.abhishek.blog.entities.Category;
import com.abhishek.blog.entities.Post;
import com.abhishek.blog.entities.User;
import com.abhishek.blog.exceptions.ResourceNotFoundException;
import com.abhishek.blog.payloads.PostDto;
import com.abhishek.blog.payloads.PostResponse;
import com.abhishek.blog.payloads.UserDto;
import com.abhishek.blog.repositories.CategoryRepo;
import com.abhishek.blog.repositories.PostRepo;
import com.abhishek.blog.repositories.UserRepo;
import com.abhishek.blog.services.PostService;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	private PostRepo postRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private CategoryRepo categoryRepo;

	@Autowired
	private UserRepo userRepo;

	@Override
	public PostDto createPost(PostDto postDto, Integer userId, Integer categoryId) {

//		fetch user and category
		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User ", " UserId ", userId));
		Category category = this.categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category ", " categoryId ", categoryId));

		// set fields for post
		Post post = this.modelMapper.map(postDto, Post.class);
		post.setImageName("default.png");
		post.setAddedDate(new Date());
		post.setUser(user);
		post.setCategory(category);

		Post savedPost = this.postRepo.save(post);

		return this.modelMapper.map(savedPost, PostDto.class);
	}

	@Override
	public PostDto updatePost(PostDto postDto, Integer postId) {
		// get post with id
		Post postFetched = this.postRepo.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException("Post ", " PostId ", postId));

		//get category using the the category id from postDto, if no cat id was passed in dto, use the same category as previous from older post itself
		Category newCategory = this.categoryRepo.findById(postDto.getCategory().getId()).orElse(postFetched.getCategory());
		
		postFetched.setTitle(postDto.getTitle());
		postFetched.setContent(postDto.getContent());
		postFetched.setImageName(postDto.getImageName());
		postFetched.setCategory(newCategory);

		Post updatedPost = this.postRepo.save(postFetched);
		return this.modelMapper.map(updatedPost, PostDto.class);
	}

	@Override
	public void deletePost(Integer postId) {

		// find if course exists using findbyid
		Post postFound = this.postRepo.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException("Post ", " PostId ", postId));

		// use direct postRepo method to delete
		this.postRepo.delete(postFound);
		// TODO Auto-generated method stub

	}

	@Override
	public PostDto getPostById(Integer postId) {
		// get post by id
		Post post = this.postRepo.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException("Post ", " PostId ", postId));

		// convert post to postDto and return
		return this.modelMapper.map(post, PostDto.class);
	}

	@Override
	public PostResponse getAllPosts(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
//		List<Post> allUsersPosts = this.postRepo.findAll();
		Sort sort = null;
		if (sortDir.equalsIgnoreCase("desc")) {
			sort = Sort.by(sortBy).descending();
		} else {
			sort = Sort.by(sortBy).ascending();
		}

		Pageable p = PageRequest.of(pageNumber, pageSize, sort);

		Page<Post> pagePost = this.postRepo.findAll(p);

		List<Post> allPosts = pagePost.getContent();

		List<PostDto> allUsersPostsDto = allPosts.stream()
				.map(postItem -> this.modelMapper.map(postItem, PostDto.class)).collect(Collectors.toList());

		PostResponse postResponse = new PostResponse();

		postResponse.setContent(allUsersPostsDto);
		postResponse.setPageNumber(pagePost.getNumber());
		postResponse.setPageSize(pagePost.getSize());
		postResponse.setTotalElements(pagePost.getTotalElements());
		postResponse.setTotalPages(pagePost.getTotalPages());
		postResponse.setLastPage(pagePost.isLast());

		return postResponse;
	}
//	@Override
//	public List<PostDto> getAllPosts() {
//		List<Post> allUsersPosts = this.postRepo.findAll();
//		List<PostDto> allUsersPostsDto = allUsersPosts.stream()
//				.map(postItem -> this.modelMapper.map(postItem, PostDto.class)).collect(Collectors.toList());
//		return allUsersPostsDto;
//	}

	@Override
	public PostResponse getPostsByCategory(Integer categoryId, Integer pageNumber, Integer pageSize) {

		Category cat = this.categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category ", " CategoryId ", categoryId));

		Pageable p = PageRequest.of(pageNumber, pageSize);
		Page<Post> pagePost = this.postRepo.findByCategory(cat, p);
		List<Post> allPosts = pagePost.getContent();

		List<PostDto> postsDto = allPosts.stream().map((postItem) -> this.modelMapper.map(postItem, PostDto.class))
				.collect(Collectors.toList());

		PostResponse postResponse = new PostResponse();
		postResponse.setContent(postsDto);
		postResponse.setPageNumber(pagePost.getNumber());
		postResponse.setPageSize(pagePost.getSize());
		postResponse.setTotalElements(pagePost.getTotalElements());
		postResponse.setTotalPages(pagePost.getTotalPages());
		postResponse.setLastPage(pagePost.isLast());
		return postResponse;
	}

	@Override
	public PostResponse getPostsByUser(Integer userId, Integer pageNumber, Integer pageSize) {
		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User ", " UserId ", userId));

		Pageable p = PageRequest.of(pageNumber, pageSize);
		Page<Post> pagePost = this.postRepo.findByUser(user, p);
		List<Post> allPosts = pagePost.getContent();

//		use custom finder method to find the list of User entities by passing a user object to it
//		List<Post> posts = this.postRepo.findByUser(user);
//		convert all posts to postDtos
		List<PostDto> postsDto = allPosts.stream().map(post -> this.modelMapper.map(post, PostDto.class))
				.collect(Collectors.toList());

		PostResponse postResponse = new PostResponse();
		postResponse.setContent(postsDto);
		postResponse.setPageNumber(pagePost.getNumber());
		postResponse.setPageSize(pagePost.getSize());
		postResponse.setTotalElements(pagePost.getTotalElements());
		postResponse.setTotalPages(pagePost.getTotalPages());
		postResponse.setLastPage(pagePost.isLast());
		return postResponse;
	}

	@Override
	public List<PostDto> searchPosts(String keyword) {
		List<Post> posts  = this.postRepo.findByTitleContaining(keyword);
//		List<Post> posts  = this.postRepo.searchByTitle("%"+keyword+"%");
		List<PostDto> postsDto = posts.stream()
		.map((post) -> this.modelMapper.map(post, PostDto.class))
		.collect(Collectors.toList());
		return postsDto;
	}

}
