import { ProductList } from '../components/ProductList';
import { SearchBar } from '../components/SearchBar';
import { Profiler, proCB } from '../util/Profiler';

export const Home = () => {

    return (
        <div className="page-container">
            <Profiler id="HomePage" onRender={proCB} />
            <SearchBar />
            <ProductList />
        </div>
    );
};