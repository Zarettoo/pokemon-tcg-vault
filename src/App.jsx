import { useState, useRef, useEffect } from 'react';
import { Sparkles, Shield, Search, ChevronRight, Info, Filter, X, Zap, PlayCircle, ChevronUp } from 'lucide-react';

// --- MASSIVE CARD DATABASE (32 UNIQUE CARDS) ---
const cardData = [
  // Generación: Clásico (Base Set)
  { id: 'base1-4', name: 'Charizard', gen: 'Clásico', image: 'https://images.pokemontcg.io/base1/4_hires.png', hp: 120, type: 'Fuego', rarity: 'Holo Rare', artist: 'Mitsuhiro Arita' },
  { id: 'base1-2', name: 'Blastoise', gen: 'Clásico', image: 'https://images.pokemontcg.io/base1/2_hires.png', hp: 100, type: 'Agua', rarity: 'Holo Rare', artist: 'Ken Sugimori' },
  { id: 'base1-15', name: 'Venusaur', gen: 'Clásico', image: 'https://images.pokemontcg.io/base1/15_hires.png', hp: 100, type: 'Planta', rarity: 'Holo Rare', artist: 'Mitsuhiro Arita' },
  { id: 'base1-58', name: 'Pikachu', gen: 'Clásico', image: 'https://images.pokemontcg.io/base1/58_hires.png', hp: 40, type: 'Rayo', rarity: 'Common', artist: 'Mitsuhiro Arita' },
  { id: 'base1-10', name: 'Mewtwo', gen: 'Clásico', image: 'https://images.pokemontcg.io/base1/10_hires.png', hp: 60, type: 'Psíquico', rarity: 'Holo Rare', artist: 'Ken Sugimori' },
  // Generación: Esmeralda / Rubí y Zafiro (EX Era)
  { id: 'ex8-97', name: 'Rayquaza ex', gen: 'Esmeralda', image: 'https://images.pokemontcg.io/ex8/97_hires.png', hp: 100, type: 'Incoloro', rarity: 'Ultra Rare', artist: 'Hikaru Koike' },
  { id: 'ex4-88', name: 'Kyogre ex', gen: 'Esmeralda', image: 'https://images.pokemontcg.io/ex4/88_hires.png', hp: 100, type: 'Agua', rarity: 'Ultra Rare', artist: 'Mitsuhiro Arita' },
  { id: 'ex4-85', name: 'Groudon ex', gen: 'Esmeralda', image: 'https://images.pokemontcg.io/ex4/85_hires.png', hp: 100, type: 'Lucha', rarity: 'Ultra Rare', artist: 'Hikaru Koike' },
  { id: 'ex9-97', name: 'Deoxys ex', gen: 'Esmeralda', image: 'https://images.pokemontcg.io/ex9/97_hires.png', hp: 110, type: 'Psíquico', rarity: 'Ultra Rare', artist: 'Mitsuhiro Arita' },
  { id: 'ex8-98', name: 'Salamence ex', gen: 'Esmeralda', image: 'https://images.pokemontcg.io/ex8/98_hires.png', hp: 160, type: 'Incoloro', rarity: 'Ultra Rare', artist: 'Hikaru Koike' },
  // Generación: XY
  { id: 'xy2-13', name: 'Charizard EX', gen: 'XY', image: 'https://images.pokemontcg.io/xy2/13_hires.png', hp: 180, type: 'Fuego', rarity: 'Ultra Rare', artist: 'Eske Yoshinob' },
  { id: 'xy3-55', name: 'Dragonite EX', gen: 'XY', image: 'https://images.pokemontcg.io/xy3/55_hires.png', hp: 180, type: 'Dragón', rarity: 'Ultra Rare', artist: '5ban Graphics' },
  { id: 'xy9-40', name: 'Greninja', gen: 'XY', image: 'https://images.pokemontcg.io/xy9/40_hires.png', hp: 130, type: 'Agua', rarity: 'Rare', artist: 'Naoki Saito' },
  { id: 'xy1-141', name: 'Xerneas EX', gen: 'XY', image: 'https://images.pokemontcg.io/xy1/141_hires.png', hp: 170, type: 'Hada', rarity: 'Ultra Rare', artist: '5ban Graphics' },
  { id: 'xy1-144', name: 'Yveltal EX', gen: 'XY', image: 'https://images.pokemontcg.io/xy1/144_hires.png', hp: 170, type: 'Siniestro', rarity: 'Ultra Rare', artist: '5ban Graphics' },
  // Generación: Sol y Luna
  { id: 'sm1-89', name: 'Solgaleo GX', gen: 'Sol y Luna', image: 'https://images.pokemontcg.io/sm1/89_hires.png', hp: 250, type: 'Metal', rarity: 'Ultra Rare', artist: '5ban Graphics' },
  { id: 'sm1-66', name: 'Lunala GX', gen: 'Sol y Luna', image: 'https://images.pokemontcg.io/sm1/66_hires.png', hp: 250, type: 'Psíquico', rarity: 'Ultra Rare', artist: '5ban Graphics' },
  { id: 'sm9-33', name: 'Pikachu & Zekrom GX', gen: 'Sol y Luna', image: 'https://images.pokemontcg.io/sm9/33_hires.png', hp: 240, type: 'Rayo', rarity: 'Ultra Rare', artist: 'Mitsuhiro Arita' },
  { id: 'sm11-79', name: 'Jirachi GX', gen: 'Sol y Luna', image: 'https://images.pokemontcg.io/sm11/79_hires.png', hp: 160, type: 'Psíquico', rarity: 'Ultra Rare', artist: 'PLANETA Igarashi' },
  { id: 'sm3-20', name: 'Charizard GX', gen: 'Sol y Luna', image: 'https://images.pokemontcg.io/sm3/20_hires.png', hp: 250, type: 'Fuego', rarity: 'Ultra Rare', artist: '5ban Graphics' },
  // Generación: Espada y Escudo
  { id: 'swsh1-138', name: 'Zamazenta V', gen: 'Espada y Escudo', image: 'https://images.pokemontcg.io/swsh1/138_hires.png', hp: 230, type: 'Metal', rarity: 'Holo Rare V', artist: 'aky CG Works' },
  { id: 'swsh3-20', name: 'Charizard VMAX', gen: 'Espada y Escudo', image: 'https://images.pokemontcg.io/swsh3/20_hires.png', hp: 330, type: 'Fuego', rarity: 'Holo Rare VMAX', artist: 'aky CG Works' },
  { id: 'swsh7-111', name: 'Rayquaza V', gen: 'Espada y Escudo', image: 'https://images.pokemontcg.io/swsh7/111_hires.png', hp: 210, type: 'Dragón', rarity: 'Holo Rare V', artist: 'PLANETA Mochizuki' },
  { id: 'swsh7-215', name: 'Umbreon VMAX', gen: 'Espada y Escudo', image: 'https://images.pokemontcg.io/swsh7/215_hires.png', hp: 310, type: 'Siniestro', rarity: 'Secret Rare', artist: 'Kiyotaka Oshiyama' },
  { id: 'swsh4-44', name: 'Pikachu VMAX', gen: 'Espada y Escudo', image: 'https://images.pokemontcg.io/swsh4/44_hires.png', hp: 310, type: 'Rayo', rarity: 'Holo Rare VMAX', artist: 'aky CG Works' },
  { id: 'swsh12-138', name: 'Lugia V', gen: 'Espada y Escudo', image: 'https://images.pokemontcg.io/swsh12/138_hires.png', hp: 220, type: 'Incoloro', rarity: 'Holo Rare V', artist: 'Mitsuhiro Arita' },
  // Generación: Escarlata y Púrpura
  { id: 'sv1-81', name: 'Miraidon ex', gen: 'Escarlata y Púrpura', image: 'https://images.pokemontcg.io/sv1/81_hires.png', hp: 220, type: 'Rayo', rarity: 'Double Rare', artist: '5ban Graphics' },
  { id: 'sv1-125', name: 'Koraidon ex', gen: 'Escarlata y Púrpura', image: 'https://images.pokemontcg.io/sv1/125_hires.png', hp: 230, type: 'Lucha', rarity: 'Double Rare', artist: 'aky CG Works' },
  { id: 'sv3pt5-151', name: 'Mew ex', gen: 'Escarlata y Púrpura', image: 'https://images.pokemontcg.io/sv3pt5/151_hires.png', hp: 150, type: 'Psíquico', rarity: 'Double Rare', artist: 'Niji' },
  { id: 'sv3pt5-65', name: 'Alakazam ex', gen: 'Escarlata y Púrpura', image: 'https://images.pokemontcg.io/sv3pt5/65_hires.png', hp: 310, type: 'Psíquico', rarity: 'Double Rare', artist: 'Mitsuhiro Arita' },
  { id: 'sv4-124', name: 'Garchomp ex', gen: 'Escarlata y Púrpura', image: 'https://images.pokemontcg.io/sv4/124_hires.png', hp: 320, type: 'Agua', rarity: 'Double Rare', artist: '5ban Graphics' },
  { id: 'sv2-17', name: 'Meowscarada ex', gen: 'Escarlata y Púrpura', image: 'https://images.pokemontcg.io/sv2/17_hires.png', hp: 310, type: 'Planta', rarity: 'Double Rare', artist: '5ban Graphics' }
];

