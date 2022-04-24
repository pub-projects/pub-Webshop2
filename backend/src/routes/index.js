import { getProductList } from './getProductListRoute';
import { getProductById } from './getProductByIdRoute';
import { getImageRoute } from './getImageRoute';
import { login } from './loginRoute';
import { testRoute } from './testRoute';

export const routes = [
    getImageRoute,
    getProductList,
    getProductById,
    login,
    testRoute,
];