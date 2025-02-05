package com.ec.service.impl;

import com.ec.exception.ReviewException;
import com.ec.model.Product;
import com.ec.model.Review;
import com.ec.model.User;
import com.ec.repository.ReviewRepository;
import com.ec.request.CreateReviewRequest;
import com.ec.service.ReviewService;
import com.ec.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public Review createReview(CreateReviewRequest req, User user, Product product) {
        Review review= new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setReviewText(req.getReviewText());
        review.setRating(req.getReviewRating());
        review.setProductImages(req.getProductImage());
        product.getReviews().add(review);
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getReviewByProductId(Long productId) {
        return reviewRepository.findByProductId(productId);
    }

    @Override
    public Review updateReview(Long reviewId, String reviewText, double rating, Long userId) throws ReviewException {
        Review review = getReviewById(reviewId);
        if(review.getUser().getId().equals(userId)){
            review.setReviewText(reviewText);
            review.setRating(rating);
            return reviewRepository.save(review);
        }
        throw new ReviewException("You can't update this review");
    }

    @Override
    public void deleteReview(Long reviewId, Long userId) throws ReviewException {
        Review review = getReviewById(reviewId);
        if(review.getUser().getId().equals(userId)){
            throw new ReviewException("You Can't Delete this Review");
        }
            reviewRepository.delete(review);

    }

    @Override
    public Review getReviewById(Long reviewId) throws ReviewException {
        return reviewRepository.findById(reviewId).orElseThrow(()->new ReviewException("Review not found"));
    }
}
