import { useEffect, useState } from "react"
import{ useDispatch } from "react-redux"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import  authService   from './appwrite/auth'
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { login, logout } from "./store/authSlice";


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData }));
        else dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <Router>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className="w-full block">
          <Header />
          <main>
            <Routes>
              {/* Define routes here */}
              {/* TODO: Add other routes as needed */}
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  ) : null;
}

export default App;
