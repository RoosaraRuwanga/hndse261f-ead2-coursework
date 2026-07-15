package com.ead2project.table_service.service;

import com.ead2project.table_service.data.RestaurantTable;
import com.ead2project.table_service.data.TableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TableService {

    @Autowired
    private TableRepository tabRepo;

    public List<RestaurantTable> getAllTables(){
        return tabRepo.findAll();
    }

    public RestaurantTable getTableById(int id) {
        Optional<RestaurantTable> table = tabRepo.findById(id);
        if(table.isPresent()){
            return table.get();
        }
        return null;
    }

    public RestaurantTable createTable(RestaurantTable table) {
        return tabRepo.save(table);
    }

    public RestaurantTable updateTable(RestaurantTable table) {
        Optional<RestaurantTable> existing = tabRepo.findById(table.getTable_id());
        if(existing.isPresent()){
            return tabRepo.save(table);
        }
        return null;
    }

    public RestaurantTable deleteTableById(int id) {
        Optional<RestaurantTable> table = tabRepo.findById(id);
        if(table.isPresent()){
            tabRepo.deleteById(id);
            return table.get();
        }
        return null;
    }

    public RestaurantTable assignTable(int id, int orderId) {
        Optional<RestaurantTable> optionalTable = tabRepo.findById(id);
        if (optionalTable.isPresent()) {
            RestaurantTable table = optionalTable.get();
            table.setTable_status("Occupied");
            table.setAssigned_order_id(orderId);
            return tabRepo.save(table);
        }
        return null;
    }

    public RestaurantTable releaseTable(int id) {
        Optional<RestaurantTable> optionalTable = tabRepo.findById(id);
        if (optionalTable.isPresent()) {
            RestaurantTable table = optionalTable.get();
            table.setTable_status("Free");
            table.setAssigned_order_id(null);
            return tabRepo.save(table);
        }
        return null;
    }

    public RestaurantTable assignEmployee(int id, int employeeId) {
        Optional<RestaurantTable> optionalTable = tabRepo.findById(id);
        if (optionalTable.isPresent()) {
            RestaurantTable table = optionalTable.get();
            table.setAssigned_employee_id(employeeId);
            return tabRepo.save(table);
        }
        return null;
    }

    public RestaurantTable releaseEmployee(int id) {
        Optional<RestaurantTable> optionalTable = tabRepo.findById(id);
        if (optionalTable.isPresent()) {
            RestaurantTable table = optionalTable.get();
            table.setAssigned_employee_id(null);
            return tabRepo.save(table);
        }
        return null;
    }

    public List<RestaurantTable> getFreeTables() {
        return tabRepo.findAll()
                .stream()
                .filter(t -> "Free".equalsIgnoreCase(t.getTable_status()))
                .toList();
    }
}
