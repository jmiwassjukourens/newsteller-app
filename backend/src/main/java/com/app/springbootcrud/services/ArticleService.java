package com.app.springbootcrud.services;

import java.time.LocalDateTime;
import java.util.List;

import com.app.springbootcrud.entities.Article;

public interface ArticleService {

    List<Article> getLatestArticles(int limit);

    List<Article> getArticlesByTag(String slug);

    List<Article> getTrendingArticles();

    List<Article> getBreakingNews();

    List<Article> getPublishedSince(LocalDateTime date);
}

