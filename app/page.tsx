"use client";

import { motion, type Variants } from "framer-motion";
import { 
  Activity, 
  ArrowRight,
  Stethoscope,
  Mic,
  FileText,
  User,
  CheckCircle2,
  Brain,
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  // Animation Variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <main className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-100 overflow-x-hidden">
      
      {/* --- NAVBAR --- */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-[1400px] mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-zinc-900 rounded-md flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-xl tracking-tight text-zinc-900">CuraLynx</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-[15px] font-medium text-zinc-600">
            <Link href="#" className="text-zinc-900">Home</Link>
            <Link href="#" className="hover:text-zinc-900 transition-colors">About us</Link>
            <Link href="#" className="hover:text-zinc-900 transition-colors">Services</Link>
            <Link href="#" className="hover:text-zinc-900 transition-colors">How it works</Link>
            <Link href="#" className="hover:text-zinc-900 transition-colors">Case Studies</Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-[15px] font-medium text-zinc-900 border border-zinc-200 rounded-full hover:bg-zinc-50 transition-colors"
            >
              Log in
            </Link>
            <Link 
              href="/session" 
              className="inline-flex items-center justify-center px-6 py-2.5 text-[15px] font-medium text-white bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors shadow-sm"
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-40 pb-32 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8 flex flex-col items-center">
            
            <motion.h1 variants={fadeUp} className="text-[56px] md:text-[80px] font-medium tracking-tight text-zinc-900 leading-[1.05] relative inline-block">
              {/* Floating Avatar from screenshot */}
              <div className="absolute -left-16 top-2 h-14 w-14 rounded-full border-[3px] border-pink-200 bg-white overflow-hidden shadow-sm hidden md:flex items-center justify-center">
                 <User className="h-8 w-8 text-zinc-400" />
              </div>
              Unlock Your Clinical <br />
              Documentation Potential
            </motion.h1>
            
            <motion.div variants={fadeUp} className="pt-4">
              <Link href="/session" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-[#1A1A1A] rounded-full hover:bg-black transition-all shadow-md">
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Slanted 3D Cards Track */}
        <div className="mt-24 relative max-w-[1400px] mx-auto h-[350px] perspective-[2000px]">
          <motion.div 
            initial={{ opacity: 0, y: 100, rotateX: 45, rotateZ: -5 }} 
            animate={{ opacity: 1, y: 0, rotateX: 20, rotateZ: -2 }} 
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="flex justify-center gap-6 absolute inset-0 transform-style-3d"
          >
            {/* Card 1 */}
            <div className="w-[280px] h-[240px] bg-white rounded-[32px] p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-zinc-100 flex flex-col justify-between transform -translate-y-8">
              <div className="flex justify-between items-start">
                <span className="text-[15px] font-medium text-zinc-800 leading-tight">Time<br/>Saved</span>
                <div className="h-8 w-8 rounded-full bg-zinc-50 flex items-center justify-center"><ChevronRight className="h-4 w-4 text-zinc-400" /></div>
              </div>
              <div className="flex items-end gap-2 mb-4">
                {/* Bar chart mockup */}
                <div className="w-8 h-12 bg-amber-400 rounded-md relative"><span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium text-zinc-500">63%</span></div>
                <div className="w-8 h-16 bg-amber-400 rounded-md relative"><span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium text-zinc-500">75%</span></div>
                <div className="w-8 h-8 bg-amber-400 rounded-md relative"><span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium text-zinc-500">36%</span></div>
                <div className="w-8 h-14 bg-amber-400 rounded-md relative"><span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium text-zinc-500">64%</span></div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="w-[240px] h-[220px] bg-white rounded-[32px] p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-zinc-100 flex flex-col items-center justify-center relative translate-y-4">
              <div className="w-24 h-24 rounded-full border-[12px] border-blue-100 border-t-blue-400 relative">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">Pt</div>
              </div>
              <div className="absolute bottom-6 left-6 bg-white shadow-sm border border-zinc-100 px-3 py-1.5 rounded-lg flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                <span className="text-xs font-bold text-zinc-800">65%</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="w-[260px] h-[250px] bg-white rounded-[32px] p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-zinc-100 flex flex-col justify-between -translate-y-4">
              <span className="text-[15px] font-medium text-zinc-800 leading-tight">Structured<br/>Notes</span>
              <div className="relative w-full h-32 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border-[6px] border-orange-100 border-r-orange-500 border-t-orange-500 flex items-center justify-center">
                  <span className="text-lg font-medium text-zinc-900 flex items-center"><ArrowUpRight className="h-4 w-4 text-zinc-400"/> 98 %</span>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="w-[280px] h-[230px] bg-white rounded-[32px] p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-zinc-100 flex flex-col justify-between translate-y-8">
              <span className="text-[15px] font-medium text-zinc-800 leading-tight">Patient<br/>Encounter</span>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center overflow-hidden"><User className="h-6 w-6 text-zinc-400" /></div>
                <div>
                  <p className="text-[13px] font-semibold text-zinc-900">Sarah J.</p>
                  <p className="text-[11px] text-zinc-400">ID: PT-8472</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-[11px] font-medium text-zinc-500">Confidence Score: 95%</p>
                <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                  <div className="w-[95%] h-full bg-emerald-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- REVOLUTIONIZE SECTION --- */}
      <section className="py-32 px-6 relative max-w-[1000px] mx-auto text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="relative inline-block">
           <h2 className="text-[48px] md:text-[64px] font-medium tracking-tight text-zinc-900 leading-[1.1]">
             Revolutionize Clinical <br/>
             Workflows for <span className="bg-blue-100 text-blue-500 px-2 rounded-2xl inline-flex items-center justify-center h-[1em] w-[1em] pb-1"><Activity className="h-[0.6em] w-[0.6em]" /></span> <br/>
             Effortless Care
           </h2>
           
           {/* Floating Pills */}
           <div className="absolute -left-16 top-0 bg-white shadow-sm border border-zinc-100 rounded-xl p-2 hidden md:flex items-center justify-center">
             <div className="w-16 h-8 bg-gradient-to-r from-orange-400 to-rose-400 opacity-20 rounded-lg absolute"></div>
             <svg className="w-16 h-8 relative z-10" viewBox="0 0 100 40" fill="none"><path d="M0 30 Q 25 10 50 20 T 100 10" stroke="#F97316" strokeWidth="2" strokeLinecap="round"/></svg>
           </div>
           
           <div className="absolute -left-20 bottom-10 bg-white shadow-md border border-zinc-100 rounded-2xl p-3 hidden md:flex flex-col gap-2">
             <div className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-amber-400"></span><span className="text-xs font-semibold">English</span></div>
             <div className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-blue-400"></span><span className="text-xs font-semibold">Hindi</span></div>
           </div>
           
           <div className="absolute -right-16 top-4 bg-white shadow-md border border-zinc-100 rounded-full py-2 px-4 hidden md:flex items-center gap-3">
             <span className="text-[11px] font-semibold text-zinc-600">Game-Changing Platform!</span>
             <div className="h-6 w-6 rounded-full bg-rose-200 flex items-center justify-center"><User className="h-3 w-3 text-rose-600" /></div>
           </div>
        </motion.div>
      </section>

      {/* --- TRANSFORM SECTION --- */}
      <section className="py-24 px-6 max-w-[1200px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
          <h2 className="text-[40px] md:text-[56px] font-medium tracking-tight text-zinc-900 mb-6">
            Transform Consultations <br/> into Structured Records
          </h2>
          <p className="text-[15px] text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            Explore how our innovative AI and intuitive tools can seamlessly convert your patient conversations into tangible clinical records, driving sustainable growth for your practice.
          </p>
        </motion.div>

        {/* Top Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Card 1 */}
          <div className="bg-[#F8F9FA] rounded-[32px] p-8 min-h-[360px] flex flex-col justify-end relative overflow-hidden group">
            <div className="absolute top-10 right-10 bg-white shadow-sm px-6 py-4 rounded-2xl z-10 flex items-center gap-1">
              <span className="text-xl font-bold text-zinc-400">~</span>
              <span className="text-[40px] font-bold text-zinc-900 leading-none">2.5<span className="text-xl">hr</span></span>
            </div>
            
            <div className="absolute left-10 top-1/2 -translate-y-1/2">
               <div className="bg-white shadow-md p-4 rounded-2xl mb-4 w-24">
                 <svg viewBox="0 0 100 40" fill="none"><path d="M0 20 Q 25 10 50 20 T 100 20" stroke="#F97316" strokeWidth="2" strokeLinecap="round"/><circle cx="20" cy="15" r="3" fill="#F97316"/><text x="12" y="8" fontSize="8" fill="#a1a1aa">-2.5h</text></svg>
               </div>
               <div className="bg-white shadow-sm p-4 rounded-2xl w-24 flex flex-col items-center">
                 <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center mb-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /></div>
                 <span className="text-lg font-bold text-zinc-900">1242</span>
                 <span className="text-[9px] text-zinc-400 font-medium">Notes drafted</span>
               </div>
            </div>
            
            <h3 className="text-xl font-medium text-zinc-900 text-center relative z-20 mt-auto">Supercharge Your <br/> Time Saved</h3>
          </div>

          {/* Card 2 */}
          <div className="bg-[#F8F9FA] rounded-[32px] p-8 min-h-[360px] flex flex-col relative overflow-hidden group">
            <h3 className="text-xl font-medium text-zinc-900 mb-3">Documentation <br/> Growth</h3>
            <p className="text-[13px] text-zinc-500 leading-relaxed mb-8">Visualize documentation trends and patterns to make data-driven decisions for clinic expansion.</p>
            
            <div className="mt-auto bg-white rounded-t-2xl shadow-sm border-t border-x border-zinc-100 p-6 pb-0 flex items-end gap-2 h-40 relative">
              <div className="absolute -right-4 top-4 h-10 w-10 rounded-full bg-zinc-900 shadow-lg flex items-center justify-center border-4 border-[#F8F9FA]"><FileText className="h-4 w-4 text-white" /></div>
              
              <div className="w-full flex items-end gap-2 h-full">
                {/* Bar chart representing growth */}
                <div className="flex-1 bg-emerald-200 rounded-t-md h-[40%] relative overflow-hidden"><div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGQ9Ik0tMSwxIGwyLC0yIE0wLDQgbDQsLTQgTTMsNSBsMiwtMiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-50"></div></div>
                <div className="flex-1 bg-emerald-400 rounded-t-md h-[70%] relative overflow-hidden"></div>
                <div className="flex-1 bg-emerald-200 rounded-t-md h-[55%] relative overflow-hidden"><div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGQ9Ik0tMSwxIGwyLC0yIE0wLDQgbDQsLTQgTTMsNSBsMiwtMiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-50"></div></div>
                <div className="flex-1 bg-emerald-400 rounded-t-md h-[90%] relative overflow-hidden"></div>
                <div className="flex-1 bg-emerald-200 rounded-t-md h-[30%] relative overflow-hidden"><div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGQ9Ik0tMSwxIGwyLC0yIE0wLDQgbDQsLTQgTTMsNSBsMiwtMiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-50"></div></div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#F8F9FA] rounded-[32px] p-8 min-h-[360px] flex flex-col relative">
            <h3 className="text-xl font-medium text-zinc-900 mb-3">Smart Diagnostics</h3>
            <p className="text-[13px] text-zinc-500 leading-relaxed mb-auto">From automated live transcripts to AI-powered differential diagnosis, the feature streamlines the entire workflow.</p>
            
            <div className="flex gap-4 mt-8">
               <div className="flex-1 bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 flex flex-col justify-between">
                 <span className="text-[12px] font-semibold text-zinc-600 mb-4 text-center">Confidence Score</span>
                 <div className="bg-zinc-900 text-white rounded-xl py-4 text-center">
                   <span className="text-[32px] font-bold">94%</span>
                 </div>
               </div>
               <div className="flex flex-col gap-4">
                 <div className="h-14 w-14 rounded-2xl bg-zinc-900 shadow-sm flex items-center justify-center"><Brain className="h-6 w-6 text-white" /></div>
                 <div className="h-14 w-14 rounded-2xl bg-emerald-400 shadow-sm flex items-center justify-center"><Stethoscope className="h-6 w-6 text-white" /></div>
               </div>
            </div>
          </div>
        </div>

        {/* Lower Split */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Placeholder */}
          <div className="bg-zinc-200 rounded-[32px] min-h-[350px] relative overflow-hidden">
             {/* Replace with actual image */}
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-80 mix-blend-multiply"></div>
             <div className="absolute inset-0 bg-zinc-100/10"></div>
          </div>
          
          {/* Text & Small Card */}
          <div className="bg-[#F8F9FA] rounded-[32px] p-10 flex flex-col justify-center">
            <h3 className="text-2xl font-medium text-zinc-900 mb-4">Smart Segmentation</h3>
            <p className="text-[14px] text-zinc-500 leading-relaxed mb-10 max-w-sm">
              Effortlessly segment transcripts based on customizable criteria for targeted SOAP categorization and enhanced medical records.
            </p>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 w-[80%] mb-4">
                <div className="w-full h-2 bg-orange-100 rounded-full mb-6 overflow-hidden">
                  <div className="w-[45%] h-full bg-orange-500 rounded-full"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-zinc-900">45%</span>
                  <span className="text-[11px] font-medium text-zinc-400">Subjective Context</span>
                </div>
              </div>
              
              <div className="absolute -bottom-8 right-0 bg-white rounded-2xl shadow-lg border border-zinc-100 p-6 w-[60%]">
                 <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">Generated Notes</span>
                 <span className="text-3xl font-bold text-zinc-900 block mb-4">342</span>
                 <div className="flex gap-1 h-1.5 w-full">
                   <div className="flex-[3] bg-orange-500 rounded-full"></div>
                   <div className="flex-[1] bg-amber-400 rounded-full"></div>
                   <div className="flex-[1] bg-emerald-400 rounded-full"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- UNLOCK THE VALUE SECTION --- */}
      <section className="py-24 px-6 max-w-[1200px] mx-auto border-t border-zinc-100 mt-12">
        <div className="flex flex-col md:flex-row gap-16 md:gap-8 mb-16">
          <div className="flex-1">
            <h2 className="text-[40px] md:text-[56px] font-medium tracking-tight text-zinc-900 leading-tight">
              Unlock the <br/> Value
            </h2>
          </div>
          <div className="flex-1 md:pt-4">
            <p className="text-[14px] text-zinc-500 leading-relaxed max-w-md">
              Experience the transformative impact of our platform's key benefits, tailored to maximize your success. From increased structured records to streamlined workflows, we empower you to achieve your goals efficiently and effectively.
            </p>
          </div>
        </div>

        <div className="flex flex-col border-t border-zinc-100">
          
          {/* List Item 1 */}
          <div className="flex flex-col md:flex-row items-center py-12 border-b border-zinc-100 group">
             <div className="flex-1 w-full relative h-32 md:h-auto mb-8 md:mb-0 flex items-center justify-center md:justify-start md:pl-16">
                {/* Visual */}
                <div className="relative flex items-center">
                   <div className="h-20 w-20 rounded-full bg-amber-300 opacity-90 absolute left-0 flex items-center justify-center mix-blend-multiply"><span className="text-amber-900 font-bold text-sm">84%</span></div>
                   <div className="h-16 w-16 rounded-full bg-blue-300 opacity-90 absolute left-14 z-10 flex items-center justify-center mix-blend-multiply"><span className="text-blue-900 font-bold text-xs">44%</span></div>
                   <div className="h-12 w-12 rounded-full bg-emerald-400 opacity-90 absolute left-26 top-[-10px] flex items-center justify-center mix-blend-multiply"><span className="text-emerald-900 font-bold text-[10px]">32%</span></div>
                   <div className="h-8 w-8 rounded-full bg-orange-400 opacity-90 absolute left-36 top-4 flex items-center justify-center mix-blend-multiply"><span className="text-orange-900 font-bold text-[8px]">21%</span></div>
                </div>
             </div>
             <div className="flex-[2] w-full">
                <span className="text-lg font-medium text-zinc-400 block mb-2">01</span>
                <h3 className="text-[40px] md:text-[56px] font-medium text-zinc-800 tracking-tight group-hover:text-black transition-colors">Live Audio Transcription</h3>
             </div>
          </div>

          {/* List Item 2 */}
          <div className="flex flex-col md:flex-row items-center py-12 border-b border-zinc-100 group">
             <div className="flex-1 w-full relative h-32 md:h-auto mb-8 md:mb-0 flex items-center justify-center md:justify-start md:pl-16">
                {/* Visual */}
                <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-zinc-50 p-4 w-64 flex justify-between items-center transform -rotate-2 group-hover:rotate-0 transition-transform">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      <span className="h-3 w-3 bg-blue-200 transform rotate-45"></span>
                      <span className="h-3 w-3 bg-blue-500 transform rotate-45"></span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-zinc-900">ICD-10 Tagging</p>
                      <p className="text-[8px] text-zinc-400">Automatic code</p>
                    </div>
                  </div>
                  <div className="text-right">
                     <p className="text-[8px] font-medium text-zinc-500 mb-1">Mar 01 - 07, 2026</p>
                     <span className="inline-block px-1.5 py-0.5 border border-emerald-200 text-emerald-600 rounded-full text-[8px] font-bold">+19.5%</span>
                  </div>
                </div>
             </div>
             <div className="flex-[2] w-full">
                <span className="text-lg font-medium text-zinc-400 block mb-2">02</span>
                <h3 className="text-[40px] md:text-[56px] font-medium text-zinc-800 tracking-tight group-hover:text-black transition-colors">Automatic Medical Coding</h3>
             </div>
          </div>

          {/* List Item 3 */}
          <div className="flex flex-col md:flex-row items-center py-12 group">
             <div className="flex-1 w-full relative h-32 md:h-auto mb-8 md:mb-0 flex items-center justify-center md:justify-start md:pl-16">
                {/* Visual */}
                <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-zinc-50 p-5 w-64 transform rotate-2 group-hover:rotate-0 transition-transform">
                   <p className="text-[12px] font-bold text-zinc-900 mb-1">Prescriptions</p>
                   <p className="text-[10px] text-zinc-400 mb-4">11:00 am IST</p>
                   <div className="flex justify-between items-center">
                     <div className="flex -space-x-2">
                       <div className="h-6 w-6 rounded-full bg-zinc-200 border-2 border-white"></div>
                       <div className="h-6 w-6 rounded-full bg-zinc-300 border-2 border-white"></div>
                     </div>
                     <span className="text-[10px] font-bold bg-zinc-100 px-2 py-1 rounded-md text-zinc-700">Ready</span>
                   </div>
                </div>
             </div>
             <div className="flex-[2] w-full">
                <span className="text-lg font-medium text-zinc-400 block mb-2">03</span>
                <h3 className="text-[40px] md:text-[56px] font-medium text-zinc-800 tracking-tight group-hover:text-black transition-colors">Instant Prescription Gen</h3>
             </div>
          </div>

        </div>
      </section>

    </main>
  );
}
