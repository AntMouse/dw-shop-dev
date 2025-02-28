package com.example.DWShopProject.common.config;

import com.example.DWShopProject.cart.entity.Cart;
import com.example.DWShopProject.cart.repository.CartRepository;
import com.example.DWShopProject.cart.entity.CartItem;
import com.example.DWShopProject.cart.repository.CartItemRepository;
import com.example.DWShopProject.member.dto.MemberDto;
import com.example.DWShopProject.common.enums.OrderStatusEnum;
import com.example.DWShopProject.common.enums.ProductTypeEnum;
import com.example.DWShopProject.member.entity.Member;
import com.example.DWShopProject.member.repository.MemberRepository;
import com.example.DWShopProject.order.entity.Order;
import com.example.DWShopProject.order.entity.OrderItem;
import com.example.DWShopProject.order.repository.OrderItemRepository;
import com.example.DWShopProject.order.repository.OrderRepository;
import com.example.DWShopProject.product.entity.Product;
import com.example.DWShopProject.product.entity.ProductTypeMgmt;
import com.example.DWShopProject.product.repository.ProductRepository;
import com.example.DWShopProject.product.repository.ProductTypeMgmtRepository;
import com.example.DWShopProject.common.enums.MemberRoleEnum;
import com.example.DWShopProject.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.*;

// @Component
public class DataInitializer implements CommandLineRunner {

    // 한 곳에서 숫자 관리
    private static final int TOTAL_MEMBERS = 500; // 전체 회원 수
    private static final int ORDERING_MEMBERS_COUNT = 100; // 주문을 하는 회원 수
    private static final int CART_ITEM_HOLDERS_COUNT = ORDERING_MEMBERS_COUNT; // 장바구니 아이템을 보유한 회원 수
    private static final int TOTAL_ORDERS = ORDERING_MEMBERS_COUNT; // 총 주문 개수

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private MemberService memberService;

    @Autowired
    private ProductTypeMgmtRepository productTypeMgmtRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;


