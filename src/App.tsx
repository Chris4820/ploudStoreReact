import { Routes, Route, BrowserRouter } from "react-router-dom"
import DashboardLayout from "./layouts/dashboard/SlideMenu"
import SettingsLayout from "./layouts/dashboard/NavBarLayout/SettingsLayout"
import SettingsPage from "./pages/Settings/settings"
import DomainPage from "./pages/Settings/domain"
import IntegrationPage from "./pages/Settings/integration/integration"
import IntegrationTypePage from "./pages/Settings/integration/[type]/integrationType"
import WidgetsPage from "./pages/Settings/widgets/WidgetsPage"
import ShopsIndexPage from "./features/stores/pages/StoresIndexPage"
import SetupPage from "./features/stores/pages/CreateStorePage"
import EngagamentLayout from "./layouts/dashboard/NavBarLayout/EngagamentLayout"
import GoalPage from "./pages/dashboard/engagament/goalPage"
import CreateDiscountPage from "./features/coupons/pages/createCouponPage"
import DesignPage from "./pages/dashboard/design/DesignPage"
import CheckoutPage from "./pages/Settings/checkout/CheckoutPage"
import EditorPage from "./pages/editor/EditorPage"
import DesignLayout from "./layouts/dashboard/NavBarLayout/DesignLayout"
import TemplatePage from "./pages/dashboard/design/template/TemplatePage"
import SubCategoryIdPage from "./features/products/pages/ProductsSubCategoriePage"
import VariablePage from "./pages/Settings/variables/variablePage"
import CreateVariablePage from "./pages/Settings/variables/createVariablePage"
import EditServerPage from "./pages/Settings/integration/server/edit/editServerPage"
import HistoryGoalPage from "./pages/dashboard/engagament/goals/historyGoal"
import AuthLayout from "./features/auth/components/authLayout"
import LoginPage from "./features/auth/pages/loginPage"
import RegisterPage from "./features/auth/pages/registerPage"
import RecoveryPasswordPage from "./features/auth/pages/RecoveryPasswordPage"
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage"
import ConfirmEmailPage from "./features/auth/pages/confirmEmailPage"
import StatisticPage from "./features/statistic/pages/statisticPage"
import CategoriesPage from "./features/statistic/pages/CategoriePage"
import CustomersPage from "./features/statistic/pages/customersPage"
import PaymentsPage from "./features/payments/pages/paymentPage"
import CategoriePage from "./features/categories/pages/categoriesPage"
import CategoryIdPage from "./features/categories/pages/SubCategoriesPage"
import CreateCategoryPage from "./features/categories/pages/createCategoryPage"
import EditCategoryPage from "./features/categories/pages/editCategoryPage"
import EditPackagePage from "./features/products/pages/editProductPage"
import CreatePackagePage from "./features/products/pages/createProduct"
import ProfilePage from "./features/profile/pages/ProfilePage"
import DashboardHomePage from "./features/home/pages/DashboardHomePage"
import CouponReportPage from "./features/statistic/pages/CouponReportPage"
import CouponPage from "./features/coupons/pages/couponsPage"
import EditCouponPage from "./features/coupons/pages/editCouponPage"


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
           <Route path="/dashboard" element={<DashboardHomePage />} />
           <Route path="/dashboard/statistic" element={<StatisticPage />} />
           <Route path="/dashboard/statistic/categories" element={<CategoriesPage />}/>
           <Route path="/dashboard/statistic/customers" element={<CustomersPage />}/>
           <Route path="/dashboard/statistic/coupons" element={<CouponReportPage />}/>
           <Route path="/dashboard/payments" element={<PaymentsPage/>} />



          //CATEGORY
           <Route path="/dashboard/categories" element={<CategoriePage/>}/>
           <Route path="/dashboard/categories/:categoryId" element={<CategoryIdPage/>} />

           <Route path="/dashboard/categories/:categoryId/:subCategoryId" element={<SubCategoryIdPage/>} />

           <Route path="/dashboard/categories/create" element={<CreateCategoryPage/>} />
           <Route path="/dashboard/categories/edit/:id" element={<EditCategoryPage/>} />

          //PRODUCTS
           <Route path="/dashboard/products/edit/:productId" element={<EditPackagePage />} />
           <Route path="/dashboard/product/create/:categoryId" element={<CreatePackagePage/>}/>


           <Route path="design" element={<DesignLayout/>}>
            <Route path="/dashboard/design" element={<DesignPage/>}/>
            <Route path="/dashboard/design/templates" element={<TemplatePage/>}/>
           </Route>

           <Route path="engagement" element={<EngagamentLayout/>}>
              <Route path="/dashboard/engagement" element={<CouponPage/>}/>
              <Route path="/dashboard/engagement/coupons/edit/:couponId" element={<EditCouponPage/>}/>
              <Route path="/dashboard/engagement/coupons/create" element={<CreateDiscountPage/>}/>
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