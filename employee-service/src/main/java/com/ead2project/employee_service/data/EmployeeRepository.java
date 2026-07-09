package com.ead2project.employee_service.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    @Query("Select t from Employee t where t.emp_status = ?1")
    List<Employee> findEmployeeByStatus(String status);
}
