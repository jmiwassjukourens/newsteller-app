"use client";

import { useState } from "react";
import { apiFetch } from "../lib/apiFetch";
import { useRouter } from "next/navigation";
import styles from "./register.module.css";

export default function CreateUserPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await apiFetch("users", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
      });

      router.push("/dashboard"); 
    } catch (err) {
      setError("Error al crear el usuario" + (err instanceof Error ? err.message : ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
  <div className={styles.card}>
    <h1 className={styles.title}>Create Account</h1>

    <form onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label}>Username</label>
        <input
          className={styles.input}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={4}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Password</label>
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create account"}
      </button>
    </form>
  </div>
</div>
  );
}
