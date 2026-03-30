import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import FloatButton from './FloatButton';
import BackButton from './BackButton';

const Layout = () => {
  const location = useLocation();
  const showBackButton = location.pathname !== '/';

  return (
    <>
      {/* 背景元素 */}
      <div className="ink-bg">
        <div className="ink-drop"></div>
        <div className="ink-drop"></div>
        <div className="ink-drop"></div>
      </div>
      <div className="bg-symbol"></div>
      <div className="compass-pointer"></div>

      {/* 导航 */}
      <Navigation />

      {/* 主内容 */}
      <div className="container">
        <Outlet />
      </div>

      {/* 悬浮按钮 */}
      <FloatButton />
      {showBackButton && <BackButton />}

      {/* 页脚 */}
      <footer>
        <p>© 2026 天乙笔记 · 传统文化传承</p>
      </footer>
    </>
  );
};

export default Layout;
