import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Form from "./Form";
import Form2 from "./Form2";
import Success from "./Success";
import HomePage from "./HomePage";
import { MainLayout } from "./components";
import ShowComponents from "./ShowComponents";

export default function App() {
  return (
    <>
      <Router basename="/carreata">
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/form" element={<Form />} />
            <Route path="/form2" element={<Form2 />} />
            <Route path="/success" element={<Success />} />
            <Route path="/components" element={<ShowComponents />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
