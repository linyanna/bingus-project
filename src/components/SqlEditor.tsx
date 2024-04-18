import { useEffect, useState } from "react";
import { serializeDatabaseToLocalStorage, fetchSqlData, getPlayerId  } from "../utils/databaseUtils";
// Sql.js config: https://github.com/sql-js/react-sqljs-demo/blob/master/src/App.js
import SqlEditorInput from "./SqlEditorInput";
import SqlEditorBrief from "./SqlEditorBrief";
import SqlEditorCommands from "./SqlEditorCommands";
import "../styles/sqlEditor.css";
import sqlQueries from "../assets/scripts/sqlQueries.json";
import { SupabaseClient } from '@supabase/supabase-js';

interface Props {
  supabase: SupabaseClient;
  setActiveTab: (tab: Tab) => void;
}

const SqlEditor: React.FC<Props> = ({ supabase, setActiveTab }) => {
  const [db, setDb] = useState<null | Database>(null);
  const [error, setError] = useState<null | string>(null);

  const playerId = getPlayerId();
  const [dialogueId, setDialogueId] = useState<number>(0);
  const [briefDirections, setBriefDirections] = useState<string>("");

  // Initial pull of user database
  useEffect(() => {
    // Fetch the database from local storage
    fetchSqlData(setDb, setError);
    // Fetch the dialogue index from supabase
    async function getDialogueId() {
      try {
        // Fetch dialogue index from Supabase database
        const { data } = await supabase.from("players")
          .select("dialogue_id")
          .eq('player_id', playerId)
          .single();
          setDialogueId(data?.dialogue_id);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    getDialogueId();
  }, []);

  // // Update the brief directions whenever the dialogueId changes
  // useEffect(() => {
  //   const index = sqlQueries.findIndex(field => field.id === dialogueId);
  //   if (index != -1) {
  //     setBriefDirections(sqlQueries[index].briefDirection);
  //   }
  // }, [dialogueId]);

  // Serialize and store the database in local storage whenever it changes
  useEffect(() => {
    if (db) {
      serializeDatabaseToLocalStorage(db);
    }
  }, [db]);

  if (error)
    return (
      <div className="sqlEditor">
        <pre>{error.toString()}</pre>
      </div>
    );
  else if (!db)
    return (
      <div className="sqlEditor">
        <pre>Loading...</pre>
      </div>
    );
  else
    return (
      <div className="sqlEditor">
        <div className="sqlEditor.left">
          <SqlEditorBrief directions={briefDirections} />
          <SqlEditorCommands />
        </div>
        <div className="sqlEditor.right">
          <SqlEditorInput supabase={supabase} db={db} dialogueId={dialogueId}  setActiveTab={setActiveTab} />
        </div>
      </div>
    );
}

export default SqlEditor;
