import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  async function handleKeyDown(event) {

    if(event.key === "Enter"){
      await onSubmit(event)
    }                                                                                                                                                                                                                                                                                                                                                                                                           
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
      </Head>

      <main className={styles.main}>
        <h3>Salut, sunt asistentul tau virtual ION. </h3>
        <h3>Astazi eu voi pune intrebarile.</h3>
        <h3> Scrie Salut pentru a initia discutia cu chatGPT</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="scrie salut"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
            onKeyDown ={(e) => handleKeyDown(e)}
          />
          <input type="submit" value="Emite raspuns" />
        </form>
        <h3></h3>
        <h3> Raspunsul lui ION:</h3>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
