package com.app.springbootcrud.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.springbootcrud.entities.Article;
import com.app.springbootcrud.entities.ArticleStatus;
import com.app.springbootcrud.entities.TagType;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    List<Article> findByStatusOrderByPublishedAtDesc(ArticleStatus status, Pageable pageable);

    @Query("select a from Article a join a.articleTags at join at.tag t where t.slug = :slug and a.status = 'PUBLISHED' order by a.publishedAt desc")
    List<Article> findByTagSlug(@Param("slug") String slug);

    @Query("select a from Article a join a.articleTags at join at.tag t where t.type = :type and a.status = 'PUBLISHED' order by a.publishedAt desc")
    List<Article> findByTagType(@Param("type") TagType type);

    List<Article> findByStatusAndPublishedAtAfterOrderByPublishedAtDesc(ArticleStatus status, LocalDateTime date);
}

