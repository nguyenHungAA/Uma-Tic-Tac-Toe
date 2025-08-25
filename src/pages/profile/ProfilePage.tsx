import { useParams } from "react-router";

function ProfilePage() {
    const { id } = useParams();

    return (
        <div className="profile-page">
            <h1>User Profile: {id}</h1>
            {/* Profile details go here */}
        </div>
    );
}
export default ProfilePage;