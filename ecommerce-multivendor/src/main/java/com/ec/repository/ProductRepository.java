package com.ec.repository;

import com.ec.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> , JpaSpecificationExecutor<Product> {
    List<Product> findBySellerId(Long id);

    @Query( "select p from Product p where (:query is null or lower(p.title)" +
            "like lower(concat('%' ,:query,'%')  ))" +
            "or (:query is null or  lower(p.category.name) "+
            "like lower(concat('%',:query,'%') )) "
            )
    List<Product> searchProduct(@Param("query") String query);
}
