package com.ec.service.impl;

import com.ec.domain.USER_ROLE;
import com.ec.model.User;
import com.ec.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitialization implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitialization(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        initilizeAdminUser();
    }

    private void initilizeAdminUser() {
        String adminUserName = "en20ca301008@medicaps.ac.in";

        if(userRepository.findByEmail(adminUserName)==null){
            User adminUser = new User();
            adminUser.setPassword(passwordEncoder.encode("vendora@123"));
            adminUser.setFullName("Rehan");
            adminUser.setEmail(adminUserName);
            adminUser.setRole(USER_ROLE.ROLE_ADMIN);

             userRepository.save(adminUser);
        }
    }
}
