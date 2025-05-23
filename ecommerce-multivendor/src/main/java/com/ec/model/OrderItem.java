package com.ec.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Objects;


@Entity
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonIgnore
    @ManyToOne
    private Order order;

    @ManyToOne
    private Product product;

    private String size;

    private int quantity;

    private Integer mrpPrice;

    private Integer sellingPrice;

    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Integer getMrpPrice() {
        return mrpPrice;
    }

    public void setMrpPrice(Integer mrpPrice) {
        this.mrpPrice = mrpPrice;
    }

    public Integer getSellingPrice() {
        return sellingPrice;
    }

    public void setSellingPrice(Integer sellingPrice) {
        this.sellingPrice = sellingPrice;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public OrderItem() {
    }

    public OrderItem(Long id, Order order, Product product, String size, int quantity, Integer mrpPrice, Integer sellingPrice, Long userId) {
        this.id = id;
        this.order = order;
        this.product = product;
        this.size = size;
        this.quantity = quantity;
        this.mrpPrice = mrpPrice;
        this.sellingPrice = sellingPrice;
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        OrderItem orderItem = (OrderItem) o;
        return quantity == orderItem.quantity && Objects.equals(id, orderItem.id) && Objects.equals(order, orderItem.order) && Objects.equals(product, orderItem.product) && Objects.equals(size, orderItem.size) && Objects.equals(mrpPrice, orderItem.mrpPrice) && Objects.equals(sellingPrice, orderItem.sellingPrice) && Objects.equals(userId, orderItem.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, order, product, size, quantity, mrpPrice, sellingPrice, userId);
    }
}
