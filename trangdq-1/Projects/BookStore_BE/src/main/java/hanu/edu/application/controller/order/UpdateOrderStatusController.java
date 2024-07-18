package hanu.edu.application.controller.order;

import hanu.edu.application.service.order.UpdateStatusOrderService;
import hanu.edu.application.share.Response;
import hanu.edu.application.share.ResponseBuilder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UpdateOrderStatusController {

    @Autowired
    private UpdateStatusOrderService updateStatusOrderService;

    @PutMapping("/order/{id}")
    public ResponseEntity<Response> updateOrderStatus(@PathVariable long id, @RequestBody InputStatus inputStatus) {
        updateStatusOrderService.updateStatusOrder(id, inputStatus.fromStatus, inputStatus.toStatus);
        return ResponseBuilder.get200ResponseWithoutData("Updated order from " + inputStatus.fromStatus + " to " + inputStatus.toStatus);
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    private static class InputStatus {
        public String fromStatus;
        public String toStatus;
    }
}
