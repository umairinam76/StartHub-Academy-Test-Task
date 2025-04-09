import users from '@/data/users.json';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import './page.css';
import { Metadata } from 'next';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = users.find((u) => String(u.id) === params.id);

  if (!user) {
    return {
      title: 'User Not Found | StartHub Academy',
      description: 'The user profile you are looking for does not exist.'
    };
  }

  return {
    title: `${user.name} | StartHub Academy`,
    description: `${user.name} - ${user.description}. Location: ${user.location}. Skills: ${user.skills.join(', ')}`,
    keywords: [user.name, ...user.skills, 'StartHub Academy'],
    robots: 'index, follow'
  };
}

export function generateStaticParams() {
  return users.map((user) => ({
    id: String(user.id),
  }));
}

export const dynamicParams = false;

export default function UserPage({ params }: Props) {
  const user = users.find((u) => String(u.id) === params.id);
  if (!user) return notFound();

  return (
    <main className="user-detail">
      <div style={{ textAlign: 'center' }}>
        <Image
          src={user.avatar}
          alt={`Avatar of ${user.name}`}
          width={120}
          height={120}
          className="avatar"
        />
      </div>
      <h1>{user.name}</h1>
      <p><strong>Location:</strong> {user.location}</p>
      <p>{user.description}</p>
      <ul className="skills">
        {user.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
      <Link href="/user-list">← Back to user list</Link>
    </main>
  );
}
