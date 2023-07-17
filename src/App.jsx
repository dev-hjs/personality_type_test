import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Main from './pages/Main';
import QuestionPage from './pages/QuestionPage';
import ResultsPage from './pages/ResultsPage';
import Layout from './common/Layout';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/quest" element={<QuestionPage />} />
        <Route path="/result" element={<ResultsPage />} />
      </Route>
    </Routes>
  );
}

export default App;

///ㅇㅇㅇㅇ
