package com.creachive.app.model;

import java.util.UUID;

/**
 * Represents a User in the Creachive ecosystem.
 */
public class User {
    private String id;
    private String username;
    private String email;
    private String bio;
    private int followersCount;

    public User(String username, String email) {
        this.id = UUID.randomUUID().toString();
        this.username = username;
        this.email = email;
        this.followersCount = 0;
    }

    // Getters and Setters
    public String getId() { return id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
}
