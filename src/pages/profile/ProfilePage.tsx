import { useParams } from "react-router";
import styles from './ProfilePage.module.scss';
import { useUmaById } from "@/hooks/useUma";
import classNames from "classnames/bind";
import Loading from "@/component/loading/Loading";
import Button from "@/component/button/Button";

function ProfilePage() {
    const { id } = useParams();
    const { data, error, isLoading } = useUmaById(id || '');

    const cx = classNames.bind(styles);

    if (error) {
        return (
            <div>
                Error loading data: {(error as Error).message}
            </div>
        )
    }

    if (isLoading) {
        return (
            <Loading />
        )
    }

    const uma = data.data[0].attributes;

    return (
        <div className={cx('profile-page')}>
            {/* Cover Photo Section */}
            <div className={cx('cover-section')}>
                <div className={cx('cover-photo')}>
                    <div className={cx('cover-gradient')}></div>
                </div>

                {/* Profile Header */}
                <div className={cx('profile-header')}>
                    <div className={cx('profile-avatar-container')}>
                        <img
                            src={uma.avatar}
                            alt={uma.name}
                            className={cx('profile-avatar')}
                        />
                    </div>

                    <div className={cx('profile-info')}>
                        <h1 className={cx('profile-name')}>{uma.name}</h1>
                        <p className={cx('profile-title')}>{uma.title}</p>
                        <div className={cx('profile-stats')}>
                            <div className={cx('stat-item')}>
                                <span className={cx('stat-number')}>127</span>
                                <span className={cx('stat-label')}>Races</span>
                            </div>
                            <div className={cx('stat-item')}>
                                <span className={cx('stat-number')}>2.4K</span>
                                <span className={cx('stat-label')}>Fans</span>
                            </div>
                            <div className={cx('stat-item')}>
                                <span className={cx('stat-number')}>89</span>
                                <span className={cx('stat-label')}>Wins</span>
                            </div>
                        </div>
                    </div>

                    <div className={cx('profile-actions')}>

                        <Button
                            label={"Message"}
                            onClick={() => { alert('Message button clicked!') }}
                            className={cx('action-btn', 'primary')}>
                            Message
                        </Button>
                        <Button
                            label={"⚙️"}
                            onClick={() => { alert('Settings button clicked!') }}
                            className={cx('action-btn', 'icon')}>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className={cx('content-section')}>
                <div className={cx('main-content')}>
                    {/* About Section */}
                    <div className={cx('card')}>
                        <div className={cx('card-header')}>
                            <h3 className={cx('card-title')}>About</h3>
                        </div>
                        <div className={cx('card-content')}>
                            <p className={cx('description')}>{uma.description}</p>

                            <div className={cx('info-grid')}>
                                <div className={cx('info-item')}>
                                    <span className={cx('info-label')}>Difficulty</span>
                                    <span className={cx('info-value', 'difficulty')}>{uma.difficulty}</span>
                                </div>
                                <div className={cx('info-item')}>
                                    <span className={cx('info-label')}>Joined</span>
                                    <span className={cx('info-value')}>January 2024</span>
                                </div>
                                <div className={cx('info-item')}>
                                    <span className={cx('info-label')}>Location</span>
                                    <span className={cx('info-value')}>Training Center</span>
                                </div>
                                <div className={cx('info-item')}>
                                    <span className={cx('info-label')}>Status</span>
                                    <span className={cx('info-value', 'active')}>Active Trainer</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className={cx('card')}>
                        <div className={cx('card-header')}>
                            <h3 className={cx('card-title')}>Recent Activity</h3>
                        </div>
                        <div className={cx('card-content')}>
                            <div className={cx('activity-list')}>
                                <div className={cx('activity-item')}>
                                    <div className={cx('activity-icon')}>🏆</div>
                                    <div className={cx('activity-content')}>
                                        <p className={cx('activity-text')}>Won the Spring Championship</p>
                                        <span className={cx('activity-time')}>2 hours ago</span>
                                    </div>
                                </div>
                                <div className={cx('activity-item')}>
                                    <div className={cx('activity-icon')}>⭐</div>
                                    <div className={cx('activity-content')}>
                                        <p className={cx('activity-text')}>Achieved new personal best</p>
                                        <span className={cx('activity-time')}>1 day ago</span>
                                    </div>
                                </div>
                                <div className={cx('activity-item')}>
                                    <div className={cx('activity-icon')}>🎯</div>
                                    <div className={cx('activity-content')}>
                                        <p className={cx('activity-text')}>Completed training milestone</p>
                                        <span className={cx('activity-time')}>3 days ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className={cx('sidebar')}>
                    {/* Quick Stats */}
                    <div className={cx('card', 'compact')}>
                        <div className={cx('card-header')}>
                            <h3 className={cx('card-title')}>Performance</h3>
                        </div>
                        <div className={cx('card-content')}>
                            <div className={cx('performance-chart')}>
                                <div className={cx('chart-bar')} style={{ height: '60%' }}></div>
                                <div className={cx('chart-bar')} style={{ height: '80%' }}></div>
                                <div className={cx('chart-bar')} style={{ height: '45%' }}></div>
                                <div className={cx('chart-bar')} style={{ height: '90%' }}></div>
                                <div className={cx('chart-bar')} style={{ height: '70%' }}></div>
                            </div>
                            <p className={cx('chart-label')}>Win rate trending up 📈</p>
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className={cx('card', 'compact')}>
                        <div className={cx('card-header')}>
                            <h3 className={cx('card-title')}>Achievements</h3>
                        </div>
                        <div className={cx('card-content')}>
                            <div className={cx('achievements-grid')}>
                                <div className={cx('achievement-badge')}>🥇</div>
                                <div className={cx('achievement-badge')}>⭐</div>
                                <div className={cx('achievement-badge')}>🏆</div>
                                <div className={cx('achievement-badge')}>🎯</div>
                                <div className={cx('achievement-badge')}>💎</div>
                                <div className={cx('achievement-badge', 'locked')}>🔒</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ProfilePage;