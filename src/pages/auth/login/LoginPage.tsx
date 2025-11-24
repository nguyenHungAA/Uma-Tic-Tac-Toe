import { Link, useNavigate } from 'react-router';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '@/component/button/Button';
import { useFindUserByEmail } from '@/hooks/useUser';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';



function LoginPage() {
    const cx = classNames.bind(styles);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const findUserByEmailMutation = useFindUserByEmail();
    const navigate = useNavigate();

    const handleLoginWithGoogle = async () => {
        try {
            provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
            const result = await signInWithPopup(auth, provider);
            const firebaseUser = result.user;
            let user = null;

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
                <div className={cx('social-login')}>
                    <Button
                        onClick={handleLoginWithGoogle}
                        label="Google"
                        className={cx('social-button', 'google')}>
                    </Button>
                </div>
                <div className={cx('login-footer')}>
                    <p className={cx('login-text')}>
                        <Link to="/" className={cx('signup-link')}>
                            Back to home
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;