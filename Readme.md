Creachive - The Hybrid Social Platform

Creachive is a collaborative social media project combining features from Facebook (Feed), Instagram (Visuals), Snapchat (Camera/Stories), and WhatsApp (Chat).

Repository Structure

frontend/

index.html - The main entry point. Contains the full UI logic using HTML5, TailwindCSS, and Vanilla JavaScript.

backend/src/main/java/com/creachive/app/

CreachiveApplication.java - Main Spring Boot entry point.

model/User.java - Data model for users.

controller/PostController.java - REST API endpoints.

How to Run

Frontend (Immediate Preview)

Simply open index.html in any modern web browser. It uses CDN links for styling, so an internet connection is required.

Backend (Java Setup)

To run the backend, you need:

Java JDK 17 or higher.

Maven or Gradle.

An IDE like IntelliJ or Eclipse.

Steps:

Create a new Spring Boot project (via start.spring.io) adding Spring Web dependency.

Copy the Java files provided here into the corresponding packages structure.

Run CreachiveApplication.java.

The API will be available at http://localhost:8080/api/posts.

Features

Feed: Scrollable infinite feed style.

Stories: Horizontal scroll mock-up.

Chat: List view for direct messaging.

Camera: UI placeholder for media capture.
