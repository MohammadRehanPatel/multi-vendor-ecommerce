package com.ec.service;

import com.ec.model.User;

public interface UserService {

    public User findUserByJwtToken(String token) throws Exception;

    User findUserByEmail(String email) throws Exception;


}
