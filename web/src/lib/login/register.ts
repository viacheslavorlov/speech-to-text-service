
import axios, { AxiosResponse } from 'axios';

interface UserData {
	jwt: string;
	user: {
		username: string;
		email: string;
		password: string;
		id: string | number;
	};
}

type Props = {
	username: string
	email: string
	password: string
}

export const registerUser = async (
	userData: Props
): Promise<AxiosResponse<UserData>['data'] | null > => {
	try {
		const { data } = await axios.post<UserData>(
			process.env.NEXT_PUBLIC_STRAPI_BASE_API + '/api/auth/local',
			userData
		);
		if (data.jwt) {
			return data;
		}
		return null;
	} catch (e) {
		console.log(e);
				// @ts-ignore

		return e.response;
	}
};
