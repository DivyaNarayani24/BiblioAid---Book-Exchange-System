package com.example.BookExchangeSystem.Repository;

import com.example.BookExchangeSystem.Model.Request;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {
    List<Request> findByUserId(Long userId);

}
