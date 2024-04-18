import { useEffect, useState } from "react";
import { serializeDatabaseToLocalStorage, fetchSqlData, getPlayerId  } from "../utils/databaseUtils";
// Sql.js config: https://github.com/sql-js/react-sqljs-demo/blob/master/src/App.js
import SqlEditorInput from "./SqlEditorInput";
import SqlEditorBrief from "./SqlEditorBrief";
import "../styles/sqlEditor.css";
import { SupabaseClient } from '@supabase/supabase-js';

interface Props {
  supabase: SupabaseClient;
  setActiveTab: (tab: Tab) => void;
}

const SqlEditor: React.FC<Props> = ({ supabase, setActiveTab }) => {
  const [db, setDb] = useState<null | Database>(null);
  const [error, setError] = useState<null | string>(null);

  const playerId = getPlayerId();
  const [dialogueId, setDialogueId] = useState<string>("0.0");

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
        <div className="editorItem">
          <SqlEditorBrief dialogueId={dialogueId}/>
          {/* <SqlEditorCommands /> */}
        </div>
        <div className="editorItem">
          <SqlEditorInput supabase={supabase} db={db} dialogueId={dialogueId}  setActiveTab={setActiveTab} />
        </div>
      </div>
    );
}

export default SqlEditor;
