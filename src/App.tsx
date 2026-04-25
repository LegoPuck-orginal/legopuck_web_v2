/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IdentityCard } from './components/IdentityCard';
import { GridBackground } from './components/GridBackground';
import { GlitchText } from './components/GlitchText';
import { Wifi, Battery, Volume2, ShieldAlert } from 'lucide-react';

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsBooting(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen scanlines selection:bg-cyber-cyan selection:text-black">
      <GridBackground />

      <AnimatePresence>
        {isBooting ? (
          <motion.div 
            key="boot"
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-cyber-black flex flex-col items-center justify-center font-mono"
          >
            <div className="w-64 space-y-4">
              <div className="flex justify-between text-[10px] text-cyber-cyan font-bold tracking-widest">
                <span>NEXUS_BOOT_V2.0</span>
                <span>{Math.round(bootProgress)}%</span>
              </div>
              <div className="h-[2px] w-full bg-cyber-cyan/10 overflow-hidden border border-cyber-cyan/20">
                <motion.div 
                  className="h-full bg-cyber-cyan shadow-[0_0_15px_rgba(0,242,255,0.8)]"
                  style={{ width: `${bootProgress}%` }}
                />
              </div>
              <div className="text-[8px] text-cyber-cyan/50 font-bold uppercase tracking-tighter text-center">
                Kernel: Loaded | Drivers: OK | Neural: Synced
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 flex flex-col h-screen"
          >
            {/* Top Navigation / Status Bar */}
            <header className="h-12 border-b border-cyber-cyan/30 flex items-center justify-between px-6 bg-cyber-black/80 backdrop-blur-md z-10 shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-cyber-cyan shadow-[0_0_8px_#00f2ff]"></div>
                <span className="text-xs tracking-widest uppercase font-bold text-white">SYSTEM: ACTIVE</span>
                <span className="text-xs text-cyber-cyan/30 hidden sm:inline">|</span>
                <span className="text-xs tracking-widest text-cyber-cyan/60 hidden sm:inline uppercase">ID: 0x99_KRONOS</span>
              </div>
              <div className="flex gap-4 sm:gap-8 text-[10px] tracking-[0.2em] uppercase font-bold text-cyber-cyan/80">
                <span className="hidden md:inline">Ping: 12ms</span>
                <span className="hidden md:inline">Uptime: 99.98%</span>
                <div className="flex items-center gap-2">
                   <Wifi size={12} className="text-cyber-cyan" />
                   <span>SECURE</span>
                </div>
              </div>
            </header>

            {/* Main Layout Grid */}
            <main className="flex-1 grid grid-cols-12 overflow-hidden">
              
              {/* Left Rail: Telemetry */}
              <aside className="hidden lg:flex col-span-2 border-r border-cyber-cyan/20 p-4 flex-col gap-8 bg-[#050505]/40 backdrop-blur-sm">
                <div>
                  <p className="text-[9px] text-cyber-cyan/40 mb-3 uppercase tracking-tighter font-bold">Neural Link Stats</p>
                  <div className="space-y-4">
                    {[75, 45, 90].map((w, i) => (
                      <div key={i} className="h-[2px] bg-cyber-cyan/10 w-full relative">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${w}%` }}
                          transition={{ delay: 0.5 + i * 0.2, duration: 1 }}
                          className="h-full bg-cyber-cyan shadow-[0_0_10px_#00f2ff]" 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1 border-t border-cyber-cyan/10 pt-6">
                  <p className="text-[9px] text-cyber-cyan/40 mb-3 uppercase font-bold">Incoming stream</p>
                  <div className="text-[8px] leading-relaxed text-cyber-cyan/60 break-all overflow-hidden h-[400px] opacity-40 font-mono">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div key={i}>
                        {Math.random().toString(2).substring(2, 10)} {Math.random().toString(2).substring(2, 10)}
                        {i % 5 === 0 && <span className="text-white block mt-1 opacity-100">&gt; AUTH_REQ_GRNTD</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Center Content: Inner App */}
              <section className="col-span-12 lg:col-span-10 overflow-y-auto p-4 md:p-10 scrollbar-hide flex justify-center">
                 <div className="w-full max-w-5xl space-y-12">
                    <div className="space-y-2">
                       <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] uppercase">
                          <span className="text-cyber-cyan">_</span><GlitchText text="LegoPuck" glitchActive />
                       </h2>
                       <p className="text-lg md:text-xl text-cyber-cyan/80 leading-relaxed font-bold italic">
                          IT-System Verwaltung. <br/>
                          Mission: Die Welt zu einem besseren Ort machen und <span className="text-white underline decoration-cyber-cyan underline-offset-8">sichere, redundante Systeme</span> bauen.
                       </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <IdentityCard />
                       
                       <div className="p-4 border border-cyber-cyan/30 rounded-lg bg-cyber-black flex items-center justify-center relative overflow-hidden group">
                           {/* Decorative chart-like visual */}
                           <div className="absolute inset-0 p-4 flex flex-col justify-end gap-1 opacity-20">
                              {[...Array(15)].map((_, i) => (
                                <motion.div 
                                  key={i}
                                  initial={{ height: "10%" }}
                                  animate={{ height: `${Math.random() * 80 + 20}%` }}
                                  transition={{ repeat: Infinity, duration: Math.random() * 2 + 1, ease: "linear" }}
                                  className="w-full bg-cyber-cyan"
                                />
                              ))}
                           </div>
                           <div className="relative z-10 flex flex-col w-full h-full justify-between">
                              <div className="flex justify-between items-center text-[10px] text-cyber-cyan font-bold tracking-widest uppercase">
                                 <span>SYS_LOAD</span>
                                 <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-cyber-cyan rounded-full animate-pulse"></span>ACTIVE</span>
                              </div>
                              <div className="text-center my-4">
                                 <span className="text-4xl font-black text-white drop-shadow-[0_0_10px_var(--color-cyber-cyan)]">99.9%</span>
                                 <p className="text-[9px] text-cyber-cyan/50 tracking-[0.3em] uppercase">Redundancy OK</p>
                              </div>
                              <div className="flex justify-between items-center text-[8px] text-cyber-cyan/50 font-bold uppercase">
                                 <span>Node: UNIX_01</span>
                                 <span>{new Date().toLocaleTimeString()}</span>
                              </div>
                           </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="p-4 border border-cyber-cyan/20 bg-cyber-cyan/5 rounded backdrop-blur-sm">
                          <h3 className="text-[10px] uppercase text-cyber-cyan/40 mb-3 font-black tracking-widest">Primary Arsenal</h3>
                          <ul className="text-xs space-y-2 font-bold">
                             <li className="flex justify-between items-center text-white">
                                <span>UNIX_CORE</span>
                                <span className="text-cyber-cyan text-[10px]">[STRONG]</span>
                             </li>
                             <li className="flex justify-between items-center text-white">
                                <span>REDUNDANCY_SYS</span>
                                <span className="text-cyber-cyan text-[10px]">[STABLE]</span>
                             </li>
                             <li className="flex justify-between items-center text-white">
                                <span>SEC_OPS</span>
                                <span className="text-cyber-cyan text-[10px]">[ACTIVE]</span>
                             </li>
                          </ul>
                       </div>
                       <div className="p-4 border border-cyber-cyan/20 bg-cyber-cyan/5 rounded backdrop-blur-sm relative overflow-hidden flex flex-col justify-between">
                          <h3 className="text-[10px] uppercase text-cyber-cyan/40 mb-3 font-black tracking-widest">Connect</h3>
                          <div className="flex flex-col gap-2 relative z-10">
                            <a href="https://github.com/LegoPuck-orginal" target="_blank" rel="noreferrer" className="text-xs font-bold text-white hover:text-cyber-cyan transition-colors flex justify-between">
                               <span>GITHUB</span>
                               <span className="text-cyber-cyan/40">OPEN</span>
                            </a>
                            <a href="https://www.youtube.com/@LegoPuck" target="_blank" rel="noreferrer" className="text-xs font-bold text-white hover:text-cyber-cyan transition-colors flex justify-between">
                               <span>YOUTUBE</span>
                               <span className="text-cyber-cyan/40">WATCH</span>
                            </a>
                            <a href="https://www.instagram.com/legopuck/" target="_blank" rel="noreferrer" className="text-xs font-bold text-white hover:text-cyber-cyan transition-colors flex justify-between">
                               <span>INSTAGRAM</span>
                               <span className="text-cyber-cyan/40">VIEW</span>
                            </a>
                            <a href="mailto:ticket@legopuck.de" className="text-xs font-bold text-white hover:text-cyber-cyan transition-colors flex justify-between">
                               <span>TICKET_SYSTEM</span>
                               <span className="text-cyber-cyan/40">MAIL</span>
                            </a>
                          </div>
                       </div>
                    </div>
                 </div>
              </section>

            </main>

            {/* Bottom Console Footer */}
            <footer className="h-10 border-t border-cyber-cyan/30 bg-cyber-cyan/10 flex items-center px-6 shrink-0 z-10">
              <div className="flex-1 flex gap-4 overflow-hidden items-center">
                <span className="text-[10px] font-black text-white">$ ping mail.legopuck.de</span>
                <div className="flex gap-4 opacity-40 overflow-hidden whitespace-nowrap mask-fade">
                   <motion.div 
                    animate={{ x: [0, -100] }}
                    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                    className="flex gap-8 text-[9px] font-bold uppercase tracking-widest"
                   >
                     <span>| MAIL.LEGOPUCK.DE: ONLINE</span>
                     <span>| UPTIME: 99.99%</span>
                     <span>| ENCRYPTION: TLS_1.3</span>
                     <span>| ALL_SYSTEMS: SECURE</span>
                   </motion.div>
                </div>
              </div>
              <div className="flex gap-4 items-center pl-4 border-l border-cyber-cyan/20">
                <span className="text-[10px] px-2 bg-cyber-cyan text-black font-black uppercase tracking-tighter">V.2.0.4-BETA</span>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .mask-fade {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
