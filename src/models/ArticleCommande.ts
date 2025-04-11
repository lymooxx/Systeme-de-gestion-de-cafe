import { Cafe } from './Cafe';
import { Personnalisation } from './Personnalisation';

export class ArticleCommande {
    constructor(
        public id: number,
        public quantite: number,
        public prixUnitaire: number,
        public cafe: Cafe,
        public personnalisations: Personnalisation[] = []
    ) {}

    getPrixTotal(): number {
        const prixPersonnalisations = this.personnalisations.reduce(
            (total, p) => total + p.coutAdditionnel, 0
        );
        return (this.prixUnitaire + prixPersonnalisations) * this.quantite;
    }
}
