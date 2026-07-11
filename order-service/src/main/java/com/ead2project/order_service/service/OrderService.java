package com.ead2project.order_service.service;

import com.ead2project.order_service.data.Order;
import com.ead2project.order_service.data.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.Map;

// TODO : TOTAL PRICE CALC

@Service
public class OrderService {
    private final RestTemplate restTemplate = new RestTemplate();
    private static final String ITEM_SERVICE_URL = "http://localhost:8084/item-service/api/items/";

    @Autowired
    private OrderRepository ordRep;

    public List<Order> getAllOrders(){
        return ordRep.findAll();
    }

    public Order getOrderById(int id){
        Optional<Order> ord = ordRep.findById(id);
        if(ord.isPresent()){
            return ord.get();
        }
        else{
            return null;
        }
    }

    public Order createOrder(Order ord) {
        return ordRep.save(ord);
    }

    public Order updateOrder(Order ord) {
        return ordRep.save(ord);
    }

    public void deleteOrderById(int id) {
        ordRep.deleteById(id);
    }

    public Order updateOrderStatus(int id, String status){
        Optional<Order> optionalOrd = ordRep.findById(id);
        if (optionalOrd.isPresent()) {
            Order ord = optionalOrd.get();
            ord.setStatus(status);

            return ordRep.save(ord);
        }
        return null;
    }

    public List<Order> getOrderByStatus(String status) {
        return ordRep.getOrderByStatus(status);
    }

    public List<Integer> getOrderItems(int id)
    {
        Order order = ordRep.findById(id)
                .orElseThrow(() -> new RuntimeException("Order does not exist!"));

        return order.getItems();
    }

    public Order addItemToOrder(int orderId, int itemId) {
        Order order = ordRep.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order does not exist!"));

        order.addItem(itemId);

        return ordRep.save(order);
    }

    private double calculateTotalPrice(List<Integer> itemIds) {
        double total = 0.0;

        for (Integer itemId : itemIds) {
            try {
                Map<String, Object> item = restTemplate.getForObject(
                        ITEM_SERVICE_URL + itemId,
                        Map.class
                );
                if (item != null && item.get("price") != null) {
                    total += ((Number) item.get("price")).doubleValue();
                }
            } catch (Exception e) {
                System.out.println("Could not fetch price for item " + itemId + ": " + e.getMessage());
            }
        }

        return total;
    }
}
