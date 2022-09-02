import { ReactElement } from "react";
import '../styles/Forms.css';

export default function SignIn(): ReactElement {
    function handleSubmit() {
        const addressForm = document.getElementById("address-infos") as HTMLFormElement;
        // const inputList: HTMLFormControlsCollection = addressForm.elements;

        // for (let i = 0; i < inputList.length; i++) {
        //     const input = inputList[i] as HTMLInputElement;
        //     console.log(`${input.name}: ${input.value}`)
        // }

        addressForm.submit()
        // fetch address_id from Rails
        // put it in the hidden input
        // then: 
        // const userForm = document.getElementById("user-infos") as HTMLFormElement;
        // userForm.submit();
    }

    return (
        <div>
            <form id="user-infos" method="POST" action={`${process.env.REACT_APP_BACKEND_URL}/users`} encType='multipart/form-data'>
                <fieldset>
                    <legend>About you: </legend>

                    <label htmlFor="first-name-input">First name:</label>
                    <input type="text" name="first_name" id="first-name-input" />

                    <label htmlFor="last-name-input">Last name:</label>
                    <input type="text" name="last_name" id="last-name-input" />

                    <label htmlFor="password-input">Password:</label>
                    <input type="password" name="password" id="password-input" />

                    <label htmlFor="password-confirmation-input">Confirm password:</label>
                    <input type="password" name="password_confirmation" id="password-confirmation-input" />

                    <label htmlFor="birthdate-input">Birthdate:</label>
                    <input type="date" name="birthdate" id="birthdate-input" />

                    <label htmlFor="about-input">About:</label>
                    <textarea name="about" id="about" cols={30} rows={10}></textarea>

                    <label htmlFor="email-input" > Email:</label>
                    <input type="email" name="email" id="email-input" />

                    <label htmlFor="id-card-input">Id card:</label>
                    <input type="file" name="id_card" id="id-card-input" />

                    <input type="hidden" name="address_id" />
                </fieldset>
            </form>

            <form name="address" style={{ paddingTop: "2em" }} id="address-infos" method="POST" action={`${process.env.REACT_APP_BACKEND_URL}/addresses`}>
                <fieldset>
                    <legend>Where do you live?</legend>

                    <label htmlFor="number-input">Street number:</label>
                    <input type="text" name="number" id="number-input" />

                    <label htmlFor="street-input">Street name:</label>
                    <input type="text" name="street" id="street-input" />

                    <label htmlFor="postal-code-input">Postal code:</label>
                    <input type="text" name="postal_code" id="postal-code-input" />

                    <label htmlFor="city-input">City:</label>
                    <input type="text" name="city" id="city-input" />

                    <label htmlFor="state-input">State:</label>
                    <input type="text" name="state" id="state-input" />

                    <label htmlFor="country-input">Country:</label>
                    <input type="text" name="country" id="country-input" />
                </fieldset>
            </form>

            <input type="button" value="Submit" onClick={handleSubmit} />
        </div >
    )
}