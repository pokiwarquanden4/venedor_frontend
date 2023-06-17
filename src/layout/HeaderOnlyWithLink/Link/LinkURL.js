import { Link } from 'react-router-dom';
import styles from './Link.module.scss';

function LinkURL({ links, url }) {
  const lists = [];
  for (let i = 0; i < links.length; i++) {
    lists.push({
      links: links[i],
      url: url[i],
    });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.contents}>
        {lists.map((item, index) => {
          return (
            <Link
              to={item.links !== ' ' ? item.links.trim() : '/'}
              key={index}
              className={styles.content_wrapper}
            >
              <div className={styles.content}>{item.url}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default LinkURL;
