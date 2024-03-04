import { Auth } from "@supabase/auth-ui-react";
import {  ThemeSupa } from "@supabase/auth-ui-shared";
import "../styles/signup.css";
import FileContainer from "./FileContainer";

interface Props {
  supabaseClient: any;
}

const Signup = ({ supabaseClient }: Props) => {
  return (
    <FileContainer>
      <div className="tab-container">
        <div className="tab">Sign Up</div>
      </div>
      <div className="signup">
        <Auth 
        supabaseClient={supabaseClient} 
        appearance={{ theme: ThemeSupa }} 
        providers={['google', 'github']}
        view="sign_up"
        />
      </div>
    </FileContainer>
  );
};

export default Signup;
