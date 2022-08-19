import { ReactElement, SetStateAction, useEffect, useState } from "react";
import axios from "axios";

interface Address {
    id: number,
    number: string,
    street: string,
    city: string,
    state: string,
    postal_code: string,
    country: string,
    long_lat: number[]
}

const addressesUrl = `${process.env.REACT_APP_BACKEND_URL}/addresses`;

export default function Home(): ReactElement {
    const [addresses, setAddresses]: [Address[], SetStateAction<any>] = useState([]);

    useEffect(() => {
        axios.get<Address[]>(addressesUrl).then(resp => setAddresses(resp.data))
    }, []);

    return (
        <div>
            <h1>Hello, World!</h1>
            {addresses.map(address => {
                return <div key={address.id}>
                    <p>
                        {address.number} {address.street} <br />
                        {address.postal_code} {address.city} <br />
                        {address.state} - {address.country} <br />
                    </p>
                </div>
            })}
        </div>
    );
}