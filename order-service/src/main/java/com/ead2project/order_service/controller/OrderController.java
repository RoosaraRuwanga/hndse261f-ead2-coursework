package com.ead2project.order_service.controller;

import com.ead2project.order_service.data.Order;
import com.ead2project.order_service.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    // get an instance of the order service
    @Autowired
    OrderService obj;

    @GetMapping(path="/orders")
    public List<Order> getAllOrders(){
        return obj.getAllOrders();
    }

    @GetMapping(path="/orders/{id}")
    public Order getOrdersById(@PathVariable int id){
        return obj.getOrderById(id);
    }

    @PostMapping(path="/orders")
    public Order createOrder(@RequestBody Order ord){
        return obj.createOrder(ord);
    }

    @PutMapping(path="/orders")
    public Order updateOrder(@RequestBody Order ord){
        return obj.updateOrder(ord);
    }

    @DeleteMapping(path="/orders/{id}")
    public void deleteOrderByID(@PathVariable int id){
        obj.deleteOrderById(id);
    }

    @GetMapping(path="/orders", params = {"status"})
    public List<Order> getOrderByStatus(@RequestParam String status){
        return obj.getOrderByStatus(status);
    }

    @PatchMapping(path="/orders", params = {"id", "status"})
    public Order updateOrderStatus(@RequestParam int id, @RequestParam String status){
        return obj.updateOrderStatus(id, status);
    }

    @GetMapping(path="/orders/items/{id}")
    public List<Integer> getOrderItems(@PathVariable int id){
        return obj.getOrderItems(id);
    }

    @PostMapping("/orders/{orderId}/items")
    public Order addItemToOrder(
            @PathVariable int orderId,
            @RequestBody int itemId) {

        return obj.addItemToOrder(orderId, itemId);
    }
}
