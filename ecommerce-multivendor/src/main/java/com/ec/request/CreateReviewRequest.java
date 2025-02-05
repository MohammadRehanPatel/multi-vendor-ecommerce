package com.ec.request;

import java.util.List;

public class CreateReviewRequest {

    private String reviewText;
    private double reviewRating;
    private List<String> productImage;

    public CreateReviewRequest() {
    }

    public CreateReviewRequest(String reviewText, double reviewRating, List<String> productImage) {
        this.reviewText = reviewText;
        this.reviewRating = reviewRating;
        this.productImage = productImage;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public double getReviewRating() {
        return reviewRating;
    }

    public void setReviewRating(double reviewRating) {
        this.reviewRating = reviewRating;
    }

    public List<String> getProductImage() {
        return productImage;
    }

    public void setProductImage(List<String> productImage) {
        this.productImage = productImage;
    }
}
