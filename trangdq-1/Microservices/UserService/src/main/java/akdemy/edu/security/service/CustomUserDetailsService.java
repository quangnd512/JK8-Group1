package akdemy.edu.security.service;

import akdemy.edu.model.User;
import akdemy.edu.service.UserResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserResourceService userResourceService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userResourceService.getByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found!");
        }
        return user;
    }
}