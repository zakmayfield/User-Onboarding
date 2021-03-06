import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

/*
// KEEPING THIS TO SHOW HOW TO VALIDATE WITHOUT Yup

const validate = ({ name, email, password, terms }) => {
  const errors = {};

  if(!name){
    errors.name = "Please enter a name"
  } else if(name.length < 2){
    errors.name = "Please enter a longer name"
  }

  if(!email){
    errors.email = "Please enter an email"
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }

  if(!password){
    errors.password = "Please enter a password"
  } else if(password.length < 3){
    errors.password = "Your password must be at least 3 characters"
  }

  if(terms === false){
    errors.terms = "Please accept the terms before continuing"
  }

  return errors;
};
*/

const userSchema = Yup.object().shape({
  name: Yup.string().required().min(2),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(3),
  terms: Yup.bool().oneOf([true], 'must accept terms and conditions')
});

const UserForm = () => {

  const [users, setUsers] = useState([]);

  console.log(users);

  return (
    <div>
      <Formik 
      initialValues={{
        name: '',
        email: '',
        password: '',
        terms: false
      }}
      onSubmit={(values, tools) => {
        // console.log(values, tools);
        tools.resetForm();
        axios.post('https://reqres.in/api/users', values)
          .then(res => {
            console.log(`successful`, res)

            const userData = res.data;

            setUsers([...users, userData]);
          })
          .catch(err => {
            console.log('failed', err)
          })
      }}
      // validate={validate}
      validationSchema={userSchema}
      render={props => {
        return(
          <Form className="formContainer">
            <label>
              *Name:
              <Field 
                className="input inputName" 
                name="name" 
                type="text"
                placeholder="enter name"
               />
            </label>
            {props.errors.name && props.touched.name ? (
              <span className='red'>{props.errors.name}</span>
            ) : (
              ""
            )}
            {/* <ErrorMessage name="name" component='div' className="red" /> */}
            
            <label>
              *Email:
              <Field 
                className="input inputEmail" 
                name="email" 
                type="text"
                placeholder="enter email"  
              />
            </label>
            {props.errors.email && props.touched.email ? (
                <span className='red'>{props.errors.email}</span>
              ) : (
                ""
              )}
            {/* <ErrorMessage name="email" component='div' className="red" /> */}

            <label>
              *Password:
              <Field 
                className="input inputPassword" 
                name="password" 
                type="text"
                placeholder="enter password"
              />
            </label>
            {props.errors.password && props.touched.password ? (
                <span className='red'>{props.errors.password}</span>
              ) : (
                ""
              )}
            {/* <ErrorMessage name="password" component='div' className="red" /> */}

            <label>
              Bonus - how cool are you? (1-10)
              <Field as="select" name="howCoolAreYou">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </Field>
            </label>

            <label>
              *Do you agree to the terms and conditions?
              <Field 
                className="input inputCheckbox"
                type="checkbox"
                name="terms"
              />
            </label>
            {props.errors.terms && props.touched.terms ? (
                <span className='red'>{props.errors.terms}</span>
              ) : (
                ""
              )}
            {/* <ErrorMessage name="terms" component='div' className="red" /> */}

            <input className="submitButton" type="submit" />
          </Form>
        )
      }}
    />

    <div>
      <h2 className="userProfilesTitle">User Profiles</h2>
        {users.map(user => (
          <div className="userContainer" key={user.email}>
            <div className="subUserContainer">
              <h3 className="userName">Name: {user.name}</h3>
              <p>{`Email: ${user.email}`}</p>
              <p>{user.howCoolAreYou ? `Coolness level: ${user.howCoolAreYou}` : `No coolness level selected`}</p>
            </div>
          </div>
        ))}
    </div>
    </div>
  )
}

export default UserForm;