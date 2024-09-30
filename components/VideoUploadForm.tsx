'use client';
import { useState } from 'react'
import { Button } from "@/components/ui/button"

export function VideoUploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  if (!file) return

  setUploading(true)
  const formData = new FormData()
  formData.append('video', file)

  try {
    const response = await fetch('/api/upload-video', {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const data = await response.json()
      alert(data.message)
      setFile(null)
    } else {
      throw new Error('Error al subir el video')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Error al subir el video')
  } finally {
    setUploading(false)
  }
}

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-300
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-purple-600 file:text-white
          hover:file:bg-purple-700"
      />
      <Button 
        type="submit" 
        disabled={!file || uploading}
        className="w-full bg-purple-600 hover:bg-purple-700"
      >
        {uploading ? 'Subiendo...' : 'Subir Video'}
      </Button>
    </form>
  )
}

