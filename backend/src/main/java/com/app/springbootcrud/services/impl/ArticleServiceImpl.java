package com.app.springbootcrud.services.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.app.springbootcrud.entities.Article;
import com.app.springbootcrud.entities.ArticleStatus;
import com.app.springbootcrud.entities.TagType;
import com.app.springbootcrud.repositories.ArticleRepository;
import com.app.springbootcrud.repositories.TagRepository;
import com.app.springbootcrud.services.ArticleService;

@Service
@Transactional(readOnly = true)
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final TagRepository tagRepository;

    public ArticleServiceImpl(ArticleRepository articleRepository, TagRepository tagRepository) {
        this.articleRepository = articleRepository;
        this.tagRepository = tagRepository;
    }

    @Override
    public List<Article> getLatestArticles(int limit) {
        return articleRepository.findByStatusOrderByPublishedAtDesc(
                ArticleStatus.PUBLISHED,
                PageRequest.of(0, limit)
        );
    }

    @Override
    public List<Article> getArticlesByTag(String slug) {
        return articleRepository.findByTagSlug(slug);
    }

    @Override
    public List<Article> getTrendingArticles() {
        return articleRepository.findByTagSlug("trending");
    }

    @Override
    public List<Article> getBreakingNews() {
        return articleRepository.findByTagSlug("breaking");
    }

    @Override
    public List<Article> getPublishedSince(LocalDateTime date) {
        return articleRepository.findByStatusAndPublishedAtAfterOrderByPublishedAtDesc(
                ArticleStatus.PUBLISHED,
                date
        );
    }

    @Override
    public Article getArticleBySlug(String slug) {
        return articleRepository
                .findBySlugAndStatus(slug, ArticleStatus.PUBLISHED)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found"));
    }
}

