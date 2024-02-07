package akdemy.edu.service;

import akdemy.edu.model.Customer;
import akdemy.edu.repository.i_repository.customer.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//CRUD methods
@Service
public class CustomerResourceService {
    @Autowired
    private CustomerRepository customerRepository;

    public CustomerResourceService() {
    }

    public void create(Customer customer) {
        customerRepository.save(customer);
    }

    public void update(Customer customer) {
        if (customerRepository.getById(customer.getId()) != null) {
            customerRepository.save(customer);
        }
    }

    public Customer getById(long customerId) {
        return customerRepository.getById(customerId);
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

    public Customer getByEmail(String email) {
        return customerRepository.getByEmail(email);
    }
}
