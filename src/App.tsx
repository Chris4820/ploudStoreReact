import { Routes, Route, BrowserRouter } from "react-router-dom"
import SettingsLayout from "./layouts/dashboard/NavBarLayout/SettingsLayout"
import IntegrationPage from "./features/integrations/pages/IntegrationPage"
import ShopsIndexPage from "./features/stores/pages/StoresIndexPage"
import SetupPage from "./features/stores/pages/CreateStorePage"
import EngagamentLayout from "./layouts/dashboard/NavBarLayout/EngagamentLayout"
import CreateDiscountPage from "./features/coupons/pages/createCouponPage"
import SubCategoryIdPage from "./features/products/pages/ProductsSubCategoriePage"
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
import CreatePackagePage from "./features/products/pages/createProduct"
import ProfilePage from "./features/profile/pages/ProfilePage"
import DashboardHomePage from "./features/home/pages/DashboardHomePage"
import CouponReportPage from "./features/statistic/pages/CouponReportPage"
import CouponPage from "./features/coupons/pages/couponsPage"
import EditCouponPage from "./features/coupons/pages/editCouponPage"
import EditProductPage from "./features/products/pages/editProductPage"
import DashboardLayout from "./layouts/dashboard/SlideMenu"
import SettingsPage from "./features/settings/pages/settingsPage"
import WidgetsPage from "./features/widgets/pages/WidgetsPage"
import CreateWidgetPage from "./features/widgets/pages/CreateWidgetPage"
import CreateWidgetGoal from "./features/widgets/pages/createGoal"
import CheckoutPage from "./features/gateways/pages/CheckoutPage"
import PaypalPage from "./features/gateways/pages/PaypalPage"
import StripePage from "./features/gateways/pages/StripePage"
import IntegrationServerPage from "./features/integrations/pages/IntegrationServerPage"
import CreateFeaturedProduct from "./features/widgets/pages/createFeaturedProduct"
import DomainPage from "./features/domain/pages/domainPage"
import CustomDomainPage from "./features/domain/pages/CustomDomainPage"
import ServerPage from "./features/server/pages/ServerPage"
import MercadoPagoPage from "./features/gateways/pages/MercadoPagoPage"
import MolliePage from "./features/gateways/pages/MolliePage"
import PagSeguroPage from "./features/gateways/pages/PagSeguroPage"
import CreateWidgetTopCostumersPage from "./features/widgets/pages/topClientsWidgetPage"
import CreateWidgetRecentPayments from "./features/widgets/pages/createRecentPaymentsWidgetPage"
import DiscordIntegrationSection from "./features/integrations/components/DiscordIntegrationSection"
import CreateVariablesPage from "./features/variables/pages/CreateVariablesPage"
import VariablesPage from "./features/variables/pages/VariablesPage"
import EditVariablesPage from "./features/variables/pages/EditVariablesPage"
import PlanPage from "./features/plan/pages/PlanPage"
import SubUserPage from "./features/subusers/Pages/SubUserPage"
import CreateSubUserPage from "./features/subusers/Pages/CreateSubUserPage"
import InvitesPage from "./features/subusers/Pages/InvitesPage"
import SubUserLayout from "./layouts/dashboard/NavBarLayout/SubUserLayout"
import RolesPage from "./features/roles/Pages/RolesPage"
import CreateRolePage from "./features/roles/Pages/CreateRole"
import DesignPage from "./features/design/Pages/designPage"
import NewsPage from "./features/news/pages/NewsPage"
import CreateNewPage from "./features/news/pages/CreateNewPage"
import EditNewPage from "./features/news/pages/EditBlogPage"


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
           <Route path="/dashboard/product/edit/:productId" element={<EditProductPage/>} />
           <Route path="/dashboard/product/create/:categoryId" element={<CreatePackagePage/>}/>


           <Route path="design" element={<DesignPage/>}>
           //Design aqui
           </Route>

           <Route path="engagement" element={<EngagamentLayout/>}>
              <Route path="/dashboard/engagement" element={<CouponPage/>}/>
              <Route path="/dashboard/engagement/coupons/edit/:couponId" element={<EditCouponPage/>}/>
              <Route path="/dashboard/engagement/coupons/create" element={<CreateDiscountPage/>}/>
              <Route path="/dashboard/engagement/news" element={<NewsPage/>}/>
              <Route path="/dashboard/engagement/news/create" element={<CreateNewPage/>}/>
              <Route path="/dashboard/engagement/news/edit/:id" element={<EditNewPage/>}/>
           </Route>
            <Route path="/dashboard/subuser/invite/:id" element={<InvitesPage/>}/>

            <Route path="subuser" element={<SubUserLayout/>}>
              <Route path="/dashboard/subuser" element={<SubUserPage/>}/>
              <Route path="/dashboard/subuser/create" element={<CreateSubUserPage/>}/>
              <Route path="/dashboard/subuser/roles" element={<RolesPage/>}/>
              <Route path="/dashboard/subuser/roles/create" element={<CreateRolePage/>}/>
            </Route>

            

           <Route path="settings" element={<SettingsLayout/>}>
              <Route path="/dashboard/settings" element={<SettingsPage/>}/>
              <Route path="/dashboard/settings/checkout" element={<CheckoutPage/>}/>
                  <Route path="/dashboard/settings/checkout/paypal" element={<PaypalPage/>}/>
                  <Route path="/dashboard/settings/checkout/stripe" element={<StripePage/>}/>
                  <Route path="/dashboard/settings/checkout/mercadopago" element={<MercadoPagoPage/>}/>
                  <Route path="/dashboard/settings/checkout/mollie" element={<MolliePage/>}/>
                  <Route path="/dashboard/settings/checkout/pagseguro" element={<PagSeguroPage/>}/>
              <Route path="/dashboard/settings/integration" element={<IntegrationPage/>}/>
              <Route path="/dashboard/settings/integration" element={<IntegrationPage/>}/>
              <Route path="/dashboard/settings/integration/server" element={<IntegrationServerPage/>}/>
              <Route path="/dashboard/settings/integration/discord" element={<DiscordIntegrationSection/>}/>
              <Route path="/dashboard/settings/integration/:type/edit/:id" element={<ServerPage/>}/>
              <Route path="/dashboard/settings/widgets" element={<WidgetsPage/>}/>
              <Route path="/dashboard/settings/widgets/edit" element={<CreateWidgetPage/>}/>
              <Route path="/dashboard/settings/widgets/edit/goal" element={<CreateWidgetGoal/>}/>
              <Route path="/dashboard/settings/widgets/edit/featuredProduct" element={<CreateFeaturedProduct/>}/>
              <Route path="/dashboard/settings/widgets/edit/topCustomers" element={<CreateWidgetTopCostumersPage/>}/>
              <Route path="/dashboard/settings/widgets/edit/recentPayments" element={<CreateWidgetRecentPayments/>}/>
              
              <Route path="/dashboard/settings/variable" element={<VariablesPage/>}/>
              <Route path="/dashboard/settings/variable/create" element={<CreateVariablesPage/>}/>
              <Route path="/dashboard/settings/variable/edit/:variableId" element={<EditVariablesPage/>}/>
              <Route path="/dashboard/settings/domain" element={<DomainPage/>}/>
              <Route path="/dashboard/settings/domain/custom" element={<CustomDomainPage/>}/>
           </Route>
           <Route path="/dashboard/plan" element={<PlanPage/>}/>
         </Route>

       </Routes>
     </BrowserRouter>
   </div>
 )
}

export default App