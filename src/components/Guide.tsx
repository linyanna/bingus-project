import Collapsible from "./Collapsible";

function Guide() {
    return (
    <div className="Guide">
        <Collapsible label = "What is SQL?">
            <p>
                SQL stands for Structured Query Language. It's a language that lets you access
                
                and manipulate databases, which are large tables that contain all sorts of data.
            </p>
        </Collapsible>
        <hr />
        <Collapsible label = "Structure of an SQL statement">
            <p>
                SQL statements consist of an ordered list of clauses such as SELECT, FROM, WHERE, etc.
                Each clause has its own syntax and functionality which are explained below. All SQL statements
                must end with a semicolon, and to execute the statements you must click the "execute" button.
            </p>
        </Collapsible>
        <hr />
        <Collapsible label = "SELECT all data in a table">
            <p>
                Start editing to see some magic happen!
            </p>
        </Collapsible>
        <hr />
        <Collapsible label = "SELECT specific columns">
            <p>
                Start editing to see some magic happen!
            </p>
        </Collapsible>
        <hr />
        <Collapsible label = "Select distinct rows">
            <p>
                Start editing to see some magic happen!
            </p>
        </Collapsible>
        <hr />
        <Collapsible label = "Sort rows">
            <p>
                Start editing to see some magic happen!
            </p>
        </Collapsible>
        <hr />
        <Collapsible label = "Limit the number of rows">
            <p>
                Start editing to see some magic happen!
            </p>
        </Collapsible>
        <hr />
        <Collapsible label = "Filter rows">
            <p>
                Start editing to see some magic happen!
            </p>
        </Collapsible>
        <hr />
        <Collapsible label = "Conditions: numeric comparison">
            <p>
                Start editing to see some magic happen!
            </p>
        </Collapsible>
        <hr />
        <Collapsible label = "Conditions: string comparison">
            <p>
                Start editing to see some magic happen!
            </p>
        </Collapsible>
        <hr />
        <Collapsible label = "Conditions: list possible values">
            <p>
                Start editing to see some magic happen!
            </p>
        </Collapsible>
        <hr />
        <Collapsible label = "Conditions: inclusive ranges">
            <p>
                Start editing to see some magic happen!
            </p>
        </Collapsible>
        <hr />
        <Collapsible label = "Conditions: combining with AND">
            <p>
                Start editing to see some magic happen!
            </p>
        </Collapsible>
        <hr />
        <Collapsible label = "Conditions: combining with OR">
            <p>
                Start editing to see some magic happen!
            </p>
        </Collapsible>
        <hr />
        <Collapsible label = "Conditions: mixing AND and OR">
            <p>
                Start editing to see some magic happen!
            </p>
        </Collapsible>
    </div>
    );
}

export default Guide;