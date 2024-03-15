import { Routes, Route, BrowserRouter } from "react-router-dom"
import DashboardLayout from "./layouts/dashboard/SlideMenu"
import Home from "./pages/Home"
import About from "./pages/About"
import SettingsLayout from "./layouts/dashboard/SettingsLayout"
import SettingsPage from "./pages/Settings/settings"
import DomainPage from "./pages/Settings/domain"
import IntegrationPage from "./pages/Settings/integration/integration"
import IntegrationTypePage from "./pages/Settings/integration/[type]/integrationType"

function App() {
 return (
   <div className="App">
     <BrowserRouter>
       <Routes>
         <Route path="dashboard" element={<DashboardLayout />} >
           <Route path="/dashboard" element={<Home />} />
           <Route path="/dashboard/about" element={<About />} />
           <Route path="settings" element={<SettingsLayout/>}>
              <Route path="/dashboard/settings" element={<SettingsPage/>}/>
              <Route path="/dashboard/settings/integration" element={<IntegrationPage/>}/>
              <Route path="/dashboard/settings/integration/:type" element={<IntegrationTypePage/>}/>
              <Route path="/dashboard/settings/domain" element={<DomainPage/>}/>
           </Route>
         </Route>
       </Routes>
     </BrowserRouter>
   </div>
 )
}

export default App