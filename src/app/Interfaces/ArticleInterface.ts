import {Article} from "../Models/Article";

export interface ArticleInterface  {
    createArticle(article: Article): Promise<any>;
    findUserById(userId: number): Promise<any>;
    findArticlesAll(articleData: any): Promise<Article[]>
    findArticleById(article_id: number): Promise<any>;
    updateArticleById(article_id: number, articleData: any): Promise<any>;
    deleteArticleById(article_id: number): Promise<any>;
}