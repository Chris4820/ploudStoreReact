export default function LoadingPage() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      {/* Anel pulsante por trás da imagem */}
      <div className="absolute w-40 h-40 rounded-full border-4 border-purple-600/20 animate-ping" />

      {/* Imagem principal */}
      <div className="relative z-10">
        {/* Se estiveres em Next.js podes usar <Image> de 'next/image' */}
        <img
          src="/Logo.png"
          alt="PloudStore"
          className="w-28 h-28 object-contain"
        />
      </div>
    </div>
  );
}
