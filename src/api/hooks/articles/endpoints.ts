export enum ArticlesEndpoints {
  ARTICLES = '/articles',
  ARTICLE_CATEGORIES = '/articles/categories',
  ARTICLE_BY_ID = '/articles/{articleId}',
  UPLOAD_ARTICLE_IMAGE = '/articles/{articleId}/image-upload-url',
  REMOVE_ARTICLE_IMAGE = '/articles/{articleId}/remove-image',
  ARTICLE_COMMENT = '/articles/{articleId}/comments',
}
