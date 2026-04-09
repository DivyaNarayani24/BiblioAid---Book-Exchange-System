package com.example.BookExchangeSystem.repository;

import com.example.BookExchangeSystem.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    // Search by title
    List<Book> findByTitleContainingIgnoreCase(String title);

    // Search by author
    List<Book> findByAuthorContainingIgnoreCase(String author);

    // Search by subject
    List<Book> findBySubjectContainingIgnoreCase(String subject);

    // Search across title, author and subject in one query
    @Query("SELECT b FROM Book b WHERE " +
            "LOWER(b.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(b.author) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(b.subject) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Book> searchAllFields(@Param("query") String query);

    // Get all books by a specific user
    List<Book> findByUserId(Long userId);

    // Get only available books
    List<Book> findByAvailableTrue();

    // Get available books by type (donate or sell)
    List<Book> findByTypeAndAvailableTrue(String type);
}