import { useEffect, useState } from "react";
import { getAllItems } from "../../services/itemService";
import { getIngredient } from "../../services/ingredientService";

export default function Items() {
    const [items, setItems] = useState([]);
    const [ingredientNames, setIngredientNames] = useState({});

    useEffect(() => {
        loadItems();
    }, []);

    async function loadItems() {
        const data = await getAllItems();
        setItems(data);

        const namesMap = {};
        for (const item of data) {
            if (item.ingredient1_id) {
                const ing1 = await getIngredient(item.ingredient1_id);
                namesMap[item.ingredient1_id] = ing1.name;
            }
            if (item.ingredient2_id) {
                const ing2 = await getIngredient(item.ingredient2_id);
                namesMap[item.ingredient2_id] = ing2.name;
            }
        }
        setIngredientNames(namesMap);
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>Items</h1>
            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Ingredient 1</th>
                        <th>Ingredient 2</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.item_id}>
                            <td>{item.item_id}</td>
                            <td>{item.name}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>
                                {ingredientNames[item.ingredient1_id] || "—"} (x{item.ingredient1_amt})
                            </td>
                            <td>
                                {ingredientNames[item.ingredient2_id] || "—"} (x{item.ingredient2_amt})
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}