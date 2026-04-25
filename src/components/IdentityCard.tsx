import { motion } from 'motion/react';
import { Shield, Radio, Database, Server } from 'lucide-react';
import { GlitchText } from './GlitchText';

export const IdentityCard = () => {
  const stats = [
    { label: 'UNIX_LOAD', value: '42%', icon: Server },
    { label: 'SYS_ADMIN', value: 'ACTIVE', icon: Shield },
    { label: 'REDUNDANCY', value: 'STABLE', icon: Database },
    { label: 'MAIL_SERVER', value: 'ONLINE', icon: Radio },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 border border-cyber-cyan/30 bg-[#050505]/60 backdrop-blur-md rounded-lg relative overflow-hidden group hover:border-cyber-cyan/60 transition-colors"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-30" />
      
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="relative">
          <div className="w-28 h-28 border border-cyber-cyan/40 p-1 group-hover:border-cyber-cyan transition-colors">
             <div className="w-full h-full bg-cyber-cyan/10 flex items-center justify-center relative overflow-hidden">
                <Server size={40} className="text-cyber-cyan/30 group-hover:text-cyber-cyan transition-colors" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-cyan/20 to-transparent h-1/4 top-1/2 animate-[scan_3s_linear_infinite]" />
             </div>
          </div>
          <div className="absolute -top-1 -right-1 text-[7px] bg-cyber-cyan text-black px-1 font-black tracking-tighter">ID: LGO-PUCK</div>
        </div>

        <div className="flex-1 space-y-4 w-full text-center md:text-left">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter text-white uppercase leading-none drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              <span className="text-cyber-cyan">_</span><GlitchText text="IT-ADMIN" glitchActive />
            </h2>
            <p className="text-[9px] text-cyber-cyan/40 tracking-[0.4em] font-bold mt-1">SESSION: UNIX_MASTER</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center gap-1.5 opacity-50">
                   <stat.icon size={10} className="text-cyber-cyan" />
                   <span className="text-[8px] uppercase font-bold tracking-widest">{stat.label}</span>
                </div>
                <div className="text-[10px] font-bold text-white flex justify-between">
                  <span>{stat.value}</span>
                  <span className="text-cyber-cyan/40">[OK]</span>
                </div>
                <div className="h-[2px] bg-cyber-cyan/10 w-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: i * 0.1, duration: 1.5 }}
                    className="h-full bg-cyber-cyan shadow-[0_0_8px_var(--color-cyber-cyan)]" 
                   />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-cyber-cyan/10 grid grid-cols-3 gap-2">
         {[...Array(3)].map((_, i) => (
           <div key={i} className="h-10 border border-cyber-cyan/10 bg-cyber-cyan/5 rounded group-hover:bg-cyber-cyan/10 transition-all border-dashed" />
         ))}
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </motion.div>
  );
};
