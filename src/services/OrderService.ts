// src/services/OrderService.ts
import { CommandeDAO } from "../dao/CommandeDAO";
import { Commande } from "../models/Commande";
import { GestionDeStock } from './GestionDeStock';

export class OrderService {
    GestionDeStock: any;

    async createOrder(commande: Commande): Promise<void> {
        // Vérifier le stock pour chaque article
        for (const article of commande.articles) {
            for (const ingredient of article.cafe.ingredients) {
                await this.GestionDeStock.GestionDeStock(ingredient.idIngredient, article.quantite);
            }
        }
        await CommandeDAO.saveCommande(commande);
    }

    // Apply discount to an order
    async applyDiscount(idCommande: number, idReduction: number): Promise<void> {
        try {
            // Step 1: Retrieve the order by idCommande
            const order = await this.getOrderById(idCommande); // Fetch order from the database
            
            if (!order) {
                throw new Error(`Order with ID ${idCommande} not found`);
            }
    
            // Step 2: Retrieve the discount by idReduction
            const discount = await this.getDiscountById(idReduction); // Fetch discount from the database
            
            if (!discount) {
                throw new Error(`Discount with ID ${idReduction} not found`);
            }
    
            // Step 3: Calculate the new price after applying the discount
            const discountAmount = order.totalPrice * (discount.percentage / 100);
            const newTotalPrice = order.totalPrice - discountAmount;
    
            // Step 4: Update the order with the new total price
            order.totalPrice = newTotalPrice;
            await this.updateOrderTotalPrice(idCommande, newTotalPrice); // Update order in the database
            
            console.log(`Discount of ${discount.percentage}% applied to order ${idCommande}. New total price: ${newTotalPrice}`);
        } catch (error: unknown) {
            // TypeScript expects 'error' to be of type 'unknown', so we cast it to 'Error' here
            if (error instanceof Error) {
                console.error(`Error applying discount: ${error.message}`);
            } else {
                console.error('An unknown error occurred during discount application.');
            }
        }
    }
    

    // Dummy functions for database interactions (for illustration purposes)
    async getOrderById(idCommande: number) {
        // Fetch the order from the database using idCommande
        return { totalPrice: 100 }; // Example data
    }

    async getDiscountById(idReduction: number) {
        // Fetch the discount from the database using idReduction
        return { percentage: 20 }; // Example data (20% discount)
    }

    async updateOrderTotalPrice(idCommande: number, newTotalPrice: number) {
        // Update the order's total price in the database
        console.log(`Order ${idCommande} updated with new total price: ${newTotalPrice}`);
    }
}
