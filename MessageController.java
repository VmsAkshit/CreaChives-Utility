package com.creachive.app.controller;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class MessageController {

    private List<Map<String, String>> messages = new ArrayList<>();

    @GetMapping
    public List<Map<String, String>> getMessages() {
        return messages;
    }

    @PostMapping
    public Map<String, String> sendMessage(@RequestBody Map<String, String> message) {
        message.put("timestamp", String.valueOf(System.currentTimeMillis()));
        messages.add(message);
        return message;
    }
}
