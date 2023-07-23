import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import FormComponent from "./Components/FormComponents";
import ResultsPage from "./Components/ResultsPage";
import NavigationBar from "./Components/NavigationBar";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route index path="/" element={<FormComponent />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
