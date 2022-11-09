// Handles all the functions needed to manage User login/out and registration

import axios, { AxiosResponse, HeadersDefaults } from "axios";
import { NavigateFunction } from "react-router-dom";
import User, { RegistrationValues } from "../interfaces/user.interface";

const auth_token = "auth_token";
const infos_user = "infos_user";

function signIn(
    email: String | undefined,
    password: String | undefined,
    setUser: React.Dispatch<React.SetStateAction<User>>,
    setToken: React.Dispatch<React.SetStateAction<string>>,
    navigate: NavigateFunction
) {
    axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/users/sign_in`, { "user": { "email": email, "password": password } })
        .then(resp => {
            setUserInfos(resp.data.user, setUser, resp.headers.authorization, setToken, axios.defaults.headers);
            navigate(`/user/${resp.data.user.id}`);
        })
        .catch(err => console.error(err))
}

function signInWtihToken(
    token: string,
    setUser: React.Dispatch<React.SetStateAction<User>>,
    setToken: React.Dispatch<React.SetStateAction<string>>
) {
    axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/user`, { headers: { authorization: token } })
        .then(resp => {
            setUserInfosFromToken(resp.data.user, setUser, setToken);
        })
        .catch(err => console.error(err));
}

function register(
    registrationValues: FormData,
    setUser: React.Dispatch<React.SetStateAction<User>>,
    setToken: React.Dispatch<React.SetStateAction<string>>,
    navigate: NavigateFunction
) {
    axios
        .post<FormData, AxiosResponse<any, any>>(`${process.env.REACT_APP_BACKEND_URL}/users`, registrationValues)
        .then(resp => {
            if (resp.status === 200) {
                setUserInfos(resp.data.user, setUser, resp.headers.authorization, setToken, axios.defaults.headers);
                navigate(`/user/${resp.data.user.id}`);
            }
        })
        .catch(err => console.error(err));
}

function update(
    registrationValues: RegistrationValues,
    setUser: React.Dispatch<React.SetStateAction<User>>,
    setToken: React.Dispatch<React.SetStateAction<string>>,
    navigate: NavigateFunction
) {
    axios
        .patch<RegistrationValues, AxiosResponse<any, any>>(`${process.env.REACT_APP_BACKEND_URL}/users`, { "user": registrationValues })
        .then(resp => {
            if (resp.status === 200) {
                setUserInfos(resp.data.user, setUser, resp.headers.authorization, setToken, axios.defaults.headers);
                navigate(`/user/${resp.data.user.id}`);
            }
        })
        .catch(err => console.error(err));
}

function signOut(
    token: string,
    defaultUser: User,
    setUser: React.Dispatch<React.SetStateAction<User>>,
    setToken: React.Dispatch<React.SetStateAction<string>>
) {
    axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/users/sign_out`, { headers: { authorization: token } })
        .then(resp => {
            if (resp.status === 200) {
                resetUserInfos(defaultUser, setUser, setToken, axios.defaults.headers);
            };
        })
        .catch(err => console.error(err));
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
    localStorage.setItem(auth_token, token);
    axiosHeaders.common["Authorization"] = token;
}

function setUserInfosFromToken(
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>,
    setToken: React.Dispatch<React.SetStateAction<string>>
) {
    setUser(user);
    setToken(localStorage.getItem(auth_token) as string);
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
            setUserProfile(resp.data.user);
            setIsLoaded(true);
        })
        .catch(err => {
            console.log(err);
            setIsLoaded(true);
            setError(true)
        })
}

export { signIn, signInWtihToken, register, update, signOut, resetUserInfos, getUserInfos }