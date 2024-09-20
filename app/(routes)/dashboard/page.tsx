import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/routes"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/signin')
  }

  return (
    <div className="p-8 bg-gray-900 text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">Bienvenido a Lookym, {session.user.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg flex items-center justify-center text-lg">
          Subir Nuevo Video
        </Button>
        <Button className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-lg flex items-center justify-center text-lg">
          Mis Videos
        </Button>
      </div>
      {/* Aquí puedes añadir una lista de videos recientes o recomendados */}
    </div>
  )
}