"use client"

import { motion } from 'framer-motion'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import loginSchema, { type loginSchemaFormData } from "../schemas/LoginSchema"
import { useLoginUser } from '../../../Internal/auth/loginMutation'
import { Loader2, Mail, Lock, ArrowRight } from 'lucide-react'
import { Checkbox } from "../../../components/ui/checkbox"
import { useState } from 'react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  
  const { handleSubmit, register, formState: { errors } } = useForm<loginSchemaFormData>({
    resolver: zodResolver(loginSchema),
  })

  const { mutate: loginUser, isPending } = useLoginUser()

  function onSubmitForm(data: loginSchemaFormData) {
    loginUser(data)
  }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="text-center mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-gray-900"
        >
          Bem-vindo de volta
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-500 mt-2"
        >
          Faça login para acessar o painel
        </motion.p>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="space-y-5"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <motion.div 
          className="space-y-1.5"
          whileFocus="focus"
          whileHover="focus"
          animate="blur"
        >
          <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
            <Mail className="w-4 h-4 mr-2 text-violet-600" />
            Email
          </label>
          <div className="relative">
            <Input 
              {...register('email')} 
              id="email" 
              type="email"
              placeholder="seu@email.com" 
              className={`bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-violet-500 focus:ring-violet-500/20 ${errors.email ? 'border-red-500 focus:ring-red-500/20' : ''}`}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </motion.div>

        <motion.div 
          className="space-y-1.5"
          whileFocus="focus"
          whileHover="focus"
          animate="blur"
        >
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center">
              <Lock className="w-4 h-4 mr-2 text-violet-600" />
              Senha
            </label>
            <Link 
              to="../recovery-password" 
              className="text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
            >
              Esqueceu a senha?
            </Link>
          </div>
          <div className="relative">
            <Input 
              {...register('password')} 
              id="password" 
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-violet-500 focus:ring-violet-500/20 ${errors.password ? 'border-red-500 focus:ring-red-500/20' : ''}`}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </motion.div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="remember" 
            {...register('remember')} 
            className="border-gray-300 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
          />
          <label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
          >
            Lembrar de mim
          </label>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white py-6 h-12 rounded-xl font-medium"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Entrando...
            </>
          ) : (
            <>
              Entrar
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </motion.form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Ainda não tem uma conta?{" "}
          <Link 
            to="../register" 
            className="font-medium text-violet-600 hover:text-violet-700 transition-colors"
          >
            Crie uma agora
          </Link>
        </p>
      </div>
    </motion.div>
  )
}
