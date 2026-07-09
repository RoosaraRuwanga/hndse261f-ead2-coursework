package com.ead2project.employee_service.controller;

import com.ead2project.employee_service.data.Employee;
import com.ead2project.employee_service.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EmployeeController {

    @Autowired
    private EmployeeService emp;

    @GetMapping(path = "/employees")
    public List<Employee> getAllEmployees() {
        return emp.getAllEmployees();
    }

    @GetMapping(path = "/employees/{emp_id}")
    public Employee getEmpById(@PathVariable int emp_id) {
        return emp.getEmpById(emp_id);
    }

    @GetMapping(path = "/employees/Available")
    public List<Employee> getAvailableEmployees() {
        return emp.getAvailableEmployees();
    }

    @PostMapping(path = "/employees")
    public Employee createEmployee(@RequestBody Employee employee) {
        return emp.createEmployee(employee);
    }

    @PutMapping(path = "/employees")
    public Employee updateEmployee(@RequestBody Employee employee) {
        return emp.updateEmployee(employee);
    }

    @PutMapping("/employees/{emp_id}/assign/{orderId}")
    public Employee assignOrderToEmployee(@PathVariable int emp_id, @PathVariable int orderId) {
        return emp.assignOrderToEmployee(emp_id, orderId);
    }

    @PutMapping("/employees/{emp_id}/release")
    public Employee releaseEmployee(@PathVariable int emp_id) {
        return emp.releaseEmployee(emp_id);
    }

    @DeleteMapping("/employees/{emp_id}")
    public Employee deleteEmployeeById(@PathVariable int emp_id) {
        return emp.deleteEmployeeById(emp_id);
    }
}
