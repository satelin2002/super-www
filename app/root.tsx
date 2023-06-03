// import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cssBundleHref } from '@remix-run/css-bundle'
import {
	json,
	type DataFunctionArgs,
	type LinksFunction,
	type V2_MetaFunction,
} from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from '@remix-run/react'
import tailwindStylesheetUrl from './styles/tailwind.css'
import { getEnv } from './utils/env.server.ts'
import { useNonce } from './utils/nonce-provider.ts'
import { getUser } from './utils/auth.server.ts'

export const links: LinksFunction = () => {
	return [
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			href: '/favicons/apple-touch-icon.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			href: '/favicons/favicon-32x32.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			href: '/favicons/favicon-16x16.png',
		},
		{ rel: 'manifest', href: '/site.webmanifest' },
		{ rel: 'stylesheet', href: '/fonts/satoshi/font.css' },
		{ rel: 'stylesheet', href: '/fonts/hind/font.css' },
		{ rel: 'icon', href: '/favicon.ico' },
		{ rel: 'stylesheet', href: tailwindStylesheetUrl },
		cssBundleHref ? { rel: 'stylesheet', href: cssBundleHref } : null,
	].filter(Boolean)
}

export const meta: V2_MetaFunction = () => {
	return [
		{ title: 'Epic Notes' },
		{ name: 'description', content: 'Find yourself in outer space' },
	]
}

export async function loader({ request }: DataFunctionArgs) {
	const user = await getUser(request)
	console.log('ROOOOOOOOOOOOOOt')
	return json({ user, ENV: getEnv() })
}

export default function App() {
	const data = useLoaderData<typeof loader>()
	const nonce = useNonce()

	return (
		<html lang="en" className="h-full">
			<head>
				<Meta />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Links />
			</head>
			<body className="flex h-full flex-col justify-between bg-white">
				<div className="flex-1">
					<Outlet />
				</div>
				<ScrollRestoration nonce={nonce} />
				<Scripts nonce={nonce} />
				<script
					nonce={nonce}
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(data.ENV)}`,
					}}
				/>
				<LiveReload nonce={nonce} />
			</body>
		</html>
	)
}

// function UserDropdown() {
// 	const user = useUser()
// 	const submit = useSubmit()
// 	return (
// 		<DropdownMenu.Root>
// 			<DropdownMenu.Trigger asChild>
// 				<Link
// 					to={`/users/${user.email}`}
// 					// this is for progressive enhancement
// 					onClick={e => e.preventDefault()}
// 					className="flex items-center gap-2 rounded-full bg-day-500 py-2 pl-2 pr-4 outline-none hover:bg-day-400 focus:bg-day-400 radix-state-open:bg-day-400"
// 				>
// 					<img
// 						className="h-8 w-8 rounded-full object-cover"
// 						alt={user.name ?? user.email}
// 						src={getUserImgSrc(user.imageId)}
// 					/>
// 					<span className="text-body-sm font-bold">
// 						{user.name ?? user.email}
// 					</span>
// 				</Link>
// 			</DropdownMenu.Trigger>
// 			<DropdownMenu.Portal>
// 				<DropdownMenu.Content
// 					sideOffset={8}
// 					align="start"
// 					className="flex flex-col rounded-3xl bg-[#323232]"
// 				>
// 					<DropdownMenu.Item asChild>
// 						<Link
// 							prefetch="intent"
// 							to={`/users/${user.email}`}
// 							className="rounded-t-3xl px-7 py-5 outline-none hover:bg-day-500 radix-highlighted:bg-day-500"
// 						>
// 							Profile
// 						</Link>
// 					</DropdownMenu.Item>
// 					<DropdownMenu.Item asChild>
// 						<Link
// 							prefetch="intent"
// 							to={`/users/${user.email}/notes`}
// 							className="px-7 py-5 outline-none hover:bg-day-500 radix-highlighted:bg-day-500"
// 						>
// 							Notes
// 						</Link>
// 					</DropdownMenu.Item>
// 					<DropdownMenu.Item asChild>
// 						<Form
// 							action="/logout"
// 							method="POST"
// 							className="rounded-b-3xl px-7 py-5 outline-none radix-highlighted:bg-day-500"
// 							onClick={e => submit(e.currentTarget)}
// 						>
// 							<button type="submit">Logout</button>
// 						</Form>
// 					</DropdownMenu.Item>
// 				</DropdownMenu.Content>
// 			</DropdownMenu.Portal>
// 		</DropdownMenu.Root>
// 	)
// }
