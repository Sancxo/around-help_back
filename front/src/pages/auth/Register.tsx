import React, { ReactElement, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import User, { RegistrationValues } from "../../shared/interfaces/user.interfaces";
import { register } from "../../shared/helpers/user.helper";
import { clearFlash, getFlash } from "../../shared/helpers/flash.helper";
import { FlashMessageContext, TokenContext, UserContext } from "../../shared/context";
import { FlashMessage, setContext } from "../../shared/interfaces/misc.interfaces";

export default function Register(): ReactElement {
    const setUser: setContext<User> = useContext(UserContext).setUser;
    const setToken: setContext<string> = useContext(TokenContext).setToken;
    const setFlashMessage: setContext<FlashMessage> = useContext(FlashMessageContext).setFlashMessage;

    const [registrationValues, setRegistrationValues] = useState<RegistrationValues>({
        first_name: "",
        last_name: "",
        password: "",
        password_confirmation: "",
        email: ""
    });
    const navigate = useNavigate();

    function handleInputs(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const name = e.target.name;
        const value = e.target.value;

        setRegistrationValues(registrationValues => ({ ...registrationValues, [name]: value }));
    }
    function handleImages(e: React.ChangeEvent<HTMLInputElement>) {
        (e.target.id === "avatar-input") && setRegistrationValues(registrationValues => ({ ...registrationValues, 'avatar': e.target.files![0] }));
        e.target.id === "id-card-input" && setRegistrationValues(registrationValues => ({ ...registrationValues, 'id_card': e.target.files![0] }));
    }

    async function handleSubmit() {
        clearFlash(setFlashMessage);

        const user: any = { registrationValues };
        const formData = new FormData();

        for (const field in user.registrationValues) {
            if (Object.prototype.hasOwnProperty.call(user.registrationValues, field)) {
                formData.append(`user[${field}]`, user.registrationValues[field]);
            }
        }
        const resp = await register(formData, setUser, setToken, navigate);
        getFlash(setFlashMessage, resp);
    }

    return (
        <form name="user" id="user-infos" encType='multipart/form-data' className="container">
            <h3>Register: </h3>
            <fieldset>
                <label htmlFor="first-name-input">First name <small>(mandatory)</small>:</label>
                <input type="text" name="first_name" id="first-name-input" onChange={handleInputs} />
                <br />

                <label htmlFor="last-name-input">Last name <small>(mandatory)</small>:</label>
                <input type="text" name="last_name" id="last-name-input" onChange={handleInputs} />
                <br />

                <label htmlFor="email-input">Email <small>(mandatory)</small>:</label>
                <input type="email" name="email" id="email-input" onChange={handleInputs} />
                <br />

                <label htmlFor="avatar-input">Profile picture:</label>
                <input type="file" name="avatar" id="avatar-input" accept="image/png, image/jpeg, image/gif, image/webp, image/avif" onChange={handleImages} />
                <br />

                <label htmlFor="id-card-input">Id card <small>(mandatory)</small>:</label>
                <input type="file" name="id_card" id="id-card-input" accept="application/pdf, image/png, image/jpeg, image/gif, image/webp, image/avif" onChange={handleImages} />
                <br />

                <label htmlFor="password-input">Password <small>(mandatory)</small>:</label>
                <input type="password" name="password" id="password-input" onChange={handleInputs} />
                <br />

                <label htmlFor="password-confirmation-input">Confirm password <small>(mandatory)</small>:</label>
                <input type="password" name="password_confirmation" id="password-confirmation-input" onChange={handleInputs} />
                <br />

                <label htmlFor="birthdate-input">Birthdate:</label>
                <input type="date" name="birthdate" id="birthdate-input" onChange={handleInputs} />
                <br />

                <label htmlFor="about-input">About:</label>
                <textarea name="about" id="about" cols={30} rows={10} onChange={handleInputs} ></textarea>
                <br />

                <input type="button" className="btn-prim" value="Submit" onClick={handleSubmit} />
            </fieldset>
        </form>
    )
}