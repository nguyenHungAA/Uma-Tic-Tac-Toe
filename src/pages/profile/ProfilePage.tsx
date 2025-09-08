import { useParams } from "react-router";
import styles from './ProfilePage.module.scss';
import { useUmaById } from "@/hooks/useUma";
import classNames from "classnames/bind";
import Loading from "@/component/loading/Loading";

function ProfilePage() {
    const { id } = useParams();
    const { data, error, isLoading } = useUmaById(id || '');
    console.log(data);

    const cx = classNames.bind(styles);
    if (!data) {
        return (
            <div>
                Cant find uma with {id}
            </div>
        )
    }

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

    return (
        <div>
            <h1>Profile Page</h1>
            <div>{data.data[0].attributes.name}</div>
            <div>{data.data[0].attributes.title}</div>
            <img src={data.data[0].attributes.avatar} alt={data.data[0].attributes.name} />
        </div>
    );

}

export default ProfilePage;