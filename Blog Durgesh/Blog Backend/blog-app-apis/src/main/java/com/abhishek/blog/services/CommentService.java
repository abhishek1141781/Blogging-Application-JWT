package com.abhishek.blog.services;

import com.abhishek.blog.payloads.CommentDto;

public interface CommentService {

	CommentDto createComment(CommentDto commentDto, Integer postId);

	void deleteComment(Integer commentId);
	
	//updateComment
	
	
}
