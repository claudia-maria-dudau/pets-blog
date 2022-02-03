import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// styles
import "./App.css"

// pages
import Home from './pages/home/Home'
import Articles from './pages/articles/Articles'
import Article from './components/article/Article'
import Create from './pages/create/Create'
import Edit from './pages/edit/Edit'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Profile from './pages/profile/Profile'

// components
import NavigationBar from './components/navigation-bar/NavigationBar'
import AlertIsPending from './components/AlertIsPending'

function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      {!authIsReady && <AlertIsPending />}

      {authIsReady && (
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route path="/home" 
              element={<Home />} 
            />
            <Route path="/articles" 
              element={<Articles />} 
            />
            <Route path="/articles/:id"
              element={<Article />}
            />
            <Route path="/create"
              element={user ? <Create /> : <Navigate to="/home" />}
            />
            <Route path="/edit/:id"
              element={user ? <Edit /> : <Navigate to="/home" />}
            />
            <Route path="/login" 
              element={!user ? <Login /> : <Navigate to="/home" />} 
            />
            <Route path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/home" />}
            />
            <Route path="/profile" 
              element={user ? <Profile /> : <Navigate to="/home" />}
            />
            <Route path="*" 
              element={<Navigate to="/home" />} 
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
