package com.example.DWShopProject.order.controller;

import com.example.DWShopProject.order.dto.OrderDto;
import com.example.DWShopProject.member.repository.MemberRepository;
import com.example.DWShopProject.order.repository.OrderRepository;
import com.example.DWShopProject.product.repository.ProductRepository;
import com.example.DWShopProject.common.security.userdetails.MemberDetailsImpl;
import com.example.DWShopProject.order.service.OrderService;
import com.example.DWShopProject.paypal.service.PayPalService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@Slf4j
public class OrderRestController {

    @Autowired
    private PayPalService payPalService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;


    //---------------------주문생성 테스트
    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@AuthenticationPrincipal MemberDetailsImpl memberDetails, @RequestBody OrderDto orderDto) {
        Long memberId = memberDetails.getMember().getId();
        orderService.createOrder(memberId, orderDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/list")
    public ResponseEntity<List<OrderDto>> getOrderList(@AuthenticationPrincipal MemberDetailsImpl memberDetails) {
        Long memberId = memberDetails.getMember().getId();
        List<OrderDto> orderList = orderService.getOrderListByMemberId(memberId);
        return ResponseEntity.ok(orderList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getOrderDetail(@AuthenticationPrincipal MemberDetailsImpl memberDetails, @PathVariable Long id) {
        Long memberId = memberDetails.getMember().getId();
        OrderDto order = orderService.getOrderDetailByIdAndMemberId(id, memberId);
        return ResponseEntity.ok(order);
    }





}
