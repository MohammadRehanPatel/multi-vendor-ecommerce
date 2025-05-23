package com.ec.model;

import com.ec.domain.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Objects;


public class PaymentDetails {

    private String paymentId;

    private String razorPaymentLinkId;
    private String razorPaymentLinkReferenceId;
    private String razorPaymentLinkStatus;
    private String razorPaymentLinkIdZWSP;
    private PaymentStatus status;

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public String getRazorPaymentLinkId() {
        return razorPaymentLinkId;
    }

    public void setRazorPaymentLinkId(String razorPaymentLinkId) {
        this.razorPaymentLinkId = razorPaymentLinkId;
    }

    public String getRazorPaymentLinkReferenceId() {
        return razorPaymentLinkReferenceId;
    }

    public void setRazorPaymentLinkReferenceId(String razorPaymentLinkReferenceId) {
        this.razorPaymentLinkReferenceId = razorPaymentLinkReferenceId;
    }

    public String getRazorPaymentLinkStatus() {
        return razorPaymentLinkStatus;
    }

    public void setRazorPaymentLinkStatus(String razorPaymentLinkStatus) {
        this.razorPaymentLinkStatus = razorPaymentLinkStatus;
    }

    public String getRazorPaymentLinkIdZWSP() {
        return razorPaymentLinkIdZWSP;
    }

    public void setRazorPaymentLinkIdZWSP(String razorPaymentLinkIdZWSP) {
        this.razorPaymentLinkIdZWSP = razorPaymentLinkIdZWSP;
    }

    public PaymentStatus getStatus() {
        return status;
    }

    public void setStatus(PaymentStatus status) {
        this.status = status;
    }

    public PaymentDetails() {
    }

    public PaymentDetails(String paymentId, String razorPaymentLinkId, String razorPaymentLinkReferenceId,
                          String razorPaymentLinkStatus, String razorPaymentLinkIdZWSP, PaymentStatus status) {
        this.paymentId = paymentId;
        this.razorPaymentLinkId = razorPaymentLinkId;
        this.razorPaymentLinkReferenceId = razorPaymentLinkReferenceId;
        this.razorPaymentLinkStatus = razorPaymentLinkStatus;
        this.razorPaymentLinkIdZWSP = razorPaymentLinkIdZWSP;
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        PaymentDetails that = (PaymentDetails) o;
        return Objects.equals(paymentId, that.paymentId) && Objects.equals(razorPaymentLinkId, that.razorPaymentLinkId) && Objects.equals(razorPaymentLinkReferenceId, that.razorPaymentLinkReferenceId) && Objects.equals(razorPaymentLinkStatus, that.razorPaymentLinkStatus) && Objects.equals(razorPaymentLinkIdZWSP, that.razorPaymentLinkIdZWSP) && status == that.status;
    }

    @Override
    public int hashCode() {
        return Objects.hash(paymentId, razorPaymentLinkId, razorPaymentLinkReferenceId, razorPaymentLinkStatus, razorPaymentLinkIdZWSP, status);
    }
}
