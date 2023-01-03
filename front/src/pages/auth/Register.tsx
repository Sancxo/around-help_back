import { ReactElement, useContext, useEffect } from "react";
import UserRegistration from "../../components/UserRegistration";
import AddressRegistration from "../../components/AddressRegistration";
import User from "../../shared/interfaces/user.interfaces";
import { AddressContext, UserContext } from "../../shared/context";
import { useNavigate } from "react-router-dom";
import { Address } from "../../shared/interfaces/misc.interfaces";

export default function Register(): ReactElement {
    const user: User = useContext(UserContext).user;
    const address: Address = useContext(AddressContext).address;

    const navigate = useNavigate();

    useEffect(() => { (user.id !== 0 && address.id !== 0) && navigate(`/user/${user.id}`) })

    if (user.id === 0) return <UserRegistration />
    else return <AddressRegistration />
}