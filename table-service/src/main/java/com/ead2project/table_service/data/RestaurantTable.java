package com.ead2project.table_service.data;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_tables")
public class RestaurantTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int table_id;

    private String table_status;
    private Integer assigned_order_id;

    public RestaurantTable() {
    }

    public RestaurantTable(String table_status, Integer assigned_order_id) {
        this.table_status = table_status;
        this.assigned_order_id = assigned_order_id;
    }

    public int getTable_id() {
        return table_id;
    }

    public void setTable_id(int table_id) {
        this.table_id = table_id;
    }

    public String getTable_status() {
        return table_status;
    }

    public void setTable_status(String table_status) {
        this.table_status = table_status;
    }

    public Integer getAssigned_order_id() {
        return assigned_order_id;
    }

    public void setAssigned_order_id(Integer assigned_order_id) {
        this.assigned_order_id = assigned_order_id;
    }
}