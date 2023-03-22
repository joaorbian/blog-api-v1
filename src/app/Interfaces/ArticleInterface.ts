import {Article} from "../Models/Article";

export interface ArticleInterface  {
    createArticle(article: Article): Promise<any>;
    findUserById(userId: number): Promise<any>;
    findArticlesAll(articleData: any): Promise<Article[]>
    findArticleById(articleId: string): Promise<any>;
    updateArticleById(articleId: string, articleData: any): Promise<any>;
    deleteArticleById(articleId: string): Promise<any>;
}
