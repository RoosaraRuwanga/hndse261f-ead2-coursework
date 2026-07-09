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
    private EmployeeRepository empRep;

    public List<Employee> getAllEmployees(){
        return empRep.findAll();
    }

    public Employee getEmpById(Integer emp_id){
        Optional<Employee> emp = empRep.findById(emp_id);
        if(emp.isPresent()){
            return emp.get();
        }
        return null;
    }

    public Employee createEmployee(Employee emp) {
        return empRep.save(emp);
    }

    public Employee updateEmployee(Employee emp) {
        Optional<Employee> existing = empRep.findById(emp.getEmp_id());
        if(existing.isPresent()){
            return empRep.save(emp);
        }
        return null;
    }

    public Employee deleteEmployeeById(int emp_id) {
        Optional<Employee> emp = empRep.findById(emp_id);
        if(emp.isPresent()){
            empRep.deleteById(emp_id);
            return emp.get();
        }
        return null;
    }

    public Employee assignOrderToEmployee(int emp_id, int orderId) {
        Optional<Employee> optionalEmployee = empRep.findById(emp_id);

        if (optionalEmployee.isPresent()) {
            Employee emp = optionalEmployee.get();

            // assign order to table
            emp.setEmp_Status("On-Delivery");
            emp.setAssigned_order_id(orderId);

            return empRep.save(emp);
        }
        return null;
    }

    public Employee releaseEmployee(int emp_id) {
        Optional<Employee> optionalEmployee = empRep.findById(emp_id);

        if (optionalEmployee.isPresent()) {
            Employee emp = optionalEmployee.get();

            // release table
            emp.setEmp_Status("Available");
            emp.setAssigned_order_id(null);

            return empRep.save(emp);
        }
        return null;
    }

    public List<Employee> getAvailableEmployees() {
        return empRep.findAll()
                .stream()
                .filter(t -> "Available".equalsIgnoreCase(t.getEmp_Status()))
                .toList();
    }
}
