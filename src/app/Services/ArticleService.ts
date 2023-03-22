import ArticleRepository from "../Repositories/ArticleRepository";
import UserRepository  from "../Repositories/UserRepository";


export class ArticleService {
  _articleRepository: ArticleRepository
  _userRepository: UserRepository
	constructor(
    articleRepository: ArticleRepository,
		userRepository: UserRepository
	) {
    this._articleRepository = articleRepository,
    this._userRepository = userRepository
  }

  async createArticle(articleData: any): Promise<any> {
    const userExists = await this._userRepository.findUserById(articleData.user_id);
    if (!userExists) {
      throw new Error("User not found");  
    }
  
    const createdArticle = await this._articleRepository.createArticle(articleData);
  
    return createdArticle;
  }
  

  async findArticleById(articleId) {
    const article = await this._articleRepository.findArticleById(articleId);
    return article;
  }

  async findArticlesAll(articles) {
    const allArticle = await this._articleRepository.findArticlesAll(articles);
    return allArticle;
  }
  
  async findUserById(userId) {
    const user = await this._userRepository.findUserById(userId);
    return user;
  }

  async updateArticleById(articleId, articleData) {
    const updatedArticle = await this._articleRepository.updateArticleById(articleId, articleData);
    return updatedArticle;
  }

  async deleteArticleById(articleId) {
    const deletedArticle = await this._articleRepository.deleteArticleById(articleId);
    return deletedArticle;
  }
}
