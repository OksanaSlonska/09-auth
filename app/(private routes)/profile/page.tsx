import { getMe } from "@/lib/api/serverApi";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import css from "./ProfilePage.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getMe();

  if (!user) {
    return {
      title: "Profile | NoteHub",
      description: "View your profile information on NoteHub",
    };
  }

  return {
    title: `${user.username} | Profile | NoteHub`,
    description: `Profile page of ${user.username}`,
    openGraph: {
      title: `${user.username} | Profile | NoteHub`,
      description: `Profile page of ${user.username}`,
    },
  };
}

export default async function ProfilePage() {
  const user = await getMe();

  if (!user) return <p>User not authorized</p>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={
              user.avatar ||
              "https://ac.goit.global/fullstack/react/default-avatar.jpg"
            }
            alt="User Avatar"
            width={120}
            height={120}
            priority
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
