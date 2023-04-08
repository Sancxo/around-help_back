import { ReactElement, useEffect, useState } from "react";
import { countUnfulfilledNeeds } from "../shared/helpers/needs.helper";


export default function Home(): ReactElement {
    const [unfulfilledNeedsCount, setUnfulfilledNeedsCount] = useState(0);

    useEffect(() => {
        countUnfulfilledNeeds(setUnfulfilledNeedsCount);

        const counter = setInterval(() => countUnfulfilledNeeds(setUnfulfilledNeedsCount), 5000)
        return () => clearInterval(counter);
    }, [setUnfulfilledNeedsCount]);

    return (
        <div>
            <h2>We Need You!</h2>

            <h3>Number of unfulfilled requests: {unfulfilledNeedsCount}</h3>
        </div>
    );
}