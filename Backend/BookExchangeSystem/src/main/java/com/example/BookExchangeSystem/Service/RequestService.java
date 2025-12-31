package com.example.BookExchangeSystem.Service;

import com.example.BookExchangeSystem.Model.Request;
import com.example.BookExchangeSystem.Repository.RequestRepository;
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
}
