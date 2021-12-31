import { ProductItem } from "./ProductItem";

export const SearchList = (props) => {
    console.log("SearchList:", props);

    const products = props.productList;
    const length = products.length;

    return (
        <>
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
/*products.filter(product =>
                            product.name.toLowerCase() === searchTerm.value.toLowerCase()
                        )
                        */