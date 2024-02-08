import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

interface Props {
  supabaseClient: any;
}

const Signup = ({ supabaseClient }: Props) => {
  return <Auth supabaseClient={supabaseClient} appearance={{ theme: ThemeSupa }} />;
};

export default Signup;
