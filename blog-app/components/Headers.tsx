// components/Header.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/Header.module.css';

const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={`${styles.navLink} ${router.pathname === '/' ? styles.active : ''}`}>
          Home
        </Link>
        <Link href="/create" className={`${styles.navLink} ${router.pathname === '/create' ? styles.active : ''}`}>
          Create
        </Link>
      </nav>
    </header>
  );
};

export default Header;
