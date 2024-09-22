import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route" // nextauth
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== "admin") {
    redirect('/signin')
  }

  return (
    <div className="p-8 bg-gray-900 text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">Panel de Administración de Lookym</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg flex items-center justify-center text-lg">
          Gestionar Usuarios
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg flex items-center justify-center text-lg">
          Revisar Videos
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg flex items-center justify-center text-lg">
          Estadísticas
        </Button>
      </div>
      {/* Aquí puedes añadir más funcionalidades de administración */}
    </div>
  )
}