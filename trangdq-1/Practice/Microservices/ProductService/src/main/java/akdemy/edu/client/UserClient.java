package akdemy.edu.client;

import akdemy.edu.share.Response;
import akdemy.edu.share.dto.BaseResponseDTO;
import akdemy.edu.share.dto.NewUserDTO;
import jakarta.validation.Valid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

//@FeignClient(value="User-Service", url="http://localhost:8001/")
//@FeignClient(name = "User-Service", configuration = UserClientConfiguration.class)
@FeignClient(name = "Gateway-Service")
public interface UserClient {
    @GetMapping("/admin/user/{userId}")
    ResponseEntity<Response> getUserById(@PathVariable long userId);

    @GetMapping(value = "/user-service/port")
    ResponseEntity<Response> getPort();

    @PostMapping(value = "/user-service/register")
    ResponseEntity<BaseResponseDTO> register(@Valid @RequestBody NewUserDTO newUserDTO);
}