const generations = ['Todas', 'Clásico', 'Esmeralda', 'XY', 'Sol y Luna', 'Espada y Escudo', 'Escarlata y Púrpura'];
const types = ['Todos', 'Fuego', 'Agua', 'Planta', 'Psíquico', 'Rayo', 'Lucha', 'Siniestro', 'Metal', 'Hada', 'Incoloro', 'Dragón'];

// --- DYNAMIC HERO SLIDES ---
const heroSlides = [
  {
    id: 1,
    title: "MEGA RAYQUAZA EX",
    subtitle: "ROARING SKIES",
    bgGradient: "radial-gradient(circle at 75% 50%, rgba(34,197,94,0.9) 0%, rgba(4,47,46,1) 40%, #050505 80%)",
    bgImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10079.png",
    cardImage: "https://images.pokemontcg.io/xy6/61_hires.png", 
    accent: "text-emerald-400",
    buttonColor: "bg-emerald-600 hover:bg-emerald-500",
    glow: "shadow-[0_0_60px_rgba(16,185,129,0.7)]"
  },
  {
    id: 2,
    title: "MEGA CHARIZARD EX",
    subtitle: "FLASHFIRE",
    bgGradient: "radial-gradient(circle at 75% 50%, rgba(239,68,68,0.9) 0%, rgba(69,10,10,1) 40%, #050505 80%)",
    bgImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10034.png",
    cardImage: "https://images.pokemontcg.io/xy2/13_hires.png",
    accent: "text-red-400",
    buttonColor: "bg-red-600 hover:bg-red-500",
    glow: "shadow-[0_0_60px_rgba(239,68,68,0.7)]"
  },
  {
    id: 3,
    title: "PRIMAL KYOGRE EX",
    subtitle: "PRIMAL CLASH",
    bgGradient: "radial-gradient(circle at 75% 50%, rgba(59,130,246,0.9) 0%, rgba(30,58,138,1) 40%, #050505 80%)",
    bgImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10077.png",
    cardImage: "https://images.pokemontcg.io/xy5/55_hires.png", 
    accent: "text-blue-400",
    buttonColor: "bg-blue-600 hover:bg-blue-500",
    glow: "shadow-[0_0_60px_rgba(59,130,246,0.7)]"
  },
  {
    id: 4,
    title: "MEW VMAX",
    subtitle: "FUSION STRIKE",
    bgGradient: "conic-gradient(from 180deg at 75% 50%, rgba(168,85,247,0.1) 0%, rgba(217,70,239,0.9) 50%, rgba(168,85,247,0.1) 100%)",
    bgImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png",
    cardImage: "https://images.pokemontcg.io/swsh8/114_hires.png", 
    accent: "text-fuchsia-400",
    buttonColor: "bg-fuchsia-600 hover:bg-fuchsia-500",
    glow: "shadow-[0_0_60px_rgba(217,70,239,0.7)]"
  },
  {
    id: 5,
    title: "ARCEUS VSTAR",
    subtitle: "BRILLIANT STARS",
    bgGradient: "radial-gradient(circle at 75% 50%, rgba(250,204,21,0.9) 0%, rgba(113,63,18,1) 40%, #050505 80%)",
    bgImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/493.png",
    cardImage: "https://images.pokemontcg.io/swsh9/123_hires.png", 
    accent: "text-amber-400",
    buttonColor: "bg-amber-500 hover:bg-amber-400",
    glow: "shadow-[0_0_60px_rgba(250,204,21,0.7)]"
  }
];

