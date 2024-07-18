package hanu.edu.infrastructure.security.service;

import hanu.edu.application.service.shopping_cart.ItemResourceShoppingCartService;
import hanu.edu.application.service.user.CustomerResourceService;
import hanu.edu.application.service.user.UserResourceService;
import hanu.edu.domain.model.shopping_cart.ShoppingCart;
import hanu.edu.domain.model.user.Customer;
import hanu.edu.domain.model.user.User;
import hanu.edu.infrastructure.security.dto.BaseResponseDTO;
import hanu.edu.infrastructure.security.dto.NewUserDTO;
import hanu.edu.infrastructure.security.exception.BaseException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

@Service
@RequiredArgsConstructor
public class SecurityServiceImpl implements SecurityService {
    @Autowired
    private CustomerResourceService customerResourceService;
    @Autowired
    private UserResourceService userResourceService;
    @Autowired
    private ItemResourceShoppingCartService shoppingCartService;
    @Autowired
    private PasswordEncoder encoder;

    @Override
    public BaseResponseDTO registerAccount(NewUserDTO newUserDTO) {
        BaseResponseDTO response = new BaseResponseDTO();
        validateAccount(newUserDTO);
        Customer customer = insertUser(newUserDTO);
        try {
            // create user
            customerResourceService.create(customer);
            // create user's cart
            Customer customerFromDB = customerResourceService.getByEmail(customer.getEmail());
            shoppingCartService.addShoppingCart(new ShoppingCart(customerFromDB.getId(), null));
            response.setCode(String.valueOf(HttpStatus.CREATED.value()));
            response.setMessage("Register account successfully!");
            // lost connection :v
        } catch (Exception e) {
            response.setCode(String.valueOf(HttpStatus.SERVICE_UNAVAILABLE.value()));
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
        customer.setAvatar("/account.jpg");
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

    @Override
    @Transactional
    public void generateUsersRoles() {
        // Test admin
    }
}