import { type LoaderArgs } from '@remix-run/node'
import { EMAIL_LINK_STRATEGY_NAME, authenticator } from '~/utils/auth.server.ts'

export let loader = async ({ request }: LoaderArgs) => {
	await authenticator.authenticate(EMAIL_LINK_STRATEGY_NAME, request, {
		// If the user was authenticated, we redirect them to their profile page
		// This redirect is optional, if not defined the user will be returned by
		// the `authenticate` function and you can render something on this page
		// manually redirect the user.
		successRedirect: '/me',
		// If something failed we take them back to the login page
		// This redirect is optional, if not defined any error will be throw and
		// the ErrorBoundary will be rendered.
		failureRedirect: '/login',
	})
}
