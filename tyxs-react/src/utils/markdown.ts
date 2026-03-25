import { marked } from 'marked';

// 配置marked
marked.setOptions({
  gfm: true,
  breaks: true,
});

// 渲染Markdown并处理图片代理
export const renderMarkdown = (content: string): string => {
  // 处理微信图片防盗链
  let processedContent = content.replace(
    /<img[^>]+src="(https?:\/\/mmbiz\.qpic\.cn[^"]+)"[^>]*>/g,
    (match, url) => {
      const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
      return match.replace(url, proxyUrl);
    }
  );

  // 处理普通图片
  processedContent = processedContent.replace(
    /!\[.*?\]\((https?:\/\/[^)]+)\)/g,
    (match, url) => {
      if (url.includes('mmbiz.qpic.cn')) {
        const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
        return match.replace(url, proxyUrl);
      }
      return match;
    }
  );

  return marked.parse(processedContent) as string;
};
