package com.ead2project.item_service.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item,Integer> {

    //to Search Item by ingredient 1

    @Query("SELECT i FROM Item i where i.ingredient1_id = ?1")
    List<Item> findItemByIngredient1_id(int Ingredient1_id);

    @Query("SELECT i FROM Item i where i.ingredient2_id = ?1")
    List<Item> findItemByIngredient2_id(int Ingredient2_id);
}
