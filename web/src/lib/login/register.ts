import axios from "axios";

export const registerUser = async (userData: { username: string; email: string; password: string }) => {
	try {
		const data = await axios.post('http://localhost:1337/api/auth/local/register', userData);
		const response = data;
		if (response.data.jwt) {
			return response;
		}
		return null;
	} catch (e) {
		console.log(e);
		return e
	}
};