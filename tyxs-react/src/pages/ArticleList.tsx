import { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';
import type { Article } from '../types';

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}articles.json`)
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('加载文章失败:', err);
        setLoading(false);
      });
  }, []);

  const categories = ['all', '命理专区', '风水专区', '玄学专区'];

  const filteredArticles = activeCategory === 'all'
    ? articles
    : articles.filter(article => article.category === activeCategory);

  if (loading) {
    return (
      <div className="card">
        <h2>文章专栏</h2>
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#998c7c' }}>
          加载中...
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>文章专栏</h2>

      {/* 分类标签 */}
      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category}
            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category === 'all' ? '全部文章' : category}
          </button>
        ))}
      </div>

      {/* 文章列表 */}
      <div className="article-list">
        {filteredArticles.map((article, index) => (
          <ArticleCard
            key={index}
            article={article}
            index={index}
          />
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#998c7c' }}>
          该分类下暂无文章
        </div>
      )}
    </div>
  );
};

export default ArticleList;
