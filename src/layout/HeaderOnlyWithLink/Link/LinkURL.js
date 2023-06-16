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
            <a
              href={
                item.links === '  '
                  ? 'http://localhost:3000/'
                  : 'http://localhost:3000' + item.links.trim()
              }
              key={index}
              className={styles.content}
            >
              {item.url}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default LinkURL;
