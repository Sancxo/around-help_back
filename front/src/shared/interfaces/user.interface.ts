export default interface User {
    id: Number,
    first_name: String,
    last_name: String,
    email: String,
    birthdate?: Date,
    about?: String,
    address_id?: Number,
    id_card?: String,
    avatar?: String
}

export interface RegistrationValues {
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    password_confirmation: String,
    birthdate?: Date,
    about?: String,
    address_id?: Number,
    id_card?: String,
    avatar?: String
}

export interface LoginValues {
    email: String,
    password: String
}