package com.app.springbootcrud.boostrap;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.app.springbootcrud.entities.Article;
import com.app.springbootcrud.entities.ArticleStatus;
import com.app.springbootcrud.entities.ArticleTag;
import com.app.springbootcrud.entities.Tag;
import com.app.springbootcrud.entities.TagType;
import com.app.springbootcrud.repositories.ArticleRepository;
import com.app.springbootcrud.repositories.TagRepository;

import jakarta.transaction.Transactional;

@Component
public class NewsletterDataSeeder implements CommandLineRunner {

    private final TagRepository tagRepository;
    private final ArticleRepository articleRepository;

    public NewsletterDataSeeder(TagRepository tagRepository, ArticleRepository articleRepository) {
        this.tagRepository = tagRepository;
        this.articleRepository = articleRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        seedTags();
        seedArticles();
    }

    private void seedTags() {
        if (tagRepository.count() > 0) {
            return;
        }

        Tag la = createTag("Los Angeles", "los-angeles", TagType.CITY);
        Tag bh = createTag("Beverly Hills", "beverly-hills", TagType.CITY);
        Tag sm = createTag("Santa Monica", "santa-monica", TagType.CITY);
        Tag breaking = createTag("Breaking News", "breaking", TagType.FEATURE);
        Tag trending = createTag("Trending", "trending", TagType.FEATURE);
        Tag business = createTag("Business", "business", TagType.CATEGORY);

        tagRepository.saveAll(List.of(la, bh, sm, breaking, trending, business));
    }

    private Tag createTag(String name, String slug, TagType type) {
        Tag tag = new Tag();
        tag.setName(name);
        tag.setSlug(slug);
        tag.setType(type);
        return tag;
    }

    private void seedArticles() {
        if (articleRepository.count() > 0) {
            return;
        }

        Map<String, Tag> tagsBySlug = new HashMap<>();
        tagRepository.findAll().forEach(tag -> tagsBySlug.put(tag.getSlug(), tag));

        LocalDateTime now = LocalDateTime.now();

        Article a1 = createArticle(
                "Morning Brief: Markets in Motion",
                "morning-brief-markets-in-motion",
                "Your early look at what’s moving LA’s business and tech scene today.",
                "Full content for Morning Brief: Markets in Motion...",
                "https://images.example.com/cover1.jpg",
                now.minusHours(6)
        );
        attachTags(a1, tagsBySlug, "los-angeles", "business", "trending");

        Article a2 = createArticle(
                "Breaking: Sunset Blvd Gridlock",
                "breaking-sunset-blvd-gridlock",
                "Major incident shuts down key commute corridor through West LA.",
                "Full content for Breaking: Sunset Blvd Gridlock...",
                "https://images.example.com/cover2.jpg",
                now.minusHours(2)
        );
        attachTags(a2, tagsBySlug, "los-angeles", "breaking");

        Article a3 = createArticle(
                "Why Beverly Hills Retail Is Booming Again",
                "why-beverly-hills-retail-is-booming-again",
                "Luxury foot traffic is back—and brands are racing for space on Rodeo.",
                "Full content for Why Beverly Hills Retail Is Booming Again...",
                "https://images.example.com/cover3.jpg",
                now.minusDays(1)
        );
        attachTags(a3, tagsBySlug, "beverly-hills", "business", "trending");

        Article a4 = createArticle(
                "Santa Monica’s New Beachfront Startups",
                "santa-monica-new-beachfront-startups",
                "Founders are trading office parks for ocean views—here’s who just moved in.",
                "Full content for Santa Monica’s New Beachfront Startups...",
                "https://images.example.com/cover4.jpg",
                now.minusDays(2)
        );
        attachTags(a4, tagsBySlug, "santa-monica", "business");

        Article a5 = createArticle(
                "Late Night Brief: After-Hours in Downtown LA",
                "late-night-brief-downtown-la",
                "Catch up on everything that moved after the markets closed.",
                "Full content for Late Night Brief: After-Hours in Downtown LA...",
                "https://images.example.com/cover5.jpg",
                now.minusHours(10)
        );
        attachTags(a5, tagsBySlug, "los-angeles", "trending");

        Article a6 = createArticle(
                "Emergency Alert: Power Outages in Westside",
                "emergency-alert-power-outages-westside",
                "Rolling outages are affecting key commercial districts across the Westside.",
                "Full content for Emergency Alert: Power Outages in Westside...",
                "https://images.example.com/cover6.jpg",
                now.minusMinutes(45)
        );
        attachTags(a6, tagsBySlug, "los-angeles", "santa-monica", "breaking");

        Article a7 = createArticle(
                "Beverly Hills Office Conversions",
                "beverly-hills-office-conversions",
                "From desks to decks: how office towers are becoming hospitality plays.",
                "Full content for Beverly Hills Office Conversions...",
                "https://images.example.com/cover7.jpg",
                now.minusDays(3)
        );
        attachTags(a7, tagsBySlug, "beverly-hills", "business");

        Article a8 = createArticle(
                "Santa Monica Cyclists vs. Delivery Vans",
                "santa-monica-cyclists-vs-delivery-vans",
                "A last-mile logistics crunch is colliding with bike culture on the promenade.",
                "Full content for Santa Monica Cyclists vs. Delivery Vans...",
                "https://images.example.com/cover8.jpg",
                now.minusHours(20)
        );
        attachTags(a8, tagsBySlug, "santa-monica", "trending");

        Article a9 = createArticle(
                "LA Founders to Watch This Week",
                "la-founders-to-watch-this-week",
                "Nine local founders raising capital, hiring fast, or quietly building category winners.",
                "Full content for LA Founders to Watch This Week...",
                "https://images.example.com/cover9.jpg",
                now.minusHours(12)
        );
        attachTags(a9, tagsBySlug, "los-angeles", "business", "trending");

        Article a10 = createArticle(
                "Quiet Morning: Markets Flat Ahead of Fed Decision",
                "quiet-morning-markets-flat-ahead-of-fed-decision",
                "Traders are holding their breath—and LA companies are watching closely.",
                "Full content for Quiet Morning: Markets Flat Ahead of Fed Decision...",
                "https://images.example.com/cover10.jpg",
                now.minusHours(30)
        );
        attachTags(a10, tagsBySlug, "los-angeles", "business");

        articleRepository.saveAll(List.of(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10));
    }

    private Article createArticle(
            String title,
            String slug,
            String excerpt,
            String content,
            String coverImageUrl,
            LocalDateTime publishedAt
    ) {
        Article article = new Article();
        article.setTitle(title);
        article.setSlug(slug);
        article.setExcerpt(excerpt);
        article.setContent(content);
        article.setCoverImageUrl(coverImageUrl);
        article.setStatus(ArticleStatus.PUBLISHED);
        article.setPublishedAt(publishedAt);
        article.setCreatedAt(publishedAt.minusHours(1));
        return article;
    }

    private void attachTags(Article article, Map<String, Tag> tagsBySlug, String... slugs) {
        for (String slug : slugs) {
            Tag tag = tagsBySlug.get(slug);
            if (tag != null) {
                ArticleTag articleTag = new ArticleTag(article, tag);


                article.getArticleTags().add(articleTag);
                tag.getArticleTags().add(articleTag);
            }
        }
    }
}