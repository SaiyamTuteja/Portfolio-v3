import { useState, useEffect } from "react";

// Updated to your specific v2 endpoint details
const NAMESPACE = "saiyam-tutejas-team-2023";
const KEY = "portfolio-count";

export function useVisitorCount() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const sessionKey = `visited_${NAMESPACE}_${KEY}`;
        const hasVisited = sessionStorage.getItem(sessionKey);

        // Base URL for v2
        let url = `https://api.counterapi.dev/v2/${NAMESPACE}/${KEY}`;

        // If not visited this session, append '/up' to increment
        if (!hasVisited) {
          url += "/up";
        }

        const res = await fetch(url);
        const data = await res.json();

        // v2 often returns { value: 123 }, while v1 returned { count: 123 }
        // We check for both to be safe.
        const validCount = data.value || data.count;

        if (validCount !== undefined) {
          setCount(validCount);
          // Only mark as visited if the request was successful
          if (!hasVisited) {
            sessionStorage.setItem(sessionKey, "true");
          }
        }
      } catch (error) {
        console.error("Visitor count error:", error);
        setCount(null); 
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  return { count, loading };
}