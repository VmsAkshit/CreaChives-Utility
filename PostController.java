package com.creachive.app.controller;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class PostController {

    private List<Map<String, Object>> posts = new ArrayList<>();

    @GetMapping
    public List<Map<String, Object>> getFeed() {
        return posts;
    }

    @PostMapping
    public Map<String, Object> createPost(@RequestBody Map<String, Object> postData) {
        postData.put("id", posts.size() + 1);
        postData.put("timestamp", System.currentTimeMillis());
        postData.put("likes", 0);
        posts.add(0, postData); // Add to top
        return postData;
    }
}
