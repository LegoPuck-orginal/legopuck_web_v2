export const GridBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-cyber-black">
      {/* Background Grid Effect */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: `linear-gradient(#ff7700 1px, transparent 1px), linear-gradient(90deg, #ff7700 1px, transparent 1px)`, 
          backgroundSize: '32px 32px' 
        }} 
      />

      {/* Perspective Grid (Optional, keeping it subtle for depth) */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[50vh] opacity-5 origin-bottom perspective-[1000px] border-t border-cyber-cyan/10"
        style={{ transform: 'rotateX(60deg)' }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 119, 0, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 119, 0, 0.1) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
            animation: 'grid-move 20s linear infinite'
          }}
        />
      </div>

      <style>{`
        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 0 500px; }
        }
      `}</style>
    </div>
  );
};
