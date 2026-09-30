import Header from "./components/Header";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

function isDashboard() {
  return window.location.pathname.replace(/\/$/, "") === "/dashboard";
}

export default function App() {
  return (
    <>
      <Header />
      <main>{isDashboard() ? <Dashboard /> : <Home />}</main>
    </>
  );
}