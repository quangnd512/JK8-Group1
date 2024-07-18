package hanu.edu.application.controller.order;

import hanu.edu.application.service.order.GetOrderByStatusService;
import hanu.edu.application.share.Response;
import hanu.edu.application.share.ResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GetOrderByStatusController {

    @Autowired
    private GetOrderByStatusService getOrderByStatusService;

    @GetMapping("/admin/order/{page}")
    public ResponseEntity<Response> getByOrderStatus(@RequestParam String status, @PathVariable int page) {
        return ResponseBuilder.get200ResponseWithData("Order of " + status + " gotten successfully!", getOrderByStatusService.getByOrderStatus(status, page, 50));
    }

    @GetMapping("/order/{page}/{id}")
    public ResponseEntity<Response> getUserOrdersByOrderStatus(@RequestParam String status, @PathVariable long id, @PathVariable int page) {
        return ResponseBuilder.get200ResponseWithData("Order of user id #" + id + " with status " + status + " gotten successfully!", getOrderByStatusService.getUserOrdersByOrderStatus(id, status, page, 20));
    }
}
