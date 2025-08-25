import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ShoppingCart from './pages/shopping-cart';
import ProductDetail from './pages/product-detail';
import UserAccountDashboard from './pages/user-account-dashboard';
import CheckoutProcess from './pages/checkout-process';
import ProductCatalogBrowse from './pages/product-catalog-browse';
import UserAuthentication from './pages/user-authentication';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CheckoutProcess />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/user-account-dashboard" element={<UserAccountDashboard />} />
        <Route path="/checkout-process" element={<CheckoutProcess />} />
        <Route path="/product-catalog-browse" element={<ProductCatalogBrowse />} />
        <Route path="/user-authentication" element={<UserAuthentication />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
