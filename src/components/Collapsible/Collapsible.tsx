import { useState } from "react";
import "./Collapsible.css";
import { Button } from "@/components/ui/button";

const Collapsible = (props: any) => {
  const toggle = () => {
    setOpen(!open);
  };

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={toggle}>{props.label}</Button>
      <div className={open ? "content-show" : "content-parent"}>
        <div className="content"> {props.children} </div>
      </div>
    </div>
  );
};

export default Collapsible;
