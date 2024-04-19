import { createClient } from "@supabase/supabase-js";
import "../styles/profile.css";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getLocalDatabase, getPlayerId } from "../utils/databaseUtils"; // Import function to fetch table names and schema
import Account from "./Account";
import { useEffect, useState } from "react";

const url = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const key = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error(
    "Environment variables PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY are required"
  );
}

const supabase = createClient(url, key);
export { supabase };
const Profile: React.FC = () => {
  const navigate = useNavigate();
  const playerId = getPlayerId();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (playerId != null) {
      fetchUser();
    }
  }, []);

  async function fetchUser() {
    try {
      const user = supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut(); //idk if this actually works or not
      navigate("/");
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleSaveToSupabase = async () => {
    try {
      const userLocalDatabase = getLocalDatabase();
      console.log("playerid:" + playerId);

      if (!userLocalDatabase) {
        throw new Error("userLocalDatabase is not available in local storage");
      }

      // Update player_data table in Supabase
      const { data, error } = await supabase
        .from("players")
        .update({ player_database: userLocalDatabase })
        .eq("player_id", playerId);

      console.log(data);
      console.log(error);

      if (error) {
        throw error;
      }
      console.log("Player data updated successfully:", data);
    }

    catch (error) {
      console.error("Error saving to Supabase:", error);
    }
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleRestartGame = async () => {
    try {
      if (playerId) {
      await supabase.from("players")
      .update({ dialogue_id: "0.0" })
      .eq('player_id', playerId);
      } else {
        localStorage.setItem('guestDialogueIndex', '0.0');
      }
      console.log("Game restarted successfully");
    } catch (updateError) {
      console.error("Error:", updateError);
    }
  }

  if (!user) {
    return (
      <div className="profile-container">
        <div style={{display: "flex", flexDirection: "column", alignContent: "center"}}>
          <Button className="button mt-3" onClick={handleSignIn}>
            Sign In
          </Button>
          <Button className="button mt-3" onClick={handleSignUp}>
            Sign Up
          </Button>
          <Button className="button mt-3" onClick={handleRestartGame}>
            Restart game
          </Button>
        </div>
      </div>
    )
  } else {
    return (
      <>
        {!playerId ? 
          (
            <div className="profile-container">
              <div style={{display: "flex", flexDirection: "column", alignContent: "center"}}>
                <Button className="button mt-3" onClick={handleSignIn}>
                  Sign In
                </Button>
                <Button className="button mt-3" onClick={handleSignUp}>
                  Sign Up
                </Button>
                <Button className="button mt-3" onClick={handleRestartGame}>
                  Restart game
                </Button>
              </div>
            </div>
          ):
          (
            <div className="profile-container">
              <Account></Account>
              <div style={{display: "flex", flexDirection: "column", alignContent: "center"}}>
                <Button className="button mt-3" onClick={handleSignOut}>
                  Sign Out
                </Button>
                <Button className="button mt-3" onClick={handleSaveToSupabase}>
                  Save game
                </Button>
                <Button className="button mt-3" onClick={handleRestartGame}>
                  Restart game
                </Button>
              </div>
            </div>
          )}
        {/* </div> */}
      </>
    );
}
};

export default Profile;
