import { getProductList } from './getProductListRoute';
import { getProductById } from './getProductByIdRoute';
import { getImageRoute } from './getImageRoute';
import { testRoute } from './testRoute';

export const routes = [
    getImageRoute,
    getProductList,
    getProductById,
    testRoute,
];