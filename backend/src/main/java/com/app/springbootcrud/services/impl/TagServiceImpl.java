package com.app.springbootcrud.services.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.springbootcrud.entities.Tag;
import com.app.springbootcrud.entities.TagType;
import com.app.springbootcrud.repositories.TagRepository;
import com.app.springbootcrud.services.TagService;

@Service
@Transactional(readOnly = true)
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    public TagServiceImpl(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @Override
    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    @Override
    public List<Tag> getTagsByType(TagType type) {
        return tagRepository.findByType(type);
    }
}

