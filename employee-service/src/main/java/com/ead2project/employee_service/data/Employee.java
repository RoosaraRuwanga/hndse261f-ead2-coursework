package com.ead2project.employee_service.data;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "e_id")
    
    private int emp_id;
    private String password;
    private String name;
    private byte age;
    private String role;
    private String emp_status;
    private double salary;
    private Integer assigned_order_id;

    public Employee() {
    }

    public Employee(String password, String name, byte age, String role,
            String emp_status, double salary, Integer assigned_order_id) {
        this.password = password;
        this.name = name;
        this.age = age;
        this.role = role;
        this.emp_status = emp_status;
        this.salary = salary;
        this.assigned_order_id = assigned_order_id;
    }

    public int getEmp_id() {
        return emp_id;
    }

    public void setEmp_id(int emp_id) {
        this.emp_id = emp_id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte getAge() {
        return age;
    }

    public void setAge(byte age) {
        this.age = age;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmp_Status() {
        return emp_status;
    }

    public void setEmp_Status(String emp_status) {
        this.emp_status = emp_status;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public Integer getAssigned_order_id() {
        return assigned_order_id;
    }

    public void setAssigned_order_id(Integer assigned_order_id) {
        this.assigned_order_id = assigned_order_id;
    }
}