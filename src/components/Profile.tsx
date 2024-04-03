import { createClient } from "@supabase/supabase-js";
import "../styles/profile.css";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import Account from "./Account";

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
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut(); //idk if this actually works or not
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleSaveToSupabase = async () => {
    try {
      const userLocalDatabase = localStorage.getItem("userLocalDatabase");
      const authToken = localStorage.getItem(
        "sb-lynhjymnmasejyhzbhwv-auth-token"
      );
      if (!authToken) {
        throw new Error("Authentication token not found in local storage");
      }
      const user = JSON.parse(authToken).user;
      const playerId = user.id;
      console.log(playerId);
      console.log(userLocalDatabase);

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
    } catch (error) {
      console.error("Error saving to Supabase:", error);
    }
  };

  // const getUserData = async () => {
  //   try {
  //     const { user, error } = supabase.auth.user();
  //     if (error) {
  //       throw error;
  //     }

  //     console.log(user);
  //   } catch (error) {
  //     console.error("Error getting user data:", error);
  //   }
  // };

  // useEffect(() => {
  //   getUserData();
  // }, []);

  return (
    <div className="profile">
      <h2>Profile</h2>
      <Account />
      <Button className="mt-3" onClick={handleSignOut}>
        Sign Out
      </Button>
      <Button className="mt-3" onClick={handleSaveToSupabase}>
        Save to Supabase
      </Button>
    </div>
  );
};

export default Profile;
