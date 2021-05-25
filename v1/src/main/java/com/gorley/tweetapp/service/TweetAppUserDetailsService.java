package com.gorley.tweetapp.service;

import com.gorley.tweetapp.Repo.UserRepo;
import com.gorley.tweetapp.model.JwtRequest;
import com.gorley.tweetapp.model.TweetUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class TweetAppUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private PasswordEncoder bycrypt;

    public String registerUser(final TweetUser userInfo) throws RuntimeException {
        if (userRepository.findByLoginId(userInfo.getLoginId()).isPresent()) {
            throw new RuntimeException("Login Id already exists");
        } else if (userRepository.findByEmailId(userInfo.getEmailId()).isPresent()) {
            throw new RuntimeException("email Id already exists");
        } else if (userRepository.findByContactNumber(userInfo.getContactNumber()).isPresent()) {
            throw new RuntimeException("contact number already exists");
        } else {
            userInfo.setPassword(bycrypt.encode(userInfo.getPassword()));
            userRepository.saveUser(userInfo);
            return "User created successfully";
        }
    }

    public String updateUser(final JwtRequest userInfo) {
        Optional<TweetUser> user = userRepository.findByLoginId(userInfo.getLoginId());
        if(user.isPresent()) {
            userInfo.setPassword(bycrypt.encode(userInfo.getPassword()));
            userRepository.updatePassword(userInfo);
            return "Password updated successfully";
        }
        throw new UsernameNotFoundException(userInfo.getLoginId() + " not found");
    }

    @Override
    public UserDetails loadUserByUsername(final String loginId) throws UsernameNotFoundException {
        Optional<TweetUser> user = userRepository.findByLoginId(loginId);
        if (user.isPresent()) {
            return new User(user.get().getLoginId(),user.get().getPassword(),new ArrayList<>());
        } else {
            throw new UsernameNotFoundException("user not found");
        }
    }
}
