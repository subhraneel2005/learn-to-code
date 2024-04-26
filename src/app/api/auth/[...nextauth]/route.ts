import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github'

const handler =  NextAuth({
  providers: [
    GithubProvider({
        clientId: "7199576a31fa340206ab",
        clientSecret: "7145b72e73b6adf0c1f1eee74989ba27cd0e4128",
    })
  ]
})

export {handler as GET, handler as POST}