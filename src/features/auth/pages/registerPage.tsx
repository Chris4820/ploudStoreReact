"use client"

import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Link } from "react-router-dom"
import registerSchema, { type registerSchemaFormData } from "../schemas/RegisterSchema"
import { useRegisterUser } from "../../../Internal/auth/registerMutation"
import { Turnstile } from "@marsidev/react-turnstile"
import { useState } from "react"
import { Loader2, User, Mail, Lock, ArrowRight } from "lucide-react"
import { Checkbox } from "../../../components/ui/checkbox"

export default function RegisterPage() {
  const [captchaStatus, setCaptchaStatus] = useState<boolean>(false)
  const [captchaError, setCaptchaError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<registerSchemaFormData>({
    resolver: zodResolver(registerSchema),
  })

  const { mutate: createUser, isPending } = useRegisterUser()

  function onSubmitForm(data: registerSchemaFormData) {
    createUser(data)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="text-center mb-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-gray-900"
        >
          Crie sua conta
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-500 mt-2"
        >
          Comece a monetizar seu servidor de jogos
        </motion.p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="space-y-4"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <motion.div className="space-y-1.5" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
          <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center">
            <User className="w-4 h-4 mr-2 text-violet-600" />
            Nome
          </label>
          <Input
            {...register("name")}
            id="name"
            placeholder="Seu nome completo"
            className={`bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-violet-500 focus:ring-violet-500/20 ${errors.name ? "border-red-500 focus:ring-red-500/20" : ""}`}
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </motion.div>

        <motion.div className="space-y-1.5" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
          <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
            <Mail className="w-4 h-4 mr-2 text-violet-600" />
            Email
          </label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="seu@email.com"
            className={`bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-violet-500 focus:ring-violet-500/20 ${errors.email ? "border-red-500 focus:ring-red-500/20" : ""}`}
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div className="space-y-1.5" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center">
              <Lock className="w-4 h-4 mr-2 text-violet-600" />
              Senha
            </label>
            <div className="relative">
              <Input
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-violet-500 focus:ring-violet-500/20 ${errors.password ? "border-red-500 focus:ring-red-500/20" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xs"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
          </motion.div>

          <motion.div className="space-y-1.5" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            <label htmlFor="confirmpassword" className="text-sm font-medium text-gray-700 flex items-center">
              <Lock className="w-4 h-4 mr-2 text-violet-600" />
              Confirme a Senha
            </label>
            <div className="relative">
              <Input
                {...register("confirmPassword")}
                id="confirmpassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-violet-500 focus:ring-violet-500/20 ${errors.confirmPassword ? "border-red-500 focus:ring-red-500/20" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xs"
              >
                {showConfirmPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
          </motion.div>
        </div>

        <div className="flex flex-col items-center">
          <Turnstile
            siteKey="0x4AAAAAABFxIdRyVjsQMB7n"
            options={{
              theme: "light",
              size: "normal",
            }}
            onError={() => {
              setCaptchaStatus(false)
              setCaptchaError("Erro no captcha, tente novamente.")
            }}
            onExpire={() => {
              setCaptchaStatus(false)
              setCaptchaError("Captcha expirou, tente novamente.")
            }}
            onWidgetLoad={() => {
              setCaptchaStatus(false)
              setCaptchaError(null)
            }}
            onSuccess={(token) => {
              setCaptchaStatus(true)
              setValue("token", token)
              setCaptchaError(null)
            }}
          />
        </div>

        <div className="flex items-center space-x-2 mt-2">
          <Checkbox
            id="terms"
            {...register("terms")}
            onCheckedChange={(value: boolean) => setValue("terms", value)}
            className="border-gray-300 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
          >
            Aceito os{" "}
            <Link to="/terms" className="text-violet-600 hover:underline">
              termos e condições
            </Link>
          </label>
        </div>
        {errors.terms && <p className="text-sm text-red-600 -mt-2">{errors.terms.message}</p>}

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white py-6 h-12 rounded-xl font-medium mt-4"
          disabled={isPending || !captchaStatus}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Registrando...
            </>
          ) : (
            <>
              Criar conta
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </motion.form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Já tem uma conta?{" "}
          <Link to="../login" className="font-medium text-violet-600 hover:text-violet-700 transition-colors">
            Faça login
          </Link>
        </p>
      </div>
    </motion.div>
  )
}

