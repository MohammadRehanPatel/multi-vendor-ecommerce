package com.ec.service;

import com.ec.model.Order;
import com.ec.model.Seller;
import com.ec.model.Transaction;

import java.util.List;

public interface TransactionService {

    Transaction createTransaction(Order order);

    List<Transaction> getTransactionsBySellerId(Seller seller);
    List<Transaction> getAllTransactions();

}
