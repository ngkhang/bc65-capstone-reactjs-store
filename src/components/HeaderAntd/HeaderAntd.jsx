import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  signOutAction,
  profileActionAsync,
} from '../../redux/reducers/userReducer';
import useRedux from '../../hooks/useRedux';
import { getDataTextStorage } from '../../utils/helpers';
import { GLOBAL_STATES, REDUCERS, SERVICES } from '../../utils/constant';
import { Badge, Layout, Menu } from 'antd';
import {
  LoginOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
const { Header } = Layout;

const MenuItems = [
  {
    key: 1,
    label: <Link to="/">Home</Link>,
  },
  {
    key: 2,
    label: <Link to="/products">Shop</Link>,
  },
  {
    key: 3,
    label: <Link to="/about">About</Link>,
  },
  {
    key: 4,
    label: <Link to="/contact">Contact</Link>,
  },
];

const HeaderAntd = () => {
  const { userProfile, dispatch } = useRedux(
    REDUCERS.USER_REDUCER,
    GLOBAL_STATES.USER_PROFILE,
  );
  const handleSignOut = () => {
    const actionCreator = signOutAction();
    dispatch(actionCreator);
  };

  const renderMenuAuth = () => {
    return userProfile
      ? [
          {
            key: 5,
            label: userProfile.name,
            children: [
              {
                key: '51',
                label: (
                  <Link to="/user/account/profile">
                    <UserOutlined /> My Profile
                  </Link>
                ),
              },
              {
                key: '52',
                label: (
                  <Link className="inline-block" onClick={handleSignOut}>
                    <LogoutOutlined /> Sign Out
                  </Link>
                ),
              },
            ],
          },
          {
            key: 6,
            label: (
              // BUG: Không hiện Icon khi collapse
              <Link to="/cart">
                <Badge count={99} overflowCount={10} offset={[4, 6]}>
                  <span className="flex items-center justify-center">
                    <ShoppingCartOutlined className="text-lg p-2" />
                  </span>
                </Badge>
              </Link>
            ),
          },
        ]
      : [
          {
            key: 5,
            label: (
              <Link to="/auth/signin">
                <LoginOutlined /> Sign In
              </Link>
            ),
            title: 'Sign In',
          },
        ];
  };

  useEffect(() => {
    let accessToken = getDataTextStorage(SERVICES.ACCESS_TOKEN);
    if (accessToken) {
      const actionThunk = profileActionAsync(accessToken);
      dispatch(actionThunk);
    }
  }, [dispatch]);

  return (
    <Header className="px-0 flex justify-center bg-white">
      <div className="mainSize flex items-center justify-between">
        <div className="mr-12 sm:mr-20 xl:mr-0">
          <Link to="/" className="text-sm md:text-base font-bold">
            Shoes Cyber
          </Link>
        </div>
        <Menu
          // theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          className="justify-end flex-1 min-w-0"
          items={[...MenuItems, ...renderMenuAuth()]}
        />
      </div>
    </Header>
  );
};

export default HeaderAntd;
