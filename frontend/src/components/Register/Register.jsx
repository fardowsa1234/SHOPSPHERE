import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Register.scss';

const Register = () => {
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 500);
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <h1 className="register-title">Register</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form className="register-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" className="form-input" />
              <ErrorMessage name="email" component="div" className="form-error" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" className="form-input" />
              <ErrorMessage name="password" component="div" className="form-error" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field type="password" id="confirmPassword" name="confirmPassword" className="form-input" />
              <ErrorMessage name="confirmPassword" component="div" className="form-error" />
            </div>
            <button type="submit" className="submit-button">SignUp</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;