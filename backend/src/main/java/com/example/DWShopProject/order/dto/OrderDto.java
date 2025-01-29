package com.example.DWShopProject.order.dto;

import com.example.DWShopProject.common.enums.OrderStatusEnum;
import com.example.DWShopProject.member.dto.MemberDto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder

public class OrderDto {

    private Long id;
    private MemberDto member;
    private String recipientName;
    private String contactNumber;
    private String deliveryLocation;
    private LocalDateTime createDate;
    private String request;
    private int totalPrice;
    private OrderStatusEnum status;
    private List<OrderItemDto> orderItems;


}
