import MainForm from "components/MainForm";
import "./App.css";

function App() {
  return (
    <div className="app-root">
      <h1 className="text-3xl font-bold text-red-600 mb-3">DistanceFinder</h1>
      <h2 className="text-xl font-bold text-red-600 mb-3">
        ¡Find the distance between two given address!
      </h2>
      <MainForm />
    </div>
  );
}

export default App;
