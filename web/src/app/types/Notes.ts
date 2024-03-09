export type Notes = {
	id: string;
	attributes: {
		content: string;
		createdAt: string;
		user: {
			data: {
				attributes: {
					username: string;
				};
			};
		};
	};
};
