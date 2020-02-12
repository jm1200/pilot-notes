import React, { useState } from "react";
import {
  SignInModalContainer,
  SignInFormContainer,
  ErrorMsg
} from "./SignInModal.styles";
import { X } from "react-feather";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { signUpUser, signInUser } from "api";

interface ISignInModalProps {
  setSignInModal: Function;
}

const SignInModal: React.FC<ISignInModalProps> = ({ setSignInModal }) => {
  const [authMethod, setAuthMethod] = useState(true);

  const toggleSignUp = () => {
    setAuthMethod(!authMethod);
  };

  return (
    <SignInModalContainer>
      <SignInFormContainer>
        <div className="close" onClick={() => setSignInModal(false)}>
          <X />
        </div>
        {authMethod ? <SignUpComponent /> : <SignInComponent />}

        {authMethod ? (
          <div>
            <div>or...</div>

            <button onClick={toggleSignUp}>Sign in</button>
          </div>
        ) : (
          <div>
            <div>no account?</div>

            <button onClick={toggleSignUp}>Sign Up</button>
          </div>
        )}
      </SignInFormContainer>
    </SignInModalContainer>
  );
};

export default SignInModal;

interface ISignInFormValues {
  email: string;
  password: string;
}

const signInFormValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required()
});

const SignInComponent: React.FC<{}> = () => {
  const initialValues: ISignInFormValues = { email: "", password: "" };
  return (
    <div>
      <h1>Sign In</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          signInUser(data.email, data.password);
          setTimeout(() => {
            console.log(data);
            setSubmitting(false);
          }, 400);
        }}
        validationSchema={signInFormValidationSchema}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            <div>Email:</div>
            <Field placeholder="Email" name="email" type="text" />
            <ErrorMessage component={ErrorMsg} name="email" />

            <div>
              <div>Password:</div>
              <Field placeholder="password" name="password" type="password" />
              <ErrorMessage component={ErrorMsg} name="password" />
            </div>

            <div>
              <button disabled={isSubmitting} type="submit">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

interface ISignUpFormValues {
  email: string;
  password1: string;
  password2: string;
}

const signUpFormValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password1: yup.string().required(),
  password2: yup
    .mixed()
    .required()
    .test("passwordMatchTest", "Passwords do not match", function(value) {
      let { password1 } = this.parent;
      return password1 === value;
    })
});

const SignUpComponent: React.FC<{}> = () => {
  const initialValues: ISignUpFormValues = {
    email: "",
    password1: "",
    password2: ""
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          signUpUser(data.email, data.password1);

          setTimeout(() => {
            setSubmitting(false);
          }, 400);
        }}
        validationSchema={signUpFormValidationSchema}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            <div>Email:</div>
            <Field placeholder="Email" name="email" type="text" />
            <ErrorMessage component={ErrorMsg} name="email" />

            <div>
              <div>Password:</div>
              <Field placeholder="password" name="password1" type="password" />
              <ErrorMessage component={ErrorMsg} name="password1" />
            </div>
            <div>
              <div>Confirm password:</div>
              <Field
                placeholder="confirm password"
                name="password2"
                type="password"
              />
              <ErrorMessage component={ErrorMsg} name="password2" />
            </div>

            <div>
              <button disabled={isSubmitting} type="submit">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
