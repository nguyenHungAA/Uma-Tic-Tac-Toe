import { useState } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import Button from '@/component/button/Button';
import Loading from '@/component/loading/Loading';

function SignupPage() {
    const cx = classNames.bind(styles);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: ''
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
        const newErrors = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeToTerms: ''
        };
        let isValid = true;

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
            isValid = false;
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
            isValid = false;
        }

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

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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
            console.log('Signup attempt:', formData);
            // Handle successful signup here
        } catch (error) {
            console.error('Signup error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cx('signup-page')}>
            <div className={cx('signup-container')}>
                <div className={cx('signup-header')}>
                    <h1 className={cx('signup-title')}>Sign up</h1>
                    <p className={cx('signup-subtitle')}>Join us and start playing</p>
                </div>

                <form className={cx('signup-form')} onSubmit={handleSubmit}>
                    <div className={cx('name-row')}>
                        <div className={cx('form-group')}>
                            <label htmlFor="firstName" className={cx('form-label')}>
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className={cx('form-input', { error: errors.firstName })}
                                placeholder="Enter your first name"
                                disabled={isLoading}
                            />
                            {errors.firstName && (
                                <span className={cx('error-message')}>{errors.firstName}</span>
                            )}
                        </div>

                        <div className={cx('form-group')}>
                            <label htmlFor="lastName" className={cx('form-label')}>
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className={cx('form-input', { error: errors.lastName })}
                                placeholder="Enter your last name"
                                disabled={isLoading}
                            />
                            {errors.lastName && (
                                <span className={cx('error-message')}>{errors.lastName}</span>
                            )}
                        </div>
                    </div>

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

                    <div className={cx('form-group')}>
                        <label htmlFor="confirmPassword" className={cx('form-label')}>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={cx('form-input', { error: errors.confirmPassword })}
                            placeholder="Confirm your password"
                            disabled={isLoading}
                        />
                        {errors.confirmPassword && (
                            <span className={cx('error-message')}>{errors.confirmPassword}</span>
                        )}
                    </div>

                    <div className={cx('form-options')}>
                        <label className={cx('checkbox-label')}>
                            <input
                                type="checkbox"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleInputChange}
                                className={cx('checkbox-input')}
                                disabled={isLoading}
                            />
                            <span className={cx('checkbox-custom')}></span>
                            I agree to the{' '}
                            <Link to="/terms" className={cx('terms-link')}>
                                Terms & Conditions
                            </Link>
                        </label>
                        {errors.agreeToTerms && (
                            <span className={cx('error-message', 'terms-error')}>{errors.agreeToTerms}</span>
                        )}
                    </div>

                    <Button
                        onClick={() => { }}
                        label={isLoading ? <Loading /> : 'Create Account'}
                        className={cx('signup-button', { loading: isLoading })}
                        disabled={isLoading}
                    >
                    </Button>
                </form>

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
                        onClick={() => alert('Google signup not implemented')}
                        label="Google"
                        className={cx('social-button', 'google')}>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;