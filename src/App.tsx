import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Music, Music2, VolumeX, Gift, Heart, Sparkles } from 'lucide-react';

const MUSIC_URL = 'https://cdn.pixabay.com/audio/2022/03/24/audio_32b210b372.mp3'; // Happy acoustic track

export default function App() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { width, height } = useWindowSize();

  const handleOpen = () => {
    setStep(1);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
    setTimeout(() => {
      setStep(2);
    }, 2000);
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center overflow-hidden font-sans relative">
      <audio ref={audioRef} src={MUSIC_URL} loop />
      
      {/* Music Toggle */}
      <button 
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all"
      >
        {isPlaying ? <Music2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
      </button>

      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * -500],
              opacity: [0.2, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="envelope-closed"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            className="relative cursor-pointer group"
            onClick={handleOpen}
          >
            <div className="w-80 h-56 bg-red-800 rounded-lg shadow-2xl relative flex items-center justify-center overflow-hidden">
              {/* Envelope Flap */}
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="w-0 h-0 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-t-[120px] border-t-red-900 absolute top-0 z-20 transition-transform duration-500 group-hover:-translate-y-2"></div>
                <div className="w-0 h-0 border-l-[160px] border-l-red-700 border-r-[160px] border-r-red-700 border-b-[120px] border-b-red-600 absolute bottom-0 z-10"></div>
              </div>
              
              {/* Seal */}
              <div className="absolute z-30 w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <Heart className="text-red-900 w-8 h-8 fill-current" />
              </div>
            </div>
            <motion.p 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-white text-center mt-8 text-xl font-medium tracking-wider"
            >
              Ada Surat Untukmu...
              <br />
              <span className="text-sm text-pink-300">(Klik untuk membuka)</span>
            </motion.p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="envelope-opening"
            className="relative w-80 h-56"
          >
            <div className="w-full h-full bg-red-800 rounded-lg shadow-2xl relative">
              {/* Flap Opening */}
              <motion.div 
                initial={{ rotateX: 0 }}
                animate={{ rotateX: 180 }}
                transition={{ duration: 1 }}
                style={{ transformOrigin: 'top' }}
                className="w-0 h-0 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-t-[120px] border-t-red-900 absolute top-0 z-20"
              />
              <div className="w-0 h-0 border-l-[160px] border-l-red-700 border-r-[160px] border-r-red-700 border-b-[120px] border-b-red-600 absolute bottom-0 z-10"></div>
              
              {/* Paper emerging */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: -150 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute top-4 left-4 right-4 bottom-4 bg-amber-50 rounded shadow-inner z-15"
              />
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <PaperCard key="wishes" onNext={nextStep}>
            <div className="space-y-6 text-center">
              <h2 className="text-3xl font-bold text-red-800 font-serif">Selamat Ulang Tahun! 🎉</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>
                  Hari ini adalah hari yang sangat spesial. Hari dimana seseorang yang luar biasa lahir ke dunia ini.
                </p>
                <p>
                  Semoga di umur yang baru ini, semua impianmu perlahan terwujud, senyummu makin bersinar, dan kebahagiaan selalu menyertai setiap langkahmu.
                </p>
                <p className="font-medium text-pink-600">
                  Terima kasih sudah menjadi bagian dari cerita indah di hidup ini.
                </p>
              </div>
            </div>
          </PaperCard>
        )}

        {step === 3 && (
          <PaperCard key="poem" onNext={nextStep}>
             <div className="space-y-8 text-center flex flex-col h-full justify-center">
              <h2 className="text-2xl font-bold text-indigo-800 font-serif mb-4 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" /> Sebuah Puisi Untukmu <Sparkles className="w-5 h-5" />
              </h2>
              <div className="italic text-gray-800 space-y-4 font-serif text-lg">
                <p>Seperti mentari yang menyapa pagi,</p>
                <p>Hadirmu selalu membawa arti.</p>
                <p>Dalam tawa maupun sunyi,</p>
                <p>Kau adalah pelita yang tak pernah mati.</p>
                <br/>
                <p>Bertambah usiamu hari ini,</p>
                <p>Semoga berkah selalu menyertai.</p>
                <p>Teruslah melangkah dengan berani,</p>
                <p>Meraih mimpi yang kau cari.</p>
              </div>
            </div>
          </PaperCard>
        )}

        {step === 4 && (
          <PhotosCard key="photos" onNext={nextStep} />
        )}

        {step === 5 && (
          <SurpriseCard key="surprise" />
        )}

      </AnimatePresence>
    </div>
  );
}

