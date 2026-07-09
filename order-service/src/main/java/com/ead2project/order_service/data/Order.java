package com.ead2project.order_service.data;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_orders")
public class Order {

    @Id
    @Column(name = "order_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "order_status")
    private String status;

    // Using this annotation to deal with a list of item ids in a many-to-many relationship
    @ElementCollection
    @CollectionTable(
            name = "tbl_order_items",
            joinColumns = @JoinColumn(name = "order_id")
    )
    @Column(name = "item_id")
    private List<Integer> items = new ArrayList<>();

    @Column(name = "total_price")
    private double total_price;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getTotal_price() {
        return total_price;
    }

    public void setTotal_price(double total_price) {
        this.total_price = total_price;
    }

    public List<Integer> getItems() {
        return items;
    }

    public void setItems(List<Integer> items) {
        this.items = items;
    }

    public void addItem(int item_id){
        this.items.add(item_id);
    }

    public void removeItem(int index){
        this.items.remove(index);
    }
}
