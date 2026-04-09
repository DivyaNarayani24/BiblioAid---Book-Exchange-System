package com.example.BookExchangeSystem.service;

import com.example.BookExchangeSystem.model.User;
import com.example.BookExchangeSystem.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register / save user
    public User addUser(User user) {
        return userRepository.save(user);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get by ID — returns null instead of throwing exception
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);  // FIXED: was throwing RuntimeException
    }

    // Get by Email — needed for login and duplicate check
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}