import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("api/auth")
      .then((r) => r.json())
      .then((a) => console.log(a));
  }, []);
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

export default App;
