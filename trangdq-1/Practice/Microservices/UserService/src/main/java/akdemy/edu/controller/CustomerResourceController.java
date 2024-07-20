package akdemy.edu.controller;

import akdemy.edu.dto.CustomerDTO;
import akdemy.edu.model.Customer;
import akdemy.edu.service.CustomerResourceService;
import akdemy.edu.share.Response;
import akdemy.edu.share.ResponseBuilder;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
public class CustomerResourceController {
    @Autowired
    private CustomerResourceService customerResourceService;

    @Autowired
    private PasswordEncoder encoder;

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<Response> getCustomerById(@PathVariable long customerId) {
        return ResponseBuilder.get200ResponseWithData("Customer gotten successfully!", customerResourceService.getById(customerId));
    }

    @PutMapping("/customer/{customerId}")
    public ResponseEntity<Response> updateCustomer(@PathVariable long customerId, @Valid @RequestBody CustomerDTO customerDTO) {
        String avatar = customerDTO.getAvatar();
        if (avatar.isEmpty()) avatar = customerResourceService.getById(customerId).getAvatar();
        customerResourceService.update(new Customer(customerId,
                customerDTO.getUsername(),
                customerDTO.getEmail(),
                encoder.encode(customerDTO.getPassword()),
                customerDTO.getName(),
                customerDTO.getAddress(),
                customerDTO.getPhone(),
                customerDTO.getAge(),
                avatar
        ));
        return ResponseBuilder.get200ResponseWithoutData("Change information successfully!");
    }

//    @PostMapping("/customer/avatar-upload/{customerId}")
//    public ResponseEntity<Response> updateCustomerAvatar(@PathVariable long customerId, @RequestParam("file") MultipartFile file) {
//        customerResourceService.changeAvatar(customerId, file);
//        return ResponseBuilder.get200ResponseWithoutData("Change avatar successfully!");
//    }

    @DeleteMapping("/customer/{customerId}")
    public ResponseEntity<Response> deleteCustomer(@PathVariable long customerId) {
        customerResourceService.deleteById(customerId);
        return ResponseBuilder.get204Response("Delete customer successfully!");
    }
}
