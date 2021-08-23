import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const router = useRouter();

  return (
    <div
      className={`flex justify-between items-center p-6 px-12 lg:px-16 w-full z-10 text-white font-poppins font-semibold
      ${router.pathname === "/" ? "absolute" : "bg-gray-900"}`}
    >
      <Link href="/">
        <a>back to home</a>
      </Link>

      <div
        className={`${styles.menu} ${
          menuActive ? styles.active : styles.inactive
        } lg:hidden`}
        onClick={() => {
          setMenuActive(!menuActive);
        }}
      />

      <div
        className={`${
          menuActive ? styles.navigationActive : "hidden lg:flex"
        } gap-3 flex items-center`}
      >
        <Link href="/movies/upcomings">
          <a className={styles.button}>Discover</a>
        </Link>
        <Link href="/">
          <a className={styles.button}>Join now</a>
        </Link>
      </div>
    </div>
  );
}