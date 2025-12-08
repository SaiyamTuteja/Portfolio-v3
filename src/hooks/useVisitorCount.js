import { useState, useEffect } from "react";

const NAMESPACE = "saiyam-tutejas-team-2023";
const KEY = "portfolio-count";

export function useVisitorCount() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Access the key from the environment variables
    const apiKey = import.meta.env.VITE_COUNTER_API_KEY;

    if (!apiKey) {
      console.error("API Key is missing! Check your .env file.");
      setLoading(false);
      return;
    }

    const fetchCount = async () => {
      try {
        const sessionKey = `visited_${NAMESPACE}_${KEY}`;
        const hasVisited = sessionStorage.getItem(sessionKey);
        
        let url = `https://api.counterapi.dev/v2/${NAMESPACE}/${KEY}`;

        // Only increment if not visited in this session
        if (!hasVisited) {
          url += "/up";
        }

        const res = await fetch(url, {
          method: 'GET',
          headers: {
            // 2. Use the variable here
            'Authorization': `Bearer ${apiKey}`, 
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) {
           // This helps debug if the key is wrong or restricted
           console.error("API Error Status:", res.status);
           return;
        }

        const data = await res.json();
        const validCount = data.value || data.count;

        if (validCount !== undefined) {
          setCount(validCount);
          if (!hasVisited) {
            sessionStorage.setItem(sessionKey, "true");
          }
        }
      } catch (error) {
        console.error("Visitor count error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  return { count, loading };
}