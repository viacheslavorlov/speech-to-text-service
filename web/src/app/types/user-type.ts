export type UsersPermissionsUser = {
	username: string;
	email: string;
	provider: string;
	confirmed: boolean;
	blocked: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export type UsersPermissionsUserEntity = {
	id: string | number;
	attributes: UsersPermissionsUser;
};

export type UsersPermissionsUserEntityResponse = {
	data: UsersPermissionsUserEntity;
};
