import { Routes, Route, BrowserRouter } from "react-router-dom"
import DashboardLayout from "./layouts/dashboard/SlideMenu"
import Home from "./pages/dashboard/Home"
import SettingsLayout from "./layouts/dashboard/NavBarLayout/SettingsLayout"
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
import EngagamentLayout from "./layouts/dashboard/NavBarLayout/EngagamentLayout"
import DiscountPage from "./pages/dashboard/engagament/discount/discounts"
import CategoriePage from "./pages/dashboard/categories/categoriePage"
import CategoryIdPage from "./pages/dashboard/categories/[categoryId]/CategoryIdPage"
import GoalPage from "./pages/dashboard/engagament/goalPage"
import CreateDiscountPage from "./pages/dashboard/engagament/discount/createDiscount/createDiscountPage"
import DesignPage from "./pages/dashboard/design/DesignPage"
import CheckoutPage from "./pages/Settings/checkout/CheckoutPage"
import StatisticPage from "./pages/dashboard/statistic/statistic"
import EditorPage from "./pages/editor/EditorPage"
import DesignLayout from "./layouts/dashboard/NavBarLayout/DesignLayout"
import TemplatePage from "./pages/dashboard/design/template/TemplatePage"
import EditPackagePage from "./pages/dashboard/categories/product/editPackage"
import CreatePackagePage from "./pages/dashboard/categories/product/createPackage"
import CreateCategoryPage from "./pages/dashboard/categories/category/createCategoryPage"
import EditCategoryPage from "./pages/dashboard/categories/category/editCategoryPage"
import SubCategoryIdPage from "./pages/dashboard/categories/[categoryId]/[subCategoryId]/SubCategoryPage"
import VariablePage from "./pages/Settings/variables/variablePage"
import CreateVariablePage from "./pages/Settings/variables/createVariablePage"
import CategoriesPage from "./pages/dashboard/statistic/Categorie/CategoriePage"
import CustomersPage from "./pages/dashboard/statistic/Customers/customersPage"
import EditServerPage from "./pages/Settings/integration/server/edit/editServerPage"
import HistoryGoalPage from "./pages/dashboard/engagament/goals/historyGoal"

function App() {
 return (
   <div className="App">
     <BrowserRouter>
       <Routes>
        <Route path="/" element={<ShopsIndexPage/>}/>
        <Route path="/setup" element={<SetupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editor" element={<EditorPage />} />

        <Route path="auth" element={<AuthLayout/>}>
          <Route path="/auth/login" element={<LoginPage/>}/>
          <Route path="/auth/register" element={<RegisterPage/>}/>
          <Route path="/auth/recovery-password" element={<RecoveryPasswordPage/>}/>
          <Route path="/auth/recovery-password/:passwordToken" element={<ResetPasswordPage/>}/>
          <Route path="/auth/confirm-email/:emailToken" element={<ConfirmEmailPage/>}/>
        </Route>
         <Route path="dashboard" element={<DashboardLayout />} >
           <Route path="/dashboard" element={<Home />} />
           <Route path="/dashboard/statistic" element={<StatisticPage />} />
           <Route path="/dashboard/statistic/categories" element={<CategoriesPage />} />
           <Route path="/dashboard/statistic/customers" element={<CustomersPage />} />
           <Route path="/dashboard/payments" element={<PaymentsPage/>} />


          //CATEGORY
           <Route path="/dashboard/categorie" element={<CategoriePage/>}/>
           <Route path="/dashboard/categorie/:categoryId" element={<CategoryIdPage/>} />
           <Route path="/dashboard/categorie/:categoryId/:subCategoryId" element={<SubCategoryIdPage/>} />
           <Route path="/dashboard/category/create" element={<CreateCategoryPage/>} />
           <Route path="/dashboard/category/edit/:categoryId" element={<EditCategoryPage/>} />

          //PRODUCTS
           <Route path="/dashboard/product/edit/:productId" element={<EditPackagePage/>}/>
           <Route path="/dashboard/product/create/:categoryId" element={<CreatePackagePage/>}/>


           <Route path="design" element={<DesignLayout/>}>
            <Route path="/dashboard/design" element={<DesignPage/>}/>
            <Route path="/dashboard/design/templates" element={<TemplatePage/>}/>
           </Route>

           <Route path="engagement" element={<EngagamentLayout/>}>
           <Route path="/dashboard/engagement" element={<DiscountPage/>}/>
              <Route path="/dashboard/engagement/discount" element={<DiscountPage/>}/>
              <Route path="/dashboard/engagement/discount/create" element={<CreateDiscountPage/>}/>
              <Route path="/dashboard/engagement/goal" element={<GoalPage/>}/>
              <Route path="/dashboard/engagement/goal/history" element={<HistoryGoalPage/>}/>
           </Route>

           <Route path="settings" element={<SettingsLayout/>}>
              <Route path="/dashboard/settings" element={<SettingsPage/>}/>
              <Route path="/dashboard/settings/checkout" element={<CheckoutPage/>}/>
              <Route path="/dashboard/settings/integration" element={<IntegrationPage/>}/>
              <Route path="/dashboard/settings/integration" element={<IntegrationPage/>}/>
              <Route path="/dashboard/settings/integration/:type" element={<IntegrationTypePage/>}/>
              <Route path="/dashboard/settings/integration/:type/edit/:id" element={<EditServerPage/>}/>
              <Route path="/dashboard/settings/widgets" element={<WidgetsPage/>}/>
              
              <Route path="/dashboard/settings/variable" element={<VariablePage/>}/>
              <Route path="/dashboard/settings/createvariable" element={<CreateVariablePage/>}/>
              <Route path="/dashboard/settings/domain" element={<DomainPage/>}/>
           </Route>
         </Route>

       </Routes>
     </BrowserRouter>
   </div>
 )
}

export default App