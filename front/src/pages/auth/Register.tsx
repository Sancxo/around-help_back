import { ReactElement, useContext, useEffect } from "react";
import UserRegistration from "../../components/UserRegistration";
import AddressRegistration from "../../components/AddressRegistration";
import User from "../../shared/interfaces/user.interfaces";
import { AddressContext, FlashMessageContext, TokenContext, UserContext } from "../../shared/context";
import { useNavigate } from "react-router-dom";
import { Address, FlashMessage, setContext } from "../../shared/interfaces/misc.interfaces";

export default function Register(): ReactElement {
    const { user, setUser }: { user: User, setUser: setContext<User> } = useContext(UserContext);
    const { address, setAddress }: { address: Address, setAddress: setContext<Address> } = useContext(AddressContext);

    const setFlashMessage: setContext<FlashMessage> = useContext(FlashMessageContext).setFlashMessage;
    const setToken: setContext<string> = useContext(TokenContext).setToken;

    const navigate = useNavigate();

    useEffect(() => {
        (user.id !== 0 && address.id !== 0) && navigate(`/user/${user.id}`)
    }, [navigate, user.id, address.id])

    if (user.id === 0) return <UserRegistration
        setFlashMessage={setFlashMessage}
        setUser={setUser}
        setToken={setToken} />
    else return <AddressRegistration
        setFlashMessage={setFlashMessage}
        setUser={setUser} setAddress={setAddress}
        navigate={navigate} />
}