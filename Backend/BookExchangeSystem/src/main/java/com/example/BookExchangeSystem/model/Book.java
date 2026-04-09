package com.example.BookExchangeSystem.model;

import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    private String subject;      // e.g. Mathematics, Computer Science, Physics

    @Column(name = "book_condition")
    private String condition;

    private String type;         // donate or sell

    private Double price;        // only needed if type is "sell", can be null for donate

    private boolean available = true;   // true = still available, false = already taken

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;           // the student who listed this book

    // Constructors
    public Book() {}

    public Book(String title, String author, String subject,
                String condition, String type, Double price, User user) {
        this.title = title;
        this.author = author;
        this.subject = subject;
        this.condition = condition;
        this.type = type;
        this.price = price;
        this.user = user;
        this.available = true;
    }

    // Getters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public String getSubject() { return subject; }
    public String getCondition() { return condition; }
    public String getType() { return type; }
    public Double getPrice() { return price; }
    public boolean isAvailable() { return available; }
    public User getUser() { return user; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setAuthor(String author) { this.author = author; }
    public void setSubject(String subject) { this.subject = subject; }
    public void setCondition(String condition) { this.condition = condition; }
    public void setType(String type) { this.type = type; }
    public void setPrice(Double price) { this.price = price; }
    public void setAvailable(boolean available) { this.available = available; }
    public void setUser(User user) { this.user = user; }
}