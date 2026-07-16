package com.ead2project.item_service.service;

import com.ead2project.item_service.data.Item;
import com.ead2project.item_service.data.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository ItemRep;

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String INGREDIENT_SERVICE_URL = "http://localhost:8080/ingredient-service/api/ingredients/";

    public List<Item> getAllItems() {
        return ItemRep.findAll();
    }

    // Get Item by ID
    public Item getItemById(int item_id) {
        Optional<Item> itm = ItemRep.findById(item_id);
        if (itm.isPresent()) {
            return itm.get();
        } else {
            return null;
        }
    }

    public Item createItem(Item itm) {
        return ItemRep.save(itm);
    }

    public Item updateItem(Item itm) {
        return ItemRep.save(itm);
    }

    public void deleteItemById(int item_id) {
        ItemRep.deleteById(item_id);
    }

    // To find item by column ingredient_1_id
    public List<Item> SearchByIngredient1(int ingredient1_id) {
        return ItemRep.findItemByIngredient1_id(ingredient1_id);
    }

    // To find item by column ingredient_2_id
    public List<Item> SearchByIngredient2(int ingredient2_id) {
        return ItemRep.findItemByIngredient2_id(ingredient2_id);
    }

    public void consumeIngredientsForItem(int item_id) {
        Item item = getItemById(item_id);
        if (item == null) {
            throw new RuntimeException("Item with id " + item_id + " does not exist!");
        }

        System.out.println("=== Consuming ingredients for item: " + item.getName() + " ===");
        System.out.println("Ingredient1: id=" + item.getIngredient1_id() + " amt=" + item.getIngredient1_amt());
        System.out.println("Ingredient2: id=" + item.getIngredient2_id() + " amt=" + item.getIngredient2_amt());

        boolean firstConsumed = false;

        try {
            if (item.getIngredient1_id() != 0 && item.getIngredient1_amt() != 0) {
                System.out.println("Adjusting ingredient1...");
                adjustIngredient(item.getIngredient1_id(), -item.getIngredient1_amt());
                firstConsumed = true;
                System.out.println("Ingredient1 adjusted successfully.");
            } else {
                System.out.println("Skipping ingredient1 (id or amt is 0)");
            }

            if (item.getIngredient2_id() != 0 && item.getIngredient2_amt() != 0) {
                System.out.println("Adjusting ingredient2...");
                adjustIngredient(item.getIngredient2_id(), -item.getIngredient2_amt());
                System.out.println("Ingredient2 adjusted successfully.");
            } else {
                System.out.println("Skipping ingredient2 (id or amt is 0)");
            }
        } catch (Exception e) {
            System.out.println("EXCEPTION during consume: " + e.getMessage());
            e.printStackTrace();
            if (firstConsumed) {
                try {
                    adjustIngredient(item.getIngredient1_id(), item.getIngredient1_amt());
                } catch (Exception rollbackEx) {
                    System.out.println("CRITICAL: rollback failed for ingredient "
                            + item.getIngredient1_id() + ": " + rollbackEx.getMessage());
                }
            }
            throw new RuntimeException("Failed to consume ingredients for item " + item_id + ": " + e.getMessage());
        }
    }

    private void adjustIngredient(int ingredientId, int delta) {
        restTemplate.postForObject(
                INGREDIENT_SERVICE_URL + ingredientId + "/adjust?delta=" + delta,
                null,
                Void.class);
    }

}
