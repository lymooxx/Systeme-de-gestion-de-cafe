import { db } from "../config/db";
import { Ingredient } from "../models/Ingredient";

export class IngredientDAO {
    static MiseAJourDeStock(idIngredient: number, quantite: number) {
        throw new Error("Method not implemented.");
    }
    private static STORAGE_KEY = "ingredients";

    static async saveIngredient(ingredient: Ingredient): Promise<void> {
        const ingredients = await this.getAllIngredients();
        ingredients.push(ingredient);
        await db.setItem(this.STORAGE_KEY, ingredients);
    }

    static async getIngredientById(id: number): Promise<Ingredient | undefined> {
        const ingredients = await this.getAllIngredients();
        return ingredients.find(i => i.idIngredient === id);
    }

    static async getAllIngredients(): Promise<Ingredient[]> {
        return (await db.getItem<Ingredient[]>(this.STORAGE_KEY)) || [];
    }

    static async updateStock(id: number, newStock: number): Promise<void> {
        const ingredients = await this.getAllIngredients();
        const index = ingredients.findIndex(i => i.idIngredient === id);
        if (index !== -1) {
            ingredients[index].stock = newStock;
            await db.setItem(this.STORAGE_KEY, ingredients);
        }
    }
}