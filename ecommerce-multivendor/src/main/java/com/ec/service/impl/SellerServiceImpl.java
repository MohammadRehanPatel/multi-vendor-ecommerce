package com.ec.service.impl;

import com.ec.config.JwtProvider;
import com.ec.domain.AccountStatus;
import com.ec.domain.USER_ROLE;
import com.ec.exception.SellerException;
import com.ec.model.Address;
import com.ec.model.Seller;
import com.ec.repository.AddressRepository;
import com.ec.repository.SellerRepository;
import com.ec.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SellerServiceImpl implements SellerService {

    private  SellerRepository sellerRepository;
    private JwtProvider jwtProvider;
    private AddressRepository addressRepository;
    private PasswordEncoder passwordEncoder;

    public SellerServiceImpl(SellerRepository sellerRepository, JwtProvider jwtProvider,
                             AddressRepository addressRepository, PasswordEncoder passwordEncoder) {
        this.sellerRepository = sellerRepository;
        this.jwtProvider = jwtProvider;
        this.addressRepository = addressRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Seller getSellerProfile(String jwt) throws SellerException {
        String email = jwtProvider.getEmailFromJwtToken(jwt);

        return this.getSellerByEmail(email);
    }

    @Override
    public Seller createSeller(Seller seller) throws SellerException {
        Seller sellerExist =sellerRepository.findByEmail(seller.getEmail());
        if(sellerExist!=null){
            throw new SellerException("Seller already exists");
        }
        Address savedAddress = addressRepository.save(seller.getPickupAddress());
        Seller newSeller = new Seller();
        newSeller.setEmail(seller.getEmail());
        newSeller.setSellerName(seller.getSellerName());
        newSeller.setPassword(passwordEncoder.encode(seller.getPassword()));
        newSeller.setMobile(seller.getMobile());
        newSeller.setPickupAddress(savedAddress);
        newSeller.setGSTIN(seller.getGSTIN());
        newSeller.setRole(USER_ROLE.ROLE_SELLER);
        newSeller.setBankDetails(seller.getBankDetails());
        newSeller.setBusinessDetails(seller.getBusinessDetails());


        return sellerRepository.save(newSeller);
    }

    @Override
    public Seller getSellerById(Long id) throws SellerException {
        return sellerRepository.findById(id).orElseThrow(()->new SellerException("seller not found with id : "+id));
    }

    @Override
    public Seller getSellerByEmail(String email) throws SellerException {
        Seller seller = sellerRepository.findByEmail(email);

        if(seller==null){
            throw new SellerException("Seller not found with email "+email);
        }
        return seller;
    }

    @Override
    public List<Seller> getAllSellers(AccountStatus status) {
        return sellerRepository.findByAccountStatus(status);
    }

    @Override
    public Seller updateSeller(Long id, Seller seller) throws SellerException {
        Seller existingSeller = this.getSellerById(id);

        if(seller.getSellerName() != null){
            existingSeller.setSellerName(seller.getSellerName());
        }
        if(seller.getMobile() != null){
            existingSeller.setMobile(seller.getMobile());
        }
        if(seller.getEmail() != null){
            existingSeller.setEmail(seller.getEmail());
        }
        if(seller.getBusinessDetails() != null){
            existingSeller.setBusinessDetails(seller.getBusinessDetails());
        }
        if(seller.getSellerName() != null && seller.getBusinessDetails().getBusinessName() !=null){
            existingSeller.getBusinessDetails().setBusinessName(
                    seller.getBusinessDetails().getBusinessName()
            );
        }
        if(
                seller.getBankDetails() !=null
                && seller.getBankDetails().getAccountHolderName() != null
                && seller.getBankDetails().getIfscCode() != null
                && seller.getBankDetails().getAccountNumber() != null
        ){
            existingSeller.getBankDetails()
                    .setAccountHolderName(seller.getBankDetails().getAccountHolderName());
            existingSeller.getBankDetails()
                    .setAccountNumber(seller.getBankDetails().getAccountNumber());
            existingSeller.getBankDetails()
                    .setIfscCode(seller.getBankDetails().getIfscCode());
            if(seller.getPickupAddress()!=null
            && seller.getPickupAddress().getAddress() !=null
            && seller.getPickupAddress().getMobile() !=null
            && seller.getPickupAddress().getCity() !=null
            && seller.getPickupAddress().getState() !=null
            && seller.getPickupAddress().getPinCode() !=null
            ){
                existingSeller.getPickupAddress().setAddress(seller.getPickupAddress().getAddress());
                existingSeller.getPickupAddress().setMobile(seller.getPickupAddress().getMobile());
                existingSeller.getPickupAddress().setCity(seller.getPickupAddress().getCity());
                existingSeller.getPickupAddress().setState(seller.getPickupAddress().getState());
                existingSeller.getPickupAddress().setPinCode(seller.getPickupAddress().getPinCode());

            }
            if(seller.getGSTIN()!=null){
                existingSeller.setGSTIN(seller.getGSTIN());
            }
        }
        return sellerRepository.save(existingSeller);
    }

    @Override
    public void deleteSeller(Long id) throws SellerException {
        Seller seller = getSellerById(id);
        sellerRepository.delete(seller);
    }

    @Override
    public Seller verifyEmail(String email, String otp) throws SellerException {
        Seller seller = getSellerByEmail(email);
        seller.setEmailVerified(true);

        return sellerRepository.save(seller);
    }

    @Override
    public Seller updateSellerAccountStatus(Long sellerId, AccountStatus status) throws SellerException {
        Seller seller = getSellerById(sellerId);
        seller.setAccountStatus(status);

        return sellerRepository.save(seller);
    }
}
