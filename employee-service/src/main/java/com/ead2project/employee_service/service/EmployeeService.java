package com.ead2project.employee_service.service;

import com.ead2project.employee_service.data.Employee;
import com.ead2project.employee_service.data.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository empRepo;

    public List<Employee> getAllEmployees() {
        return empRepo.findAll();
    }

    public Employee getEmpById(int emp_id) {
        Optional<Employee> employee = empRepo.findById(emp_id);
        if (employee.isPresent()) {
            return employee.get();
        }
        return null;
    }

    public Employee createEmployee(Employee employee) {
        return empRepo.save(employee);
    }

    public Employee updateEmployee(Employee employee) {
        Optional<Employee> existing = empRepo.findById(employee.getEmp_id());
        if (existing.isPresent()) {
            return empRepo.save(employee);
        }
        return null;
    }

    public Employee deleteEmployeeById(int emp_id) {
        Optional<Employee> employee = empRepo.findById(emp_id);
        if (employee.isPresent()) {
            empRepo.deleteById(emp_id);
            return employee.get();
        }
        return null;
    }

    public Employee assignOrderToEmployee(int emp_id, int orderId) {
        Optional<Employee> optionalEmployee = empRepo.findById(emp_id);

        if (optionalEmployee.isPresent()) {
            Employee employee = optionalEmployee.get();

            // assign order to employee
            employee.setEmp_Status("Assigned");

            return empRepo.save(employee);
        }

        return null;
    }

    public Employee releaseEmployee(int emp_id) {
        Optional<Employee> optionalEmployee = empRepo.findById(emp_id);

        if (optionalEmployee.isPresent()) {
            Employee employee = optionalEmployee.get();

            // release employee
            employee.setEmp_Status("Available");

            return empRepo.save(employee);
        }

        return null;
    }

    public List<Employee> getAvailableEmployees() {
        return empRepo.findEmployeesByStatus("Available");
    }
}