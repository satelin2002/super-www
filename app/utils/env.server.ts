import invariant from 'tiny-invariant'

const requiredServerEnvs = [
	'NODE_ENV',
	'DATABASE_PATH',
	'DATABASE_URL',
	'SESSION_SECRET',
	'ENCRYPTION_SECRET',
	'INTERNAL_COMMAND_TOKEN',
	'CACHE_DATABASE_PATH',
	'MAGIC_LINK_SECRET',
	// If you plan to use Mailgun, uncomment these lines
	// 'MAILGUN_SENDING_KEY',
	// 'MAILGUN_DOMAIN',
] as const

declare global {
	namespace NodeJS {
		interface ProcessEnv
			extends Record<(typeof requiredServerEnvs)[number], string> {}
	}
}

export function init() {
	for (const env of requiredServerEnvs) {
		invariant(process.env[env], `${env} is required`)
	}
}

/**
 * This is used in both `entry.server.ts` and `root.tsx` to ensure that
 * the environment variables are set and globally available before the app is
 * started.
 *
 * NOTE: Do *not* add any environment variables in here that you do not wish to
 * be included in the client.
 * @returns all public ENV variables
 */
export function getEnv() {
	invariant(process.env.NODE_ENV, 'NODE_ENV should be defined')

	return {
		MODE: process.env.NODE_ENV,
	}
}

type ENV = ReturnType<typeof getEnv>

declare global {
	var ENV: ENV
	interface Window {
		ENV: ENV
	}
}
