import { useNavigate } from 'react-router-dom';
import type { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  index: number;
}

const ArticleCard = ({ article, index }: ArticleCardProps) => {
  const navigate = useNavigate();

  // 提取文章摘要
  const getExcerpt = (content: string) => {
    // 移除Markdown标记
    const plainText = content.replace(/#|!\[.*?\]\(.*?\)|\[.*?\]\(.*?\)|\*|`/g, '');
    return plainText.slice(0, 100) + '...';
  };

  return (
    <div
      className="article-item"
      onClick={() => navigate(`/articles/${index}`)}
    >
      <div className="article-date">
        {article.date} · {article.category}
      </div>
      <h3>{article.title}</h3>
      <div className="article-desc">{getExcerpt(article.content)}</div>
    </div>
  );
};

export default ArticleCard;
