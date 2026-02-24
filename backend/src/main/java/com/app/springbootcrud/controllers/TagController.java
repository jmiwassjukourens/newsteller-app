package com.app.springbootcrud.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.springbootcrud.controllers.dto.TagDto;
import com.app.springbootcrud.entities.Tag;
import com.app.springbootcrud.services.TagService;

@RestController
@RequestMapping("/api/tags")
public class TagController {

    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping
    public List<TagDto> getAllTags() {
        List<Tag> tags = tagService.getAllTags();
        return tags.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private TagDto toDto(Tag tag) {
        TagDto dto = new TagDto();
        dto.setId(tag.getId());
        dto.setName(tag.getName());
        dto.setSlug(tag.getSlug());
        dto.setType(tag.getType());
        return dto;
    }
}