// --- RADIX UI INSPIRED CARD COMPONENT (WITH CLICK TO MODAL) ---
const TCGCard = ({ card, onClick }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)');
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.7 });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div 
      className="relative w-full max-w-[260px] aspect-[63/88] mx-auto group z-10 hover:z-50 cursor-pointer"
      onClick={() => onClick(card)}
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full relative transition-transform duration-200 ease-out preserve-3d rounded-[4.5%]"
        style={{ transform }}
      >
        <div className="absolute inset-0 w-full h-full rounded-[4.5%] bg-black shadow-2xl overflow-hidden">
          <img src={card.image} alt={card.name} className="w-full h-full object-cover rounded-[4.5%]" loading="lazy"/>
          
          <div 
            className="absolute inset-0 rounded-[4.5%] pointer-events-none mix-blend-color-dodge transition-opacity duration-300"
            style={{ opacity: glare.opacity, background: `radial-gradient(farthest-corner circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)` }}
          />
        </div>
      </div>

      {/* POPOVER HOVER INFO */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-50">
        <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.8)] text-center relative">
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-zinc-900/90 border-r border-b border-white/10 rotate-45 backdrop-blur-xl"></div>
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2 mb-2">
             <span className="text-white font-bold text-sm">{card.name}</span>
             <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full font-mono">{card.hp} HP</span>
          </div>
          <div className="relative z-10 flex flex-col gap-1 text-left">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-500">Rareza:</span>
              <span className="text-zinc-300">{card.rarity}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-500">Artista:</span>
              <span className="text-zinc-300 text-right truncate w-24">{card.artist}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- MAIN APP ---
