import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import DashBoard from "./pages/DashBoard"
import Issue from "./pages/Issue"
import PrivateRoute from "./components/PrivateRoute"
import AdminRoute from "./components/AdminRoute"
import Users from "./pages/Users"
import Settings from "./pages/Settings"
import UpdateAccount from "./pages/UpdateAccount"
import { useSelector } from "react-redux"
import CreateIssue from "./pages/CreateIssue"

function App() {

  const {token} = useSelector((state: any) => state.user)

  return (
    <BrowserRouter>
    {token ? <NavBar /> : ""}
      <Routes>
       <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />} >
          <Route path="/create-issue" element={<CreateIssue />} />
          <Route path="/issues" element={<Issue />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/update-account" element={<UpdateAccount />} />

        </Route>
        <Route element={<AdminRoute/>} >
        <Route path="/all-users" element={<Users />} />
        <Route path="/dashboard" element={<DashBoard />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
