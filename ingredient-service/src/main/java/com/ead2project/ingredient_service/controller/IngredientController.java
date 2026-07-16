package com.ead2project.ingredient_service.controller;

import com.ead2project.ingredient_service.data.IngredientTable;
import com.ead2project.ingredient_service.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "https://my-projects-c1d80.web.app")
@RestController
@RequestMapping("/api")
public class IngredientController {

    @Autowired
    private IngredientService obj;

    @GetMapping(path = "/ingredients")
    public List<IngredientTable> getAllIngredients(){
        return obj.getAllIngredients();
    }

    @GetMapping(path = "/ingredients/{id}")
    public IngredientTable getIngredientById(@PathVariable int id){
        return obj.getIngredientById(id);
    }

    @GetMapping(path = "/ingredients/name/{name}")
    public List<IngredientTable> getIngredientsByName(@PathVariable String name){
        return obj.getIngredientsByName(name);
    }

    @PostMapping(path = "/ingredients")
    public IngredientTable createIngredient(@RequestBody IngredientTable ingredient){
        return obj.createIngredient(ingredient);
    }

    @PutMapping(path = "/ingredients")
    public IngredientTable updateIngredient(@RequestBody IngredientTable ingredient){
        return obj.updateIngredient(ingredient);
    }

    @DeleteMapping(path = "/ingredients/{id}")
    public IngredientTable deleteIngredientById(@PathVariable int id){
        return obj.deleteIngredientById(id);
    }

    @PostMapping(path = "/ingredients/{id}/adjust")
    public IngredientTable adjustIngredientQuantity(@PathVariable int id, @RequestParam int delta) {
        return obj.adjustQuantity(id, delta);
    }
}