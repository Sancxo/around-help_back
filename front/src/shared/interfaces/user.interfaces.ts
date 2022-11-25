export default interface User {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    birthdate?: Date,
    about?: string,
    address_id?: number,
    id_card?: string | undefined,
    avatar?: string | undefined,
    created_at?: Date
}

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