package hanu.edu.application.service.user;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import hanu.edu.domain.i_repository.user.UserRepository;
import hanu.edu.domain.model.user.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

//CRUD methods
@Service
@Slf4j
public class UserResourceService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private Cloudinary cloudinary;

    public User getById(long id) {
        return userRepository.getById(id);
    }

    public User getByEmail(String email) {
        return userRepository.getByEmail(email);
    }

    public void update(User user) {
        userRepository.save(user);
    }

    public void deleteById(long id) {
        userRepository.deleteById(id);
    }

    public Page<User> getAllByPage(int page, int size) {
        return userRepository.getAllByPage(page, size);
    }

    public User getByUsername(String username) {
        return userRepository.getByUsername(username);
    }

    public String uploadImageToCloudinary(MultipartFile avatar) {
        String imageUrl;
        try {
            String fileName = avatar.getOriginalFilename();
            String timestamp = String.valueOf(System.currentTimeMillis()); // Get current timestamp
            String publicId = fileName + "_" + timestamp;
            Map uploadResult = cloudinary.uploader().upload(avatar.getBytes(), ObjectUtils.asMap("public_id", publicId));
            imageUrl = (String) uploadResult.get("secure_url");
        } catch (IOException e) {
            log.error("Failed to upload image: " + avatar.getOriginalFilename());
            return null;
        }
        return imageUrl;
    }
}