function PaperCard({ children, onNext }: { children: React.ReactNode, onNext: () => void }) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0, rotate: -5 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      exit={{ y: -100, opacity: 0, rotate: 5 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-[#fdfbf7] w-[90%] max-w-md aspect-[3/4] p-8 rounded-sm shadow-2xl relative"
      style={{
        backgroundImage: 'linear-gradient(transparent 95%, #e5e5e5 95%)',
        backgroundSize: '100% 2rem',
        boxShadow: '2px 4px 15px rgba(0,0,0,0.1), inset 0 0 40px rgba(0,0,0,0.05)'
      }}
    >
      <div className="h-full flex flex-col">
        <div className="flex-grow">
          {children}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onNext}
            className="px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors shadow-md flex items-center gap-2 font-medium"
          >
            Lanjut <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity }}>→</motion.span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function PhotosCard({ onNext }: { onNext: () => void }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const photos = [
    '/memory1.jpg',
    '/memory2.jpg',
    '/memory3.jpg'
  ];
  
  const captions = [
    "Tawa yang tak pernah pudar...",
    "Petualangan yang kita lalui bersama...",
    "Dan momen hangat yang tak tergantikan."
  ];

  const handleNextPhoto = () => {
    if (photoIndex < photos.length - 1) {
      setPhotoIndex(photoIndex + 1);
    } else {
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.2, opacity: 0 }}
      className="bg-white w-[90%] max-w-md p-4 pb-16 rounded-sm shadow-2xl relative"
      style={{
        boxShadow: '2px 4px 15px rgba(0,0,0,0.2)'
      }}
    >
      <div className="text-center mb-4 font-serif text-xl text-gray-800">Kenangan Kita</div>
      
      <div className="relative aspect-square w-full bg-gray-100 mb-6 overflow-hidden border-4 border-white shadow-inner">
        <AnimatePresence mode="wait">
          <motion.img
            key={photoIndex}
            src={photos[photoIndex]}
            initial={{ opacity: 0, x: 50, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -50, rotate: -5 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full object-cover"
            alt={`Memory ${photoIndex + 1}`}
          />
        </AnimatePresence>
      </div>
      
      <div className="h-16 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={photoIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center font-serif text-lg text-gray-700 italic"
          >
            {captions[photoIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 right-4">
        <button
          onClick={handleNextPhoto}
          className="px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors shadow-md flex items-center gap-2 text-sm"
        >
          {photoIndex < photos.length - 1 ? 'Foto Selanjutnya' : 'Kejutan!'}
        </button>
      </div>
    </motion.div>
  );
}

function SurpriseCard() {
  const { width, height } = useWindowSize();
  
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", damping: 12, stiffness: 100 }}
      className="relative z-10 bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl text-center max-w-lg w-[90%]"
    >
      <Confetti
        width={width}
        height={height}
        recycle={true}
        numberOfPieces={200}
        gravity={0.15}
      />
      
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2 
        }}
        className="mx-auto w-32 h-32 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl mb-8"
      >
        <Gift className="w-16 h-16 text-white" />
      </motion.div>

      <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 mb-6 drop-shadow-sm">
        HAPPY BIRTHDAY!
      </h1>
      
      <p className="text-xl text-white/90 font-medium leading-relaxed mb-8">
        Semoga hari ini menjadi awal dari tahun yang penuh dengan keajaiban, cinta, dan tawa yang tak ada habisnya.
      </p>

      <motion.div 
        className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 rounded-full text-white font-semibold backdrop-blur-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Heart className="w-5 h-5 text-pink-400 fill-current" />
        We Love You!
        <Heart className="w-5 h-5 text-pink-400 fill-current" />
      </motion.div>
    </motion.div>
  );
}
