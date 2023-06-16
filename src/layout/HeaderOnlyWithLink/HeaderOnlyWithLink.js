import { useState, useEffect } from 'react';
import Footer from '../DefaultLayout/Footer/Footer';
import Header from '../DefaultLayout/Header/Header';
import styles from './HeaderOnlyWithLink.module.scss';
import LinkURL from './Link/LinkURL';

function HeaderOnlyWithLink({ children }) {
  const [links, setLinks] = useState(
    ('/ ' + window.location.pathname)
      .split('/')
      .filter(Boolean)
      .map((_, index, arr) => arr.slice(0, index + 1).join('/'))
  );
  const [url, setUrl] = useState(('/Home' + window.location.pathname).split('/').splice(1));

  useEffect(() => {
    setLinks(
      ('/ ' + window.location.pathname)
        .split('/')
        .filter(Boolean)
        .map((_, index, arr) => arr.slice(0, index + 1).join('/'))
    );
    setUrl(('/Home' + window.location.pathname).split('/').splice(1));
  }, [children]);

  return (
    <div className={styles.wrapper}>
      <Header></Header>
      <LinkURL links={links} url={url}></LinkURL>
      <div className={styles.body}>{children}</div>
      <Footer></Footer>
    </div>
  );
}

export default HeaderOnlyWithLink;