    @Override
    public void run(String... args) throws Exception {
        // 데이터 초기화 순서 수정
        orderItemRepository.deleteAll();  // 먼저 OrderItem 삭제
        orderRepository.deleteAll();  // 그 다음 주문 삭제
        cartItemRepository.deleteAll(); // 장바구니 아이템 삭제
        cartRepository.deleteAll(); // 장바구니 삭제
        memberRepository.deleteAll();  // 회원 삭제
        productRepository.deleteAll();  // 마지막에 상품 삭제


        // ProductType 저장
        List<ProductTypeMgmt> productTypeMgms = new ArrayList<>();
        for (ProductTypeEnum type : ProductTypeEnum.values()) {
            ProductTypeMgmt productTypeMgmt = new ProductTypeMgmt(type, type.getParentTypeEnum());
            productTypeMgms.add(productTypeMgmt);
        }
        productTypeMgmtRepository.saveAll(productTypeMgms);

        // 기본 데이터 생성
        List<Product> products = new ArrayList<>();
        String githubBaseUrl = "https://raw.githubusercontent.com/AntMouse/dwAcademy/main/ProjectData/dw_shop_app/images/products";

        for (ProductTypeEnum type : ProductTypeEnum.values()) {
            String parentTypePath = type.getParentTypeEnum().name().toLowerCase();
            String typePath = type.name().toLowerCase();
            for (int i = 1; i <= 10; i++) {
                String displayName = type.getDisplayName().toLowerCase().replace(" ", "_");
                String imageName = parentTypePath + "/" + typePath + "/" + displayName + "_" + i + ".jpg";
                String imageUrl = githubBaseUrl + "/" + imageName;

                Product product = Product.builder()
                        .productType(type)
                        .productName(type.getDisplayName() + " - Product " + i)
                        .price(100 * i)
                        .explanation("설명 " + type.getDisplayName() + " - Product " + i)
                        .imageUrl("https://search.pstatic.net/sunny/?src=https%3A%2F%2Fwww.byslim.com%2Fweb%2Fanew%2Fjjh%2F2023%2F12%2F28%2F21_black_10.jpg&type=sc960_832")
                        .createDate(LocalDateTime.now())
                        .build();
                products.add(product);
            }
        }

        productRepository.saveAll(products);

        // 관리자 계정 생성
        MemberDto adminDto = MemberDto.builder()
                .memberType(MemberRoleEnum.ADMIN)
                .memberId("admin")
                .memberName("Admin의 이름")
                .password("1234")
                .birthdate("1980-01-01")
                .gender("Male")
                .email("admin@example.com")
                .build();
        memberService.createAdmin(adminDto);

        // 회원 및 장바구니 생성
        List<Member> members = new ArrayList<>();
        Random random = new Random();
        Set<String> generatedPhoneNumbers = new HashSet<>();

        for (int i = 1; i <= TOTAL_MEMBERS; i++) {
            // 랜덤 연도 (1960~2005)
            int year = random.nextInt(2005 - 1975 + 1) + 1975;

            // 랜덤 월 및 해당 월의 최대 일 계산
            int month = random.nextInt(12) + 1;
            int maxDay = YearMonth.of(year, month).lengthOfMonth();
            int day = random.nextInt(maxDay) + 1;

            // 랜덤 성별 지정
            String gender = random.nextBoolean() ? "Male" : "Female";

            // 랜덤 전화번호 생성 (중복 방지, 형식 유지)
            String phoneNumber;
            do {
                int firstPart = random.nextInt(9000) + 1000; // 4자리 숫자
                int secondPart = random.nextInt(9000) + 1000; // 4자리 숫자
                phoneNumber = "018-" + firstPart + "-" + secondPart;
            } while (generatedPhoneNumbers.contains(phoneNumber));
            generatedPhoneNumbers.add(phoneNumber);

            MemberDto memberDto = MemberDto.builder()
                    .memberType(MemberRoleEnum.USER)
                    .memberId("user" + i)
                    .memberName("User " + i + " 의 이름")
                    .password("1234")
                    .birthdate(year + "-" + String.format("%02d", month) + "-" + String.format("%02d", day))
                    .gender(gender)
                    .email("user" + i + "@example.com")
                    .contact(phoneNumber)
                    .build();
            memberService.signUp(memberDto);
        }

        // 장바구니 생성 (모든 회원이 1개씩 보유)
        List<Cart> carts = cartRepository.findAll();

        // ✅ 주문을 할 회원 랜덤 선택
        List<Member> allMembers = memberRepository.findAll();
        Collections.shuffle(allMembers);
        List<Member> orderingMembers = allMembers.subList(0, ORDERING_MEMBERS_COUNT); // ✅ ORDERING_MEMBERS_COUNT 변수 사용

        // ✅ 장바구니 아이템 생성 (ORDERING_MEMBERS_COUNT 명의 회원만 보유)
        List<CartItem> cartItems = new ArrayList<>();
        Random cartRandom = new Random();
        for (Member member : orderingMembers) {
            Cart cart = cartRepository.findByMember(member).orElse(null);
            if (cart != null) {
                List<Product> shuffledProducts = new ArrayList<>(productRepository.findAll());
                Collections.shuffle(shuffledProducts);

                int cartItemCount = cartRandom.nextInt(20) + 1; // 1~20개 랜덤 설정
                for (int j = 0; j < cartItemCount; j++) {
                    CartItem cartItem = CartItem.builder()
                            .cart(cart)
                            .product(shuffledProducts.get(j))
                            .quantity(cartRandom.nextInt(10) + 1)
                            .build();
                    cartItems.add(cartItem);
                }
            }
        }
        cartItemRepository.saveAll(cartItems);

        // ✅ 주문 생성 (TOTAL_ORDERS 개만)
        List<Order> orders = new ArrayList<>();
        for (Member member : orderingMembers) {
            List<OrderItem> orderItems = new ArrayList<>();
            int totalPrice = 0;
            Cart cart = cartRepository.findByMember(member).orElse(null);
            if (cart != null) {
                for (CartItem cartItem : cartItemRepository.findByCart(cart)) {
                    OrderItem orderItem = OrderItem.builder()
                            .product(cartItem.getProduct())
                            .quantity(cartItem.getQuantity())
                            .price(cartItem.getProduct().getPrice())
                            .build();
                    orderItems.add(orderItem);
                    totalPrice += cartItem.getProduct().getPrice() * cartItem.getQuantity();
                }
                Order order = Order.builder()
                        .member(member)
                        .orderItems(orderItems)
                        .recipientName(member.getMemberName())
                        .contactNumber(member.getContact())
                        .deliveryLocation("주소 " + member.getMemberId())
                        .createDate(LocalDateTime.now())
                        .totalPrice(totalPrice)
                        .status(OrderStatusEnum.PENDING)
                        .build();
                orders.add(order);
            }
        }
        orderRepository.saveAll(orders);
    }
}
