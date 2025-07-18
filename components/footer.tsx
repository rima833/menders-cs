import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 dark-transition">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Image
              src="/images/menders-logo.png"
              alt="Menders Cleaning Services"
              width={32}
              height={32}
              className="object-contain"
            />
            <div className="flex flex-col text-center">
              <span className="text-2xl font-bold">Menders</span>
              <span className="text-sm text-gray-400 dark:text-gray-500 -mt-1 animate-bounce">Cleaning Services</span>
            </div>
          </div>
          <p className="text-xl text-gray-300 dark:text-gray-400 mb-6">
            🧹 We fix your space—so you can focus on what matters.
          </p>
          <div className="text-gray-400 dark:text-gray-500">
            <p>&copy; 2024 Menders Cleaning Services. All rights reserved.</p>
            <p className="mt-2">Serving Abuja and Lagos with pride.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
