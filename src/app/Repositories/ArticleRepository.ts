import { ArticleInterface } from "../Interfaces/ArticleInterface"
import {Article} from "../Models/Article"
import { User } from "../Models/User"

class ArticleRepository implements ArticleInterface {

  async createArticle(articleData: any): Promise<any> {
    return await Article.create(articleData)
  }

  async findArticlesAll(articles: any): Promise<Article[]> {
		return await Article.findAll(articles)
	}

  async findArticleById(article_id: number): Promise<any> {
    return await Article.findByPk(article_id)
  }
  
  async findUserById(userId: number): Promise<any> {
    return await User.findByPk(userId)
  }

  async updateArticleById(article_id: number, articleData): Promise<any> {
    const article = await Article.findByPk(article_id)
    if (!article) {
      return null
    }
    return await article.update(articleData)
  }

  async deleteArticleById(article_id: number): Promise<any> {
    const article = await Article.findByPk(article_id)
    if (!article) {
      return null
    }
    return await article.destroy()
  }
}

export default new ArticleRepository()