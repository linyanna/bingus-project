import { useState } from "react";
import styled from "styled-components";

interface Animation {
    duration?: number;
    ease?: string;
}

interface CollapsibleProps {
    children: React.ReactNode;
    animation?: Animation;
    label: React.ReactNode;
}

const Button = styled.button`
    background-color: #D8D7D7;
    color: black;
    font-weight: bold;
    padding: 10px 30px;
    outline: 0;
    border: 0;
    cursor: pointer;
    transition: ease background-color 250ms;
    &:hover {
        background-color: #C0C0C0
    }
`;

const defaultAnimationValues = {
    duration: 0.2,
    ease: "ease-in-out"
};

const CollapsibleWrapper = styled.div<{ open: boolean; animation: Animation }>`
    display: grid;
    padding: 0px 40px;
    grid-template-rows: ${(props) => (props.open ? "1fr" : "0fr")};
    opacity: 0;
    width: 50%;
    transition: all ${(props) => props.animation.duration}s
        ${(props) => props.animation.ease};
    opacity: ${(props) => (props.open ? 1 : 0)};
`;

const CollapsibleInner = styled.div`
    overflow: hidden;
    color: rgb(0,0,0);
`;

const Collapsible: React.FC<CollapsibleProps> = ({
    children,
    label,
    animation = defaultAnimationValues
}) => {
    const toggle = () => {
        setOpen(!open);
    };

    const [open, setOpen] = useState(false);
    return (
        <div>
            <Button onClick={toggle}>{label}</Button>
            <CollapsibleWrapper open={open} animation={animation}>
                <CollapsibleInner>{children}</CollapsibleInner>
            </CollapsibleWrapper>
        </div>
    );
};

export default Collapsible;