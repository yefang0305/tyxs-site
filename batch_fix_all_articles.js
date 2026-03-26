const fs = require('fs');
const path = require('path');

// 读取文章数据
const articlesPath = path.join(__dirname, 'articles.json');
let articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

let fixedCount = 0;

// 统一修复规则
function fixArticleContent(content, title) {
  let fixed = content;

  // 1. 移除开头重复的一级标题（和文章标题一样的# 内容）
  const titleRegex = new RegExp(`^\\s*#\\s*${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\n`, 'i');
  fixed = fixed.replace(titleRegex, '');

  // 2. 清理公众号头部冗余信息：作者名、发布时间、定位、分享按钮等
  fixed = fixed.replace(/^\s*\[.*?\]\(javascript:void\(0\);\)\s*\n/gm, '');
  fixed = fixed.replace(/^\s*_\d{4}年\d{2}月\d{2}日.*?_\s*\n/gm, '');
  fixed = fixed.replace(/^\s*_上海\s*_\s*\n/gm, '');
  fixed = fixed.replace(/^\s*\[天乙师兄\]\(javascript:void\(0\);\)\s*\n/gm, '');
  fixed = fixed.replace(/^\s*©.*天乙师兄.*\n/gm, '');

  // 3. 清理底部冗余内容
  fixed = fixed.replace(/\s*预览时标签不可点\s*\n/g, '');
  fixed = fixed.replace(/\s*阅读原文\s*(javascript:;)?\s*\n/g, '');
  fixed = fixed.replace(/\s*\*+\s*\n/g, '');
  fixed = fixed.replace(/\s*__\s*\n/g, '');
  fixed = fixed.replace(/\s*!\[作者头像\].*?\n/g, '');
  fixed = fixed.replace(/\s*微信扫一扫\s*.*?\n/g, '');
  fixed = fixed.replace(/\s*关注公众号.*?\n/g, '');

  // 4. 修复标题层级：将孤立的# 标题改为## 二级标题
  fixed = fixed.replace(/^#\s+(?!#)(.+)$/gm, (match, p1) => {
    // 跳过确实应该是一级标题的特殊情况（如果有的话）
    if (p1.trim() === '目录' || p1.trim() === '写在最后') return match;
    return `## ${p1}`;
  });

  // 5. 删除标题前多余的序号（如"1、"、"## 1、"、"### 4."等）
  fixed = fixed.replace(/^(#{1,3})\s*\d+[、.．]\s*/gm, '$1 ');

  // 6. 修复文字中间多余的空格（两个字之间有多个空格）
  fixed = fixed.replace(/([\u4e00-\u9fa5])\s+([\u4e00-\u9fa5])/g, '$1$2');

  // 7. 修复换行错误：段落之间保持一个空行，删除多余空行
  fixed = fixed.replace(/\n{3,}/g, '\n\n');

  // 8. 修复特殊符号前后的空格
  fixed = fixed.replace(/([，。！？；：”）】])\s+/g, '$1');
  fixed = fixed.replace(/\s+([“（【])/g, '$1');

  // 9. 清理前后空行
  fixed = fixed.trim();

  return fixed;
}

// 遍历所有文章
articles = articles.map(article => {
  const originalContent = article.content;
  const fixedContent = fixArticleContent(originalContent, article.title);

  if (originalContent !== fixedContent) {
    fixedCount++;
    console.log(`✅ 修复文章：${article.title}`);
    return { ...article, content: fixedContent };
  }

  return article;
});

// 保存修复后的内容
fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
const reactArticlesPath = path.join(__dirname, 'tyxs-react', 'public', 'articles.json');
fs.writeFileSync(reactArticlesPath, JSON.stringify(articles, null, 2), 'utf8');

console.log(`\n🎉 批量修复完成！共修复了 ${fixedCount} 篇文章的排版问题`);
console.log('修复的问题包括：');
console.log('• 重复的一级标题');
console.log('• 公众号冗余信息（作者、发布时间、定位、底部广告等）');
console.log('• 标题层级混乱（统一为##二级、###三级）');
console.log('• 多余的自动序号');
console.log('• 文字中间多余的空格');
console.log('• 换行错误和多余空行');
console.log('• 特殊符号前后的格式问题');
