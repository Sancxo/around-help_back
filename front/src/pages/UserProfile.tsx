import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import User from "../shared/interfaces/user.interface";

export default function UserProfile({ defaultUser }: { defaultUser: User }): ReactElement {
    const urlParams = useParams();
    console.log(urlParams.id);

    const [userProfile, setUserProfile] = useState<User>(defaultUser)
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/users/${urlParams.id}`)
            .then(resp => {
                console.log("We get User: ", resp.data.user);
                setUserProfile(resp.data.user);
                setIsLoaded(true);
            })
            .catch(err => {
                console.log(err);
                setIsLoaded(true);
                setError(true)
            })
    }, [urlParams.id])

    if (!isLoaded) return <div><p>Please, wait ...</p></div>

    if (error || !userProfile) {
        return (
            <div>
                <p>Oops ... This user doesn't seem to exists !</p>
            </div>
        )
    }

    return (
        <div>
            <p>Hello {userProfile.first_name} {userProfile.last_name}!</p>
            <p>{userProfile.email}</p>
            <p>You are born: <>{userProfile.birthdate}</></p>
            {userProfile.about && <p>About you: {userProfile.about}</p>}
        </div >
    )
}   