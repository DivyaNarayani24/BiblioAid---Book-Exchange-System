package com.example.BookExchangeSystem.Repository;

import com.example.BookExchangeSystem.Model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByTitleContainingIgnoreCase(String title);
    List<Book> findByUserId(Long userId);

}
