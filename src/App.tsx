import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "components/Main";
import ResultsPage from "components/ResultsPage";
import { AppProvider } from "context/appContext";
import "./App.css";

function App() {
  return (
    <div className="app-root">
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
