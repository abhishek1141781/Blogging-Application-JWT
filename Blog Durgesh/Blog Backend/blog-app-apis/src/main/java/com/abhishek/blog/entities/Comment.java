package com.abhishek.blog.entities;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "comments")
@Getter
@Setter
public class Comment extends BaseEntity{
	
	private String content;

	@ManyToOne
	private Post post;
	
	@ManyToOne
	private User user;

	
	

}
