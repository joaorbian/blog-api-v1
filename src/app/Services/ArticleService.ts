import ArticleRepository from "../Repositories/ArticleRepository"

class ArticleService {

	async createArticle(articleData: any): Promise<any> {
    return await ArticleRepository.createArticle(articleData)
  }

  async findArticleById(articleId) {
    return await ArticleRepository.findArticleById(articleId)
  }

  async findArticlesAll(articles) {
    return await ArticleRepository.findArticlesAll(articles)
  }

  async updateArticleById(article_id: number, article) {
    return await ArticleRepository.updateArticleById(article_id, article)
  }

  async deleteArticleById(articleId) {
    return await ArticleRepository.deleteArticleById(articleId)
  }
}

export default new ArticleService()