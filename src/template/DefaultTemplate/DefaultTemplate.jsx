import { FloatButton, Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../../components';
import { ArrowUpOutlined } from '@ant-design/icons';

const { Content } = Layout;

const DefaultTemplate = () => {
  return (
    <Layout className="flex flex-col min-h-screen">
      <Header />
      <Layout className="flex-1 flex items-center py-6 md:py-10 bg-slate-50">
        <Content className="mainSize">
          <Outlet />
          <FloatButton.BackTop icon={<ArrowUpOutlined />} />
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default DefaultTemplate;
