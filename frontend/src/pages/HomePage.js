import { ProductList } from '../components/ProductList';
import { SearchBar } from '../components/SearchBar';
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
    console.log("Profiler:", id + " " + phase);
    // console.log("Profiler - phase:", phase);
    // console.log("Profiler - actualDuration:", actualDuration);
    // console.log("Profiler - baseDuration:", baseDuration);
    // console.log("Profiler - startTime:", startTime);
    // console.log("Profiler - commitTime:", commitTime);
    // console.log("Profiler - interactions:", interactions);
}

export const Home = () => {


    // const pageData = loadContent();

    return (
        <Profiler id="HomePage" onRender={profilerCallback}>
            <div className="page-container">
                <SearchBar />
                <ProductList />
            </div>
        </Profiler>
    );
};