import { SearchBar } from '../components/SearchBar';
import { useParams } from 'react-router-dom';
import { SearchList } from "../components/SearchList";
import { ProductConsumer } from '../util/ProductsContext';

export const SearchLandingPage = () => {
    console.log("SearchLandingPage");
    const { searchTerm } = useParams();
    const filteredList = (list) => {
        console.log("list:", list);
        const ret = list.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
        console.log("filteredList:", ret);
        return ret;
    }
    return (
        <div className="">
            <SearchBar />
            <ProductConsumer>
                {(products) => {
                    return (
                        <SearchList productList={filteredList(products)} searchTerm={searchTerm} />
                    )
                }}
            </ProductConsumer>
        </div>
    );
}

