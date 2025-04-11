import { db } from "../config/db";
import { ArticleCommande } from "../models/ArticleCommande";

export class ArticleCommandeDAO {
    private static STORAGE_KEY = "articlesCommande";

    static async saveArticle(article: ArticleCommande): Promise<void> {
        const articles = await this.getAllArticles();
        articles.push(article);
        await db.setItem(this.STORAGE_KEY, articles);
    }

    static async getArticleById(id: number): Promise<ArticleCommande | undefined> {
        const articles = await this.getAllArticles();
        return articles.find(a => a.id === id);
    }

    static async getAllArticles(): Promise<ArticleCommande[]> {
        return (await db.getItem<ArticleCommande[]>(this.STORAGE_KEY)) || [];
    }
}