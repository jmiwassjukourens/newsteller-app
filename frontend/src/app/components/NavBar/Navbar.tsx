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
{/* 🔴 SECONDARY NAV */}
      <nav className={styles.bottomNav}>
        <Link href="/news">Latest News</Link>
        <Link href="/contact">Contact Us</Link>

        {/* DIGEST */}
        <div className={styles.navItem}>
          <span>The Brick Digest</span>

          <div className={styles.dropdown}>
            <Link href="/digest/all">All News</Link>
            <Link href="/digest/beverly">Beverly Hills</Link>
            <Link href="/digest/burbank">Burbank</Link>
            <Link href="/digest/costa">Costa Mesa</Link>
            <Link href="/digest/culver">Culver City</Link>
            <Link href="/digest/glendale">Glendale</Link>
            <Link href="/digest/irvine">Irvine</Link>
            <Link href="/digest/long">Long Beach</Link>
            <Link href="/digest/la">Los Angeles</Link>
            <Link href="/digest/newport">Newport Beach</Link>
            <Link href="/digest/pasadena">Pasadena</Link>
            <Link href="/digest/sandiego">San Diego</Link>
          </div>
        </div>

        {/* AGENDA */}
        <div className={styles.navItem}>
          <span>The Brick Agenda</span>

          <div className={styles.dropdown}>
            <Link href="/agenda/events">Upcoming Events</Link>
            <Link href="/agenda/networking">Networking</Link>
            <Link href="/agenda/webinars">Webinars</Link>
            <Link href="/agenda/workshops">Workshops</Link>
            <Link href="/agenda/conferences">Conferences</Link>
          </div>
        </div>

        {/* CONNECT */}
        <div className={styles.navItem}>
          <span>The Brick Connect</span>

          <div className={styles.dropdown}>
            <Link href="/connect/members">Members</Link>
            <Link href="/connect/partners">Partners</Link>
            <Link href="/connect/community">Community</Link>
            <Link href="/connect/resources">Resources</Link>
            <Link href="/connect/careers">Careers</Link>
          </div>
        </div>

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