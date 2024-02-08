import { useState, useEffect } from 'react';

interface Props {
  supabase: any;
}

interface Country {
  name: string;
}

const Countries = ({ supabase }: Props) => {
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
    <h1>Countries Data Demo</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Countries;
