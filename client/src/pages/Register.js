import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    position: '',
    mobileNumber: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password || !form.position || !form.mobileNumber) {
      setError('Please fill out all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/user/signup', form);
      console.log(response.data);
      alert('Signup successful!');
      window.location.href = '/';
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again later.');
      }
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <div>
        <div className='regPage' style={{ marginTop: '70px' }}>
          <img src='attendanceImage/image 1.svg' alt='' />
        </div>
        <div className='regPage my-2'>
          <img className='reg' src='./attendanceImage/reg.svg' alt='' />
        </div>
      </div>
      <div className='regPage'>
        <div className='regPage'>
          <img className='SquareImg' src='./attendanceImage/Rectangle2.svg' alt='' />
        </div>
        <h6 className='welcome mt-3'>Welcome !</h6>
        <p className='ldesc my-2'>Create an Account</p>

        <form className='form-signup' onSubmit={handleSubmit}>
          <div className='fake-input my-2'>
            <img className='rounded-circle' src='attendanceImage/name.svg' width='22' alt='' />
            <input
              type='text'
              className='form-control-signup px-5'
              placeholder='Name'
              name='username'
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div className='fake-input my-2'>
            <img className='rounded-circle' src='attendanceImage/email.svg' width='22' alt='' />
            <input
              type='email'
              className='form-control-signup px-5'
              placeholder='Email'
              name='email'
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className='fake-input my-2'>
            <img className='rounded-circle' src='attendanceImage/password.svg' width='22' alt='' />
            <input
              type='password'
              className='form-control-signup px-5'
              placeholder='Password'
              name='password'
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div className='fake-input my-2'>
            <img className='rounded-circle' src='attendanceImage/position.svg' width='22' alt='' />
            <input
              type='text'
              className='form-control-signup px-5'
              placeholder='Position'
              name='position'
              value={form.position}
              onChange={handleChange}
            />
          </div>
          <div className='fake-input my-2'>
            <img className='rounded-circle' src='attendanceImage/mobile.svg' width='22' alt='' />
            <input
              type='number'
              className='form-control-signup px-5'
              placeholder='Mobile number'
              name='mobileNumber'
              value={form.mobileNumber}
              onChange={handleChange}
            />
          </div>

          <div className='regPage my-2'>
            <button className='buttonRegister' type='submit'>Register</button>
          </div>
          {error && <p className='error'>{error}</p>}
        </form>

        <div className='regPage my-3'>
          <Link to='/' className='link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100'>Login</Link>
        </div>

        <div className='regPage'>
          <p className='footer mt-1'>Techninza ©</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
