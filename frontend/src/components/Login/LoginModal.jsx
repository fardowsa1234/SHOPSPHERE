import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './LoginModal.scss'; 

const LoginModal = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 500);
  };

  return (
    <div className="login-modal">
      <h1 className="login-modal__title">Login</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="login-modal__form">
          <div className="login-modal__form-group">
            <label htmlFor="email" className="login-modal__label">Email</label>
            <Field type="email" id="email" name="email" className="login-modal__input" />
            <ErrorMessage name="email" component="div" className="login-modal__error" />
          </div>
          <div className="login-modal__form-group">
            <label htmlFor="password" className="login-modal__label">Password</label>
            <Field type="password" id="password" name="password" className="login-modal__input" />
            <ErrorMessage name="password" component="div" className="login-modal__error" />
          </div>
          <button type="submit" className="login-modal__submit-button">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginModal;