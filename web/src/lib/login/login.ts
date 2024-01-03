import axios from 'axios';

export const loginUser = async (userData: { identifier: string; password: string }) => {
	try {
		const data = await axios.post('http://localhost:1337/api/auth/local', userData);
		const response = data;
		if (response.data.jwt) {
			return response;
		}
		return null;
	} catch (e) {
		console.log(e);
	}
};
