package com.ead2project.item_service.data;

import jakarta.persistence.*;

@Entity
@Table(name= "tbl_items")

public class Item {

    @Id
    @Column(name="item_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int item_id;

    @Column(name = "name")
    private String name;

    @Column(name = "ingredient_1_id")
    private int ingredient1_id;

    @Column(name = "ingredient_1_amt")
    private int ingredient1_amt;

    @Column(name = "ingredient_2_id")
    private int ingredient2_id;

    @Column(name = "ingredient_2_amt")
    private int ingredient2_amt;

    @Column(name = "price")
    private double price;

    public int getItem_id() {
        return item_id;
    }

    public void setItem_id(int item_id) {
        this.item_id = item_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getIngredient1_id() {
        return ingredient1_id;
    }

    public void setIngredient1_id(int ingredient1_id) {
        this.ingredient1_id = ingredient1_id;
    }

    public int getIngredient1_amt() {
        return ingredient1_amt;
    }

    public void setIngredient1_amt(int ingredient1_amt) {
        this.ingredient1_amt = ingredient1_amt;
    }

    public int getIngredient2_id() {
        return ingredient2_id;
    }

    public void setIngredient2_id(int ingredient2_id) {
        this.ingredient2_id = ingredient2_id;
    }

    public int getIngredient2_amt() {
        return ingredient2_amt;
    }

    public void setIngredient2_amt(int ingredient2_amt) {
        this.ingredient2_amt = ingredient2_amt;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
