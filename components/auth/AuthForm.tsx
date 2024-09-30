'use client'


import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Play } from 'lucide-react'
import { FaInstagram } from 'react-icons/fa';



export function AuthForm() {
  const { data: session, status } = useSession()

  const handleLogout = async () => {
    await signOut()
  }
  if (status === 'loading') {
    return <div>Loading...</div>
  }
  if (session) {
    return (
      <div>
        <p>Bienvenido, {session.user?.name}</p>
        <Button onClick={handleLogout}>Cerrar Sesión</Button>
      </div>
    )
  }
  return (
    <Card className="w-[400px] bg-gray-800 border-gray-700">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-purple-400">
          <span className="flex items-center justify-center">
            <Play className="mr-2 h-6 w-6 text-purple-400" />
            Lookym
          </span>
        </CardTitle>
        <CardDescription className="text-gray-400">
          Sube, mira, comparte - Tu plataforma de videos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={(e) => {
              e.preventDefault();
              // Add your login logic here
            }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="tu@email.com" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Iniciar Sesión
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={(e) => {
              e.preventDefault();
              // Add your registration logic here
            }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Nombre de Usuario</Label>
                <Input id="username" placeholder="usuario123" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="tu@email.com" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userType">Tipo de Usuario</Label>
                <select id="userType" className="w-full bg-gray-700 text-gray-100 rounded-md p-2">
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Registrarse
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button variant="outline" className="w-full text-gray-300 border-gray-600 hover:bg-gray-700" onClick={() => signIn('google')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          Continuar con Google
        </Button>
        <Button variant="outline" className="w-full text-gray-300 border-gray-600 hover:bg-gray-700" onClick={() => signIn('instagram')}>
          <FaInstagram className="mr-2 h-4 w-4" /> Continuar con Instagram
        </Button>
      </CardFooter>
    </Card>
  )
}