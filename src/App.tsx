import Main from "components/Main";
import { AppProvider } from "context/appContext";
import "./App.css";

function App() {
  return (
    <div className="app-root">
      <AppProvider>
        <Main />
      </AppProvider>
    </div>
  );
}

export default App;
