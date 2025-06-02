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
import BankAccountForm from "./pages/BankAccountForm";
import BankQRCode from "./pages/BankQRCode";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <>
      <LoginProvider>
        <BrowserRouter>
          <Routes>
            <Route path="profile" element={<Profile />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="statistics"
              element={
                <RequireAuth>
                  <Statistics />
                </RequireAuth>
              }
            />
            <Route
              path="history"
              element={
                <RequireAuth>
                  <History />
                </RequireAuth>
              }
            />
            <Route
              path="chatbot"
              element={
                <RequireAuth>
                  <Chatbot />
                </RequireAuth>
              }
            />
            <Route
              path="transactions/add"
              element={
                <RequireAuth>
                  <TransactionForm />
                </RequireAuth>
              }
            />
            <Route
              path="transactions/edit/:uuid"
              element={
                <RequireAuth>
                  <TransactionForm />
                </RequireAuth>
              }
            />
            <Route
              path="bank"
              element={
                <RequireAuth>
                  <BankAccountForm />
                </RequireAuth>
              }
            />
            <Route
              path="bank/qr"
              element={
                <RequireAuth>
                  <BankQRCode />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Home />} />
          </Routes>
          <Navbar />
        </BrowserRouter>
      </LoginProvider>
    </>
  );
}

export default App;
