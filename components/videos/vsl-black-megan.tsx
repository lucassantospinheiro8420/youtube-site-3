import { useEffect } from "react";

const PLAYER_ID = "6900ef5e21ca3c96a8568068";
const ACCOUNT_ID = "e39e1358-c294-4887-9186-6c5c21c2dc26";

export default function VSLBlackMegan() {
  useEffect(() => {
    const loadPlayerScript = () => {
      if (document.querySelector(`script[src*="${PLAYER_ID}"]`)) return;
      const script = document.createElement("script");
      script.src = `https://scripts.converteai.net/${ACCOUNT_ID}/players/${PLAYER_ID}/v4/player.js`;
      script.async = true;
      document.head.appendChild(script);
    };

    loadPlayerScript();

    return () => {
      const existingScript = document.querySelector(`script[src*="${PLAYER_ID}"]`);
      if (existingScript) existingScript.remove();
    };
  }, []);

  return (
    // @ts-expect-error - Player script is not defined in the global scope
    <vturb-smartplayer
      id={`vid-${PLAYER_ID}`}
      style={{
        width: "100%",
        margin: "0 auto",
        display: "block",
        "--player-border-radius": "20px",
        "--player-box-shadow": "0 5px 5px 0 rgba(0, 0, 0, 0.2)",
      }}
    />
  );
};
