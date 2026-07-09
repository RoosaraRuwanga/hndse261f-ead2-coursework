package com.ead2project.ingredient_service.service;

import com.ead2project.ingredient_service.data.IngredientTable;
import com.ead2project.ingredient_service.data.IngredientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientService {

    @Autowired
    private IngredientRepository ingRepo;

    public List<IngredientTable> getAllIngredients(){
        return ingRepo.findAll();
    }

    public IngredientTable getIngredientById(int id) {
        Optional<IngredientTable> ingredient = ingRepo.findById(id);

        if(ingredient.isPresent()){
            return ingredient.get();
        }

        return null;
    }

    public IngredientTable createIngredient(IngredientTable ingredient) {
        return ingRepo.save(ingredient);
    }

    public IngredientTable updateIngredient(IngredientTable ingredient) {

        Optional<IngredientTable> existing = ingRepo.findById(ingredient.getIngredient_id());

        if(existing.isPresent()){
            return ingRepo.save(ingredient);
        }

        return null;
    }

    public IngredientTable deleteIngredientById(int id) {

        Optional<IngredientTable> ingredient = ingRepo.findById(id);

        if(ingredient.isPresent()){
            ingRepo.deleteById(id);
            return ingredient.get();
        }

        return null;
    }

    public List<IngredientTable> getIngredientsByName(String name) {
        return ingRepo.findByNameContainingIgnoreCase(name);
    }
}