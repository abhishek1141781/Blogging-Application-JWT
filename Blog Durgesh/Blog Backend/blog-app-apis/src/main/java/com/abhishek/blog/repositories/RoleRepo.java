package com.abhishek.blog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.abhishek.blog.entities.Role;

public interface RoleRepo extends JpaRepository<Role, Integer>{

}
