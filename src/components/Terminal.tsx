import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Terminal as TerminalIcon } from 'lucide-react';

interface TerminalLine {
  type: 'input' | 'output';
  content: string;
}

export const Terminal = () => {
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'INITIALIZING INTERFACE v0.4.2...' },
    { type: 'output', content: 'ACCESSING ENCRYPTED SEGMENTS...' },
    { type: 'output', content: 'CONNECTED TO NEXUS_OS.' },
    { type: 'output', content: 'Type "help" for a list of available commands.' },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, string> = {
    help: 'Available commands: about, skills, status, clear, contact, shutdown',
    about: 'NEXUS ENTITY: A full-stack developer specialized in high-performance digital architectures. Ghost in the machine.',
    skills: 'NODE.JS, REACT.JS, TYPESCRIPT, PY_CORE, K8S_ORCHESTRATION, NEURAL_NETWORKS.',
    status: 'SYSTEMS: OPERATIONAL | POWER: 100% | THREAT_LEVEL: MINIMAL',
    contact: 'SIGNAL TRANSMISSION: timmarquardt859@gmail.com',
    shutdown: 'NICE TRY. SYSTEM PROTECTION ACTIVE.',
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    
    if (!cmd) return;

    const newLines: TerminalLine[] = [...lines, { type: 'input', content: input }];

    if (cmd === 'clear') {
      setLines([{ type: 'output', content: 'TERMINAL BUFFER PURGED.' }]);
    } else if (commands[cmd]) {
      newLines.push({ type: 'output', content: commands[cmd] });
      setLines(newLines);
    } else {
      newLines.push({ type: 'output', content: `COMMAND NOT RECOGNIZED: "${cmd}". ATTEMPT LOGGED.` });
      setLines(newLines);
    }

    setInput('');
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="w-full max-w-2xl bg-cyber-black/80 border border-cyber-cyan/30 rounded-lg overflow-hidden backdrop-blur-md shadow-[0_0_20px_rgba(0,242,255,0.05)]">
      <div className="bg-cyber-cyan/10 px-4 py-2 flex items-center justify-between border-b border-cyber-cyan/20">
        <div className="flex items-center gap-2">
          <TerminalIcon size={14} className="text-cyber-cyan" />
          <span className="text-[10px] font-bold tracking-widest text-cyber-cyan/70 uppercase">0x_TERMINAL_V2.4</span>
        </div>
        <div className="flex gap-1.5 opacity-50">
          <div className="w-2 h-2 rounded-full bg-cyber-cyan" />
          <div className="w-2 h-2 rounded-full bg-cyber-cyan opacity-40" />
          <div className="w-2 h-2 rounded-full bg-cyber-cyan opacity-20" />
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="h-72 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-cyber-cyan/20 scrollbar-track-transparent bg-[#050505]/40"
      >
        <AnimatePresence>
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`text-[11px] leading-relaxed ${line.type === 'input' ? 'text-white font-bold' : 'text-cyber-cyan/80'}`}
            >
              <div className="flex gap-2">
                {line.type === 'input' && <span className="mt-0.5 shrink-0 opacity-50">&gt;</span>}
                <span>
                  {line.content}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <form onSubmit={handleCommand} className="p-4 pt-4 flex gap-2 items-center border-t border-cyber-cyan/10">
        <span className="text-cyber-cyan animate-pulse text-xs tracking-tighter">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          className="bg-transparent border-none outline-none text-white text-xs w-full font-mono caret-cyber-cyan placeholder-cyber-cyan/20"
          placeholder="ENTER_COMMAND..."
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
};
