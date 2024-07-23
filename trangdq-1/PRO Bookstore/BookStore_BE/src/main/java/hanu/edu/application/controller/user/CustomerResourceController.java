package hanu.edu.application.controller.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hanu.edu.application.dto.CustomerDTO;
import hanu.edu.application.service.user.CustomerResourceService;
import hanu.edu.application.service.user.UserResourceService;
import hanu.edu.application.share.Response;
import hanu.edu.application.share.ResponseBuilder;
import hanu.edu.domain.model.user.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
public class CustomerResourceController {

    @Autowired
    private CustomerResourceService customerResourceService;

    @Autowired
    private UserResourceService userResourceService;

    @Autowired
    private PasswordEncoder encoder;

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<Response> getCustomerById(@PathVariable long customerId) {
        return ResponseBuilder.get200ResponseWithData("Customer gotten successfully!", customerResourceService.getById(customerId));
    }

    @PutMapping(value = "/customer/{customerId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Response> updateCustomer(@PathVariable long customerId, @RequestParam("info") String customerInfo, @RequestParam(value = "file", required = false) MultipartFile file) throws JsonProcessingException {
        CustomerDTO customerDTO = new ObjectMapper().readValue(customerInfo, CustomerDTO.class);
        Customer customerFromDB = null;
        if (ObjectUtils.isEmpty(file) || customerDTO.getPassword().trim().isEmpty()) {
            customerFromDB = customerResourceService.getById(customerId);
        }
        String avatar;
        if (ObjectUtils.isEmpty(file) && customerFromDB != null) {
            avatar = customerFromDB.getAvatar();
        } else {
            avatar = userResourceService.uploadImageToCloudinary(file);
        }
        if (customerDTO.getPassword().trim().isEmpty() && customerFromDB != null) {
            customerDTO.setPassword(customerFromDB.getPassword());
        } else {
            customerDTO.setPassword(encoder.encode(customerDTO.getPassword()));
        }
        customerResourceService.update(new Customer(
                customerId,
                customerDTO.getUsername(),
                customerDTO.getEmail(),
                customerDTO.getPassword(),
                customerDTO.getName(),
                customerDTO.getAddress(),
                customerDTO.getPhone(),
                customerDTO.getAge(),
                avatar));
        return ResponseBuilder.get200ResponseWithoutData("Change information successfully!");
    }

    @DeleteMapping("/customer/{customerId}")
    public ResponseEntity<Response> deleteCustomer(@PathVariable long customerId) {
        customerResourceService.deleteById(customerId);
        return ResponseBuilder.get204Response("Delete customer successfully!");
    }
}
