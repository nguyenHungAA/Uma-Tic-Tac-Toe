import { useState } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '@/component/button/Button';

function LoginPage() {
    const cx = classNames.bind(styles);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = { email: '', password: '' };
        let isValid = true;

        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Login attempt:', formData);
            // Handle successful login here
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cx('login-page')}>
            <div className={cx('login-container')}>
                <div className={cx('login-header')}>
                    <h1 className={cx('login-title')}>Welcome Back</h1>
                    <p className={cx('login-subtitle')}>Sign in to your account</p>
                </div>

                <form className={cx('login-form')} onSubmit={handleSubmit}>
                    <div className={cx('form-group')}>
                        <label htmlFor="email" className={cx('form-label')}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={cx('form-input', { error: errors.email })}
                            placeholder="Enter your email"
                            disabled={isLoading}
                        />
                        {errors.email && (
                            <span className={cx('error-message')}>{errors.email}</span>
                        )}
                    </div>

                    <div className={cx('form-group')}>
                        <label htmlFor="password" className={cx('form-label')}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={cx('form-input', { error: errors.password })}
                            placeholder="Enter your password"
                            disabled={isLoading}
                        />
                        {errors.password && (
                            <span className={cx('error-message')}>{errors.password}</span>
                        )}
                    </div>

                    <div className={cx('form-options')}>
                        <label className={cx('checkbox-label')}>
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleInputChange}
                                className={cx('checkbox-input')}
                                disabled={isLoading}
                            />
                            <span className={cx('checkbox-custom')}></span>
                            Remember me
                        </label>
                        <Link to="/forgot-password" className={cx('forgot-link')}>
                            Forgot password?
                        </Link>
                    </div>

                    <Button
                        onClick={() => { }}
                        label={isLoading ? 'Signing in...' : 'Sign In'}
                        className={cx('login-button', { loading: isLoading })}
                        disabled={isLoading}
                    >
                    </Button>
                </form>

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
                        onClick={() => alert('Google login not implemented')}
                        label="Google"
                        className={cx('social-button', 'google')}>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;