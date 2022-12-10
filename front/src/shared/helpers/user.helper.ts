// Handles all the functions needed to manage User login/out and registration

import axios, { AxiosResponse, HeadersDefaults } from "axios";
import { NavigateFunction } from "react-router-dom";
import { Error, FlashMessage, Ok, setContext } from "../interfaces/misc.interfaces";
import User from "../interfaces/user.interfaces";
import defaultUserAvatar from "../imgs/default-user.png";
import { getFlash } from "./flash.helper";

const auth_token = "auth_token";
const infos_user = "infos_user";

export const defaultUser: User = {
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    avatar: defaultUserAvatar
}

function setAvatarToUser(user: User, avatar: string) {
    const imgSrc = process.env.REACT_APP_BACKEND_URL + avatar;
    Object.assign(user, { avatar: imgSrc });
}

async function signIn(
    email: String | undefined,
    password: String | undefined,
    setUser: setContext<User>,
    setToken: setContext<string>,
    navigate: NavigateFunction
): Promise<[symbol, string]> {
    return await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/users/sign_in`, { "user": { "email": email, "password": password } })
        .then((resp): [symbol, string] => {
            if (resp.status === 200) {
                setAvatarToUser(resp.data.user, resp.data.avatar);

                setUserInfos(resp.data.user, setUser, resp.headers.authorization, setToken);
                navigate(`/user/${resp.data.user.id}`);
                return [Ok, resp.data.message];
            } else {
                console.error(resp);
                return [Error, resp.data.message];
            };
        })
        .catch((err): [symbol, string] => { return [Error, err.message] });
}

async function signInWtihToken(
    token: string,
    setUser: setContext<User>,
    setToken: setContext<string>
): Promise<[symbol, string]> {
    return await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/user`, { headers: { authorization: token } })
        .then((resp): [symbol, string] => {
            if (resp.status === 200) {
                setAvatarToUser(resp.data.user, resp.data.avatar)

                setUserInfosFromToken(resp.data.user, setUser, token, setToken);
                return [Ok, resp.data.message];
            } else {
                console.error(resp);
                return [Error, resp.data.message];
            }
        })
        .catch((err): [symbol, string] => { return [Error, err.message] });
}

async function registerUser(
    registrationValues: FormData,
    setUser: setContext<User>,
    setToken: setContext<string>,
    setFlashMessage: setContext<FlashMessage>,
): Promise<any> {
    return await axios
        .post<FormData, AxiosResponse<any, any>>(`${process.env.REACT_APP_BACKEND_URL}/users`, registrationValues)
        .then((resp): {} => {
            if (resp.status === 200) {
                setAvatarToUser(resp.data.user, resp.data.avatar)

                setUserInfos(resp.data.user, setUser, resp.headers.authorization, setToken);

                getFlash(setFlashMessage, [Ok, resp.data.message]);

                return resp.data
            } else {
                console.error(resp);
                getFlash(setFlashMessage, [Error, resp.data.message]);
                return resp.data;
            };
        })
        .catch((err): void => {
            getFlash(setFlashMessage, [Error, err.message]);
        });
}

async function updateUser(
    registrationValues: FormData | {},
    setUser: setContext<User>,
    setToken: setContext<string>,
    setFlashMessage: setContext<FlashMessage>,
    navigate: NavigateFunction
): Promise<any> {
    return await axios
        .patch<FormData | {}, AxiosResponse<any, any>>(`${process.env.REACT_APP_BACKEND_URL}/user`, registrationValues)
        .then((resp): {} => {
            if (resp.status === 200) {
                setAvatarToUser(resp.data.user, resp.data.avatar);

                getFlash(setFlashMessage, [Ok, resp.data.message]);

                return resp.data;
            } else {
                console.error(resp);
                return resp.data;
            };
        })
        .catch((err): void => {
            console.error(err);
        });
}

async function signOut(
    token: string,
    defaultUser: User,
    setUser: setContext<User>,
    setToken: setContext<string>
): Promise<[symbol, string]> {
    return await axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/users/sign_out`, { headers: { authorization: token } })
        .then((resp): [symbol, string] => {
            if (resp.status === 200) {
                resetUserInfos(defaultUser, setUser, setToken, axios.defaults.headers);
                return [Ok, resp.data.message];
            } else {
                console.error(resp);
                return [Error, resp.data.message];
            };
        })
        .catch((err): [symbol, string] => { return [Error, err.message] });
}

function setUserInfos(
    user: User,
    setUser: setContext<User>,
    token: string,
    setToken: setContext<string>
) {
    setUser(user);
    setToken(token);
    localStorage.setItem(auth_token, token);
    axios.defaults.headers.common["Authorization"] = token;

    console.info(`User is logged in with id ${user.id}.`);
}

function setUserInfosFromToken(
    user: User,
    setUser: setContext<User>,
    token: string,
    setToken: setContext<string>
) {
    setUser(user);
    setToken(localStorage.getItem(auth_token) as string);
    axios.defaults.headers.common["Authorization"] = token;

    console.info("We checked the authentification token with success.");
}

function resetUserInfos(
    emptyUser: User,
    setUser: setContext<User>,
    setToken: setContext<string>,
    axiosHeaders: HeadersDefaults
) {
    setUser(emptyUser);
    setToken("");
    localStorage.removeItem(infos_user);
    localStorage.removeItem(auth_token);
    axiosHeaders.common["Authorization"] = "";

    console.info("We reset the user informations on client side.")
}

function getUserInfos(
    id: string,
    token: string,
    setUserProfile: React.Dispatch<React.SetStateAction<User>>,
    setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<boolean>>
) {
    axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`, { headers: { authorization: token } })
        .then(resp => {
            setAvatarToUser(resp.data.user, resp.data.avatar);

            setUserProfile(resp.data.user);
            setIsLoaded(true);
        })
        .catch(err => {
            console.error(err);
            setIsLoaded(true);
            setError(true);
        })
}

export { signIn, signInWtihToken, registerUser, updateUser, signOut, resetUserInfos, getUserInfos }