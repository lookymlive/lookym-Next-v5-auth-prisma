'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Instagram, Mail, Play } from "lucide-react"

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Implementar lógica de inicio de sesión/registro
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
            <TabsTrigger value="login" onClick={() => setIsLogin(true)}>Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register" onClick={() => setIsLogin(false)}>Registrarse</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleSubmit} className="space-y-4">
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
            <form onSubmit={handleSubmit} className="space-y-4">
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
          <Mail className="mr-2 h-4 w-4" /> Continuar con Google
        </Button>
        <Button variant="outline" className="w-full text-gray-300 border-gray-600 hover:bg-gray-700" onClick={() => signIn('instagram')}>
          <Instagram className="mr-2 h-4 w-4" /> Continuar con Instagram
        </Button>
      </CardFooter>
    </Card>
  )
}