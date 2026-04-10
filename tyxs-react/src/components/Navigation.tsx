import { NavLink, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="nav-bar">
      <div className="nav">
        <NavLink to="/" className={`nav-btn ${isActive('/') ? 'active' : ''}`}>
          首页
        </NavLink>
        <NavLink to="/articles" className={`nav-btn ${isActive('/articles') ? 'active' : ''}`}>
          文章专区
        </NavLink>
        <NavLink to="/tools" className={`nav-btn ${isActive('/tools') ? 'active' : ''}`}>
          学习工具
        </NavLink>
        <NavLink to="/iching.html" className={`nav-btn ${isActive('/iching.html') ? 'active' : ''}`}>
          易经专区
        </NavLink>
        <NavLink to="/contact" className={`nav-btn ${isActive('/contact') ? 'active' : ''}`}>
          联系方式
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
