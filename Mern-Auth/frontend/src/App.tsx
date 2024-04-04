import React from "react"

import { BrowserRouter, Route, Routes } from "react-router-dom"
const SignUp = React.lazy(() => import('./pages/SignUp'));
const SignIn = React.lazy(() => import('./pages/SignIn'));
const Home = React.lazy(() => import('./pages/Home'));
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
const App = () => {
  return (
    <BrowserRouter>
      
      <Routes>
       <Route element={<PrivateRoute />}>
       <Route path="/profile" element={<Profile />} />
       </Route>
       <Route path="/" element={<Home />} />

        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />

      </Routes>

    </BrowserRouter>

  )
}

export default App