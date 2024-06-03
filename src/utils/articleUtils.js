// src/utils/articleUtils.js

export const filterAndFormatArticles = (articles) => {
  if (!articles) return [];
  
  return articles
    .filter(article => article.title && article.description && article.urlToImage)
    .map(article => ({
      ...article,
      image: article.urlToImage, // Rename urlToImage to image
    }));
};

export const filterUniqueArticles = (articles) => {
  return articles.filter((article, index, self) =>
    index === self.findIndex(a => a.description === article.description)
  );
};
