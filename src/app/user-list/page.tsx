import Link from 'next/link';
import Image from 'next/image';
import users from '@/data/users.json';
import './page.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User List | StartHub Academy',
  description: 'Browse our team of expert engineers and developers.',
};

export default function UserListPage() {
  return (
    <main>
      <h1 tabIndex={0}>User List</h1>
      <ul aria-label="User List">
        {users.map((user) => (
          <li key={user.id}>
            <article className="user-card">
              <Image
                src={user.avatar}
                alt={`Avatar of ${user.name}`}
                width={64}
                height={64}
                className="avatar"
              />
              <div className="user-info">
                <h2 tabIndex={0}>
                  <Link href={`/user/${user.id}`}>{user.name}</Link>
                </h2>
                <p>{user.description}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
