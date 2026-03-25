const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 配置
const PROJECT_DIR = __dirname;
const LOG_FILE = path.join(PROJECT_DIR, 'sync_logs.txt');
const COMMIT_MESSAGE = '🔄 自动同步文章更新';

// 日志函数
function log(message) {
  const time = new Date().toLocaleString('zh-CN');
  const logMessage = `[${time}] ${message}\n`;
  console.log(logMessage.trim());
  fs.appendFileSync(LOG_FILE, logMessage, 'utf8');
}

try {
  log('=== 开始同步任务 ===');

  // 1. 进入项目目录
  process.chdir(PROJECT_DIR);
  log(`进入项目目录: ${PROJECT_DIR}`);

  // 2. 拉取最新代码，避免冲突
  log('拉取远程最新代码...');
  execSync('git pull origin gh-pages', { stdio: 'inherit' });

  // --------------------------
  // 这里添加你的文章同步逻辑
  // 比如：从指定目录复制新文章、爬取更新、处理markdown等
  // 如果你之前有同步逻辑，粘贴到这里
  // --------------------------
  log('执行文章同步逻辑...');
  // 示例：如果你需要执行之前的文章处理脚本，取消注释下面一行
  // execSync('node your_article_sync_script.js', { stdio: 'inherit' });

  // 3. 检查是否有文件变更
  log('检查文件变更...');
  const status = execSync('git status --porcelain', { encoding: 'utf8' }).trim();

  if (!status) {
    log('没有检测到文章变更，任务结束');
    process.exit(0);
  }

  log(`检测到变更:\n${status}`);

  // 4. 提交变更
  log('提交变更到Git...');
  execSync('git add .', { stdio: 'inherit' });
  execSync(`git commit -m "${COMMIT_MESSAGE}"`, { stdio: 'inherit' });

  // 5. 推送到GitHub
  log('推送到远程仓库...');
  execSync('git push origin gh-pages', { stdio: 'inherit' });

  log('=== 同步任务完成，已推送至GitHub ===\n');

} catch (error) {
  log(`❌ 同步失败: ${error.message}`);
  process.exit(1);
}
