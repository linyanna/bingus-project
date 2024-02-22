import React from "react";
import Collapsible from "./Collapsible";

function Guide() {
    return (
    <div className="Guide">
        <Collapsible label = "Introduction">
            <h1>Prerequisite</h1>
            <p>
                Helloooooooo you should prob know some SQL to play this game
            </p>
        </Collapsible>
        <hr />
        <Collapsible label = "Goals">
            <h1>Goals</h1>
            <p>
                This guide will teach you the basic commands of SQL to hopefully get you started!
            </p>
        </Collapsible>
    </div>
    );
}

export default Guide;
