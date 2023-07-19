import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Main from './pages/Main';
import QuestionPage from './pages/QuestionPage';
import ResultsPage from './pages/ResultsPage';
import Layout from './common/Layout';
import useGoogleSheet from './libs/googlesheet';

function App() {
  // const sheetId = '714994551';
  // const [googleSheetRows] = useGoogleSheet(sheetId);
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
