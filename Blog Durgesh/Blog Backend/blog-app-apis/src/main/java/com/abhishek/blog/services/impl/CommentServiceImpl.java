package com.abhishek.blog.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.abhishek.blog.entities.Comment;
import com.abhishek.blog.entities.Post;
import com.abhishek.blog.exceptions.ResourceNotFoundException;
import com.abhishek.blog.payloads.CommentDto;
import com.abhishek.blog.repositories.CommentRepo;
import com.abhishek.blog.repositories.PostRepo;
import com.abhishek.blog.services.CommentService;

@Service
public class CommentServiceImpl implements CommentService {
	
	@Autowired
	private PostRepo postRepo;
	
	@Autowired
	private CommentRepo commentRepo;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public CommentDto createComment(CommentDto commentDto, Integer postId) {
		
		Post post = this.postRepo.findById(postId)
		.orElseThrow(() -> new ResourceNotFoundException("Post ", " PostId ", postId));
		
		Comment comment = this.modelMapper.map(commentDto, Comment.class);
//		post.setComments(new HashSet<Comment>().add(comment));
		comment.setPost(post);
		Comment savedComment = this.commentRepo.save(comment);
		return this.modelMapper.map(savedComment, CommentDto.class);
	}

	@Override
	public void deleteComment(Integer commentId) {
		Comment commentFound = this.commentRepo.findById(commentId)
		.orElseThrow(() -> new ResourceNotFoundException("Comment ", " CommentId ", commentId));
		this.commentRepo.delete(commentFound);
	}

}
