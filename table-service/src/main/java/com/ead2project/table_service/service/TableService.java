package com.ead2project.table_service.service;

import com.ead2project.table_service.data.RestaurantTable;
import com.ead2project.table_service.data.TableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class TableService {

    @Autowired
    private TableRepository tabRepo;

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String EMPLOYEE_SERVICE_URL = "http://localhost:8081/employee-service/api/employees/";
    

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
        if (optionalTable.isEmpty()) {
            return null;
        }

        RestaurantTable table = optionalTable.get();

        if (table.getAssigned_order_id() == null) {
            throw new RuntimeException(
                "Cannot assign employee to table " + id + ": table has no order assigned yet."
            );
        }

        try {
            restTemplate.put(
                EMPLOYEE_SERVICE_URL + employeeId + "/assign/" + table.getAssigned_order_id(),
                null
            );
        } catch (Exception e) {
            throw new RuntimeException(
                "Failed to update employee status for employee " + employeeId + ": " + e.getMessage()
            );
        }

        table.setAssigned_employee_id(employeeId);
        return tabRepo.save(table);
    }

    public RestaurantTable releaseEmployee(int id) {
        Optional<RestaurantTable> optionalTable = tabRepo.findById(id);
        if (optionalTable.isEmpty()) {
            return null;
        }

        RestaurantTable table = optionalTable.get();
        Integer employeeId = table.getAssigned_employee_id();

        if (employeeId != null) {
            try {
                restTemplate.put(EMPLOYEE_SERVICE_URL + employeeId + "/release", null);
            } catch (Exception e) {
                throw new RuntimeException(
                    "Failed to release employee " + employeeId + ": " + e.getMessage()
                );
            }
        }

        table.setAssigned_employee_id(null);
        return tabRepo.save(table);
    }

    public List<RestaurantTable> getFreeTables() {
        return tabRepo.findAll()
                .stream()
                .filter(t -> "Free".equalsIgnoreCase(t.getTable_status()))
                .toList();
    }
}