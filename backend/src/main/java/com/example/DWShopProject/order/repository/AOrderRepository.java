package com.example.DWShopProject.order.repository;

import com.example.DWShopProject.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AOrderRepository extends JpaRepository<Order, Long> {
}