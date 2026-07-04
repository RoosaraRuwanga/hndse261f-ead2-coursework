package com.ead2project.item_service.service;

import com.ead2project.item_service.data.Item;
import com.ead2project.item_service.data.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository ItemRep;

    public List<Item> getAllItems() {return ItemRep.findAll();}

    //Get Item by ID
    public Item getItemById(int item_id){
        Optional<Item> itm = ItemRep.findById(item_id);
        if(itm.isPresent()){
            return itm.get();
        }
        else{
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


    //To find item by column ingredient_1_id
    public Item SearchByIngredient1(int ingredient1_id ){
        Optional<Item> ing1 = ItemRep.findById(ingredient1_id);
        if(ing1.isPresent()){
            return ing1.get();
        }
        else{
            return null;
        }
    }

    //To find item by column ingredient_2_id
    public Item SearchByIngredient2(int ingredient2_id ){
        Optional<Item> ing2 = ItemRep.findById(ingredient2_id);
        if(ing2.isPresent()){
            return ing2.get();
        }
        else{
            return null;
        }
    }

}
