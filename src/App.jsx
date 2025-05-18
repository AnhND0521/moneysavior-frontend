import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Statistics from "./pages/Statistics";
import Navbar from "./components/Navbar";
import History from "./pages/History";
import Chatbot from "./pages/Chatbot";
import Profile from "./pages/Profile";
import TransactionForm from "./pages/TransactionForm";
import { LoginProvider } from "./contexts/LoginContext";

function App() {
  return (
    <>
      <LoginProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="history" element={<History />} />
            <Route path="chatbot" element={<Chatbot />} />
            <Route path="profile" element={<Profile />} />
            <Route path="transactions/add" element={<TransactionForm />} />
            <Route
              path="transactions/edit/:uuid"
              element={<TransactionForm />}
            />
          </Routes>
          <Navbar />
        </BrowserRouter>
      </LoginProvider>
    </>
  );
}

export default App;
