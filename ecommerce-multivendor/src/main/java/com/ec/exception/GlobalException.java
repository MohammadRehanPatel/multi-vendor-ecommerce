package com.ec.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalException {


    @ExceptionHandler(SellerException.class)
    public ResponseEntity<ErrorDetails> sellerExceptionHandler(SellerException e, WebRequest req){
        ErrorDetails errorDetails = new ErrorDetails();
        errorDetails.setError(e.getMessage());
        errorDetails.setDetails(req.getDescription(false));
        errorDetails.setTimestamp(LocalDateTime.now());

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ProductException.class)
    public ResponseEntity<ErrorDetails> productExceptionHandler(ProductException e, WebRequest req){
        ErrorDetails errorDetails = new ErrorDetails();
        errorDetails.setError(e.getMessage());
        errorDetails.setDetails(req.getDescription(false));
        errorDetails.setTimestamp(LocalDateTime.now());

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserException.class)
    public ResponseEntity<ErrorDetails> userExceptionHandler(UserException e, WebRequest req){
        ErrorDetails errorDetails = new ErrorDetails();
        errorDetails.setError(e.getMessage());
        errorDetails.setDetails(req.getDescription(false));
        errorDetails.setTimestamp(LocalDateTime.now());

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(OrderException.class)
    public ResponseEntity<ErrorDetails> orderExceptionHandler(OrderException e, WebRequest req){
        ErrorDetails errorDetails = new ErrorDetails();
        errorDetails.setError(e.getMessage());
        errorDetails.setDetails(req.getDescription(false));
        errorDetails.setTimestamp(LocalDateTime.now());

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PaymentException.class)
    public ResponseEntity<ErrorDetails> paymentExceptionHandler(PaymentException e, WebRequest req){
        ErrorDetails errorDetails = new ErrorDetails();
        errorDetails.setError(e.getMessage());
        errorDetails.setDetails(req.getDescription(false));
        errorDetails.setTimestamp(LocalDateTime.now());

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(ReviewException.class)
    public ResponseEntity<ErrorDetails> reviewExceptionHandler(ReviewException e, WebRequest req){
        ErrorDetails errorDetails = new ErrorDetails();
        errorDetails.setError(e.getMessage());
        errorDetails.setDetails(req.getDescription(false));
        errorDetails.setTimestamp(LocalDateTime.now());

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(CouponException.class)
    public ResponseEntity<ErrorDetails> couponExceptionHandler(CouponException e, WebRequest req){
        ErrorDetails errorDetails = new ErrorDetails();
        errorDetails.setError(e.getMessage());
        errorDetails.setDetails(req.getDescription(false));
        errorDetails.setTimestamp(LocalDateTime.now());

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(HomeCategoryException.class)
    public ResponseEntity<ErrorDetails> couponExceptionHandler(HomeCategoryException e, WebRequest req){
        ErrorDetails errorDetails = new ErrorDetails();
        errorDetails.setError(e.getMessage());
        errorDetails.setDetails(req.getDescription(false));
        errorDetails.setTimestamp(LocalDateTime.now());

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }
  @ExceptionHandler(DealException.class)
    public ResponseEntity<ErrorDetails> dealExceptionHandler(DealException e, WebRequest req){
        ErrorDetails errorDetails = new ErrorDetails();
        errorDetails.setError(e.getMessage());
        errorDetails.setDetails(req.getDescription(false));
        errorDetails.setTimestamp(LocalDateTime.now());

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }



}
