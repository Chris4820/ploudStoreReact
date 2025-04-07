import type React from "react"
import { Link } from "react-router-dom"

interface CardSectionProps {
  title: string
  children: React.ReactNode
  hAuto?: boolean
  link?: string
}

export default function CardSection({ title, children, hAuto, link }: CardSectionProps) {
  return (
    <div className="bg-card rounded-lg shadow-sm border w-full overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-medium">{title}</h2>
        {link && (
          <Link to={link} className="text-blue-600 text-sm hover:underline">
            Ver todos
          </Link>
        )}
      </div>
      <div className={`p-4 ${hAuto ? "" : "h-[320px]"} overflow-hidden`}>{children}</div>
    </div>
  )
}

