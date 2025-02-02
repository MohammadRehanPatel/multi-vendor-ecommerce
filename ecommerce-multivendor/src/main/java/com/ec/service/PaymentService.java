package com.ec.service;

import com.ec.exception.PaymentException;
import com.ec.model.Order;
import com.ec.model.PaymentOrder;
import com.ec.model.User;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;

import java.util.Set;

public interface PaymentService {

    PaymentOrder createOrder(User user, Set<Order> orders);

    PaymentOrder getPaymentOrderById(Long orderId ) throws PaymentException;

    PaymentOrder getPaymentOrderByPaymentId(String paymentId) throws PaymentException;
    Boolean proceedPaymentOrder(PaymentOrder paymentOrder,String paymentId,String paymentLinkId) throws RazorpayException;

    PaymentLink createRazorpayPaymentLink(User user,Long amount,Long orderId) throws RazorpayException;
    String createStripePaymentLink(User user,Long amount,Long orderId) throws StripeException;


}
