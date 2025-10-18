import { Link, useNavigate } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '@/component/button/Button';
import Loading from '@/component/loading/Loading';
import { useFindUserByEmail, useLoginUser } from '@/hooks/useUser';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

const loginSchema = Yup.object({
    email: Yup.string()
        .email('Please enter a valid email')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    rememberMe: Yup.boolean(),
});

const initialValues = {
    email: '',
    password: '',
    rememberMe: false,
};

function LoginPage() {
    const cx = classNames.bind(styles);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const loginUserMutation = useLoginUser();
    const findUserByEmailMutation = useFindUserByEmail();
    const navigate = useNavigate();


    const handleSubmit = async (values: typeof initialValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            console.log('Submitting login form with values:', values);

            const token = await loginUserMutation.mutateAsync({ email: values.email, password: values.password });
            alert('Login successful!');
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            alert('Failed to login. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleLoginWithGoogle = async () => {
        try {
            provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
            const result = await signInWithPopup(auth, provider);
            const firebaseUser = result.user;
            let user = null;
            console.log('Google sign-in successful:', firebaseUser);

            if (firebaseUser && firebaseUser.email) {
                user = await findUserByEmailMutation.mutateAsync({
                    email: firebaseUser.email,
                    firebaseUid: firebaseUser.uid,
                    avatarUrl: firebaseUser.photoURL
                });
            }
            localStorage.setItem('token', user.data[0].attributes._doc.firebaseUid || '');
            localStorage.setItem('user', JSON.stringify(user.data[0].attributes._doc));
            navigate('/', {
                state: { user: user.data[0].attributes._doc }
            });
        } catch (error) {
            console.error('Google sign-in error:', error);
            alert('Failed to sign up with Google. Please try again.');
        }
    }

    return (
        <div className={cx('login-page')}>
            <div className={cx('login-container')}>
                <div className={cx('login-header')}>
                    <h1 className={cx('login-title')}>Welcome Back</h1>
                    <p className={cx('login-subtitle')}>Sign in to your account</p>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form className={cx('login-form')}>
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

                            <div className={cx('form-options')}>
                                <label className={cx('checkbox-label')}>
                                    <Field
                                        type="checkbox"
                                        name="rememberMe"
                                        className={cx('checkbox-input')}
                                        disabled={isSubmitting}
                                    />
                                    <span className={cx('checkbox-custom')}></span>
                                    Remember me
                                </label>
                                <Link to="/forgot-password" className={cx('forgot-link')}>
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className={cx('login-button', { loading: isSubmitting })}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <Loading /> : 'Sign In'}
                            </button>
                        </Form>
                    )}
                </Formik>

                <div className={cx('login-footer')}>
                    <p className={cx('signup-text')}>
                        Don't have an account?{' '}
                        <Link to="/auth/signup" className={cx('signup-link')}>
                            Sign up
                        </Link>
                    </p>
                    <p className={cx('login-text')}>
                        <Link to="/" className={cx('signup-link')}>
                            Back to home
                        </Link>
                    </p>
                </div>

                <div className={cx('divider')}>
                    <span className={cx('divider-text')}>or continue with</span>
                </div>

                <div className={cx('social-login')}>
                    <Button
                        onClick={handleLoginWithGoogle}
                        label="Google"
                        className={cx('social-button', 'google')}>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;