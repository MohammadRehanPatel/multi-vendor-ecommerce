package com.ec.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


public class BusinessDetails {

    private String businessName;
    private String businessEmail;
    private String businessMobile;
    private String businessAddress;
    private String logo;
    private String banner;

    public BusinessDetails() {
    }

    public BusinessDetails(String businessName, String businessEmail, String businessMobile, String businessAddress, String logo, String banner) {
        this.businessName = businessName;
        this.businessEmail = businessEmail;
        this.businessMobile = businessMobile;
        this.businessAddress = businessAddress;
        this.logo = logo;
        this.banner = banner;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getBusinessEmail() {
        return businessEmail;
    }

    public void setBusinessEmail(String businessEmail) {
        this.businessEmail = businessEmail;
    }

    public String getBusinessMobile() {
        return businessMobile;
    }

    public void setBusinessMobile(String businessMobile) {
        this.businessMobile = businessMobile;
    }

    public String getBusinessAddress() {
        return businessAddress;
    }

    public void setBusinessAddress(String businessAddress) {
        this.businessAddress = businessAddress;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getBanner() {
        return banner;
    }

    public void setBanner(String banner) {
        this.banner = banner;
    }
}
