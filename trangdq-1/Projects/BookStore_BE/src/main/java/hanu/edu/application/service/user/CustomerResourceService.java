package hanu.edu.application.service.user;

import hanu.edu.domain.i_repository.customer.CustomerRepository;
import hanu.edu.domain.model.user.Customer;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//CRUD methods
@Service
@NoArgsConstructor
public class CustomerResourceService {
    @Autowired
    private CustomerRepository customerRepository;

//    @Value("${amazon.s3.default-bucket}")
//    private String bucketName;
//    @Autowired
//    private AmazonS3 s3client;

    public Customer getById(long customerId) {
        return customerRepository.getById(customerId);
    }

    public Customer getByEmail(String email) {
        return customerRepository.getByEmail(email);
    }

    public void create(Customer customer) {
        customerRepository.save(customer);
    }

    public void update(Customer customer) {
        customerRepository.save(customer);
    }

//    public void changeAvatar(long customerId, MultipartFile file) {
//        try {
//            String link = uploadFile(file);
//            Customer customer = getById(customerId);
//            customer.setAvatar(link);
//            customerRepository.save(customer);
//        } catch (IOException e) {
//            throw new IllegalStateException(e);
//        }
//    }

//    public String uploadFile(MultipartFile file) throws IOException {
//        String fileName = UUID.randomUUID().toString();
//        InputStream inputStream = file.getInputStream();
//        ObjectMetadata metadata = new ObjectMetadata();
//        metadata.setContentLength(file.getSize());
//        s3client.putObject(new PutObjectRequest(bucketName, fileName, inputStream, metadata).withCannedAcl(CannedAccessControlList.PublicRead));
//        return s3client.getUrl(bucketName, fileName).toString();
//    }

    public void deleteById(long customerId) {
        customerRepository.deleteById(customerId);
    }
}
