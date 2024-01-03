import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UseUserStore {
	username: string;
	email: string;
	jwt: string;
	setUserEmail: (email: string) => void;
	setUsername: (name: string) => void;
	setJwt: (jwt: string) => void;
	logOut: () => void;
}

export const useUser = create<UseUserStore>()(
	devtools(
		persist(
			set => ({
				username: '',
				email: '',
				jwt: '',
				setUserEmail: email => set({ email: email }),
				setUsername: name => set({ username: name }),
				setJwt: jwt => set({ jwt: jwt }),
				logOut: () => set({ username: '', email: '', jwt: '' }),
			}),
			{
				name: 'user-data',
			}
		)
	)
);
