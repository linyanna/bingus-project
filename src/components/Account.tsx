import { useEffect, useState } from "react";
import { supabase } from "./Profile";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Account: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [user, setUser] = useState<any>();
  const [newEmail, setNewEmail] = useState("");

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

  const updateEmail = async () => {
    try {
      const {  error } = await supabase.auth.updateUser({
        email: newEmail,
      });
      if (error) {
        console.error("Error updating email:", error.message);
        return;
      }
      console.log("Email updated successfully!");
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const updatePassword = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        console.error("Error updating password:", error.message, newPassword);
        return;
      }
      console.log("Password updated successfully!");
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div className="metadata">
      {user && (
        <div className="profile-content">
          {user.user_metadata && user.user_metadata.avatar_url ? (
            <img src={user.user_metadata.avatar_url} alt="User Avatar" className="avatar" />
          ) : (
            <div className="avatar-placeholder"></div>
          )}

<div className="email">
            <Label htmlFor="current_password">Email</Label>
            <Input
              type="email"
              placeholder={user.user.email}
              style={{ width: "600px" }}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <Button className="mt-1" type="button" onClick={updateEmail}>
              Update Email
            </Button>

            <Separator className="my-4" />

            {/* Password fields */}
            <div className="space">
              <div>
                <Label htmlFor="current_password">Current Password</Label>
                <PasswordInput
                  id="current_password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <div>
                <Label htmlFor="new_password">New Password</Label>
                <PasswordInput
                  id="new_password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <div>
                <Label htmlFor="password_confirmation">Confirm Password</Label>
                <PasswordInput
                  id="password_confirmation"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <Button className="mt-1" type="button" onClick={updatePassword}>
                Update Password
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
