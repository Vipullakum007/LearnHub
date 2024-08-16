import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import Course from "./pages/Course";
import { Problem } from "./pages/Problem";
import { AddProblem } from "./pages/AddProblem";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/about" element={<About />} />
          <Route path="/problem" element={<Problem />} />
          <Route path="/addproblem" element={<AddProblem />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
