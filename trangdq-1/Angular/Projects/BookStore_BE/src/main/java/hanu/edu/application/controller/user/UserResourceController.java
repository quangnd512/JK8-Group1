package hanu.edu.application.controller.user;

import hanu.edu.application.dto.UserDTO;
import hanu.edu.application.service.shopping_cart.ItemResourceShoppingCartService;
import hanu.edu.application.service.user.UserResourceService;
import hanu.edu.application.share.Response;
import hanu.edu.application.share.ResponseCustomBuilder;
import hanu.edu.domain.model.user.User;
import hanu.edu.infrastructure.security.dto.BaseResponseDTO;
import hanu.edu.infrastructure.security.dto.NewUserDTO;
import hanu.edu.infrastructure.security.service.SecurityService;
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
    @Autowired
    private ItemResourceShoppingCartService shoppingCartService;
    @Autowired
    private PasswordEncoder encoder;

    @GetMapping({"/admin/users/{pageNo}", "/admin/users"})
    public ResponseEntity<Response> getUsers(@PathVariable(name = "pageNo") Optional<Integer> pageNo) {
        return ResponseCustomBuilder.get200ResponseWithData("Fetch users successfully!", userResourceService.getAllByPage(pageNo.orElse(0), 20));
    }

    @GetMapping("/admin/user/{userId}")
    public ResponseEntity<Response> getUserById(@PathVariable long userId) {
        return ResponseCustomBuilder.get200ResponseWithData("Fetch user successfully!", userResourceService.getById(userId));
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
        return ResponseCustomBuilder.get200ResponseWithoutData("Change information successfully!");
    }

    @DeleteMapping("/admin/user/{userId}")
    public ResponseEntity<Response> deleteUser(@PathVariable long userId) {
//        shoppingCartService.deleteShoppingCart(userId);
        userResourceService.deleteById(userId);
        return ResponseCustomBuilder.get204Response("Delete user successfully!");
    }
}
