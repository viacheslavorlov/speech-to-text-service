import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import axios from 'axios';
import { waitUntilSymbol } from 'next/dist/server/web/spec-extension/fetch-event';
import { NextResponse } from 'next/server';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
	publicRoutes: ['/'],

	afterAuth(auth, req, evt) {
		
		// console.log(auth.user)
		// axios.post(process.env.STRAPI_BASE_API + '/api/users', {
		// 	username: auth.user?.username,
		// 	password: auth.getToken(),
		// 	email: auth.user?.emailAddresses
		// });
		// Handle users who aren't authenticated
		if (!auth.userId && !auth.isPublicRoute) {
			return redirectToSignIn({ returnBackUrl: req.url.replace('login', 'write') });
		}

		// If the user is logged in and trying to access a protected route, allow them to access route
		if (auth.userId && !auth.isPublicRoute) {
			return NextResponse.next();
		}
		// Allow users visiting public routes to access them
		return NextResponse.next();
	},
});

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/(api|trpc)(.*)'],
};
