import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';
import LearningTools from './pages/LearningTools';
import Contact from './pages/Contact';

function App() {
  return (
    <Router basename="/tyxs-site/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path="articles/:id" element={<ArticleDetail />} />
          <Route path="tools" element={<LearningTools />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
