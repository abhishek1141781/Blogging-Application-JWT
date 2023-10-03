package com.abhishek.blog.payloads;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.abhishek.blog.entities.Comment;
import com.abhishek.blog.entities.Role;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostDto {
	
		private int id;
		private String title;
		private String content;
//		take categoryid and userid in url : either in dto as in here, or in url: we'll be going with url 
//		so commenting this out here
//		private Category category;
//		private User user;
		
		private String imageName;
		
		private Date addedDate;
		
		private CategoryDto category;
		
		private UserDto user;
		
		private Set<CommentDto> comments =new HashSet<>();
		
		
}
