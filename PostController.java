package com.creachive.app.controller;

import com.creachive.app.model.User;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

/**
 * REST API for handling Social Posts.
 * Endpoint: /api/posts
 */
@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*") // Allow frontend to access this
public class PostController {

    // Simulating a database in memory for this example
    private List<Map<String, Object>> postDatabase = new ArrayList<>();

    public PostController() {
        // Add some dummy data on startup
        Map<String, Object> post1 = new HashMap<>();
        post1.put("id", 1);
        post1.put("user", "alex_dev");
        post1.put("content", "Hello Creachive!");
        post1.put("likes", 0);
        postDatabase.add(post1);
    }

    // Get all posts (Like Facebook Feed)
    @GetMapping
    public List<Map<String, Object>> getAllPosts() {
        return postDatabase;
    }

    // Create a new post
    @PostMapping
    public Map<String, Object> createPost(@RequestBody Map<String, Object> payload) {
        payload.put("id", postDatabase.size() + 1);
        payload.put("likes", 0);
        postDatabase.add(payload);
        return payload;
    }

    // Like a post
    @PostMapping("/{id}/like")
    public Map<String, Object> likePost(@PathVariable int id) {
        for (Map<String, Object> post : postDatabase) {
            if ((int) post.get("id") == id) {
                int currentLikes = (int) post.get("likes");
                post.put("likes", currentLikes + 1);
                return post;
            }
        }
        throw new RuntimeException("Post not found");
    }
}
