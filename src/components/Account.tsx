import { useEffect, useState } from "react";
import { supabase } from "./Profile";

const Account: React.FC = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }
      setUser(data);
    };

    fetchUser();
  }, []);

  return (
    <div>
      {user &&
        (console.log(user),
        (
          <div>
            <img src={user.user.user_metadata.avatar_url} />
            <p>Email: {user.user.email}</p>
          </div>
        ))}
    </div>
  );
};

export default Account;