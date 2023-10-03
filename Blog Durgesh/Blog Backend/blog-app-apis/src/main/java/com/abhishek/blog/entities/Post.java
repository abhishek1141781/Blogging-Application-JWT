package com.abhishek.blog.entities;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "posts")
@NoArgsConstructor
@Getter
@Setter
public class Post extends BaseEntity{
	
	@NotEmpty
	private String title;
	@Column(length = 10000)
	private String content;
	private String imageName;
	
	private Date addedDate;
	
	@ManyToOne
	private Category category;
	@ManyToOne
	private User user;
	
//	fetch type is eager once a post is fetched, it's comment should be fetched along with it
	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
	private Set<Comment> comments = new HashSet<Comment>();
	
}
