import Collapsible from "./Collapsible";

function Guide() {
    return (
        //provide labels and descriptions for the SQL guide
    <div className="Guide">
        <Collapsible label = "What is SQL?">
            <p>
                SQL stands for Structured Query Language. It's a language that lets you access
                and manipulate databases, which are large tables that contain all sorts of data.
            </p>
        </Collapsible>
        <Collapsible label = "Structure of an SQL statement">
            <p>
                SQL statements consist of an ordered list of clauses such
                as <span className="code-snippet">SELECT</span>, <span className="code-snippet">FROM</span>, <span className="code-snippet">WHERE</span>, etc.
                Each clause has its own syntax and functionality which are explained below. All SQL statements
                must end with a semicolon, and to execute the statements you must click the "execute" button.
            </p>
        </Collapsible>
        <Collapsible label = "SELECT all data in a table">
            <p className="code-block">
                SELECT *<br></br>
                FROM clues;
            </p>
            <p>
                To display all available data from a table, we can use the <span className="code-snippet">SELECT</span> operator
                followed by an asterisk. The asterisk denotes that we mean to grab all rows and columns from a table.
                The <span className="code-snippet">FROM</span> keyword is used to indicate which table we are selecting from.
                Since this is an SQL statement we must end the command with a semicolon.
            </p>
        </Collapsible>
        <Collapsible label = "SELECT specific attributes">
            <p className="code-block">
                SELECT location, type<br></br>
                FROM clues;
            </p>
            <p>
                To display information about specific attributes in a table, we can indicate the attribute names after
                the <span className="code-snippet">SELECT</span> command. Each attribute is denoted by a column in the table.
                To display more than one column from a table at a time, delimit each attribute name with a comma.
            </p>
        </Collapsible>
        <Collapsible label = "Select distinct rows">
            <p className="code-block">
                SELECT DISTINCT type<br></br>
                FROM clues;
            </p>
            <p>
                Sometimes, multiple entries in a table may have the information for a specific attribute. For example, when
                selecting clues we may find multiple clues of the same type in the table, and we only want to display the clues
                of this type once. Selecting with <span className="code-snippet">DISTINCT</span> before the attribute names lets
                us display unique table entries, avoiding duplicates.
            </p>
        </Collapsible>
        <Collapsible label = "Sort rows">
            <p className="code-block">
                Select location, type<br></br>
                FROM clues<br></br>
                ORDER BY location, type DESC;
            </p>
            <p>
                To sort rows of entries in a table, the <span className="code-snippet">ORDER BY</span> clause needs to be
                included after selecting a table in our SQL statement. Entries are sorted in ascending order by default,
                unless <span className="code-snippet">DESC</span> is included, indicating a sort by descending order. Rows are
                sorted alphanumerically with preference given to the first attribute type inluded.
            </p>
        </Collapsible>
        <Collapsible label = "Limit the number of rows">
            <p className="code-block">
                SELECT name, fur color<br></br>
                FROM suspects<br></br>
                ORDER BY name DESC<br></br>
                LIMIT 5;
            </p>
            <p>
                When displaying the contents of a table and the table contains too many rows, we can limit the number rows by using
                the <span className="code-snippet">LIMIT</span> clause followed by a number. In this example, only the first 5 rows
                sorted in descending order will be returned.
            </p>
        </Collapsible>
        <Collapsible label = "Filter rows">
            <p className="code-block">
                SELECT *<br></br>
                FROM suspects<br></br>
                WHERE fur color = "orange";
            </p>
            <p>
                When you are aware of the specific attributes within a table {"("}say, after performing a <span className="code-snippet">SELECT *</span> command{")"},
                you can specify which table entries to view based off of a simple conditional <span className="code-snippet">WHERE</span> clause.
                In this example, we are only selecting suspects whose fur color attribute matches the specified type we want.
            </p>
        </Collapsible>
        <Collapsible label = "Conditions: numeric comparison">
            <p className="code-block">
                SELECT name<br></br>
                FROM suspects<br></br>
                WHERE name {">"} 3;
            </p>
            <p>
                All standard math comparison operators such as {"<="}, =, !=, etc. can be used for numeric comparisons
                within a <span className="code-snippet">WHERE</span> clause.
            </p>
        </Collapsible>
        <Collapsible label = "Conditions: string comparison">
            <p className="code-block">
                SELECT name<br></br>
                FROM suspects<br></br>
                WHERE fur color != "orange";
            </p>
            <p>
                All standard string comparison operators such as {"<="}, =, !=, etc. can be used for string comparisons
                within a <span className="code-snippet">WHERE</span> clause.
            </p>
        </Collapsible>
        <Collapsible label = "Conditions: inclusive ranges">
            <p className="code-block">
                SELECT name<br></br>
                FROM suspects<br></br>
                WHERE age BETWEEN 2 AND 5;
            </p>
            <p>
                If we want to select entries in a table with attribute values within a range, we can use
                the <span className="code-snippet">BETWEEN</span> operator. Note that the opposite operator
                is called <span className="code-snippet">NOT BETWEEN</span>, and does the opposite.
            </p>
        </Collapsible>
        <Collapsible label = "Conditions: combining with AND">
            <p className="code-block">
                SELECT name<br></br>
                FROM suspects<br></br>
                WHERE age {"<"} 5<br></br>
                AND fur color = "orange"
            </p>
            <p>
                To make selections using multiple, different conditional statements, we can use
                the <span className="code-snippet">AND</span> operator.
            </p>
        </Collapsible>
        <Collapsible label = "Conditions: combining with OR">
            <p className="code-block">
                SELECT name<br></br>
                FROM suspects<br></br>
                WHERE age {"<"} 5<br></br>
                OR fur color = "orange"
            </p>
            <p>
                To make selections using multiple, different conditional statements, we can use
                the <span className="code-snippet">OR</span> operator.
            </p>
        </Collapsible>
    </div>
    );
}

export default Guide;