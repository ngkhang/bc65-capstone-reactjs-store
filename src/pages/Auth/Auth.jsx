import { useEffect, useState } from 'react';
import { Card } from 'antd';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import useRoute from '../../hooks/useRoute';

const Items = {
  signin: {
    title: 'Sign In',
    component: <SignIn />,
  },
  signup: {
    title: 'Create your account',
    component: <SignUp />,
  },
};

const Auth = () => {
  const [keyComponent, setKeyComponent] = useState('signin');
  const { action } = useRoute('action');

  useEffect(() => {
    setKeyComponent(action);
  }, [action]);

  return (
    <Card
      className={`w-full sm:w-1/2 lg:w-1/3 m-4 sm:m-0 ${
        action === 'signup' && 'sm:w-3/4 lg:w-3/5 sm:my-10'
      }`}
      title={
        <h3 className="text-center uppercase text-lg py-3 sm:text-xl lg:text-2xl">
          {/* // BUG: title not found when url incorect */}
          {Items[keyComponent].title}
        </h3>
      }
    >
      {Items[keyComponent].component}
    </Card>
  );
};

export default Auth;
