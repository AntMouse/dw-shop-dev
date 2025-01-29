package com.example.DWShopProject.sale.repository;

import com.example.DWShopProject.sale.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface SaleRepository extends JpaRepository<Sale, Long> {
    List<Sale> findByCreateDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    List<Sale> findByCreateDateBetweenAndProductIdIn(LocalDateTime startDate, LocalDateTime endDate, List<Long> productIds);
}
