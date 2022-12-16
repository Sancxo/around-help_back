import { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import { Address } from "../shared/interfaces/misc.interfaces";

const addressesUrl = `${process.env.REACT_APP_BACKEND_URL}/addresses`;

export default function Home(): ReactElement {
    const [addresses, setAddresses] = useState<Address[]>([]);

    // useEffect(() => {

    //     axios.get<Address[]>(addressesUrl).then(resp => setAddresses(resp.data))
    // }, []);

    return (
        <div>
            <h1>Hello, World!</h1>
            {/* {addresses.map(address => {
                return <div key={address.id}>
                    <p>
                        {address.number} {address.street} <br />
                        {address.postal_code} {address.city} <br />
                        {address.state} - {address.country} <br />
                    </p>
                </div>
            })} */}
        </div>
    );
}