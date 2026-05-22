import { Link } from 'react-router-dom';
import BeadPatternGenerator from '../tools/BeadPatternGenerator';

const Home = () => {
  return (
    <div id="home">
      <div className="tool-home-hero">
        <div>
          <p className="tool-home-kicker">TYXS 工具导航</p>
          <h1>实用小工具集合</h1>
          <p>把常用的图片、学习和传统文化工具放在一个入口里，打开就能用。</p>
        </div>
        <div className="tool-home-links">
          <Link to="/tools">学习工具</Link>
          <Link to="/articles">文章专区</Link>
          <Link to="/contact">联系方式</Link>
        </div>
      </div>

      <BeadPatternGenerator />

      <div className="tool-nav-grid">
        <Link to="/tools" className="tool-nav-card">
          <strong>学习工具</strong>
          <span>健康指南、八字十神等站内工具。</span>
        </Link>
        <Link to="/articles" className="tool-nav-card">
          <strong>文章专区</strong>
          <span>整理过的学习笔记和专题文章。</span>
        </Link>
        <Link to="/contact" className="tool-nav-card">
          <strong>联系方式</strong>
          <span>需要定制工具或交流想法可以从这里联系。</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
