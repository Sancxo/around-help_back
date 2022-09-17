import { ReactElement } from "react";

import User from "../shared/interfaces/user.interface";

export default function UserProfile({ user }: { user: User }): ReactElement {
    if (user) {
        return (
            <div>
                <p>Hello {user.first_name} {user.last_name}!</p>
                <p>{user.email}</p>
                {/* For an unknown reason, I have to use a fragment (<></>) to display this variable ... */}
                <p><>You are born: {user.birthdate}</></p>
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