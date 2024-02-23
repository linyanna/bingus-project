import { useState } from "react";
import "./Collapsible.css"

const Collapsible = (props: any) => {
    const toggle = () => {
        setOpen(!open);
    };

    const [open, setOpen] = useState(false);
    
    return(
        <div>
            <button onClick={toggle}>{props.label}</button>
            <div className={open ? "content-show" : "content-parent"}>
                <div className='content'> {props.children} </div>
            </div>
        </div>
    );
}


export default Collapsible;