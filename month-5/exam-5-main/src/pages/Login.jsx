import React, { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import authContext from '../context/authContext';

const Login = () => {
	const { token, setToken } = useContext(authContext);
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const submitHandler = (e) => {
		e.preventDefault();
		try {
			// const postRequest = (async () => {
			// 	const res = await fetch('https://reqres.in/api/register', {
			// 		method: 'POST',
			// 		headers: {
			// 			'Content-Type': 'application/json',
			// 		},
			// 		body: JSON.stringify(form),
			// 	});
			// 	const result = await res.json();
			// })();
			setToken('asdasda');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='container'>
			<form onSubmit={submitHandler} className='w-50 mx-auto my-5'>
				<div className='form-outline mb-4'>
					<input
						value={form.email}
						onChange={(e) =>
							setForm({
								...form,
								email: e.target.value,
							})
						}
						type='email'
						id='email'
						className='form-control'
					/>
					<label className='form-label' htmlFor='email'>
						Email address
					</label>
				</div>

				<div className='form-outline mb-4'>
					<input
						type='password'
						id='form2Example2'
						className='form-control'
						value={form.password}
						onChange={(e) =>
							setForm({
								...form,
								password: e.target.value,
							})
						}
					/>
					<label className='form-label' htmlFor='form2Example2'>
						Password
					</label>
				</div>

				<div className='row mb-4'>
					<div className='col'>
						<a href='#!'>Forgot password?</a>
					</div>
				</div>

				<button
					type='submit'
					className='btn btn-primary btn-block mb-4'>
					Sign in
				</button>

				<div className='text-center'>
					<p>
						Not a member? <Link to='/signup'>Register</Link>
					</p>
					<p>or sign up with:</p>
					<button
						type='button'
						className='btn btn-link btn-floating mx-1'>
						<i className='fab fa-facebook-f'></i>
					</button>

					<button
						type='button'
						className='btn btn-link btn-floating mx-1'>
						<i className='fab fa-google'></i>
					</button>

					<button
						type='button'
						className='btn btn-link btn-floating mx-1'>
						<i className='fab fa-twitter'></i>
					</button>

					<button
						type='button'
						className='btn btn-link btn-floating mx-1'>
						<i className='fab fa-github'></i>
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;