import { useState, useEffect } from 'react';
import { fetchUsernames } from '../utils/api';

export default function Home() {
  const [usernames, setUsernames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsernames();
        setUsernames(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Django Admin Usernames</h1>
      <ul>
        {usernames.map((username) => (
          <li key={username}>{username}</li>
        ))}
      </ul>
    </div>
  );
}