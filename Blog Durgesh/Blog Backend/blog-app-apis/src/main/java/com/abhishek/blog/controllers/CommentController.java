package com.abhishek.blog.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.abhishek.blog.payloads.ApiResponse;
import com.abhishek.blog.payloads.CommentDto;
import com.abhishek.blog.services.CommentService;

@RestController
@RequestMapping("/api/v1")
public class CommentController {
	
	@Autowired
	private CommentService commentService;
	
	//create comment
	@PostMapping("/post/{postId}/comment")
	//recheck comment to commentDto
	public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto, @PathVariable Integer postId){
		
		CommentDto createComment = this.commentService.createComment(commentDto, postId);
		 return new ResponseEntity<CommentDto>(createComment, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/comment/{commentId}")
	public ResponseEntity<ApiResponse> deleteComment(@PathVariable Integer commentId){
		
		this.commentService.deleteComment(commentId);
		return new ResponseEntity<>(new ApiResponse("comment deleted",true), HttpStatus.OK);
	}
	
}
