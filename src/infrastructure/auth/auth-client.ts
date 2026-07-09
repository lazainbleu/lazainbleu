import { createAuthClient } from 'better-auth/react'
import { magicLinkClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  plugins: [magicLinkClient()],
})

export const magicLink = {
  signInDynamic: (email: string, callbackURL?: string) =>
    authClient.signIn.magicLink({
      email,
      callbackURL,
    }),
}
