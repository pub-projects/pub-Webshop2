import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/HomePage';
import { SearchLandingPage } from '../pages/SearchLandingPage';
import { ProductPage } from '../pages/ProductPage';
import ErrorBoundary from './ErrorBoundary';
import { Profiler } from 'react';

const profilerCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
) => {
    console.log("Profiler:", id + " " + phase + " : " + interactions);
    //console.log("Profiler - phase:", phase);
    // console.log("Profiler - actualDuration:", actualDuration);
    // console.log("Profiler - baseDuration:", baseDuration);
    // console.log("Profiler - startTime:", startTime);
    // console.log("Profiler - commitTime:", commitTime);
    // console.log("Profiler - interactions:", interactions);
}


export const Routing = () => {
    return (
        <Profiler id="Routing" onRender={profilerCallback}>
            <ErrorBoundary>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search-page/:searchTerm" element={<SearchLandingPage />} />
                        <Route path="/product-page/:id" element={<ProductPage />} />
                    </Routes>
                </Router>
            </ErrorBoundary>
        </Profiler>
    );
}