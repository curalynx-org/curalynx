"use client";

import { Activity, ArrowRight, CheckCircle2, User, Stethoscope } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [role, setRole] = useState<"provider" | "patient">("provider");

  return (
    <div className="flex min-h-screen w-full bg-[#FDFBF2] overflow-hidden">
      
      {/* LEFT SIDE: Immersive Visual Area */}
      <div className="hidden lg:flex w-[55%] bg-[#0B392A] relative flex-col justify-between p-12 overflow-hidden transition-colors duration-700">
        
        {/* Animated Abstract Mesh/Topography */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <svg className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] animate-[spin_120s_linear_infinite]" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E9D5FF" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#0B392A" stopOpacity="0" />
                <stop offset="100%" stopColor="#E9D5FF" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path fill="url(#grad1)" d="M400,200 C500,100 700,200 650,400 C600,600 450,700 300,650 C150,600 100,450 150,300 C200,150 300,300 400,200 Z" className="animate-[pulse_10s_ease-in-out_infinite_alternate]" />
            <path fill="none" stroke="#E9D5FF" strokeWidth="0.5" strokeDasharray="4 8" d="M100,400 C200,300 600,200 700,500 C800,800 300,700 100,400 Z" className="animate-[pulse_8s_ease-in-out_infinite_alternate]" />
            
            {/* Topographic contour lines */}
            <g stroke="#FDFBF2" strokeWidth="0.5" fill="none" opacity="0.15">
              <path d="M 0 200 Q 200 300 400 200 T 800 200" className="animate-[ping_15s_ease-in-out_infinite]" />
              <path d="M 0 300 Q 200 400 400 300 T 800 300" />
              <path d="M 0 400 Q 200 500 400 400 T 800 400" />
              <path d="M 0 500 Q 200 600 400 500 T 800 500" />
              <path d="M 0 600 Q 200 700 400 600 T 800 600" />
            </g>
          </svg>
        </div>

        {/* Branding */}
        <Link href="/" className="flex items-center gap-2 relative z-10 w-fit group">
          <div className="grid size-10 place-items-center bg-[#E9D5FF] text-[#0B392A] rounded-xl shadow-lg transition-transform group-hover:scale-105">
            <Activity className="size-5" />
          </div>
          <span className="font-serif font-bold text-2xl tracking-tight text-[#FDFBF2]">CuraLynx</span>
        </Link>

        {/* Testimonial / Value Prop based on Role */}
        <div className="relative z-10 max-w-lg mb-12 animate-in fade-in duration-500" key={role}>
          <div className="flex gap-2 mb-6">
            <div className="flex items-center gap-1 bg-[#18181A]/40 backdrop-blur-md rounded-full px-3 py-1 border border-[#FDFBF2]/10">
              <CheckCircle2 className="size-3.5 text-[#E9D5FF]" />
              <span className="text-xs font-semibold text-[#FDFBF2]">HIPAA Compliant</span>
            </div>
            {role === "patient" && (
              <div className="flex items-center gap-1 bg-[#18181A]/40 backdrop-blur-md rounded-full px-3 py-1 border border-[#FDFBF2]/10">
                <CheckCircle2 className="size-3.5 text-[#E9D5FF]" />
                <span className="text-xs font-semibold text-[#FDFBF2]">Secure Patient Portal</span>
              </div>
            )}
          </div>
          
          <h2 className="font-serif text-[42px] leading-[1.1] text-[#FDFBF2] mb-6">
            {role === "provider" 
              ? "The standard of care for modern medical practices." 
              : "Your health records, appointments, and care team in one place."}
          </h2>
          
          <p className="text-[#FDFBF2]/70 text-lg font-medium leading-relaxed">
            {role === "provider"
              ? "\"CuraLynx has completely eliminated our after-hours charting. It's not just a tool; it's practically a new staff member.\""
              : "\"I love how easy it is to book an appointment and view my test results without calling the front desk. It gives me peace of mind.\""}
          </p>
          
          <div className="mt-6 flex items-center gap-4">
            <img 
              src={role === "provider" ? "https://i.pravatar.cc/150?u=doc" : "https://i.pravatar.cc/150?u=patient"} 
              alt={role === "provider" ? "Doctor" : "Patient"} 
              className="size-12 rounded-full border-2 border-[#FDFBF2]/20" 
            />
            <div>
              <p className="font-bold text-[#FDFBF2]">
                {role === "provider" ? "Dr. Sarah Chen" : "Emily Rodriguez"}
              </p>
              <p className="text-sm text-[#FDFBF2]/60">
                {role === "provider" ? "Chief of Medicine, Oakland Clinic" : "Verified Patient"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-24 relative z-10">
        
        {/* Mobile Header Branding */}
        <Link href="/" className="lg:hidden absolute top-8 left-8 flex items-center gap-2 group">
          <div className="grid size-8 place-items-center bg-[#18181A] text-[#FDFBF2] rounded-lg">
            <Activity className="size-4" />
          </div>
          <span className="font-serif font-bold text-xl tracking-tight text-[#18181A]">CuraLynx</span>
        </Link>

        <div className="w-full max-w-sm xl:max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          {/* Role Toggle */}
          <div className="flex items-center p-1 bg-[#18181A]/5 rounded-xl mb-10 w-fit mx-auto lg:mx-0">
            <button
              onClick={() => setRole("provider")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                role === "provider" 
                  ? "bg-[#FDFBF2] text-[#18181A] shadow-sm border border-[#18181A]/10" 
                  : "text-[#18181A]/50 hover:text-[#18181A]"
              }`}
            >
              <Stethoscope className="size-4" />
              Provider
            </button>
            <button
              onClick={() => setRole("patient")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                role === "patient" 
                  ? "bg-[#FDFBF2] text-[#18181A] shadow-sm border border-[#18181A]/10" 
                  : "text-[#18181A]/50 hover:text-[#18181A]"
              }`}
            >
              <User className="size-4" />
              Patient
            </button>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold tracking-tight text-[#18181A] mb-3">
              Welcome back
            </h1>
            <p className="text-[#18181A]/60 text-base font-medium">
              {role === "provider" 
                ? "Enter your credentials to access your dashboard." 
                : "Sign in to access your health portal."}
            </p>
          </div>

          <form className="space-y-5">
            <div className="space-y-1.5 group">
              <label className="text-[11px] font-bold text-[#18181A] uppercase tracking-wider group-focus-within:text-[#0B392A] transition-colors">
                {role === "provider" ? "Work Email" : "Email or Phone Number"}
              </label>
              <input 
                type={role === "provider" ? "email" : "text"}
                placeholder={role === "provider" ? "doctor@clinic.com" : "you@example.com"}
                className="w-full h-12 rounded-xl border border-[#18181A]/20 bg-transparent px-4 text-[15px] font-medium text-[#18181A] placeholder:text-[#18181A]/30 focus:border-[#0B392A] focus:ring-1 focus:ring-[#0B392A] outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-1.5 group">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-[#18181A] uppercase tracking-wider group-focus-within:text-[#0B392A] transition-colors">
                  Password
                </label>
                <Link href="#" className="text-[11px] font-bold text-[#18181A]/60 hover:text-[#18181A] transition-colors">
                  Forgot password?
                </Link>
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full h-12 rounded-xl border border-[#18181A]/20 bg-transparent px-4 text-[15px] font-medium text-[#18181A] placeholder:text-[#18181A]/30 focus:border-[#0B392A] focus:ring-1 focus:ring-[#0B392A] outline-none transition-all tracking-widest"
                required
              />
            </div>

            <Link 
              href={role === "provider" ? "/dashboard" : "/patient/portal"} 
              className="w-full h-12 mt-4 bg-[#E9D5FF] border border-[#18181A] hover:bg-[#D8B4FE] text-[#18181A] rounded-xl text-[15px] font-bold transition-all hover:-translate-y-0.5 hover:shadow-md flex items-center justify-center gap-2 group shadow-sm"
            >
              {role === "provider" ? "Sign In to Workspace" : "Access Patient Portal"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm font-medium text-[#18181A]/60">
              Don't have an account?{" "}
              <Link href="#" className="font-bold text-[#18181A] hover:underline underline-offset-4 decoration-2 decoration-[#E9D5FF]">
                {role === "provider" ? "Request access" : "Register here"}
              </Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
