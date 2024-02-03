export default function ({ app, redirect, route }) {
	const userCookie = app.$cookies.get('user');
	const expirationTime = app.$cookies.get('user_expires');

	if (userCookie && expirationTime) {
		const currentTime = new Date().getTime();

		if (currentTime > expirationTime) {
			redirect('/login');
		}
	} else {
		redirect('/login');
	}
}