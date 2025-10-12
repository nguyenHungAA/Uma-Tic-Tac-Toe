import { Link, useNavigate } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import Button from '@/component/button/Button';
import Loading from '@/component/loading/Loading';
import { useRegisterUser } from '@/hooks/useUser';
import { signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/config/firebase';

const signupSchema = Yup.object({
    firstName: Yup.string()
        .required('First name is required'),
    lastName: Yup.string()
        .required('Last name is required'),
    email: Yup.string()
        .email('Please enter a valid email')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match')
        .required('Please confirm your password'),
    agreeToTerms: Yup.boolean()
        .oneOf([true], 'You must agree to the terms and conditions')
        .required('You must agree to the terms and conditions'),
});

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
};

function SignupPage() {
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const cx = classNames.bind(styles);
    const registerUserMutation = useRegisterUser();
    const handleSubmit = async (values: typeof initialValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {

        try {
            await registerUserMutation.mutateAsync({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
            alert('Account created successfully!');
            navigate('/auth/login');
        } catch (error) {
            console.error('Signup error:', error);
            alert('Failed to create account. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleSignUpWithGoogle = async () => {
        try {
            provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log('Google sign-in user:', user);
            navigate('/');
        } catch (error) {
            console.error('Google sign-in error:', error);
            alert('Failed to sign in with Google. Please try again.');
        }
    }

    return (
        <div className={cx('signup-page')}>
            <div className={cx('signup-container')}>
                <div className={cx('signup-header')}>
                    <h1 className={cx('signup-title')}>Sign up</h1>
                    <p className={cx('signup-subtitle')}>Join us and start playing</p>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={signupSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form className={cx('signup-form')}>
                            <div className={cx('name-row')}>
                                <div className={cx('form-group')}>
                                    <label htmlFor="firstName" className={cx('form-label')}>
                                        First Name
                                    </label>
                                    <Field
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        className={cx('form-input', { error: errors.firstName && touched.firstName })}
                                        placeholder="Enter your first name"
                                        disabled={isSubmitting}
                                    />
                                    <ErrorMessage
                                        name="firstName"
                                        component="span"
                                        className={cx('error-message')}
                                    />
                                </div>

                                <div className={cx('form-group')}>
                                    <label htmlFor="lastName" className={cx('form-label')}>
                                        Last Name
                                    </label>
                                    <Field
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        className={cx('form-input', { error: errors.lastName && touched.lastName })}
                                        placeholder="Enter your last name"
                                        disabled={isSubmitting}
                                    />
                                    <ErrorMessage
                                        name="lastName"
                                        component="span"
                                        className={cx('error-message')}
                                    />
                                </div>
                            </div>

                            <div className={cx('form-group')}>
                                <label htmlFor="email" className={cx('form-label')}>
                                    Email Address
                                </label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={cx('form-input', { error: errors.email && touched.email })}
                                    placeholder="Enter your email"
                                    disabled={isSubmitting}
                                />
                                <ErrorMessage
                                    name="email"
                                    component="span"
                                    className={cx('error-message')}
                                />
                            </div>

                            <div className={cx('form-group')}>
                                <label htmlFor="password" className={cx('form-label')}>
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    className={cx('form-input', { error: errors.password && touched.password })}
                                    placeholder="Enter your password"
                                    disabled={isSubmitting}
                                />
                                <ErrorMessage
                                    name="password"
                                    component="span"
                                    className={cx('error-message')}
                                />
                            </div>

                            <div className={cx('form-group')}>
                                <label htmlFor="confirmPassword" className={cx('form-label')}>
                                    Confirm Password
                                </label>
                                <Field
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className={cx('form-input', { error: errors.confirmPassword && touched.confirmPassword })}
                                    placeholder="Confirm your password"
                                    disabled={isSubmitting}
                                />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="span"
                                    className={cx('error-message')}
                                />
                            </div>

                            <div className={cx('form-options')}>
                                <label className={cx('checkbox-label')}>
                                    <Field
                                        type="checkbox"
                                        name="agreeToTerms"
                                        className={cx('checkbox-input')}
                                        disabled={isSubmitting}
                                    />
                                    <span className={cx('checkbox-custom')}></span>
                                    I agree to the{' '}
                                    <Link to="/terms" className={cx('terms-link')}>
                                        Terms & Conditions
                                    </Link>
                                </label>
                                <ErrorMessage
                                    name="agreeToTerms"
                                    component="span"
                                    className={cx('error-message', 'terms-error')}
                                />
                            </div>

                            <button
                                type="submit"
                                className={cx('signup-button', { loading: isSubmitting })}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <Loading /> : 'Create Account'}
                            </button>
                        </Form>
                    )}
                </Formik>

                <div className={cx('signup-footer')}>
                    <p className={cx('login-text')}>
                        Already have an account?{' '}
                        <Link to="/auth/login" className={cx('login-link')}>
                            Sign in
                        </Link>
                    </p>
                    <p className={cx('login-text')}>
                        <Link to="/" className={cx('login-link')}>
                            Back to home
                        </Link>
                    </p>
                </div>

                <div className={cx('divider')}>
                    <span className={cx('divider-text')}>or sign up with</span>
                </div>

                <div className={cx('social-login')}>
                    <Button
                        onClick={handleSignUpWithGoogle}
                        label="Google"
                        className={cx('social-button', 'google')}>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;