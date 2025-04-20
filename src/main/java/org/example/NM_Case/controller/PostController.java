package org.example.NM_Case.controller;

import org.example.NM_Case.model.Post;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import org.springframework.scheduling.annotation.Scheduled;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "*")
public class PostController {

    private final List<Post> posts = new ArrayList<>();

    @GetMapping
    public List<Post> getPosts() {
        return posts;
    }

    @PostMapping
    public void addPost(@RequestBody Post post) {
        posts.add(post);
    }

    private final List<String> botUsers = List.of("Jakob", "Jais", "Bjarke", "Nikola");
    private final List<String> botMessages = List.of(
        "Hejsa, hvordan går det?",
        "Har I hørt om Projektagenten?",
        "Jeg er en autogeneret besked"
    );

    private final Random random = new Random();

    @Scheduled(fixedRate = 5000) // 5 seconds
    public void postBotMessage() {
        String user = botUsers.get(random.nextInt(botUsers.size()));
        String text = botMessages.get(random.nextInt(botMessages.size()));
        long time = System.currentTimeMillis();
        boolean seen = false;

        Post botPost = new Post(user, text, time, seen);
        addPost(botPost);
    }
}

