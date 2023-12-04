import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

const authContext = createContext({});

export const AuthContextProvider = ({ children }) => {
	const [token, setToken] = useState(
		window.localStorage.getItem('token')
			? window.localStorage.getItem('token')
			: ''
	);

	useEffect(() => {
		if (token) {
			window.localStorage.setItem('token', token);
		} else {
			window.localStorage.removeItem('token');
		}
	}, [token]);

	return (
		<authContext.Provider value={{ token, setToken }}>
			{children}
		</authContext.Provider>
	);
};

export default authContext;
