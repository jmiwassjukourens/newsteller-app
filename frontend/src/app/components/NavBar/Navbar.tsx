"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isLoggedIn = !!user;

  return (
    <header className={styles.header}>
      {/* 🔴 TOP BAR */}
      <div className={styles.topBar}>
        {/* Left */}
        <button
          className={styles.hamburger}
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          ☰
        </button>

        {/* Center Logo */}
        <div className={styles.brand}>
          <Link href="/">The Brick Club</Link>
        </div>

        {/* Right */}
        <div className={styles.actions}>
          {isLoggedIn ? (
            <button onClick={logout} className={styles.signIn}>
              Logout
            </button>
          ) : (
            <Link href="/login" className={styles.signIn}>
              Sign In
            </Link>
          )}

          <Link href="/subscribe" className={styles.subscribe}>
            Subscribe
          </Link>
        </div>
      </div>

      {/* 🔴 SECONDARY NAV */}
      <nav className={styles.bottomNav}>
        <Link href="/news">Latest News</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/digest">The Brick Digest</Link>
        <Link href="/agenda">The Brick Agenda</Link>
        <Link href="/connect">The Brick Connect</Link>
        <Link href="/about">About Us</Link>
      </nav>

      {/* 🔴 SIDE DRAWER */}
      <aside
        className={`${styles.drawer} ${drawerOpen ? styles.open : ""}`}
        onClick={() => setDrawerOpen(false)}
      >
        <div
          className={styles.drawerContent}
          onClick={(e) => e.stopPropagation()}
        >
          <Link href="/">Home</Link>
          <Link href="/news">Latest News</Link>
          <Link href="/digest">Digest</Link>
          <Link href="/agenda">Agenda</Link>
          <Link href="/about">About</Link>
        </div>
      </aside>
    </header>
  );
}