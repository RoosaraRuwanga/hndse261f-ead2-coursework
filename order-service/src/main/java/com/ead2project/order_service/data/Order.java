package com.ead2project.order_service.data;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_orders")
public class Order {

    @Id
    @Column(name = "order_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "order_status")
    private String status;

    @Column(name = "item_1_id")
    private int item1_id;

    @Column(name = "item_2_id")
    private int item2_id;

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

    public int getItem1_id() {
        return item1_id;
    }

    public void setItem1_id(int item1_id) {
        this.item1_id = item1_id;
    }

    public int getItem2_id() {
        return item2_id;
    }

    public void setItem2_id(int item2_id) {
        this.item2_id = item2_id;
    }

    public double getTotal_price() {
        return total_price;
    }

    public void setTotal_price(double total_price) {
        this.total_price = total_price;
    }
}
