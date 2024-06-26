import { Form, Input, Select } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
const { Option } = Select;

const configForm = {
  layout: 'vertical',
  // name: 'signUpForm',
  size: 'large',
  validateMessages: {
    required: 'Please input your ${name}',
    types: {
      email: '${name} is not a valid email!',
    },
  },
  // initialValues: {
  //   prefix: '86',
  //   email: '',
  //   password: '',
  // },
};

const configFieldsSignUp = [
  {
    key: 1,
    configCol: {
      span: 24,
      sm: 12,
      order: 1,
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
      sm: 12,
      order: 2,
    },
    configFormItem: {
      name: 'name',
      label: 'Name',
      rules: [
        {
          // required: true,
          // type: '',
        },
      ],
    },
    children: <Input prefix={<UserOutlined />} placeholder="Name" />,
  },
  {
    key: 3,
    configCol: {
      span: 24,
      sm: 12,
      order: 3,
    },
    configFormItem: {
      name: 'password',
      label: 'Password',
      hasFeedback: true,
      rules: [
        {
          required: true,
        },
        {
          min: 6,
          max: 12,
          message: 'Password must be between 6 and 12 characters',
        },
      ],
    },
    children: <Input.Password prefix={<LockOutlined />} placeholder="******" />,
  },
  {
    key: 4,
    configCol: {
      span: 24,
      sm: 12,
      order: 5,
    },
    configFormItem: {
      name: 'confirm',
      label: 'Confirm Password',
      dependencies: ['password'],
      hasFeedback: true,
      rules: [
        {
          required: true,
          message: 'Please confirm your password!',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error('The new password that you entered do not match!'),
            );
          },
        }),
      ],
    },
    children: <Input.Password prefix={<LockOutlined />} placeholder="******" />,
  },
  {
    key: 5,
    configCol: {
      span: 24,
      sm: 12,
      order: 4,
    },
    configFormItem: {
      name: 'phone',
      label: 'Phone Number',
      rules: [
        {
          required: true,
          message: 'Please input your phone number!',
          pattern: /[0-9]{9}/,
        },
      ],
    },
    children: (
      <Input
        placeholder="Enter your phone"
        addonBefore={
          <Form.Item name="prefix" noStyle>
            <Select>
              {['86', '87'].map((prefix, index) => {
                return (
                  <Option key={index} value={prefix}>
                    +{prefix}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        }
      />
    ),
  },

  {
    key: 6,
    configCol: {
      span: 24,
      sm: 12,
      order: 6,
    },
    configFormItem: {
      name: 'gender',
      label: 'Gender',
      rules: [
        // {
        //   required: true,
        //   message: 'Please select gender!',
        // },
      ],
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

const configFieldsSignIn = [
  {
    key: 1,
    configFormItem: {
      name: 'email',
      rules: [
        {
          required: true,
          type: 'email',
        },
      ],
    },
    children: <Input prefix={<UserOutlined />} placeholder="Email" />,
  },
  {
    key: 2,
    configFormItem: {
      name: 'password',
      rules: [
        {
          required: true,
        },
        {
          min: 4,
          max: 12,
          message: 'Password must be between 4 and 12 characters',
        },
      ],
    },
    children: (
      <Input.Password prefix={<LockOutlined />} placeholder="Password" />
    ),
  },
];

export { configForm, configFieldsSignUp, configFieldsSignIn };
