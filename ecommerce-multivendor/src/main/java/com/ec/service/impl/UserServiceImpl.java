package com.ec.service.impl;

import com.ec.config.JwtProvider;
import com.ec.exception.UserException;
import com.ec.model.User;
import com.ec.repository.UserRepository;
import com.ec.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtProvider  jwtProvider;

    public UserServiceImpl(UserRepository userRepository, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public User findUserByJwtToken(String jwt) throws UserException {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        return this.findUserByEmail(email);

    }

    @Override
    public User findUserByEmail(String email) throws UserException {

        User user = userRepository.findByEmail(email);
        if(user==null){
            throw new UserException("user not found with email "+ email);
        }
        return user;
    }
}
