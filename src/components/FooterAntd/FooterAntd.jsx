import { Layout } from 'antd';
const { Footer } = Layout;

const FooterAntd = () => {
  return (
    <Footer className="text-center bg-slate-950 text-slate-300">
      Shoes Cyber ©{new Date().getFullYear()} Created by ngKhang
    </Footer>
  );
};

export default FooterAntd;
