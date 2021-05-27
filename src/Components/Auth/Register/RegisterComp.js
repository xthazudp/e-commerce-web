import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { handleError } from './../../../utils/ErrorHandler';
import { httpClient } from './../../../utils/httpClient';
import { notify } from './../../../utils/toaster';
import { SubmitButton } from './../../Common/SubmitButton/SubmitButtonComp';
import Layout from '../../Common/Layout/LayoutComp';
import './RegisterComp.css';

const defaultForm = {
  name: '',
  phoneNumber: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  gender: '',
  dob: '',
  temporaryAddress: '',
  permanentAddress: '',
};

const errFields = {
  username: false,
  password: false,
  email: false,
  confirmPassword: false,
};

export class Register extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        ...defaultForm,
      },
      error: {
        ...errFields,
      },
      isValidForm: false,
      isSubmitting: false,
    };
  }

  // initial
  componentDidMount() {
    // console.log('Component Mounted.');
  }

  // Update Stage
  // componentDidUpdate(preProps, PreState) {
  //   console.log('PrevState ==>', PreState.data);
  //   console.log('Current State ==>', this.state.data);
  // }

  // Destroy
  componentWillUnmount() {
    console.log('componentWillUnmont-> Usage completed.');
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const isValidForm = this.validateRequiredFields();
    if (!isValidForm) {
      return;
    }
    this.setState({
      isSubmitting: true,
    });
    //  api call
    httpClient
      .POST(`/auth/register`, this.state.data)
      .then((response) => {
        notify.showInfo('Registration successfull..Now Login');
        this.props.history.push('/');
      })
      .catch((err) => {
        handleError(err);
        this.setState({
          isSubmitting: false,
        });
      });
  };

  handleChange = (e) => {
    let { name, value } = e.target;

    this.setState(
      (preState) => ({
        data: {
          ...preState.data,
          [name]: value,
        },
      }),
      () => {
        this.validateForm(name);
      }
    );
  };

  validateForm = (fieldName) => {
    let errMsg;
    switch (fieldName) {
      case 'username':
        errMsg = this.state.data[fieldName] ? '' : 'required field*';
        break;

      case 'password':
        errMsg = this.state.data[fieldName]
          ? this.state.data['confirmPassword']
            ? this.state.data['confirmPassword'] === this.state.data[fieldName]
              ? ''
              : 'password did not match'
            : this.state.data[fieldName].length > 6
            ? ''
            : 'weak password'
          : 'required field*';
        break;
      case 'confirmPassword':
        errMsg = this.state.data[fieldName]
          ? this.state.data['password']
            ? this.state.data['password'] === this.state.data[fieldName]
              ? ''
              : 'password did not match'
            : this.state.data[fieldName].length > 6
            ? ''
            : 'weak password'
          : 'required field*';
        break;
      case 'email':
        errMsg = this.state.data[fieldName]
          ? this.state.data[fieldName].includes('@') &&
            this.state.data[fieldName].includes('.com')
            ? ''
            : 'invalid email'
          : 'required field*';
        break;

      default:
        break;
    }

    this.setState(
      (preState) => ({
        error: {
          ...preState.error,
          [fieldName]: errMsg,
        },
      }),
      () => {
        const errors = Object.values(this.state.error).filter((err) => err);
        console.log('errors is >>', errors);
        this.setState({
          isValidForm: errors.length === 0,
        });
      }
    );
  };

  validateRequiredFields = () => {
    let validForm = true;
    let usernameErr = false;
    let passwordErr = false;
    let confirmPasswordErr = false;
    let emailErr = false;

    if (!this.state.data.username) {
      validForm = false;
      usernameErr = 'required field*';
    }
    if (!this.state.data.password) {
      validForm = false;
      passwordErr = 'required field*';
    }
    if (!this.state.data.confirmPassword) {
      validForm = false;
      confirmPasswordErr = 'required field*';
    }
    if (!this.state.data.email) {
      validForm = false;
      emailErr = 'required field*';
    }

    this.setState({
      error: {
        username: usernameErr,
        password: passwordErr,
        confirmPassword: confirmPasswordErr,
        email: emailErr,
      },
    });

    return validForm;
  };
  render() {
    return (
      <Layout
        title='Register Page'
        description='Please Provide Necessary Details !!'
        className='container col-md-6 offset'
      >
        <div
          className='form-control bg-success'
          style={{ marginTop: '10px', marginBottom: '10px', color: 'white' }}
        >
          <form
            className='form-control bg-success'
            style={{ marginTop: '10px', color: 'white' }}
            onSubmit={this.handleSubmit}
          >
            <label htmlFor='name'>Name</label>
            <input
              className='form-control'
              type='text'
              placeholder='Name'
              name='name'
              id='name'
              onChange={this.handleChange}
            ></input>
            <label htmlFor='email'>Email</label>
            <input
              className='form-control'
              type='text'
              placeholder='Email'
              name='email'
              id='email'
              onChange={this.handleChange}
            ></input>
            <p className='error'>{this.state.error.email}</p>
            <label htmlFor='phoneNumber'>Phone Number</label>
            <input
              className='form-control'
              type='number'
              name='phoneNumber'
              id='phoneNumber'
              onChange={this.handleChange}
            ></input>
            <label htmlFor='username'>Username</label>
            <input
              className='form-control'
              type='text'
              placeholder='Username'
              name='username'
              id='username'
              onChange={this.handleChange}
            ></input>
            <p className='error'>{this.state.error.username}</p>
            <label htmlFor='password'>Password</label>
            <input
              className='form-control'
              type='password'
              placeholder='Password'
              name='password'
              id='password'
              onChange={this.handleChange}
            ></input>
            <p className='error'>{this.state.error.password}</p>
            <label>Confirm Password</label>
            <input
              type='password'
              className='form-control'
              name='confirmPassword'
              placeholder='Confirm Password'
              onChange={this.handleChange}
            />
            <p className='error'>{this.state.error.confirmPassword}</p>
            <label>Gender</label>
            <br />
            <input
              type='radio'
              value='male'
              name='gender'
              onChange={this.handleChange}
            />{' '}
            Male
            <input
              type='radio'
              value='female'
              name='gender'
              onChange={this.handleChange}
            />{' '}
            Female
            <input
              type='radio'
              value='others'
              name='gender'
              onChange={this.handleChange}
            />{' '}
            Others
            <br />
            <label>Date Of Birth</label>
            <input
              type='date'
              name='dob'
              className='form-control'
              onChange={this.handleChange}
            ></input>
            <label>Temporary Address</label>
            <input
              type='text'
              name='temporaryAddress'
              placeholder='Temporary Address'
              className='form-control'
              onChange={this.handleChange}
            ></input>
            <label>Permanent Address</label>
            <input
              type='text'
              name='permanentAddress'
              placeholder='Permanent Address'
              className='form-control'
              onChange={this.handleChange}
            ></input>
            <hr />
            <SubmitButton
              isSubmitting={this.state.isSubmitting}
              isDisabled={!this.state.isValidForm}
            ></SubmitButton>
          </form>
          <p>
            Already Registered?{' '}
            <Link to='/login' style={{ color: 'black' }}>
              back to login
            </Link>
          </p>
        </div>
      </Layout>
    );
  }
}

export default Register;
