import { Routes, Route, BrowserRouter } from "react-router-dom"
import DashboardLayout from "./layouts/dashboard/SlideMenu"
import Home from "./pages/Home"
import SettingsLayout from "./layouts/dashboard/SettingsLayout"
import SettingsPage from "./pages/Settings/settings"
import DomainPage from "./pages/Settings/domain"
import IntegrationPage from "./pages/Settings/integration/integration"
import IntegrationTypePage from "./pages/Settings/integration/[type]/integrationType"
import ProfilePage from "./pages/dashboard/Profile/ProfilePage"
import WidgetsPage from "./pages/Settings/widgets/WidgetsPage"
import ShopsIndexPage from "./pages/ShopsIndex"
import LoginPage from "./pages/auth/login/loginPage"
import AuthLayout from "./layouts/auth/authLayout"
import RegisterPage from "./pages/auth/register/registerPage"
import RecoveryPasswordPage from "./pages/auth/recovery-password/RecoveryPasswordPage"
import ResetPasswordPage from "./pages/auth/recovery-password/[token]/ResetPasswordPage"
import ConfirmEmailPage from "./pages/auth/confirm-email/[token]/confirmEmailPage"
import PaymentsPage from "./pages/dashboard/payments/paymentPage"
import SetupPage from "./pages/setup/setupPage"

function App() {
 return (
   <div className="App">
     <BrowserRouter>
       <Routes>
        <Route path="/" element={<ShopsIndexPage/>}/>
        <Route path="/setup" element={<SetupPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="auth" element={<AuthLayout/>}>
          <Route path="/auth/login" element={<LoginPage/>}/>
          <Route path="/auth/register" element={<RegisterPage/>}/>
          <Route path="/auth/recovery-password" element={<RecoveryPasswordPage/>}/>
          <Route path="/auth/recovery-password/:passwordToken" element={<ResetPasswordPage/>}/>
          <Route path="/auth/confirm-email/:emailToken" element={<ConfirmEmailPage/>}/>
        </Route>
         <Route path="dashboard" element={<DashboardLayout />} >
           <Route path="/dashboard" element={<Home />} />
           <Route path="/dashboard/payments" element={<PaymentsPage/>} />
           <Route path="settings" element={<SettingsLayout/>}>
              <Route path="/dashboard/settings" element={<SettingsPage/>}/>
              <Route path="/dashboard/settings/integration" element={<IntegrationPage/>}/>
              <Route path="/dashboard/settings/integration/:type" element={<IntegrationTypePage/>}/>
              <Route path="/dashboard/settings/widgets" element={<WidgetsPage/>}/>
              <Route path="/dashboard/settings/domain" element={<DomainPage/>}/>
           </Route>
         </Route>
       </Routes>
     </BrowserRouter>
   </div>
 )
}

export default App