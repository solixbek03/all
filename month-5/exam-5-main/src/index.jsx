import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from './context/authContext';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
	<React.Fragment>
		<BrowserRouter>
			<AuthContextProvider>
				<App />
			</AuthContextProvider>
		</BrowserRouter>
	</React.Fragment>
);


