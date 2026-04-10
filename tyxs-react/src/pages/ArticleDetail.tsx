import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Article } from '../types';
import { renderMarkdown } from '../utils/markdown';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}articles.json`)
      .then(res => res.json())
      .then((data: Article[]) => {
        if (id && data[parseInt(id)]) {
          setArticle(data[parseInt(id)]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('加载文章失败:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="card">
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#998c7c' }}>
          加载中...
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="card">
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#998c7c' }}>
          文章不存在
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h1 className="article-title">{article.title}</h1>
      <div className="article-meta">
        发布于 {article.date} · {article.category}
      </div>
      <div
        className="article-body"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }}
      />
    </div>
  );
};

export default ArticleDetail;
