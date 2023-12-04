import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import authContext from './context/authContext';
import Header from './components/Header';

import Channel from './pages/Channel';
import Home from './pages/Home';
import Login from './pages/Login';
import Video from './pages/Video';


const App = () => {
	const { token } = useContext(authContext);

	return (
		<>
      <Header />
			<Routes>
				{token ? (
					<>
						<Route path={'/'} element={<Home />}/>
            <Route path={'/channel'} element={<Channel />}/>
            <Route path={'/video/:id'} element={<Video />}/>
            <Route path={'*'} element={<Navigate to={"/"} />}/>

					</>
				) : (
					<>
						<Route path='/login' element={<Login />} />
						<Route path='*' element={<Navigate to={'/login'} />} />
					</>
				)}
			</Routes>
		</>
	);
};

export default App;

