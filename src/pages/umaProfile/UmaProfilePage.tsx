import { useParams } from "react-router";
import styles from './ProfilePage.module.scss';
import { useUmaById } from "@/hooks/useUma";
import classNames from "classnames/bind";
import Loading from "@/component/loading/Loading";
import Button from "@/component/button/Button";
import { useEffect } from "react";

function UmaProfilePage() {
    const { id } = useParams();
    const { data, error, isLoading } = useUmaById(id || '');
    const cx = classNames.bind(styles);

    useEffect(() => {
        if (id) {
            const coverPhotoElement = document.getElementById('cover-photo');
            const profileAvtarElement = document.getElementById('profile-avatar');
            const message = document.getElementById('message-btn');

            if (coverPhotoElement) {
                coverPhotoElement.style.background = `linear-gradient(135deg, ${uma.themeColor}, ${uma.gradientColor} 100%)`;
            }

            if (profileAvtarElement) {
                profileAvtarElement.style.background = uma.themeColor;
            }

            if (message) {
                message.style.background = uma.themeColor;
            }
        }
    }, [data, id]);

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
            <div className={cx('cover-section')}>
                <div
                    id="cover-photo"
                    className={cx('cover-photo')}>
                    <div className={cx('cover-gradient')}></div>
                </div>

                <div className={cx('profile-header')}>
                    <div className={cx('profile-avatar-container')}>
                        <img
                            id="profile-avatar"
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
                                <span className={cx('stat-number')}>{uma.totalRaces}</span>
                                <span className={cx('stat-label')}>Races</span>
                            </div>
                            <div className={cx('stat-item')}>
                                <span className={cx('stat-number')}>{uma.peakFans}</span>
                                <span className={cx('stat-label')}>Fans</span>
                            </div>
                            <div className={cx('stat-item')}>
                                <span className={cx('stat-number')}>{uma.totalWins}</span>
                                <span className={cx('stat-label')}>Wins</span>
                            </div>
                        </div>
                    </div>

                    <div className={cx('profile-actions')}>

                        <Button
                            id="message-btn"
                            label={"Message"}
                            onClick={() => { alert('Message button clicked!') }}
                            className={cx('action-btn', 'primary')}
                        >
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
                                    <span className={cx('info-value')}>{uma.joinedDate}</span>
                                </div>
                                <div className={cx('info-item')}>
                                    <span className={cx('info-label')}>Location</span>
                                    <span className={cx('info-value')}>Training Center</span>
                                </div>
                                <div className={cx('info-item')}>
                                    <span className={cx('info-label')}>Status</span>
                                    <span className={cx('info-value', 'active')}>{uma.status}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            {uma.introVideo ? (
                                <Button
                                    label={"Watch Intro Video"}
                                    onClick={() => { window.open(`${uma._id}/intro-video`, '_blank') }}
                                    primary
                                />
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className={cx('card')}>
                        <div className={cx('card-header')}>
                            <h3 className={cx('card-title')}>Real life interpretation</h3>
                        </div>
                        <div className={cx('card-content')}>
                            <div className={cx('activity-list')}>
                                <p className={cx('activity-text')}>{uma.realLifeInterpretation}</p>
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

export default UmaProfilePage;