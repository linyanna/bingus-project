import { useEffect, useState } from "react";
import { supabase } from "./Profile";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const Account: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [user, setUser] = useState<any>();
  const [passwordSuccessMessage, setPasswordSuccessMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [emailSuccessMessage, setEmailSuccessMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

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

  const updatePassword = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        console.error("Error updating password:", error.message);
        setPasswordErrorMessage("Error updating password. Please try again.");
        return;
      }
      setPasswordSuccessMessage("Password updated successfully!");
    } catch (error) {
      console.error("Unexpected error:", error);
      setPasswordErrorMessage("Unexpected error occurred. Please try again.");
    }
  };

  const updateEmail = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        email: newEmail,
      });
      if (error) {
        console.error("Error updating email:", error.message);
        setEmailErrorMessage("Error updating email. Please try again.");
        return;
      }
      setEmailSuccessMessage("Email updated successfully!");
    } catch (error) {
      console.error("Unexpected error:", error);
      setEmailErrorMessage("Unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="bigcontainer">
    <div className="metadata">
      {user && (console.log(user),(
        <div className="profile-content">
          {user.user.user_metadata.avatar_url ? (
            <img src={user.user.user_metadata.avatar_url} alt="User Avatar" className="avatar" />
          ) : (
            <div className="avatar-placeholder"></div>
          )}

<div className="email">
            <Label className="profile-label" htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder={user.user.email}
              style={{ width: "600px" }}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <Button className="mt-1" type="button" onClick={updateEmail}>
              Update Email
            </Button>

            <Separator className="my-4" />

            <div className="space">
              <div>
                <Label className="profile-label" htmlFor="current_password">Current Password</Label>
                <PasswordInput
                  id="current_password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <div>
                <Label className="profile-label" htmlFor="new_password">New Password</Label>
                <PasswordInput
                  id="new_password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <div>
                <Label className="profile-label" htmlFor="password_confirmation">Confirm Password</Label>
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
      ))}

    </div>
          <div className="alerts">
            {passwordSuccessMessage && (
            <Alert className="my-4">
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>{passwordSuccessMessage}</AlertDescription>
            </Alert>
          )}
          {passwordErrorMessage && (
            <Alert  className="my-4">
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{passwordErrorMessage}</AlertDescription>
            </Alert>
          )}

          {emailSuccessMessage && (
            <Alert  className="my-4">
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>{emailSuccessMessage}</AlertDescription>
            </Alert>
          )}
          {emailErrorMessage && (
            <Alert className="my-4">
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{emailErrorMessage}</AlertDescription>
            </Alert>
          )}
      </div>
    </div>
  );
};

export default Account;
