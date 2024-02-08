import { useEffect, useState } from 'react'
import { createClient, Session } from "@supabase/supabase-js";
import SqlEditor from './components/SqlEditor/SqlEditor';
import './App.css'

import Signup from './Signup';
import Countries from './Countries';

const url = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const key = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error('Environment variables PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY are required');
}

const supabase = createClient(url, key);

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (session === null) {
    return <Signup supabaseClient={supabase} />;
  } else {
    return (
      <>
        <Countries supabase={supabase} />
        <SqlEditor></SqlEditor>
      </>
    );
  }
}
