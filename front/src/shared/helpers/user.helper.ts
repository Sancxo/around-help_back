import { HeadersDefaults } from "axios";
import User from "../interfaces/user.interface";

const auth_token = "auth_token";
const infos_user = "infos_user";

function getLocalInfos(): [string, User] {
    const localToken = localStorage.getItem("auth_token") ?? "";
    const localUser = localStorage.getItem("infos_user") ?? "{}";

    return [localToken, localUser && JSON.parse(localUser)];
}
function setUserInfos(
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>,
    token: string,
    setToken: React.Dispatch<React.SetStateAction<string>>,
    axiosHeaders: HeadersDefaults
) {
    setUser(user);
    setToken(token);
    localStorage.setItem(infos_user, `${user}`);
    localStorage.setItem(auth_token, token);
    axiosHeaders.common["Authorization"] = token;
}

function resetUserInfos(
    emptyUser: User,
    setUser: React.Dispatch<React.SetStateAction<User>>,
    setToken: React.Dispatch<React.SetStateAction<string>>,
    axiosHeaders: HeadersDefaults
) {
    setUser(emptyUser);
    setToken("");
    localStorage.removeItem(infos_user);
    localStorage.removeItem(auth_token);
    axiosHeaders.common["Authorization"] = "";
}
export { getLocalInfos, setUserInfos, resetUserInfos }