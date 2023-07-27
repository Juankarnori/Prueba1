import '@/styles/globals.css'
import { AuthProvider, PerfilProvider, UiProvider } from '@/context'
import { SessionProvider } from "next-auth/react"
import { lightTheme } from '@/themes'
import { ThemeProvider } from '@emotion/react'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig 
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <AuthProvider>
          <PerfilProvider>
            <UiProvider>
              <ThemeProvider theme={lightTheme} >
                <Component {...pageProps} />
              </ThemeProvider>
            </UiProvider>
          </PerfilProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  )
}
