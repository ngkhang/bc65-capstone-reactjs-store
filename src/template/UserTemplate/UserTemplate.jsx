import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Footer, Header } from '../../components';
import { Button, Flex, Layout, Menu } from 'antd';
import {
  HistoryOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';
import { getDataJsonStorage, getDataTextStorage } from '../../utils/helpers';
import { GLOBAL_STATES, SERVICES } from '../../utils/constant';
import { useRoute } from '../../hooks';
const { Sider } = Layout;

const Items = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'Account',
    children: [
      {
        key: 'sub1',
        label: 'Profile',
      },
      {
        key: 'sub2',
        label: 'Change password',
      },
    ],
  },
  {
    key: '2',
    icon: <HistoryOutlined />,
    label: 'My Purchase',
  },
  {
    key: '3',
    icon: <LogoutOutlined />,
    label: 'Sign Out',
    title: <LogoutOutlined />,
    className: 'mt-auto',
  },
];

const UserTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { navigate } = useRoute();
  const accessToken = getDataTextStorage(SERVICES.ACCESS_TOKEN);
  const { name } = getDataJsonStorage(GLOBAL_STATES.USER_PROFILE);

  useEffect(() => {
    // BUG: accessToken khi expired
    if (!accessToken) navigate('/auth/signin');
  }, [accessToken, navigate]);

  return (
    <Layout className="flex flex-col min-h-screen">
      <Header />

      <Layout className="flex-1 flex items-center bg-slate-50">
        <Layout className="mainSize">
          <Sider
            collapsible
            breakpoint="xl"
            collapsedWidth="80"
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            trigger={null}
            width={'24%'}
          >
            <Menu
              className="bg-white flex flex-col h-full text-xs md:text-sm"
              mode="inline"
              defaultSelectedKeys={['sub1']}
              defaultOpenKeys={['1']}
              items={Items}
            />
          </Sider>

          <Layout className="bg-slate-50">
            <Flex align="center" justify="space-between" className="shadow-md">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="text-lg p-6"
              />
              <span className="my-0 px-6 lg:px-8">
                Welcome <span className="font-bold">{name}</span>
              </span>
            </Flex>

            <Content className="p-5 lg:p-8 m-6 mr-0 bg-white shadow-lg">
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
};
export default UserTemplate;
