import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import publicRoutes from './pages/routes';
import { Fragment, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './components/Loading/Loading';
import { loginActions } from './redux/actions/account/LoginActions';
import { loadingSelector } from './redux/selectors/loadingSelector/loadingSelector';
import Notification from './components/Notification/Notification';
import { notificationSelector } from './redux/selectors/notificationSelector/notificationSelector';
import { notificationActions } from './redux/actions/notification/notificationAction';

function App() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const loadingSelect = useSelector(loadingSelector);
  const notificationSelect = useSelector(notificationSelector);
  const [jwtToken, setJwtToken] = useState(
    cookies.get('jwt_token') || cookies.get('jwt_refresh_token')
  );

  useEffect(() => {
    setJwtToken(cookies.get('jwt_token') || cookies.get('jwt_refresh_token'));
  }, [cookies.get('jwt_token'), cookies.get('jwt_refresh_token')]);

  useEffect(() => {
    dispatch(loginActions.loginStatus(jwtToken ? true : false));
  }, [jwtToken]);

  useEffect(() => {
    if (notificationSelect.showing) {
      const myTimeOut = setTimeout(() => {
        dispatch(notificationActions.setNotificationContent(''));
      }, 5000);

      return () => {
        clearTimeout(myTimeOut);
      };
    }
  }, [notificationSelect.showing]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = route.Layout || Fragment;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  route.authorization === undefined ||
                  (jwtToken && jwt_decode(jwtToken).roleId === route.authorization) ? (
                    <Layout>
                      {loadingSelect.loading && <Loading></Loading>}
                      {notificationSelect.showing && (
                        <Notification content={notificationSelect.content}></Notification>
                      )}
                      <Page></Page>
                    </Layout>
                  ) : (
                    <Navigate to="/" replace={true} />
                  )
                }
              ></Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
