package com.bookmatch;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class BookController {
    private final List<Book> books = List.of(
        new Book(1, "The House in the Cerulean Sea", "TJ Klune", "Feel-good fantasy",
            "A quiet caseworker discovers a home full of extraordinary children and unexpected hope.",
            List.of("cozy", "adventure")),
        new Book(2, "The Hobbit", "J. R. R. Tolkien", "Fantasy adventure",
            "An unexpected journey reminds a comfort-loving hobbit how brave he can be.",
            List.of("adventure", "cozy")),
        new Book(3, "And Then There Were None", "Agatha Christie", "Mystery",
            "Ten strangers arrive on an island. One by one, the mystery gets darker.",
            List.of("mystery", "thought")),
        new Book(4, "Atomic Habits", "James Clear", "Personal development",
            "A practical look at how tiny daily changes can build remarkable habits.",
            List.of("growth", "cozy")),
        new Book(5, "Pride and Prejudice", "Jane Austen", "Classic romance",
            "Wit, first impressions, and a timeless love story full of sharp observations.",
            List.of("romance", "thought")),
        new Book(6, "The Midnight Library", "Matt Haig", "Contemporary fiction",
            "A woman explores the lives she might have lived and what makes a life meaningful.",
            List.of("thought", "cozy", "growth")),
        new Book(7, "The Alchemist", "Paulo Coelho", "Philosophical fiction",
            "A shepherd follows a dream and learns to pay attention to the journey itself.",
            List.of("adventure", "growth", "thought")),
        new Book(8, "The Love Hypothesis", "Ali Hazelwood", "Romantic comedy",
            "A fake-dating arrangement between two scientists becomes unexpectedly complicated.",
            List.of("romance")),
        new Book(9, "The Silent Patient", "Alex Michaelides", "Psychological thriller",
            "A painter stops speaking after a shocking crime, and a therapist wants to know why.",
            List.of("mystery")),
        new Book(10, "Ikigai", "Héctor García & Francesc Miralles", "Wellbeing",
            "A gentle exploration of purpose, daily rituals, and finding reasons to get up each day.",
            List.of("growth", "cozy")),
        new Book(11, "The Little Prince", "Antoine de Saint-Exupéry", "Classic fable",
            "A poetic journey about friendship, imagination, and seeing with the heart.",
            List.of("thought", "cozy", "adventure")),
        new Book(12, "Book Lovers", "Emily Henry", "Contemporary romance",
            "A literary agent and an editor keep crossing paths in a story about love and being understood.",
            List.of("romance", "cozy"))
    );

    @GetMapping("/api/books")
    public List<Book> getAllBooks() {
        return books;
    }

    @GetMapping("/api/moods")
    public List<Map<String, String>> getMoods() {
        return List.of(
            Map.of("id", "cozy", "name", "Cozy & calm"),
            Map.of("id", "adventure", "name", "Adventure"),
            Map.of("id", "mystery", "name", "Mystery & twists"),
            Map.of("id", "growth", "name", "Personal growth"),
            Map.of("id", "romance", "name", "Romance"),
            Map.of("id", "thought", "name", "Make me think")
        );
    }

    @GetMapping("/api/books/mood")
    public List<Book> getBooksByMood(String mood) {
        if (mood == null || mood.isBlank()) {
            return books;
        }
        return books.stream()
            .filter(book -> book.moods().contains(mood.toLowerCase()))
            .collect(Collectors.toList());
    }

    public record Book(
        int id,
        String title,
        String author,
        String genre,
        String description,
        List<String> moods
    ) {}
}
