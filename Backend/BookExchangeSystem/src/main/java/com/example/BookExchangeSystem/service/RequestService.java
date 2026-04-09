package com.example.BookExchangeSystem.service;

import com.example.BookExchangeSystem.model.Request;
import com.example.BookExchangeSystem.repository.RequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestService {
    private final RequestRepository requestRepository;

    public RequestService(RequestRepository requestRepository) { this.requestRepository = requestRepository; }

    public Request saveRequest(Request request) { return requestRepository.save(request); }

    public List<Request> getAllRequests() { return requestRepository.findAll(); }
    public Request getRequestById(Long id) {
        return requestRepository.findById(id).orElse(null);
    }

    public List<Request> getRequestsByUserId(Long userId) {
        return requestRepository.findByUserId(userId);
    }
    public List<Request> getRequestsByBookOwner(Long ownerId) {
        return requestRepository.findByBookOwnerId(ownerId);
    }
    public void deleteRequest(Long id) {
        requestRepository.deleteById(id);
    }
}
