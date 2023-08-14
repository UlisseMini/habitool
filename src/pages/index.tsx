import Image from 'next/image'
import { Inter } from 'next/font/google'
import useSWR from 'swr'

const inter = Inter({ subsets: ['latin'] })

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {
  const { data, error, isLoading } = useSWR('/api/hello', fetcher)

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <h1 className="font-bold text-3xl mb-8">Habitool</h1>
      <p>API Response: {isLoading ? "loading" : JSON.stringify(data || error)}</p>
    </main>
  )
}
