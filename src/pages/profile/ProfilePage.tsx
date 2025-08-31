import { useParams } from "react-router";
import styles from './ProfilePage.module.scss';

function ProfilePage() {
    const { id } = useParams();

    const userData = null;

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    if (!userData) {
        return <div className={styles.profilePage}>User not found</div>;
    }

    // if (userData) {
    //     return (
    //         <div className={styles['profile-page']}>
    //             <div className={styles['profile-container']}>
    //                 <div className={styles['profile-header']}>
    //                     <div className={styles['profile-avatar']}>
    //                         {getInitials(userData.name)}
    //                     </div>
    //                     <div className={styles['profile-info']}>
    //                         <h1 className={styles['profile-name']}>{userData.name}</h1>
    //                         <p className={styles['profile-title']}>{userData.title}</p>
    //                         <div className={styles['profile-stats']}>
    //                             <div className={styles['stat-item']}>
    //                                 <span className={styles['stat-value']}>{userData?.name}</span>
    //                                 <span className={styles['stat-label']}>Games Played</span>
    //                             </div>
    //                             <div className={styles['stat-item']}>
    //                                 <span className={styles['stat-value']}>{userData?.name}%</span>
    //                                 <span className={styles['stat-label']}>Win Rate</span>
    //                             </div>
    //                             <div className={styles['stat-item']}>
    //                                 <span className={styles['stat-value']}>{userData?.difficulty}</span>
    //                                 <span className={styles['stat-label']}>Difficulty</span>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>

    //                 <div className={styles['profile-sections']}>
    //                     <div className={styles['profile-section']}>
    //                         <h3 className={styles['section-title']}>About</h3>
    //                         <div className={styles['section-content']}>
    //                             {userData?.description}
    //                         </div>
    //                     </div>

    //                     <div className={styles['profile-section']}>
    //                         <h3 className={styles['section-title']}>Favorite Uma Musume</h3>
    //                         <div className={styles['favorite-umas']}>
    //                             {userData.favoriteUma && userData.favoriteUma.map((uma, index) => (
    //                                 <div key={index} className={styles['uma-item']}>
    //                                     <div className={styles['uma-icon']}>
    //                                         {uma.charAt(0)}
    //                                     </div>
    //                                     <div className={styles['uma-name']}>{uma}</div>
    //                                 </div>
    //                             ))}
    //                         </div>
    //                     </div>
    //                 </div>

    //                 <div className={styles['profile-section']}>
    //                     <h3 className={styles['section-title']}>Hobbies & Interests</h3>
    //                     <div className={styles['hobbies-list']}>
    //                         {userData.hobbies && userData.hobbies.map((hobby, index) => (
    //                             <span key={index} className={styles['hobby-tag']}>
    //                                 {hobby}
    //                             </span>
    //                         ))}
    //                     </div>
    //                 </div>

    //                 <button className={styles['play-button']}>
    //                     Challenge This Player
    //                 </button>
    //             </div>
    //         </div>
    //     )
    // }
}

export default ProfilePage;