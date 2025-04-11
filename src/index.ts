// Fichier src/index.ts
import { Cafe } from "./models/Cafe";
import { Ingredient } from "./models/Ingredient";
import { Personnalisation } from "./models/Personnalisation";
import { ArticleCommande } from "./models/ArticleCommande";
import { Reduction } from "./models/Reduction";
import { Commande } from "./models/Commande";
import { CommandeDAO } from "./dao/CommandeDAO";

async function main() {
    // Création des ingrédients
    const cafeGrain = new Ingredient(1, "Café en grain", 100);
    const lait = new Ingredient(2, "Lait", 50);

    // Création d'un café
    const espresso = new Cafe(1, "Espresso", 2.5, [cafeGrain]);

    // Personnalisations
    const extraSucre = new Personnalisation("Sucre", 0.5);
    const extraLait = new Personnalisation("Lait", 1.0);

    // Article de commande
    const article1 = new ArticleCommande(1, 2, espresso.prixBase, espresso, [extraSucre]);

    // Réduction
    const reduction = new Reduction(1, "Promo été", 1.5, "fixed");

    // Commande
    const commande = new Commande(1, new Date(), "en cours");
    commande.ajouterArticle(article1);
    commande.appliquerReduction(reduction);

    console.log("Total commande:", commande.calculerTotal());

    // Sauvegarde
    await CommandeDAO.saveCommande(commande);
}

main();