import { useEffect, useState } from 'react'
import { createClient } from "@supabase/supabase-js";
import SqlEditor from './components/SqlEditor/SqlEditor';
import './App.css'

// Supabase setup referenced from: https://supabase.com/docs/guides/getting-started/quickstarts/reactjs

const url = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const key = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error('Environment variables PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY are required');
}

const supabase = createClient(url, key);

export default function App() {
  interface Country {
    name: string;
  }
  
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    if (data) {
      setCountries(data);
    }
  }

  return (
    <>
      <h1>Database Countries Demo</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
      <SqlEditor></SqlEditor>
    </>
  );
}

