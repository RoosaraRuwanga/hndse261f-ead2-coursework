package com.ead2project.table_service.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TableRepository extends JpaRepository<RestaurantTable, Integer> {

    @Query("Select t from RestaurantTable t where t.table_status = ?1")
    List<RestaurantTable> findTablesByStatus(String status);
}
