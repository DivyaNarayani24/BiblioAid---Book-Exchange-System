package com.example.BookExchangeSystem.repository;

import com.example.BookExchangeSystem.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {
    List<Request> findByUserId(Long userId);

    // Get all requests for books owned by a specific user
    @Query("SELECT r FROM Request r WHERE r.book.user.id = :ownerId")
    List<Request> findByBookOwnerId(@Param("ownerId") Long ownerId);
}
