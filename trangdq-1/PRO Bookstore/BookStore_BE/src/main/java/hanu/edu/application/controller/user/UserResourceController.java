package hanu.edu.application.controller.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hanu.edu.application.dto.UserDTO;
import hanu.edu.application.service.shopping_cart.ItemResourceShoppingCartService;
import hanu.edu.application.service.user.UserResourceService;
import hanu.edu.application.share.Response;
import hanu.edu.application.share.ResponseBuilder;
import hanu.edu.domain.model.user.User;
import hanu.edu.infrastructure.security.dto.BaseResponseDTO;
import hanu.edu.infrastructure.security.dto.NewUserDTO;
import hanu.edu.infrastructure.security.service.SecurityService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PutMapping(value = "/admin/user/{userId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Response> updateUser(@PathVariable long userId, @RequestParam(value = "file", required = false) MultipartFile file, @RequestParam("info") String userInfo) throws JsonProcessingException {
        UserDTO userDTO = new ObjectMapper().readValue(userInfo, UserDTO.class);
        User userFromDB = null;
        if (ObjectUtils.isEmpty(file) || userDTO.getPassword().trim().isEmpty()) {
            userFromDB = userResourceService.getById(userId);
        }
        String avatar;
        if (ObjectUtils.isEmpty(file) && userFromDB != null) {
            avatar = userFromDB.getAvatar();
        } else {
            avatar = userResourceService.uploadImageToCloudinary(file);
        }
        if (userDTO.getPassword().trim().isEmpty() && userFromDB != null) {
            userDTO.setPassword(userFromDB.getPassword());
        } else {
            userDTO.setPassword(encoder.encode(userDTO.getPassword()));
        }
        userResourceService.update(new User(
                userId,
                userDTO.getUsername(),
                userDTO.getEmail(),
                userDTO.getPassword(),
                userDTO.getName(),
                userDTO.getAddress(),
                userDTO.getPhone(),
                userDTO.getAge(),
                avatar,
                true,
                userDTO.getRole()));
        return ResponseBuilder.get200ResponseWithoutData("Change information successfully!");
    }

    @DeleteMapping("/admin/user/{userId}")
    public ResponseEntity<Response> deleteUser(@PathVariable long userId) {
        shoppingCartService.deleteShoppingCart(userId);
        userResourceService.deleteById(userId);
        return ResponseBuilder.get204Response("Delete user successfully!");
    }
}
