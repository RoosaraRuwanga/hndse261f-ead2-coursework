package com.ead2project.table_service.controller;

import com.ead2project.table_service.data.RestaurantTable;
import com.ead2project.table_service.service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "https://my-projects-c1d80.web.app")
@RestController
@RequestMapping("/api")
public class TableController {

    @Autowired
    private TableService obj;

    @GetMapping(path = "/tables")
    public List<RestaurantTable> getAllTables(){
        return obj.getAllTables();
    }

    @GetMapping(path = "/tables/{id}")
    public RestaurantTable getTableById(@PathVariable int id){
        return obj.getTableById(id);
    }

    @GetMapping(path = "/tables/Free")
    public List<RestaurantTable> getFreeTables(){
        return obj.getFreeTables();
    }

    @PostMapping(path = "/tables")
    public RestaurantTable createTable(@RequestBody RestaurantTable table){
        return obj.createTable(table);
    }

    @PutMapping(path = "/tables")
    public RestaurantTable updateTable(@RequestBody RestaurantTable table){
        return obj.updateTable(table);
    }

    @PutMapping(path = "/tables/{id}/assign/{orderId}")
    public RestaurantTable assignTable(@PathVariable int id, @PathVariable int orderId){
        return obj.assignTable(id, orderId);
    }

    @PutMapping(path = "/tables/{id}/release")
    public RestaurantTable releaseTable(@PathVariable int id){
        return obj.releaseTable(id);
    }

    @PutMapping(path = "/tables/{id}/assignEmployee/{employeeId}")
    public RestaurantTable assignEmployee(@PathVariable int id, @PathVariable int employeeId){
        return obj.assignEmployee(id, employeeId);
    }

    @PutMapping(path = "/tables/{id}/releaseEmployee")
    public RestaurantTable releaseEmployee(@PathVariable int id){
        return obj.releaseEmployee(id);
    }

    @DeleteMapping(path = "/tables/{id}")
    public RestaurantTable deleteTableById(@PathVariable int id){
        return obj.deleteTableById(id);
    }
}