export default function App() {
  const [activeGen, setActiveGen] = useState('Todas');
  const [activeType, setActiveType] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentHero, setCurrentHero] = useState(0);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeModalCard, setActiveModalCard] = useState(null); // Estado para el modal de estadísticas

  // Hero Interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Bloquear scroll si el modal está abierto
  useEffect(() => {
    if (activeModalCard) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeModalCard]);

  // Filtering
  const filteredCards = cardData.filter(c => {
    const matchesGen = activeGen === 'Todas' || c.gen === activeGen;
    const matchesType = activeType === 'Todos' || c.type === activeType;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGen && matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-zinc-700 selection:text-white">
      
      {/* CSS Utilities Inject */}
      <style dangerouslySetInnerHTML={{__html: `
        .preserve-3d { transform-style: preserve-3d; }
        .hero-float { animation: float 6s ease-in-out infinite; }
        @keyframes float {
          0% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(-2deg); }
        }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          min-width: 200%;
          animation: marquee 25s linear infinite;
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}} />

      {/* TICKER DE ANUNCIOS SUPERIOR */}
      <div className="bg-blue-600 text-white py-2 w-full overflow-hidden border-b border-blue-500/30 font-bold text-xs tracking-wider">
        <div className="whitespace-nowrap animate-marquee flex items-center gap-12">
          <span className="flex items-center gap-2"><Zap size={14} /> ¡NUEVA EXPANSIÓN: SCARLET & VIOLET DISPONIBLE!</span>
          <span>•</span>
          <span>WORLDS 2026: TRANSMISIÓN EN VIVO ESTE FIN DE SEMANA</span>
          <span>•</span>
          <span className="flex items-center gap-2"><Shield size={14} /> DESCUBRE LAS ESTADÍSTICAS OCULTAS EN LA BÓVEDA</span>
          <span>•</span>
          <span>CARTAS CLÁSICAS AÑADIDAS AL CATÁLOGO</span>
          <span>•</span>
          <span className="flex items-center gap-2"><Zap size={14} /> ¡NUEVA EXPANSIÓN: SCARLET & VIOLET DISPONIBLE!</span>
        </div>
      </div>

      {/* DYNAMIC HERO SECTION (Web Official Style) */}
      <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden flex items-center bg-black">
        {heroSlides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentHero ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <div 
              className="absolute inset-0 scale-105 transition-transform duration-[10000ms]"
              style={{ background: slide.bgGradient }}
            />
            {/* Pokemon Artwork Watermark */}
            <img 
              src={slide.bgImage} 
              alt="" 
              className="absolute right-0 md:right-10 top-1/2 -translate-y-1/2 w-[700px] h-[700px] object-contain opacity-25 mix-blend-screen scale-125 blur-[1px] pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent w-full lg:w-2/3"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
          </div>
        ))}

        {/* Hero Content */}
        <div className="container mx-auto px-6 lg:px-16 relative z-20 h-full flex flex-col md:flex-row items-center justify-between pt-16">
          <div className="w-full md:w-1/2 flex flex-col items-start pt-10 md:pt-0">
            <div className="min-h-[250px] flex flex-col justify-center">
              <span className={`text-sm md:text-base font-bold tracking-[0.2em] mb-4 ${heroSlides[currentHero].accent} transition-colors duration-500`}>
                {heroSlides[currentHero].subtitle}
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter" style={{ fontFamily: 'Impact, sans-serif' }}>
                {heroSlides[currentHero].title}
              </h1>
              <div>
                <button 
                  onClick={() => document.getElementById('boveda-grid').scrollIntoView({ behavior: 'smooth' })}
                  className={`px-8 py-4 rounded-full text-white font-bold tracking-wide flex items-center gap-2 transition-all duration-300 hover:scale-105 ${heroSlides[currentHero].buttonColor} ${heroSlides[currentHero].glow}`}
                >
                  <PlayCircle size={18} /> VER EXPANSIÓN <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 h-full flex items-center justify-center md:justify-end relative mt-10 md:mt-0">
             {heroSlides.map((slide, index) => (
                <div 
                  key={slide.id}
                  className={`absolute transition-all duration-1000 ease-in-out ${index === currentHero ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-90 translate-x-20 pointer-events-none'}`}
                >
                  <div className={`w-[280px] md:w-[350px] aspect-[63/88] rounded-[4.5%] hero-float ${slide.glow}`}>
                    <img src={slide.cardImage} alt="Featured Card" className="w-full h-full object-cover rounded-[4.5%] shadow-2xl" />
                  </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* ABOUT THIS VAULT SECTION */}
      <section className="bg-[#0a0a0a] border-b border-white/5 py-12 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles size={24} className="text-blue-500" />
              Acerca de la Bóveda
            </h2>
            <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
              Bienvenido al archivo definitivo de Pokémon TCG. Esta bóveda digital interactiva está diseñada para preservar y exhibir las cartas más emblemáticas de todas las generaciones. Disfruta de modelos holográficos en 3D, metadatos y estadísticas detalladas al dar clic en cada carta.
            </p>
          </div>
          <div className="flex gap-4 opacity-70">
             <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center rotate-3 hover:rotate-0 transition-all">
                <Shield size={28} className="text-zinc-500" />
             </div>
             <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center -rotate-3 hover:rotate-0 transition-all delay-75">
                <Search size={28} className="text-zinc-500" />
             </div>
          </div>
        </div>
      </section>

      {/* FILTERING SECTION (Flowbite Style Pills) */}
      <section id="boveda-grid" className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-xl border-y border-white/10 transition-all duration-300 shadow-2xl">
        <div className="container mx-auto px-6 py-4">
          
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
            <div className="flex items-center gap-3">
              <Filter size={20} className="text-blue-500" />
              <span className="font-bold text-white tracking-wide">Filtros de Búsqueda</span>
              {!isFiltersOpen && (activeGen !== 'Todas' || activeType !== 'Todos' || searchTerm) && (
                 <span className="ml-2 text-[10px] uppercase font-bold tracking-wider bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">
                   Filtros Activos
                 </span>
              )}
            </div>
            <button className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-full transition-colors border border-white/10">
              {isFiltersOpen ? <ChevronUp size={18} className="text-zinc-400" /> : <ChevronRight size={18} className="text-zinc-400 rotate-90" />}
            </button>
          </div>

          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isFiltersOpen ? 'max-h-[600px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="mb-6">
              <span className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-3 block">Generación</span>
              <div className="flex items-center gap-2 overflow-x-auto hide-scroll pb-2">
                {generations.map(gen => (
                  <button
                    key={gen}
                    onClick={() => setActiveGen(gen)}
                    className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      activeGen === gen 
                        ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                        : 'bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-white/5'
                    }`}
                  >
                    {gen}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
              <div className="w-full lg:w-auto overflow-hidden">
                <span className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-3 block">Tipo</span>
                <div className="flex items-center gap-2 overflow-x-auto hide-scroll pb-2">
                  {types.map(type => (
                    <button
                      key={type}
                      onClick={() => setActiveType(type)}
                      className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                        activeType === type 
                          ? 'bg-zinc-200 text-black shadow-md' 
                          : 'bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 border border-white/5'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative w-full lg:w-80 shrink-0">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input 
                  type="text"
                  placeholder="Buscar Pokémon..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-zinc-900/80 border border-white/10 text-white text-sm rounded-full pl-12 pr-4 py-3 outline-none focus:border-blue-500 focus:bg-zinc-800 transition-all placeholder:text-zinc-600"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* VAULT GRID SECTION */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6">
          <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Shield size={24} className="text-blue-500" />
              Bóveda de Cartas
            </h2>
            <span className="text-sm text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full">{filteredCards.length} Resultados</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-24 gap-x-6">
            {filteredCards.length > 0 ? (
              filteredCards.map((card) => (
                <div key={card.id} className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                  <TCGCard card={card} onClick={setActiveModalCard} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-32 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                   <Info size={32} className="text-zinc-600" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Bóveda Vacía</h3>
                <p className="text-zinc-500">No se encontraron cartas con la combinación de filtros seleccionada.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MODAL DE ESTADÍSTICAS (SE ABRE AL CLIC EN CUALQUIER CARTA) */}
      {activeModalCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveModalCard(null)} />
          <div className="relative z-10 flex flex-col md:flex-row bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full animate-[modalSlideUp_0.3s_ease-out]">
            <button 
              onClick={() => setActiveModalCard(null)}
              className="absolute top-4 right-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full p-2 transition-colors z-20"
            >
              <X size={20} />
            </button>
            
            <div className="w-full md:w-1/2 p-8 bg-black flex items-center justify-center">
              <img 
                src={activeModalCard.image} 
                alt={activeModalCard.name} 
                className="w-full max-w-xs object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] hero-float" 
              />
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-zinc-900 to-black">
              <div className="mb-2">
                <span className="text-blue-400 font-semibold tracking-wider text-xs uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                  {activeModalCard.gen}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">
                {activeModalCard.name}
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3.5 bg-zinc-900/80 rounded-xl border border-white/5">
                  <span className="text-zinc-400 text-sm">Puntos de Salud (HP)</span>
                  <span className="text-lg font-bold text-white font-mono">{activeModalCard.hp}</span>
                </div>
                <div className="flex justify-between items-center p-3.5 bg-zinc-900/80 rounded-xl border border-white/5">
                  <span className="text-zinc-400 text-sm">Tipo Elemental</span>
                  <span className="text-base font-bold text-blue-400">{activeModalCard.type}</span>
                </div>
                <div className="flex justify-between items-center p-3.5 bg-zinc-900/80 rounded-xl border border-white/5">
                  <span className="text-zinc-400 text-sm">Rareza</span>
                  <span className="text-sm font-bold text-amber-400">{activeModalCard.rarity}</span>
                </div>
                <div className="flex justify-between items-center p-3.5 bg-zinc-900/80 rounded-xl border border-white/5">
                  <span className="text-zinc-400 text-sm">Ilustrador Oficial</span>
                  <span className="text-sm font-medium text-zinc-200">{activeModalCard.artist}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-[#020202] py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles size={20} className="text-blue-500" />
            <span className="font-black text-2xl tracking-tighter text-white">TCG<span className="text-zinc-600">Vault</span></span>
          </div>
          <p className="text-zinc-600 text-sm max-w-md mx-auto">
             Plataforma interactiva para el descubrimiento de Pokémon TCG. Las imágenes y datos expuestos pertenecen a The Pokémon Company[cite: 21]. Proyecto de UI/UX.
          </p>
        </div>
      </footer>
    </div>
  );
}