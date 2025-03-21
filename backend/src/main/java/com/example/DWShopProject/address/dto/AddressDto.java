package com.example.DWShopProject.address.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class AddressDto {
    private String recipientName;
    private String contactNumber;
    private String deliveryLocation;
}
