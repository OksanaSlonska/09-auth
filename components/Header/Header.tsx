import Link from "next/link";
import css from "./Header.module.css";
import TagsMenu from "../TagsMenu/TagsMenu";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>

      <nav aria-label="Main Navigation" className={css.navWrapper}>
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <AuthNavigation />
          </li>

          <li className={css.tagsMenuWrapper}>
            <TagsMenu />
          </li>
        </ul>
      </nav>
    </header>
  );
}
