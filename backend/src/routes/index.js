import { getProductList } from './getProductListRoute';
import { getProductById } from './getProductByIdRoute';
import { testRoute } from './testRoute';

export const routes = [
    getProductList,
    getProductById,
    testRoute,
];