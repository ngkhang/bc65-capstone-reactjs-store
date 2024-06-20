import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../../components';

const { Content } = Layout;

const DefaultTemplate = () => {
  return (
    <Layout className="flex flex-col min-h-screen">
      <Header />
      <Layout className="flex-1 flex items-center py-5 md:py-8 bg-slate-100">
        <Content className="mainSize bg-white">
          <Outlet />
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default DefaultTemplate;
