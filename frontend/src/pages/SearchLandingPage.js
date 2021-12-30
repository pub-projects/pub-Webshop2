import { ProductConsumer } from "../App";
import { SearchList } from "../components/SearchList";

export const SearchLandingPage = () => {

    return (
        <ProductConsumer>
            <div className="">
                <SearchList />
            </div>
        </ProductConsumer>

    );
}