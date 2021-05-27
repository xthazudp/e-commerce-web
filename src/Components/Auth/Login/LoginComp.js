import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { handleError } from './../../../utils/ErrorHandler';
import { httpClient } from './../../../utils/httpClient';
import { notify } from './../../../utils/toaster';
import Layout from '../../Common/Layout/LayoutComp';
import { SubmitButton } from './../../Common/SubmitButton/SubmitButtonComp';

const defaultForm = {
  username: '',
  password: '',
};

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        ...defaultForm,
      },
      error: {
        ...defaultForm,
      },
      isValidForm: false,
      isSubmitting: false,
      remember_me: false,
    };
  }

  componentDidMount() {
    // var rememberMe = JSON.parse(localStorage.getItem('remember_me'));
    // if (rememberMe) {
    //   this.props.history.push('/dashboard');
    // }
  }

  handleSubmit = (e) => {
    // notify.showInfo('login clicked');
    e.preventDefault();
    let isValidForm = this.validateForm();
    if (!isValidForm) {
      return;
    }
    // console.log('Form submit here', this.state);
    this.setState({
      isSubmitting: true,
    });
    httpClient
      .POST(`/auth/login`, this.state.data)
      .then((response) => {
        notify.showSuccess(`Welcome ${response.data.user.username}`);
        // localstorage setup
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('remember_me', this, this.setState.remember_me);

        // Navigate to specific link
        // console.log('this.props.history.push()=>', this.props.history);
        // Dashboard.redirectToDashboard(this.props.history, response);
        // this.props.history.push('/dashboard');
        // console.log('response is >>', response);
      })
      .catch((err) => {
        handleError(err);
        this.setState({
          isSubmitting: false,
        });
      });
  };

  handleChange = (e) => {
    let { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      return this.setState({
        remember_me: checked,
      });
    }
    this.setState(
      (preState) => ({
        data: {
          ...preState.data,
          [name]: value,
        },
      }),
      () => {
        if (this.state.error[name]) {
          this.validateForm();
        }
      }
    );
  };

  validateForm = () => {
    let usernameErr = this.state.data['username'] ? '' : 'required field*';
    let passwordErr = this.state.data['password'] ? '' : 'required field*';

    this.setState({
      error: {
        username: usernameErr,
        password: passwordErr,
      },
    });

    let validForm = !(usernameErr || passwordErr);
    return validForm;
  };

  render() {
    return (
      <Layout
        title='Login Page'
        description='Please Login to Proceed !!'
        className='container col-md-5 offset'
      >
        <div
          className='form-control bg-success'
          style={{ marginTop: '10px', color: 'white' }}
        >
          <form
            className='form-control bg-success'
            style={{ marginTop: '10px', color: 'white' }}
            onSubmit={this.handleSubmit}
          >
            <label htmlfor='username' className='form-label'>
              Username
            </label>
            <input
              type='text'
              className='form-control'
              id='username'
              placeholder='username'
              onChange={this.handleChange}
            />
            <p className='error'>{this.state.error.username}</p>
            <label htmlfor='password' className='form-label'>
              Password
            </label>
            <input
              className='form-control'
              type='password'
              placeholder='Password'
              name='password'
              id='password'
              onChange={this.handleChange}
            />
            <p className='error'>{this.state.error.password}</p>
            <input
              type='checkbox'
              name='remember_me'
              onChange={this.handleChange}
            ></input>
            <label> &nbsp; Remember Me</label>
            <br />
            <SubmitButton
              isSubmitting={this.state.isSubmitting}
              enabledLabel='Login'
              disabledLabel='Loging in...'
            ></SubmitButton>
          </form>
          <div
            className='form-group bg-success'
            style={{ marginBottom: '40px' }}
          >
            <p>Don't Have an Account?</p>
            <p className='float-start'>
              Register{' '}
              <Link to='/register' style={{ color: 'black' }}>
                here
              </Link>
            </p>
            <p className='float-end'>
              <Link to='/forgot_password' style={{ color: 'black' }}>
                forgot password?
              </Link>
            </p>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Login;
