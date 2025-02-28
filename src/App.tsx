import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AboutUs from './pages/AboutUs'
import Theme from './context/Theme'
import Navigation from './pages/Navigation'
import SignIn from './pages/SignIn'
import Auth from './context/Auth'
import Profile from './pages/Profile'




const App = () => {
  return <div>
    <BrowserRouter>
      <Theme>
        <Auth>
        <Routes>
          <Route element={<Navigation />}>
          
          <Route index element={<AboutUs />} />
          <Route path="sign_in" element={<SignIn />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
          
          </Route>
        </Routes>
        </Auth>
      </Theme>
    </BrowserRouter>
  </div>
}

export default App
