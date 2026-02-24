package com.app.springbootcrud.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.springbootcrud.controllers.dto.ArticleDto;
import com.app.springbootcrud.entities.Article;
import com.app.springbootcrud.entities.ArticleTag;
import com.app.springbootcrud.services.ArticleService;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping("/latest")
    public List<ArticleDto> getLatestArticles(
            @RequestParam(name = "limit", defaultValue = "8") int limit
    ) {
        List<Article> articles = articleService.getLatestArticles(limit);
        return articles.stream().map(this::toDto).collect(Collectors.toList());
    }

    @GetMapping("/tag/{slug}")
    public List<ArticleDto> getByTag(@PathVariable String slug) {
        List<Article> articles = articleService.getArticlesByTag(slug);
        return articles.stream().map(this::toDto).collect(Collectors.toList());
    }

    @GetMapping("/trending")
    public List<ArticleDto> getTrending() {
        List<Article> articles = articleService.getTrendingArticles();
        return articles.stream().map(this::toDto).collect(Collectors.toList());
    }

    @GetMapping("/breaking")
    public List<ArticleDto> getBreaking() {
        List<Article> articles = articleService.getBreakingNews();
        return articles.stream().map(this::toDto).collect(Collectors.toList());
    }

    private ArticleDto toDto(Article article) {
        ArticleDto dto = new ArticleDto();
        dto.setId(article.getId());
        dto.setTitle(article.getTitle());
        dto.setSlug(article.getSlug());
        dto.setExcerpt(article.getExcerpt());
        dto.setContent(article.getContent());
        dto.setCoverImageUrl(article.getCoverImageUrl());
        dto.setPublishedAt(article.getPublishedAt());

        List<String> tags = article.getArticleTags().stream()
                .map(ArticleTag::getTag)
                .map(tag -> tag.getSlug())
                .toList();
        dto.setTags(tags);

        return dto;
    }
}

