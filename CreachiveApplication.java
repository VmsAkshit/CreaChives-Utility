package com.creachive.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Main Entry point for the Creachive Backend.
 * To run this, you need Maven/Gradle and a standard Spring Boot Project structure.
 */
@SpringBootApplication
@RestController
public class CreachiveApplication {

    public static void main(String[] args) {
        SpringApplication.run(CreachiveApplication.class, args);
    }

    @GetMapping("/")
    public String healthCheck() {
        return "Creachive Backend is Running! version 1.0.0";
    }
}
