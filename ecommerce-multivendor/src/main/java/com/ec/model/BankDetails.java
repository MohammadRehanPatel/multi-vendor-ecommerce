package com.ec.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode
public class BankDetails {

    private String accountNumber;
    private String accountHolderName;

    private String ifscCode;

    public BankDetails(String accountNumber, String accountHolderName, String ifscCode) {
        this.accountNumber = accountNumber;
        this.accountHolderName = accountHolderName;
        this.ifscCode = ifscCode;
    }

    public BankDetails() {
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getAccountHolderName() {
        return accountHolderName;
    }

    public void setAccountHolderName(String accountHolderName) {
        this.accountHolderName = accountHolderName;
    }

    public String getIfscCode() {
        return ifscCode;
    }

    public void setIfscCode(String ifscCode) {
        this.ifscCode = ifscCode;
    }
}
