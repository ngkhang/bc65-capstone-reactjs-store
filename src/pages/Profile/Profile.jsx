import { useEffect } from 'react';
import { GLOBAL_STATES, SERVICES } from '../../utils/constant';
import { useRedux } from '../../hooks';
import { getDataJsonStorage, getDataTextStorage } from '../../utils/helpers';
import { profileActionAsync } from '../../redux/reducers/userReducer';
import {
  Avatar,
  Button,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  Row,
  Select,
} from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
const { Option } = Select;

const configForm = {
  layout: 'vertical',
  size: 'large',
  validateMessages: {
    required: 'Please input your ${name}',
    types: {
      email: '${name} is not a valid email!',
    },
  },
};

const configFieldsSignUp = [
  {
    key: 1,
    configCol: {
      span: 24,
      md: 12,
      lg: 24,
    },
    configFormItem: {
      name: 'email',
      label: 'Email',
      rules: [
        {
          required: true,
          type: 'email',
        },
      ],
    },
    children: <Input prefix={<MailOutlined />} placeholder="Email" />,
  },
  {
    key: 2,
    configCol: {
      span: 24,
      md: 12,
      lg: 24,
    },
    configFormItem: {
      name: 'name',
      label: 'Name',
      rules: [
        {
          required: true,
        },
        {
          type: 'string',
          message: 'Name must be a string, with at least 2 words',
          pattern:
            /[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+\ /,
        },
      ],
    },
    children: <Input prefix={<UserOutlined />} placeholder="Name" />,
  },
  {
    key: 5,
    configCol: {
      span: 24,
      md: 12,
      lg: 24,
    },
    configFormItem: {
      name: 'phone',
      label: 'Phone Number',
      rules: [
        {
          message: 'Please input your phone number!',
          pattern: /[0-9]{9}/,
        },
      ],
    },
    children: (
      <Input
        placeholder="Enter your phone"
        // addonBefore={
        //   <Form.Item name="prefix" noStyle>
        //     <Select>
        //       {['86', '87'].map((prefix, index) => {
        //         return (
        //           <Option key={index} value={prefix}>
        //             +{prefix}
        //           </Option>
        //         );
        //       })}
        //     </Select>
        //   </Form.Item>
        // }
      />
    ),
  },
  {
    key: 6,
    configCol: {
      span: 24,
      md: 12,
      lg: 24,
    },
    configFormItem: {
      name: 'gender',
      label: 'Gender',
      rules: [],
    },
    children: (
      <Select placeholder="Select your gender">
        {['Male', 'Female'].map((opt, index) => {
          return (
            <Option className="uppercase" key={index} value={opt === 'Male'}>
              {opt}
            </Option>
          );
        })}
      </Select>
    ),
  },
];

const Profile = () => {
  const [form] = Form.useForm();
  const { dispatch } = useRedux();
  const accessToken = getDataTextStorage(SERVICES.ACCESS_TOKEN);
  const userProfile = getDataJsonStorage(GLOBAL_STATES.USER_PROFILE);

  const onFinish = (newValues) => {
    console.log(newValues);
  };

  useEffect(() => {
    const getProfile = (accessToken) => {
      const actionThunk = profileActionAsync(accessToken);
      dispatch(actionThunk);
    };
    getProfile(accessToken);
  }, [accessToken, dispatch]);

  return (
    <div>
      <div>
        <h3>My Profile</h3>
        <p>Manage and protect your account</p>
      </div>
      <Divider />
      <Flex gap="1rem" className="items-start justify-between flex-wrap">
        <div className="w-full order-2 lg:order-1 lg:w-[65%]">
          <Form
            form={form}
            {...configForm}
            name="signUpForm"
            initialValues={userProfile}
            onFinish={onFinish}
          >
            <Row gutter={24} className="mb-5">
              {configFieldsSignUp.map((field) => {
                return (
                  <Col key={field.key} {...field.configCol}>
                    <Form.Item {...field.configFormItem}>
                      {field.children}
                    </Form.Item>
                  </Col>
                );
              })}
            </Row>

            <Flex wrap={true} justify="flex-end">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full md:w-[48%]"
              >
                Save
              </Button>
            </Flex>
          </Form>
        </div>
        <div className="text-center mb-3 order-1 lg:order-2 w-full lg:w-[30%]">
          <Avatar
            className="w-1/2 lg:w-full h-full"
            src={userProfile.avatar}
            alt={userProfile.name}
          />
        </div>
      </Flex>
    </div>
  );
};

export default Profile;
