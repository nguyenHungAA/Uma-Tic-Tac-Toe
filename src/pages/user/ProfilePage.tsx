import { useParams } from "react-router";

function ProfilePage() {

    const { id } = useParams<{ id: string }>();


    return (
        <div>
            <h1>User Profile</h1>
            <p>Profile ID: {id}</p>

            <p>Total wins: </p>
        </div>
    );
}
export default ProfilePage;