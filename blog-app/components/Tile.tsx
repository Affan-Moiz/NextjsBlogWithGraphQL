// components/Tile.tsx
import Link from 'next/link';
import styles from '@/styles/Tile.module.css';

interface TileProps {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
}

const Tile = ({ id, title, publishedDate }: TileProps) => {
  return (
    <div className={styles.tile}>
      <Link href={`/posts/${id}`}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.date}>
          {new Date(publishedDate).toDateString()}
        </p>
      </Link>
    </div>
  );
};

export default Tile;
