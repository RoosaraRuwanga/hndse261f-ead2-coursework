package com.ead2project.ingredient_service.data;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_ingredients")
public class IngredientTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ingredient_id;

    private String name;
    private Integer quantity;

    public IngredientTable() {
    }

    public IngredientTable(String name, Integer quantity) {
        this.name = name;
        this.quantity = quantity;
    }

    public int getIngredient_id() {
        return ingredient_id;
    }

    public void setIngredient_id(int ingredient_id) {
        this.ingredient_id = ingredient_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}