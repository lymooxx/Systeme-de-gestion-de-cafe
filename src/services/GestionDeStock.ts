import { db } from "../config/db";
import { IngredientDAO } from "../dao/IngredientDAO";
import { Ingredient } from "../models/Ingredient";

export class GestionDeStock {
    private static STORAGE_KEY = 'ingredients';


    static async saveIngredient(ingredient: Ingredient): Promise<void> {
        const ingredients = await this.getAllIngredients();
        ingredients.push(ingredient);
        await db.setItem(this.STORAGE_KEY, ingredients);
    }

    static async getIngredientById(idIngredient: number): Promise<Ingredient | undefined> {
        const ingredients = await this.getAllIngredients();
        return ingredients.find(i => i.idIngredient === idIngredient);
    }

    static async getAllIngredients(): Promise<Ingredient[]> {
        return (await db.getItem<Ingredient[]>(this.STORAGE_KEY)) || [];
    }


    static async updateStock(idIngredient: number, newStock: number): Promise<void> {
        const ingredients = await this.getAllIngredients();
        const index = ingredients.findIndex(i => i.idIngredient === idIngredient);
        if (index !== -1) {
            ingredients[index].stock = newStock;
            await db.setItem(this.STORAGE_KEY, ingredients);
        }
    }


    static async updateQuantite(idIngredient: number, newQuantite: number): Promise<void> {
        const ingredients = await this.getAllIngredients();
        const index = ingredients.findIndex(i => i.idIngredient === idIngredient);
        if (index !== -1) {
            ingredients[index].quantite = newQuantite;
            await db.setItem(this.STORAGE_KEY, ingredients);
        }
    }
}