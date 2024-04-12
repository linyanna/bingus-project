import { useEffect, useState } from "react";
import { supabase } from "./Profile";
import { Input } from "@/components/ui/input";
import { UpdatePassword } from "@supabase/auth-ui-react";
import { Button } from "@/components/ui/button";


const Account: React.FC = () => {
  const [user, setUser] = useState<any>();

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
    <div className="metadata">
      {user && (console.log(user),(
        <div className="profile-content">
          {user.user_metadata && user.user_metadata.avatar_url ? (
            <img src={user.user_metadata.avatar_url} alt="User Avatar" className="avatar" />
          ) : (
            <div className="avatar-placeholder"></div>
          )}
          
          <div className="email">
            <p>Email: </p>
            <Input type="email" placeholder={user.user.email} style={{ width: '600px' }} />
            <Button className="mt-3" > 
              Update Email
            </Button>
          
          <div className="password">
            <p>Password: </p>
            <Input type="password" placeholder="********" style={{ width: '600px' }} />
            <Button className="mt-3" > 
          Update Password
          </Button>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
  
  
  
  
  
};

export default Account;
