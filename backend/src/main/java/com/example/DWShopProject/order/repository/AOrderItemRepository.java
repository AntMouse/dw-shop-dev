package com.example.DWShopProject.order.repository;

import com.example.DWShopProject.order.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AOrderItemRepository extends JpaRepository<OrderItem, Long> {
}