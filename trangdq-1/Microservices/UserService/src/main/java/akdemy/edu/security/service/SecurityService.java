package akdemy.edu.security.service;

//import akdemy.edu.service.ItemResourceShoppingCartService;

import akdemy.edu.model.Customer;
import akdemy.edu.model.User;
import akdemy.edu.security.dto.BaseResponseDTO;
import akdemy.edu.security.dto.NewUserDTO;
import akdemy.edu.security.exception.BaseException;
import akdemy.edu.service.CustomerResourceService;
import akdemy.edu.service.UserResourceService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

@Service
@RequiredArgsConstructor
public class SecurityService {
    @Autowired
    private CustomerResourceService customerResourceService;
    @Autowired
    private UserResourceService userResourceService;
    //    @Autowired
//    private ItemResourceShoppingCartService shoppingCartService;
    @Autowired
    private PasswordEncoder encoder;

    public BaseResponseDTO registerAccount(NewUserDTO newUserDTO) {
        BaseResponseDTO response = new BaseResponseDTO();
        validateAccount(newUserDTO);
        Customer customer = insertUser(newUserDTO);
        try {
            // create user
            customerResourceService.create(customer);
            // create user's cart
            Customer customerFromDB = customerResourceService.getByEmail(customer.getEmail());
//            shoppingCartService.addShoppingCart(new ShoppingCart(customerFromDB.getId(), null));
            response.setStatus(String.valueOf(HttpStatus.CREATED.value()));
            response.setMessage("Register account successfully!");
            // lost connection :v
        } catch (Exception e) {
            response.setStatus(String.valueOf(HttpStatus.SERVICE_UNAVAILABLE.value()));
            response.setMessage("Service unavailable!");
        }
        return response;
    }

    private Customer insertUser(NewUserDTO newUserDTO) {
        Customer customer = new Customer();
        customer.setUsername(newUserDTO.getUsername());
        customer.setPassword(encoder.encode(newUserDTO.getPassword()));
        customer.setEmail(newUserDTO.getEmail());
        customer.setRole("ROLE_CUSTOMER");
        customer.setEnabled(true);
        customer.setAvatar("/assets/account.jpg");
        return customer;
    }

    private void validateAccount(NewUserDTO newUserDTO) {
        // check if request is empty or null
        try {
            if (ObjectUtils.isEmpty(newUserDTO) || !ObjectUtils.isEmpty(newUserDTO.checkProperties())) {
                throw new BaseException(String.valueOf(HttpStatus.BAD_REQUEST.value()), "Request data not found!");
            }
        } catch (IllegalAccessException e) {
            throw new BaseException(String.valueOf(HttpStatus.SERVICE_UNAVAILABLE.value()), "Service unavailable!!");
        }
        User user = userResourceService.getByUsername(newUserDTO.getUsername());
        // check if user exists
        if (user != null) {
            throw new BaseException(String.valueOf(HttpStatus.BAD_REQUEST.value()), "User has existed!");
        }
    }

    @Transactional
    public void generateUsersRoles() {
        // Test admin
//        customerResourceService.create(new Customer("test_admin", "admin@gmail.com", "ASDFGHJK"));
//        userResourceService.update(new User(1,"test_admin", "admin@gmail.com", encoder.encode("ASDFGHJK"), "Belemon", "Hanoi", "0123456789", 22, "", true, "ROLE_ADMIN"));

    }
}