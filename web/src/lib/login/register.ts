
import axios, { AxiosResponse } from 'axios';

export interface UserData {
	jwt: string;
	user: {
		username: string;
		email: string;
		password: string;
		id: string | number;
	};
}

type Props = {
	username: string;
	email: string;
	password: string;
};

export const registerUser = async (
	userData: Props
): Promise<AxiosResponse<UserData>['data'] | null > => {
	try {
		const { data } = await axios.post(
			process.env.NEXT_PUBLIC_STRAPI_BASE_API + '/api/auth/local/register',
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
