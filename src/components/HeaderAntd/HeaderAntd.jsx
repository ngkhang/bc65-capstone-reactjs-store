import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
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
  {
    key: 5,
    label: (
      <Link to="/auth/signin">
        <LoginOutlined /> Sign In
      </Link>
    ),
    title: 'Sign In',
  },
  {
    key: 6,
    label: 'abc',
    children: [
      {
        key: '61',
        label: (
          <Link to="/account">
            <UserOutlined /> My Profile
          </Link>
        ),
      },
      {
        key: '62',
        label: (
          <Link to="/">
            <LogoutOutlined /> Logout
          </Link>
        ),
      },
    ],
    title: 'My Profile',
  },
];

const HeaderAntd = () => {
  return (
    <Header className="px-0 flex justify-center bg-white">
      <div className="mainSize flex items-center justify-between">
        <div className="flex-1">
          <Link to="/" className="text-sm md:text-base font-bold">
            Shoes Cyber
          </Link>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          className="justify-end flex-1 min-w-0"
          items={MenuItems}
        />
      </div>
    </Header>
  );
};

export default HeaderAntd;
