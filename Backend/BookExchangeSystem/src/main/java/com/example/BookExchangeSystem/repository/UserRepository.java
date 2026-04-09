package com.example.BookExchangeSystem.repository;

import com.example.BookExchangeSystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Needed for login and duplicate email check
    Optional<User> findByEmail(String email);
}