export default interface User {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    birthdate?: Date,
    about?: string,
    address_id?: number,
    id_card?: File | undefined,
    avatar?: File | undefined,
    created_at?: Date
}

export type SetUser = (user: User) => void;

export interface RegistrationValues {

    [index: string]: any,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    password_confirmation: string,
    birthdate?: Date,
    about?: string,
    address_id?: number,
    id_card?: File | undefined,
    avatar?: File | undefined
}


export interface LoginValues {
    email: string,
    password: string
}