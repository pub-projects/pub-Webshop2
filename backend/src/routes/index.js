import { getProductList } from './getProductListRoute';
import { getProductById } from './getProductByIdRoute';
import { getImageRoute } from './getImageRoute';
import { login } from './loginRoute';
import { updateUser } from './updateUserRoute';
import { usernameExists } from './usernameExistsRoute';
import { signup } from './signupRoute';
import { testRoute } from './testRoute';

export const routes = [
    getImageRoute,
    getProductList,
    getProductById,
    login,
    updateUser,
    usernameExists,
    signup,
    testRoute,
];