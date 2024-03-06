import Collapsible from "./Collapsible";

function Guide() {
    return (
    <div className="Guide">
        <Collapsible label = "test">
            <p>
                Start editing to see some magic happen!
            </p>
        </Collapsible>
        <hr />
        <Collapsible label = "test 2">
            <p>
                Start editing to see some magic happen! Start editing to see some magic happen!
                Start editing to see some magic happen! Start editing to see some magic happen!
                Start editing to see some magic happen! Start editing to see some magic happen!
            </p>
        </Collapsible>
        <hr />
        <Collapsible label = "test 3">
            <p>
                Start editing to see some magic happen!
            </p>
        </Collapsible>
    </div>
    );
}

export default Guide;