package com.creachive.app.controller;

import com.creachive.app.model.User;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    // In-memory user store for demonstration
    private Map<String, User> users = new HashMap<>();

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String username = payload.get("username");
        String password = payload.get("password");

        if (users.containsKey(email)) {
            throw new RuntimeException("User already exists");
        }

        User newUser = new User(UUID.randomUUID().toString(), username, email);
        users.put(email, newUser);

        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully");
        response.put("userId", newUser.getId());
        return response;
    }

    @PostMapping("/login")
    public User login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        // In a real app, verify password hash here
        if (users.containsKey(email)) {
            return users.get(email);
        }
        throw new RuntimeException("Invalid credentials");
    }
}
