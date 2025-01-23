package com.ec.model;

import com.ec.domain.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class PaymentDetails {

    private String paymentId;

    private String razorPaymentLinkId;
    private String razorPaymentLinkReferenceId;
    private String razorPaymentLinkStatus;
    private String razorPaymentLinkIdZWSP;
    private PaymentStatus status;


}
