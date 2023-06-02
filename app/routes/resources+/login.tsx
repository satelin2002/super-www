import { conform, useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { json, type DataFunctionArgs } from '@remix-run/node'
import { Link, useFetcher } from '@remix-run/react'
import { z } from 'zod'
import { EMAIL_LINK_STRATEGY_NAME, authenticator } from '~/utils/auth.server.ts'
import { Button, ErrorList, Field } from '~/utils/forms.tsx'
import { emailSchema } from '~/utils/user-validation.ts'

export const LoginFormSchema = z.object({
	email: emailSchema.optional(),
	redirectTo: z.string().optional(),
})

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.clone().formData()
	const submission = parse(formData, {
		schema: LoginFormSchema,
		acceptMultipleErrors: () => true,
	})
	if (!submission.value || submission.intent !== 'submit') {
		return json(
			{
				status: 'error',
				submission,
			} as const,
			{ status: 400 },
		)
	}
	// The success redirect is required in this action, this is where the user is
	// going to be redirected after the magic link is sent, note that here the
	// user is not yet authenticated, so you can't send it to a private page.
	await authenticator.authenticate(EMAIL_LINK_STRATEGY_NAME, request, {
		// If the user was authenticated, we redirect them to their profile page
		// This redirect is optional, if not defined the user will be returned by
		// the `authenticate` function and you can render something on this page
		// manually redirect the user.
		successRedirect: '/login',
		// If something failed we take them back to the login page
		// This redirect is optional, if not defined any error will be throw and
		// the ErrorBoundary will be rendered.
		failureRedirect: '/login',
	})
}

export function InlineLogin() {
	const loginFetcher = useFetcher<typeof action>()

	const [form, fields] = useForm({
		id: 'inline-login',
		constraint: getFieldsetConstraint(LoginFormSchema),
		onValidate({ formData }) {
			return parse(formData, { schema: LoginFormSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	return (
		<div>
			<div className="mx-auto w-full max-w-md px-8">
				<loginFetcher.Form
					method="POST"
					action="/resources/login"
					name="login"
					{...form.props}
				>
					<Field
						labelProps={{
							htmlFor: fields.email.id,
							children: 'Email address',
						}}
						inputProps={conform.input(fields.email)}
						errors={fields.email.errors}
					/>
					<ErrorList errors={form.errors} id={form.errorId} />

					<div className="flex items-center justify-start gap-6 pt-3">
						<Button
							className="w-full"
							size="md"
							variant="primary"
							status={loginFetcher.state === 'submitting' ? 'pending' : 'idle'}
							type="submit"
							disabled={loginFetcher.state !== 'idle'}
						>
							Log in
						</Button>
					</div>
				</loginFetcher.Form>
				<div className="flex items-center justify-center gap-2 pt-6">
					<span className="text-gray-400">New here?</span>
					<Link to="/signup">Create an account</Link>
				</div>
			</div>
		</div>
	)
}
