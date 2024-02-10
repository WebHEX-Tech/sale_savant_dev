import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import * as scenes from "./scenes/index";
import * as pages from "./pages/index";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<pages.Login />} />

            {/* Admin Routes */}
            <Route element={<scenes.Layout />}>
              <Route path="/home" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<scenes.Dashboard />} />

              {/* Menu Management Routes */}
              <Route path="/menu management" element={<scenes.MenuManagement />} />
              <Route path="/menu inventory" element={<scenes.MenuInventory/>} />
              <Route path="/menu loss" element={<scenes.MenuLoss/>} />
              <Route path="/menu promos" element={<scenes.MenuPromos/>} />
              {/* Modules */}
              <Route path="/add inventory" element={<scenes.AddInventory />} />
              <Route path="/add menu" element={<scenes.AddMenu />} />
              <Route path="/add loss" element={<scenes.AddLoss/>} />
              <Route path="/add promo" element={<scenes.AddPromo/>} />
              <Route path={`/edit menu/:id`} element={<scenes.EditMenu />} />
              <Route path={`/edit inventory/:id`} element={<scenes.EditInventory />} />
              <Route path={`/edit loss/:id`} element={<scenes.EditMenuLoss/>} />

              {/* Account Management Routes */}
              <Route path="/account management" element={<scenes.AccountManagement/>} />
              <Route path="/manager accounts" element={<scenes.ManagerAcc/>} />
              <Route path="/cashier accounts" element={<scenes.CashierAcc/>} />

              <Route path="/reports/rep-sales" element={<scenes.RepSales />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
