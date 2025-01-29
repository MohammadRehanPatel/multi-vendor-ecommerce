package com.ec.service;

import com.ec.domain.OrderStatus;
import com.ec.exception.OrderException;
import com.ec.model.*;

import java.util.List;
import java.util.Set;

public interface OrderService {

    Set<Order> createOrder(User user, Address shippingaddress, Cart cart);

    Order findOrderById(long id) throws OrderException;

    List<Order> userOrderHistory(Long userId);

    List<Order> sellersOrder(Long sellerId);


    Order updateOrderStatus(Long orderId, OrderStatus orderStatus) throws OrderException;

    Order cancelOrder(Long orderId, User user) throws OrderException;

    OrderItem getOrderItemById(Long id) throws OrderException;

}
