import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { SearchLandingPage } from '../pages/SearchLandingPage';

export const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search-page/:searchTerm" element={<SearchLandingPage />} />
            </Routes>
        </Router>
    );
}