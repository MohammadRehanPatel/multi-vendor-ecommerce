package com.ec.service;

import com.ec.exception.UserException;
import com.ec.model.User;

public interface UserService {

    public User findUserByJwtToken(String token) throws UserException;

    User findUserByEmail(String email) throws Exception;


}
