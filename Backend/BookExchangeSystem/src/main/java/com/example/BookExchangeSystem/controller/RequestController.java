package com.example.BookExchangeSystem.controller;

import com.example.BookExchangeSystem.model.Book;
import com.example.BookExchangeSystem.model.Request;
import com.example.BookExchangeSystem.model.User;
import com.example.BookExchangeSystem.service.BookService;
import com.example.BookExchangeSystem.service.RequestService;
import com.example.BookExchangeSystem.service.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})

public class RequestController {
    private final RequestService requestService;
    private final UserService userService;
    private final BookService bookService;

    public RequestController(RequestService requestService, UserService userService, BookService bookService) {
        this.requestService = requestService;
        this.userService = userService;
        this.bookService = bookService;
    }

    // REPLACE ENTIRE METHOD:
    @PostMapping
    public ResponseEntity<Request> addRequest(@RequestBody Request request) {
        try {
            if (request.getUser() != null && request.getUser().getId() != null) {
                User user = userService.getUserById(request.getUser().getId());
                if (user == null) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
                }
                request.setUser(user);
            }
            if (request.getBook() != null && request.getBook().getId() != null) {
                Book book = bookService.getBookById(request.getBook().getId());
                if (book == null) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
                }
                request.setBook(book);
            }
            Request savedRequest = requestService.saveRequest(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedRequest);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    @GetMapping
    public ResponseEntity<List<Request>> getAllRequests() {
        List<Request> requests = requestService.getAllRequests();
        return ResponseEntity.ok(requests);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Request> getRequestById(@PathVariable Long id) {
        Request request = requestService.getRequestById(id);
        if (request != null) {
            return ResponseEntity.ok(request);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Request>> getRequestsByUserId(@PathVariable Long userId) {
        List<Request> requests = requestService.getRequestsByUserId(userId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<Request>> getRequestsByOwner(@PathVariable Long ownerId) {
        return ResponseEntity.ok(requestService.getRequestsByBookOwner(ownerId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        Request request = requestService.getRequestById(id);
        if (request == null) {
            return ResponseEntity.notFound().build();
        }
        requestService.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Request> updateRequestStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        Request request = requestService.getRequestById(id);
        if (request == null) {
            return ResponseEntity.notFound().build();
        }
        request.setStatus(status);
        Request updatedRequest = requestService.saveRequest(request);
        return ResponseEntity.ok(updatedRequest);
    }
}
