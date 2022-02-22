import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/HomePage';
import { SearchLandingPage } from '../pages/SearchLandingPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

import ErrorBoundary from './ErrorBoundary';
import { Profiler, proCB } from '../util/Profiler';

export const Routing = () => {
    return (
        <ErrorBoundary>
            <Router>
                <Profiler id="Routing" onRender={proCB} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search-page/:searchTerm" element={<SearchLandingPage />} />
                    <Route path="/product-page/:id" element={<ProductPage />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
            </Router>
        </ErrorBoundary>
    );
}