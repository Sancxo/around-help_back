import { ReactElement } from "react";

import User from "../shared/interfaces/user.interface";

export default function UserProfile({ user }: { user: User }): ReactElement {
    if (user) {
        return (
            <div>
                <p>Hello {user.first_name} {user.last_name}!</p>
                <p>{user.email}</p>
                <p>You are born: {user.birthdate?.getDate()}/{user.birthdate?.getMonth()}/{user.birthdate?.getFullYear()}</p>
                <p>About you: {user.about}</p>

            </div >
        )
    } else {
        return (
            <div>
                <p>Oops ... This user doesn't seem to exists !</p>
            </div>
        )
    }

}   