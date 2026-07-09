package com.ead2project.ingredient_service.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientRepository extends JpaRepository<IngredientTable, Integer> {

    @Query("Select i from IngredientTable i where i.name = ?1")
    List<IngredientTable> findIngredientsByName(String name);

    List<IngredientTable> findByNameContainingIgnoreCase(String name);

}