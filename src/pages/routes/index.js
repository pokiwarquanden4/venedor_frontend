import routes from '../../config/routes';
import HeaderOnly from '../../layout/HeaderOnly/HeaderOnly';
import HeaderOnlyWithLink from '../../layout/HeaderOnlyWithLink/HeaderOnlyWithLink';
import Account from '../Account/Account';
import Cart from '../Cart/Cart';
import CreateAccount from '../CreateAccount/CreateAccount';
import Home from '../Home';
import HomeCategory from '../HomeCategory/HomeCategory';
import ProductAllDetails from '../ProductAllDetails/ProductAllDetails';
import Search from '../Search';
import Address from '../Address/Address';
import WishList from '../WishList/WishList';
import CreateProduct from '../CreateProduct/CreateProduct';
import AccountSeller from '../AccountSeller/AccountSeller';
import EditProduct from '../EditProduct/EditProduct';
import Category from '../Category/Category';
import ThankYou from '../ThankYou/ThankYou';
import EditAccount from '../EditAccount/EditAccount';
import Order from '../Order/Order';
import Message from '../Message/Message';
import Statistical from '../Statistical/Statistical';

const publicRoutes = [
  { path: routes.home, component: Home, Layout: HeaderOnly },
  { path: routes.search, component: Search, Layout: HeaderOnlyWithLink },
  { path: routes.wishList, component: WishList, Layout: HeaderOnlyWithLink, authorization: 'User' },
  { path: routes.cart, component: Cart, Layout: HeaderOnlyWithLink, authorization: 'User' },
  { path: routes.category, component: HomeCategory, Layout: HeaderOnlyWithLink },
  { path: routes.productDetails, component: ProductAllDetails, Layout: HeaderOnlyWithLink },
  { path: routes.createAccount, component: CreateAccount, Layout: HeaderOnlyWithLink },
  { path: routes.account, component: Account, Layout: HeaderOnlyWithLink, authorization: 'User' },
  { path: routes.address, component: Address, Layout: HeaderOnlyWithLink, authorization: 'User' },
  {
    path: routes.createProduct,
    component: CreateProduct,
    Layout: HeaderOnlyWithLink,
    authorization: 'Seller',
  },
  {
    path: routes.static,
    component: Statistical,
    Layout: HeaderOnlyWithLink,
    authorization: 'Seller',
  },
  {
    path: routes.accountSeller,
    component: AccountSeller,
    Layout: HeaderOnlyWithLink,
    authorization: 'Seller',
  },
  {
    path: routes.editProduct,
    component: EditProduct,
    Layout: HeaderOnlyWithLink,
    authorization: 'Seller',
  },
  {
    path: routes.allProduct,
    component: Category,
    Layout: HeaderOnlyWithLink,
  },
  {
    path: routes.thankyou,
    component: ThankYou,
    Layout: HeaderOnlyWithLink,
  },
  {
    path: routes.editAccount,
    component: EditAccount,
    Layout: HeaderOnlyWithLink,
    authorization: 'User',
  },
  {
    path: routes.oder,
    component: Order,
    Layout: HeaderOnlyWithLink,
    authorization: 'Seller',
  },
  {
    path: routes.message,
    component: Message,
    Layout: HeaderOnlyWithLink,
  },
];

export default publicRoutes;
