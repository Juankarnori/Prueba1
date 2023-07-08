import '@/styles/globals.css'
import { lightTheme } from '@/themes'
import { ThemeProvider } from '@emotion/react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme} >
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
