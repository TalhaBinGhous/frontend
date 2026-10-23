import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <main className="container py-5">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element= {<Contact/>}  />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </main>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;