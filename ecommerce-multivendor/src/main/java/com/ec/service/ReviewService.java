package com.ec.service;

import com.ec.exception.ReviewException;
import com.ec.model.Product;
import com.ec.model.Review;
import com.ec.model.User;
import com.ec.request.CreateReviewRequest;

import java.util.List;

public interface ReviewService {

    Review createReview(CreateReviewRequest review, User user, Product product);
    List<Review> getReviewByProductId(Long productId);

    Review updateReview(Long reviewId,String reviewText,double rating,Long userId) throws ReviewException;
    void deleteReview(Long reviewId,Long userId) throws ReviewException;

    Review getReviewById(Long reviewId) throws ReviewException;

}
