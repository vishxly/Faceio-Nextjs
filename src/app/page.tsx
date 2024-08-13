import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaUserShield, FaImage, FaCode, FaRobot } from 'react-icons/fa';

export default function Home() {
  const demos = [
    { title: "FACIO Web Authentication", href: "/faceio", icon: FaUserShield },
    { title: "Image Processing", href: "/imageprocessing", icon: FaImage },
    { title: "Code Generation", href: "/codegeneration", icon: FaCode },
    { title: "AI Assistant", href: "/aiassistant", icon: FaRobot },
  ];

  return (
    <div className="max-h-screen  bg-gradient-to-br from-purple-700 via-blue-600 to-teal-500 text-white p-8 w-full">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-8 animate-fade-in-down">
          PixLab Faceio
        </h1>
        <p className="text-xl text-center mb-12 animate-fade-in-up">
          Explore cutting-edge technologies and innovative solutions
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {demos.map((demo, index) => (
            <Link
              key={demo.href}
              href={demo.href}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-40 text-lg font-semibold flex flex-col items-center justify-center space-y-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl hover:bg-opacity-20 transition-all duration-300 animate-fade-in",
                { 'animate-delay-100': index % 2 === 1 }
              )}
            >
              <demo.icon className="text-4xl" />
              {demo.title}
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center animate-fade-in-up animate-delay-300">
          <h2 className="text-3xl font-bold mb-4">Why Choose PixLab?</h2>
          <ul className="text-lg space-y-2">
            <li>✨ Cutting-edge technologies</li>
            <li>🚀 High-performance solutions</li>
            <li>🔒 Advanced security features</li>
            <li>🌐 Seamless integrations</li>
          </ul>
        </div>

        <footer className="mt-16 text-center text-sm opacity-75 animate-fade-in-up animate-delay-500">
          © 2024 PixLab. All rights reserved. Empowering innovation through technology.
        </footer>
      </div>
    </div>
  );
}
