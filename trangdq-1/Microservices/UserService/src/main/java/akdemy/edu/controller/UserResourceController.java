package akdemy.edu.controller;

import akdemy.edu.dto.UserDTO;
import akdemy.edu.model.User;
import akdemy.edu.security.dto.BaseResponseDTO;
import akdemy.edu.security.dto.NewUserDTO;
import akdemy.edu.security.service.SecurityService;
import akdemy.edu.service.UserResourceService;
import akdemy.edu.share.Response;
import akdemy.edu.share.ResponseBuilder;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
public class UserResourceController {
    @Autowired
    private UserResourceService userResourceService;
    @Autowired
    private SecurityService securityService;
    //    @Autowired
//    private ItemResourceShoppingCartService shoppingCartService;
    @Autowired
    private PasswordEncoder encoder;

    @GetMapping({"/admin/users/{pageNo}", "/admin/users"})
    public ResponseEntity<Response> getUsers(@PathVariable(name = "pageNo") Optional<Integer> pageNo) {
        return ResponseBuilder.get200ResponseWithData("Fetch users successfully!", userResourceService.getAllByPage(pageNo.orElse(0), 20));
    }

    @GetMapping("/admin/user/{userId}")
    public ResponseEntity<Response> getUserById(@PathVariable long userId) {
        return ResponseBuilder.get200ResponseWithData("Fetch user successfully!", userResourceService.getById(userId));
    }

    @PostMapping("/admin/user")
    public ResponseEntity<BaseResponseDTO> createUser(@Valid @RequestBody NewUserDTO newUserDTO) {
        return ResponseEntity.ok(securityService.registerAccount(newUserDTO));
    }

    @PutMapping("/admin/user/{userId}")
    public ResponseEntity<Response> updateUser(@PathVariable long userId, @Valid @RequestBody UserDTO user) {
        User userFromDB = userResourceService.getById(userId);
        if (user.getAvatar().trim().isEmpty() && userFromDB != null) {
            user.setAvatar(userFromDB.getAvatar());
        }

        if (user.getPassword().trim().isEmpty() && userFromDB != null) {
            user.setPassword(userFromDB.getPassword());
        } else {
            user.setPassword(encoder.encode(user.getPassword()));
        }
        userResourceService.update(new User(
                userId,
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getName(),
                user.getAddress(),
                user.getPhone(),
                user.getAge(),
                user.getAvatar(),
                true,
                user.getRole()));
        return ResponseBuilder.get200ResponseWithoutData("Change information successfully!");
    }

    @DeleteMapping("/admin/user/{userId}")
    public ResponseEntity<Response> deleteUser(@PathVariable long userId) {
//        shoppingCartService.deleteShoppingCart(userId);
        userResourceService.deleteById(userId);
        return ResponseBuilder.get204Response("Delete user successfully!");
    }
}
