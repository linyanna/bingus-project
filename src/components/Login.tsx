import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import "../styles/signup.css";

interface Props {
  supabaseClient: any;
}

const Login = ({ supabaseClient }: Props) => {
  return (
    <div className="signup">
      <Auth 
      supabaseClient={supabaseClient} 
      appearance={{ theme: ThemeSupa }} 
      providers={['google', 'github']}
      />
    </div>
  );
};

export default Login;
