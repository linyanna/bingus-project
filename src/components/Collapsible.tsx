import React, { useState } from "react";

const Collapsible = (props: any) => {
    const toggle = () => {
        setOpen(!open);
    };

    const [open, setOpen] = useState(false);
    return(
        <div>
            <button onClick={toggle}>{props.label}</button>
            {open && (
                <div className="toggle">{props.children}</div>
            )}
        </div>
    );
}
export default Collapsible;