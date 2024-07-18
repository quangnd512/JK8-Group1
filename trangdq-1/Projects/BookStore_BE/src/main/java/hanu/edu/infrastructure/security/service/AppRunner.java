package hanu.edu.infrastructure.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AppRunner implements CommandLineRunner {
    @Autowired
    private SecurityService securityService;

    @Override
    /**
     * @effects create admin if he hasn't existed
     */
    public void run(String... args) {
        securityService.generateUsersRoles();
    }
}