// app/(routes)/dashboard/page.tsx
'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin')
    }
  }, [status, router])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append('video', file)

    try {
      const response = await fetch('/api/upload-video', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        alert('Video uploaded successfully')
        setFile(null)
      } else {
        alert('Failed to upload video')
      }
    } catch (error) {
      console.error('Error uploading video:', error)
      alert('Error uploading video')
    }
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido, {session.user?.name}</p>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="video/*" />
        <button type="submit" disabled={!file}>Upload Video</button>
      </form>
    </div>
  )
}