import Collapsible from "./Collapsible/Collapsible";

function Guide() {
    return (
    <div className="Guide">
        <Collapsible label = "What is SQL?">
            <p>
                SQL stands for <b>Structured Query Language</b> and is a domain-specific language
                used to manage data, especially in a relational database management system. SQL is
                used to access and manipulate data stored in tables. Each table has columns that
                contain different attributes, and has rows that contain different records. SQL
                commands are case insenstive, meaning 'SELECT', 'select', and 'Select' all have
                the same meaning.
            </p>
        </Collapsible>
        <hr />
        <Collapsible label = "SQL Rules">
            <p>
                SQL syntax is made up of various statements and queries which are composed of identifiers
                and clauses. All SQL statements must end with a semicolon ';' but can be composed over
                multiple lines. Statements may have a persistent effect on data, whereas queries retrieve
                data based on specific criteria.
            </p>
        </Collapsible>
        <hr />
        <Collapsible label = "SELECT all from table">
            <p>
                To fetch the entire table or all fields in the table:
                SELECT * FROM table_name;
                Here, the asterisk '*' represents all attributes in the table.
            </p>
        </Collapsible>
        <hr />
        <Collapsible label = "test">
            <p>
                To fetch the entire table or all fields in the table:
                SELECT * FROM table_name;
                Here, the asterisk '*' represents all attributes in the table.
            </p>
        </Collapsible>
    </div>
    );
}

export default Guide;