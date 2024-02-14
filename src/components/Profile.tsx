import React from "react";
import { createClient } from "@supabase/supabase-js";
import "../styles/profile.css";

const url = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const key = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error(
    "Environment variables PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY are required"
  );
}

const supabase = createClient(url, key);

const Profile: React.FC = () => {
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut(); //idk if this actually works or not
      if (error) {
        throw error;
      }
     
    } catch (error) {

    }
  };

  return (
    <div className="profile">
      <h2>Profile</h2>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Profile;
 