import { ArticleInterface } from "../Interfaces/ArticleInterface";
import {Article} from "../Models/Article";
import { User } from "../Models/User";

export default class ArticleRepository implements ArticleInterface {

  async createArticle(articleData: any): Promise<any> {
    const article = await Article.create(articleData);
    return article.toJSON();
  }


  async findArticlesAll(articles: any): Promise<Article[]> {
		const allArticles = await Article.findAll(articles);
		return allArticles;
	}

  async findArticleById(articleId: string): Promise<any> {
    const article = await Article.findByPk(articleId);
    return article && article.toJSON();
  }
  
  async findUserById(userId: number): Promise<any> {
    const user = await User.findByPk(userId);
    return user && user.toJSON();
  }
  // async findByEmailOrArticle(article: any): Promise<any> {
	// const emailResult = await Article.findAll({ where: { email: article.email } });
	// // const articlenameResult = await Article.findAll({ where: { article: article.articlename } });
  
	// const emailArticle = emailResult.length > 0 ? emailResult[0].toJSON() : null;
	// // const articlenameArticle = articlenameResult.length > 0 ? articlenameResult[0].toJSON() : null;
  
	// return emailArticle || articlenameArticle;
  // }

  // async findByEmailOrPassword(article: { email?: string; password?: string }): Promise<any> {
  //   if (!article.email && !article.password) {
  //     throw new Error("Email or password is required.");
  //   }
  // }


  async updateArticleById(articleId: string, articleData: any): Promise<any> {
    const article = await Article.findByPk(articleId);
    if (!article) {
      return null;
    }
    const updatedArticle = await article.update(articleData);
    return updatedArticle.toJSON();
  }

  async deleteArticleById(articleId: string): Promise<any> {
    const article = await Article.findByPk(articleId);
    if (!article) {
      return null;
    }
    await article.destroy();
    return article.toJSON();
  }
}
