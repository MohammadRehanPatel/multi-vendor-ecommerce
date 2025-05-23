package com.ec.controller;

import com.ec.domain.PaymentMethod;
import com.ec.exception.OrderException;
import com.ec.exception.SellerException;
import com.ec.exception.UserException;
import com.ec.model.*;
import com.ec.repository.PaymentOrderRepository;
import com.ec.response.PaymentLinkResponse;
import com.ec.service.*;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;

    private final CartService cartService;
    private final SellerService sellerService;

    private final SellerReportService sellerReportService;

    private final PaymentService paymentService;
    private final PaymentOrderRepository paymentOrderRepository;


    public OrderController(OrderService orderService, UserService userService, CartService cartService, SellerService sellerService, SellerReportService sellerReportService,
                           PaymentService paymentService, PaymentOrderRepository paymentOrderRepository) {
        this.orderService = orderService;
        this.userService = userService;
        this.cartService = cartService;
        this.sellerService = sellerService;
        this.sellerReportService = sellerReportService;
        this.paymentService = paymentService;
        this.paymentOrderRepository = paymentOrderRepository;
    }

    @PostMapping()
    public ResponseEntity<PaymentLinkResponse> createOrderHandler(
            @RequestBody Address shippingAddress,
            @RequestParam PaymentMethod paymentMethod,
            @RequestHeader("Authorization") String jwt
    ) throws UserException, RazorpayException, StripeException {

        User user = userService.findUserByJwtToken(jwt);
        Cart cart = cartService.findUserCart(user);
        Set<Order> orders = orderService.createOrder(user, shippingAddress, cart);

        PaymentOrder paymentOrder = paymentService.createOrder(user,orders);
        PaymentLinkResponse res = new PaymentLinkResponse();

        if(paymentMethod.equals(PaymentMethod.RAZORPAY)){
            PaymentLink payment = paymentService
                    .createRazorpayPaymentLink(user, paymentOrder.getAmount(), paymentOrder.getId());
            String paymentUrl =payment.get("short_url");
            String paymentUrlId = payment.get("id");

            res.setPayment_link_url(paymentUrl);
            res.setPayment_link_id(paymentUrlId);

            paymentOrderRepository.save(paymentOrder);

        }else{
            String paymentUrl=paymentService
                    .createStripePaymentLink(user, paymentOrder.getAmount(), paymentOrder.getId());
            res.setPayment_link_url(paymentUrl);
        }


        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Order>> userOrderHistoryHandler(
            @RequestHeader("Authorization") String jwt
    ) throws UserException {
        User user = userService.findUserByJwtToken(jwt);
        List<Order> orders = orderService.userOrderHistory(user.getId());
        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt)
            throws UserException, OrderException {
        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.findOrderById(orderId);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @GetMapping("/item/{orderItemId}")
    public ResponseEntity<OrderItem> getOrderItemById(
            @PathVariable Long orderItemId, @RequestHeader("Authorization") String jwt
    ) throws UserException, OrderException {
        User user = userService.findUserByJwtToken(jwt);
        OrderItem orderItem = orderService.getOrderItemById(orderItemId);
        return new ResponseEntity<>(orderItem, HttpStatus.OK);
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<Order> cancelOrder(
            @PathVariable Long orderId, @RequestHeader("Authorization") String jwt
    ) throws UserException, OrderException, SellerException {
        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.cancelOrder(orderId, user);

        Seller seller = sellerService.getSellerById(order.getSellerId());
        SellerReport report = sellerReportService.getSellerReport(seller);

        report.setCancelOrders(report.getCancelOrders() + 1);
        report.setTotalRefund(report.getTotalRefund() + order.getTotalSellingPrice());
        sellerReportService.updateSellerReport(report);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }


}
