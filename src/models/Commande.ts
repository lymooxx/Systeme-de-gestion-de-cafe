import { ArticleCommande } from './ArticleCommande';
import { Reduction } from './Reduction';

export class Commande {
    constructor(
        public idCommande: number,
        public date: Date,
        public statut: string,
        public total : number,
        public articles: ArticleCommande[] = [],
        public reduction?: Reduction
    ) {}

    ajouterArticle(article: ArticleCommande): void {
        this.articles.push(article);
    }

    calculerTotal(): number {
        const totalArticles = this.articles.reduce(
            (total, article) => total + article.getPrixTotal(), 0
        );
        
        if (this.reduction) {
            return totalArticles - this.reduction.montant;
        }
        return totalArticles;
    }

    appliquerReduction(reduction: Reduction): void {
        this.reduction = reduction;
    }
}