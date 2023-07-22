import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import StartPage from './pages/StartPage';
import Main from './pages/Main';
import QuestionPage from './pages/QuestionPage';
import ResultsPage from './pages/ResultsPage';
import ResultsFire from './pages/detailpages/ResultsFire';
import ResultsSoil from './pages/detailpages/ResultsSoil';
import ResultsWater from './pages/detailpages/ResultsWater';
import ResultsWind from './pages/detailpages/ResultsWind';
import Layout from './common/Layout';
import useGoogleSheet from './libs/googlesheet';

function App() {
  // const sheetId = '714994551';
  // const [googleSheetRows] = useGoogleSheet(sheetId);
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route element={<Layout />}>
        <Route path="/start" element={<StartPage />} />
        <Route path="/quest" element={<QuestionPage />} />
        <Route path="/result_fire" element={<ResultsFire />} />
        <Route path="/result_soil" element={<ResultsSoil />} />
        <Route path="/result_water" element={<ResultsWater />} />
        <Route path="/result_wind" element={<ResultsWind />} />
        <Route path="/result" element={<ResultsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
