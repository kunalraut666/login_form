import React from "react";
import "./styles.css";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountBox from "./components/accountBox/index";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";


const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function App() {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<AccountBox />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
            } />
        </Routes>
      </AppContainer>
    </Router>
  );
}
