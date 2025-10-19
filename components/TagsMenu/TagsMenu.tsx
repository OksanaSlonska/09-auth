"use client";
import { useState } from "react";
import Link from "next/link";
import css from "./TagsMenu.module.css";

const TAGS = [
  "All",
  "Work",
  "Personal",
  "Todo",
  "Meeting",
  "Shopping",
] as const;
export type Tag = (typeof TAGS)[number];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={() => setIsOpen((p) => !p)}>
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          {TAGS.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={
                  tag === "All" ? "/notes/filter/All" : `/notes/filter/${tag}`
                }
                className={css.menuLink}
                onClick={() => setIsOpen(false)}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
