import {
	json,
	type V2_MetaFunction,
	type DataFunctionArgs,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { GeneralErrorBoundary } from '~/components/error-boundary.tsx'
import { Spacer } from '~/components/spacer.tsx'
import { requireAnonymous } from '~/utils/auth.server.ts'
import { getSession } from '~/utils/session.server.ts'
import { InlineLogin } from '../resources+/login.tsx'
// import { Toaster, toast } from 'react-hot-toast'
import { ButtonLink } from '~/utils/forms.tsx'
import { ChevronLeft } from 'lucide-react'
// import React from 'react'

export async function loader({ request }: DataFunctionArgs) {
	console.log('LOOOOOOOOOOOOGING')
	await requireAnonymous(request)
	const session = await getSession(request.headers.get('cookie'))
	const magicLinkSent = session.has('auth:magiclink')
	const magicLinkEmail = session.get('auth:email')
	return json({
		magicLinkSent,
		magicLinkEmail,
	})
}

export const meta: V2_MetaFunction = () => {
	return [{ title: 'Login to Epic Notes' }]
}

export default function LoginPage() {
	// const { magicLinkSent, magicLinkEmail } = useLoaderData<typeof loader>()

	return (
		<>
			<header className="container mx-auto px-4 py-6 sm:px-0">
				<nav className="flex justify-between">
					{/* <Link to="/">
						<div className="font-light">epic</div>
						<div className="font-bold">notes</div>
					</Link> */}
					<div className="flex items-center gap-10">
						<ButtonLink to="/" size="sm" variant="outline">
							<ChevronLeft className="mr-0.5 h-5" aria-hidden="true" />
							Back
						</ButtonLink>
					</div>
				</nav>
			</header>
			<div className="flex flex-col justify-center pb-32 pt-20">
				<div className="mx-auto w-full max-w-md">
					<div className="flex flex-col gap-3 text-center">
						<h1 className="text-h1">Welcome back!</h1>
						<p className="text-body-md text-gray-400">
							Use your email address to login
						</p>
					</div>
					<Spacer size="xs" />
					<InlineLogin />
				</div>
			</div>
		</>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
