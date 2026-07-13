package com.ead2project.item_service.controller;

import com.ead2project.item_service.data.Item;
import com.ead2project.item_service.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "https://my-projects-c1d80.web.app")
@RestController
@RequestMapping("/api")
public class ItemController {

    @Autowired
    ItemService obj;

    @GetMapping(path="/items")
    public List<Item> getAllItems(){return obj.getAllItems();}

    //get item by ID
    @GetMapping(path="/items/{item_id}")
    public Item getItemByID(@PathVariable int item_id){return obj.getItemById(item_id);}

    //get item by ingredient 1 column
    @GetMapping(path="/itemingredient1/{ingredient1_id}")
    public List<Item> SearchByIngredient1(@PathVariable int ingredient1_id){return obj.SearchByIngredient1(ingredient1_id);}

    //get item by ingredient 2 column
    @GetMapping(path="/itemingredient2/{ingredient2_id}")
    public List<Item> SearchByIngredient2(@PathVariable int ingredient2_id){return obj.SearchByIngredient2(ingredient2_id);}

    @PostMapping(path="/items")
    public Item createItem(@RequestBody Item itm){
        return obj.createItem(itm);
    }

    @PutMapping(path="/items")
    public Item updateItem(@RequestBody Item itm){
        return obj.updateItem(itm);
    }

    @DeleteMapping(path="/items/{item_id}")
    public void deleteItemByID(@PathVariable int item_id){
        obj.deleteItemById(item_id);
    }

}
