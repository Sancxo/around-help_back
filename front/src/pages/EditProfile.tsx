import { ReactElement, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext, UserContext } from "../shared/context";
import { defaultUser, update } from "../shared/helpers/user.helper";

import { RegistrationValues } from "../shared/interfaces/user.interfaces";

export default function EditProfile(): ReactElement {
  const [registrationValues, setRegistrationValues] = useState<RegistrationValues>({
    first_name: "",
    last_name: "",
    password: "",
    password_confirmation: "",
    email: "",
    avatar: undefined,
    id_card: undefined
  });
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);

  const [avatar, setAvatar] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);


  const navigate = useNavigate();

  function handleInputs(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = e.target.name;
    const value = e.target.value;

    setRegistrationValues(registrationValues => ({ ...registrationValues, [name]: value }));
  }
  function handleImages(e: React.ChangeEvent<HTMLInputElement>) {
    const imgFile = e.target.files![0];
    e.target.id === "avatar-input" && setRegistrationValues(registrationValues => ({ ...registrationValues, 'avatar': imgFile }));
    setAvatar(URL.createObjectURL(imgFile));
  }

  function handleSubmit() {
    update(registrationValues, setUser, setToken, navigate);
  }

  console.log(user)

  return (
    <form name="user" id="user-infos" encType='multipart/form-data' className="container">
      <h3>Register: </h3>
      <fieldset>
        <legend>About you: </legend>

        <label htmlFor="first-name-input">First name:</label>
        <input type="text" name="first_name" id="first-name-input" value={user.first_name as string} onChange={handleInputs} />

        <label htmlFor="last-name-input">Last name:</label>
        <input type="text" name="last_name" id="last-name-input" value={user.last_name as string} onChange={handleInputs} />

        <img src={`${avatar ? avatar : (user.avatar ? user.avatar : defaultUser.avatar)}`} alt="avatar" width={200} height={200} />

        <label htmlFor="avatar-input">Profile picture:</label>
        <input type="file" name="avatar" id="avatar-input" accept="image/png, image/jpeg, image/gif, image/webp, image/avif" onChange={handleImages} />

        {/* <label htmlFor="birthdate-input">Birthdate:</label>
        <input type="date" name="birthdate" id="birthdate-input" value={user.birthdate } onChange={handleInputs} /> */}

        <label htmlFor="about-input">About:</label>
        <textarea name="about" id="about" cols={30} rows={10} onChange={handleInputs} value={user.about as string} ></textarea>

        <label htmlFor="email-input">Email:</label>
        <input type="email" name="email" id="email-input" value={user.email as string} onChange={handleInputs} />

        <input type="button" className="btn-prim" value="Submit" onClick={handleSubmit} />
      </fieldset>
    </form>
  )
}