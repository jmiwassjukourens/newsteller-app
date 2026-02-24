package com.app.springbootcrud.services;

import java.util.List;

import com.app.springbootcrud.entities.Tag;
import com.app.springbootcrud.entities.TagType;

public interface TagService {

    List<Tag> getAllTags();

    List<Tag> getTagsByType(TagType type);
}

