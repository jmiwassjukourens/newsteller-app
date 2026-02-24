package com.app.springbootcrud.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.springbootcrud.entities.Tag;
import com.app.springbootcrud.entities.TagType;

public interface TagRepository extends JpaRepository<Tag, Long> {

    Optional<Tag> findBySlug(String slug);

    List<Tag> findByType(TagType type);
}

