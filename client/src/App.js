import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { themeSettings } from "theme";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import Admin from "scenes/admin"
import Recommandations from "scenes/recommandations"
import Breakdown from "scenes/breakdown"
import Support from "scenes/support"


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="<app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<Navigate to ="/dashboard" replace/>}/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/recommandations" element={<Recommandations />} />
            <Route path="/breakdown" element={<Breakdown />} />
            <Route path="/Support" element={<Support/>} />

          </Route>
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
