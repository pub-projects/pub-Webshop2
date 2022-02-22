import { ProductItem } from "./ProductItem";
import { Profiler, proCB } from '../util/Profiler';

export const SearchList = (props) => {
    console.log("SearchList:", props);

    const products = props.productList;
    const length = products.length;

    return (
        <><Profiler id="SearchList" onRender={proCB} />
            {length > 1 || length === 0 ?
                <div className="search-result">The search for "{props["searchTerm"]}" gave {length} results.</div>
                : <div className="search-result">The search for "{props["searchTerm"]}" gave {length} result.</div>}
            <div className="card-group">
                {
                    products.map((item, key) => {
                        return (
                            <ProductItem key={key} product={item} />
                        );
                    })
                }
            </div>
        </>
    );
}
