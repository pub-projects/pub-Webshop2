import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/HomePage';
import { SearchLandingPage } from '../pages/SearchLandingPage';
import { ProductPage } from '../pages/ProductPage';
import ErrorBoundary from './ErrorBoundary';

export const Routing = () => {
    return (
        <ErrorBoundary>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search-page/:searchTerm" element={<SearchLandingPage />} />
                    <Route path="/product-page/:id" element={<ProductPage />} />
                </Routes>
            </Router>
        </ErrorBoundary>
    );
}