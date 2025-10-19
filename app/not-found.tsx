import css from "./Home.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 – Page Not Found | NoteHub",
  description: "The requested page does not exist on NoteHub.",
  openGraph: {
    title: "404 – Page Not Found | NoteHub",
    description: "The requested page does not exist on NoteHub.",
    url: "https://yourdomain.com/not-found",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

const NotFoundPage = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFoundPage;
