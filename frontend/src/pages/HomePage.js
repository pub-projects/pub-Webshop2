import { ProductList } from '../components/ProductList';
import { SearchBar } from '../components/SearchBar';

export const Home = () => {


    // const pageData = loadContent();

    return (
        <div className="page-container">
            <SearchBar />
            <ProductList />
        </div>
    );
};