import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  Video, 
  Shield, 
  Clock, 
  Smile, 
  ArrowRight, 
  ChevronRight, 
  Heart, 
  User, 
  Lock, 
  Star,
  CheckCircle2,
  Menu,
  X,
  CreditCard,
  BookOpen,
  Camera,
  Send,
  Share2,
  Landmark,
  QrCode,
  Wallet,
  Phone,
  Sparkles,
  Bot,
  RefreshCcw,
  ExternalLink,
  Eye,
  EyeOff,
  Mail,
  Key,
  Check,
  AlertCircle
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Navbar = ({ 
  onStart, 
  currentUser, 
  onAuth, 
  onLogout 
}: { 
  onStart: () => void, 
  currentUser: any, 
  onAuth: (mode: 'login' | 'register') => void, 
  onLogout: () => void 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      scrolled ? "bg-white/80 backdrop-blur-md border-bottom border-gray-100 py-3 shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between font-sans">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">EMOVA</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Fitur", "Psikolog", "Harga", "Testimoni", "Artikel"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors">
              {item}
            </a>
          ))}
          {currentUser ? (
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-purple-600">
                Halo, {currentUser.name}! 🤍
              </span>
              <button 
                onClick={onStart}
                className="px-5 py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-full hover:bg-purple-700 transition-all shadow-lg shadow-purple-200"
              >
                Konsultasi 🚀
              </button>
              <button 
                onClick={onLogout}
                className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onAuth('login')}
                className="text-sm font-bold text-purple-600 hover:text-purple-800 transition-colors"
              >
                Masuk ✨
              </button>
              <button 
                onClick={onStart}
                className="px-5 py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-full hover:bg-purple-700 transition-all shadow-lg shadow-purple-200"
              >
                Mulai Ceritamu
              </button>
            </div>
          )}
        </div>

        <button className="md:hidden text-gray-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 md:hidden shadow-xl"
          >
            <div className="flex flex-col gap-4 font-sans">
              {["Fitur", "Psikolog", "Harga", "Testimoni", "Artikel"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-800">
                  {item}
                </a>
              ))}
              {currentUser ? (
                <>
                  <div className="text-sm font-bold text-purple-600 py-1">
                    Halo, {currentUser.name}! 🤍
                  </div>
                  <button 
                    onClick={() => { setIsOpen(false); onStart(); }}
                    className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold"
                  >
                    Konsultasi 🚀
                  </button>
                  <button 
                    onClick={() => { setIsOpen(false); onLogout(); }}
                    className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-bold border border-red-100"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => { setIsOpen(false); onAuth('login'); }}
                    className="w-full py-3 bg-purple-50 text-purple-700 rounded-xl font-bold"
                  >
                    Masuk ✨
                  </button>
                  <button 
                    onClick={() => { setIsOpen(false); onStart(); }}
                    className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold"
                  >
                    Mulai Ceritamu
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ children, subtitle, center = true }: { children: React.ReactNode, subtitle?: string, center?: boolean }) => (
  <div className={cn("mb-16", center ? "text-center" : "text-left")}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const ChatBubble = ({ message, time, isBot }: { message: string, time: string, isBot?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9, x: isBot ? -20 : 20 }}
    whileInView={{ opacity: 1, scale: 1, x: 0 }}
    className={cn(
      "max-w-[80%] rounded-2xl px-4 py-3 mb-3 shadow-sm",
      isBot ? "bg-white text-gray-800 self-start border border-gray-100" : "bg-purple-600 text-white self-end"
    )}
  >
    <p className="text-sm md:text-base leading-relaxed">{message}</p>
    <span className={cn("text-[10px] block mt-1 opacity-70 text-right")}>{time}</span>
  </motion.div>
);

const FeatureCard = ({ icon: Icon, title, description, color }: { icon: any, title: string, description: string, color: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
  >
    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", color)}>
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

// --- Main App ---

const PaymentModal = ({ plan, onConfirm, onCancel }: { plan: any, onConfirm: () => void, onCancel: () => void }) => {
  const [step, setStep] = useState<'checkout' | 'success'>('checkout');
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const paymentMethods = [
    { id: 'bank', name: 'Transfer Bank', sub: 'BCA, Mandiri, BNI, BRI', icon: Landmark },
    { id: 'qris', name: 'QRIS', sub: 'Dana, OVO, ShopeePay', icon: QrCode },
    { id: 'ewallet', name: 'E-Wallet', sub: 'GoPay, OVO, ShopeePay', icon: Wallet },
  ];

  const handleConfirm = () => {
    if (!selectedMethod) return;
    setStep('success');
    setTimeout(() => {
      onConfirm();
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-[40px] w-full max-w-lg p-8 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-purple-500 via-pink-400 to-blue-400"></div>
        <button onClick={onCancel} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-20"><X /></button>
        
        <AnimatePresence mode="wait">
          {step === 'checkout' && (
            <motion.div 
              key="checkout"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col overflow-y-auto pr-2 custom-scrollbar"
            >
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Checkout</h3>
                <p className="text-gray-500">Selesaikan pembayaran untuk mulai curhat</p>
              </div>

              {/* Detail Pesanan */}
              <div className="bg-purple-50/50 rounded-3xl p-6 mb-8 border border-purple-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-purple-600 shadow-sm">
                    <plan.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] text-purple-600 uppercase font-bold tracking-widest">Detail Paket</p>
                    <p className="font-bold text-gray-900 leading-none">{plan.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{plan.basePrice}</p>
                </div>
              </div>

              {/* Metode Pembayaran */}
              <div className="mb-8">
                <p className="text-sm font-bold text-gray-900 mb-4 px-1">Pilih Metode Pembayaran</p>
                <div className="space-y-3">
                  {paymentMethods.map((m) => (
                    <button 
                      key={m.id}
                      onClick={() => setSelectedMethod(m.id)}
                      className={cn(
                        "w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all text-left group",
                        selectedMethod === m.id 
                          ? "border-purple-600 bg-purple-50/50 shadow-sm" 
                          : "border-gray-50 hover:border-purple-100"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                        selectedMethod === m.id ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-400"
                      )}>
                        <m.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-sm">{m.name}</p>
                        <p className="text-[9px] text-gray-400 font-medium">{m.sub}</p>
                      </div>
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                        selectedMethod === m.id ? "border-purple-600 bg-purple-600" : "border-gray-200"
                      )}>
                        {selectedMethod === m.id && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100 bg-white sticky bottom-0">
                <button 
                  disabled={!selectedMethod}
                  onClick={handleConfirm}
                  className={cn(
                    "w-full py-5 rounded-[24px] font-bold transition-all shadow-xl shadow-purple-100 flex items-center justify-center gap-2",
                    selectedMethod ? "bg-purple-600 text-white hover:bg-purple-700 hover:scale-[1.02]" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  )}
                >
                  Bayar Sekarang <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-center text-[9px] text-gray-400 mt-4 font-medium uppercase tracking-[0.2em]">Enkripsi Keamanan 256-bit</p>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center py-12"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 relative">
                 <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 10 }}
                  className="bg-green-500 w-20 h-20 rounded-full flex items-center justify-center text-white"
                 >
                    <CheckCircle2 className="w-10 h-10" />
                 </motion.div>
                 <div className="absolute inset-x-0 -bottom-1 text-[10px] font-bold text-green-600 uppercase bg-green-50 px-3 py-1 rounded-full border border-green-200">
                    Selesai
                 </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful ✅</h3>
              <p className="text-gray-500 max-w-sm mb-8">
                {plan.type === 'Video Call' 
                  ? "Keren! Pembayaranmu sudah kami terima. Klik tombol di halaman berikutnya buat terhubung langsung ke psikolog via WhatsApp."
                  : "Keren! Pembayaranmu sudah kami terima. Kamu akan segera dialihkan ke ruang curhat."
                }
              </p>
              <div className="flex items-center gap-2 text-purple-600 font-bold">
                 <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                 {plan.type === 'Video Call' ? "Menyiapkan konfirmasi..." : "Menyiapkan ruangan..."}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const PricingView = ({ onSelect, onBack }: { onSelect: (plan: any) => void, onBack: () => void }) => {
  const plans = [
    { type: "Chat Session", basePrice: "Rp20.000", desc: "Curhatan kilat via chat yang ramah dan fleksibel.", icon: MessageCircle, color: "border-blue-100" },
    { type: "Video Call", basePrice: "Rp50.000", desc: "Interaksi mendalam 1-on-1 dengan psikolog profesional.", icon: Video, color: "border-purple-200 shadow-xl shadow-purple-100 bg-white", featured: true },
    { type: "Premium Monthly Subscription", basePrice: "Rp150.000 / bln", desc: "Access daily mood tracking, self-healing guidance, priority consultations, and other exclusive features.", icon: CreditCard, color: "border-pink-100" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-purple-50/30 py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <button onClick={onBack} className="mb-12 flex items-center gap-2 text-gray-500 font-bold hover:text-purple-600 transition-colors">
           <ArrowRight className="w-5 h-5 rotate-180" /> Kembali ke Beranda
        </button>
        
        <SectionHeading subtitle="Pilih paket yang paling nyaman buat kamu hari ini.">
          Pilih <span className="text-purple-600">Jalan Healingmu</span>
        </SectionHeading>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={cn(
                "rounded-[40px] border p-10 transition-all flex flex-col cursor-pointer hover:scale-[1.02] active:scale-95", 
                plan.color,
                plan.featured ? "ring-2 ring-purple-600/10" : ""
              )}
              onClick={() => onSelect(plan)}
            >
              {plan.featured && <span className="bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-6 uppercase tracking-wider">Paling Recomen</span>}
              <div className="mb-6">
                 <plan.icon className={cn("w-12 h-12 mb-4", plan.featured ? "text-purple-600" : "text-gray-400")} />
                 <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.type}</h3>
                 <p className="text-sm text-gray-500 leading-relaxed">{plan.desc}</p>
              </div>
              <div className="mt-auto">
                <div className="text-3xl font-bold text-gray-900 mb-8">{plan.basePrice}</div>
                <button className={cn(
                  "w-full py-4 rounded-2xl font-bold transition-all",
                  plan.featured ? "bg-purple-600 text-white shadow-lg" : "bg-gray-900 text-white"
                )}>
                  Pilih & Bayar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const PsychologistSelectionView = ({ psychologists, onSelect, onBack }: { psychologists: any[], onSelect: (psy: any) => void, onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full"
      >
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600 mb-8 flex items-center gap-2 group">
          <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" /> Kembali
        </button>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Pilih <span className="text-purple-600">Psikologmu</span></h2>
          <p className="text-gray-500 text-lg">Pilih ahli yang paling pas buat nemenin sesi video call kamu.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {psychologists.map((psy) => (
            <motion.div 
              key={psy.id}
              whileHover={{ y: -5 }}
              onClick={() => onSelect(psy)}
              className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-6 mb-6">
                <div className="relative">
                  <img src={psy.avatar} className="w-20 h-20 rounded-3xl bg-purple-50 object-cover" alt={psy.name} />
                  <div className={cn("absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white", psy.isOnline ? "bg-green-500" : "bg-gray-300")} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xl font-bold text-gray-900">{psy.name}</h4>
                    <div className="flex items-center text-sm font-bold text-yellow-500">
                      <Star className="w-4 h-4 fill-current mr-1" /> {psy.rating}
                    </div>
                  </div>
                  <p className="text-purple-600 text-sm font-medium">{psy.specialization}</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                {psy.bio}
              </p>
              <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold group-hover:bg-purple-600 transition-colors">
                Pilih Psikolog Ini
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const PaymentConfirmationView = ({ onBack, selectedPsy }: { onBack: () => void, selectedPsy?: any }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 relative">
           <div className="bg-green-500 w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-200">
              <CheckCircle2 className="w-10 h-10" />
           </div>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Payment Successful ✅</h2>
        <p className="text-gray-500 mb-10 text-lg leading-relaxed">
          Pembayaran kamu sudah terverifikasi! Sekarang saatnya terhubung langsung dengan <span className="font-bold text-purple-600">{selectedPsy?.name || 'psikologmu'}</span> via <span className="font-bold text-green-600">WhatsApp</span> untuk memulai sesi Video Call.
        </p>

        <a 
          href={`https://wa.me/6283134820924?text=Halo%20EMOVA%2C%20saya%20sudah%20memilih%20${encodeURIComponent(selectedPsy?.name || 'psikolog')}%20dan%20ingin%20memulai%20sesi%20video%20call%20saya%20setelah%20pembayaran%20berhasil.`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full py-5 bg-[#25D366] text-white rounded-[32px] font-bold shadow-2xl shadow-green-200 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 text-xl mb-8 group"
        >
          <Phone className="w-6 h-6 fill-current group-hover:rotate-12 transition-transform" /> Hubungi via WhatsApp
        </a>

        <button 
          onClick={onBack}
          className="text-gray-400 font-bold hover:text-purple-600 transition-colors flex items-center justify-center gap-2 mx-auto"
        >
          <ArrowRight className="w-4 h-4 rotate-180" /> Kembali ke Beranda
        </button>
      </motion.div>
    </div>
  );
};

const ArticleDetailView = ({ 
  article, 
  onBack, 
  currentUser, 
  onStart, 
  onAuth, 
  onLogout 
}: { 
  article: any, 
  onBack: () => void, 
  currentUser: any, 
  onStart: () => void, 
  onAuth: (mode: 'login' | 'register') => void, 
  onLogout: () => void 
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white font-sans"
    >
      <Navbar onStart={onStart} currentUser={currentUser} onAuth={onAuth} onLogout={onLogout} />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 font-bold hover:text-purple-600 transition-colors mb-8 group"
          >
            <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" /> Kembali ke Artikel
          </button>

          <header className="mb-12">
            <span className={cn("inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6", article.color)}>
              {article.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-8">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-500 font-medium">
              <div className="flex -space-x-2">
                {[1, 2].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-purple-100 flex items-center justify-center text-[10px] font-bold text-purple-600">
                    {i === 1 ? 'ES' : 'MA'}
                  </div>
                ))}
              </div>
              <span className="text-sm">Ditulis oleh Tim Psikolog EMOVA</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className="text-sm">5 min read</span>
            </div>
          </header>

          <div className="aspect-[16/9] rounded-[48px] overflow-hidden mb-12 shadow-2xl relative">
            <img 
              src={article.img} 
              className="w-full h-full object-cover" 
              alt={article.title} 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
          </div>

          <article className="prose prose-purple max-w-none">
            <p className="text-xl text-gray-600 leading-relaxed font-serif italic mb-10 border-l-4 border-purple-500 pl-6">
              {article.desc}
            </p>
            
            <div className="space-y-8 text-lg text-gray-700 leading-relaxed font-sans">
              {article.content.map((paragraph: string, i: number) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-16 p-8 bg-purple-50 rounded-[40px] border border-purple-100 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Butuh bantuan lebih mendalam?</h4>
                <p className="text-gray-500">Psikolog kami siap dengerin ceritamu kapanpun kamu siap.</p>
              </div>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-4 bg-purple-600 text-white rounded-2xl font-bold whitespace-nowrap hover:scale-105 transition-all shadow-lg shadow-purple-200"
              >
                Mulai Konsultasi
              </button>
            </div>
          </article>
        </div>
      </div>
    </motion.div>
  );
};

const PsychologistDetailView = ({ 
  psy, 
  onBack, 
  onChat, 
  onVideo, 
  isPaid,
  currentUser,
  onStart,
  onAuth,
  onLogout
}: { 
  psy: any, 
  onBack: () => void, 
  onChat: () => void, 
  onVideo: () => void, 
  isPaid: boolean,
  currentUser: any,
  onStart: () => void,
  onAuth: (mode: 'login' | 'register') => void,
  onLogout: () => void
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white font-sans"
    >
      <Navbar onStart={onStart} currentUser={currentUser} onAuth={onAuth} onLogout={onLogout} />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 font-bold hover:text-purple-600 transition-colors mb-8 group"
          >
            <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" /> Kembali
          </button>

          <div className="bg-white rounded-[48px] border border-gray-100 shadow-2xl shadow-purple-100/20 overflow-hidden">
            {/* Header / Cover */}
            <div className="h-48 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 relative">
              <div className="absolute -bottom-16 left-12">
                <div className="relative">
                  <img 
                    src={psy.avatar} 
                    className="w-32 h-32 rounded-[32px] border-8 border-white object-cover bg-white shadow-xl" 
                    alt={psy.name} 
                  />
                  <div className={cn("absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-white", psy.isOnline ? "bg-green-500" : "bg-gray-300")} />
                </div>
              </div>
            </div>

            <div className="pt-20 px-12 pb-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{psy.name}</h1>
                    <div className="flex items-center px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-bold">
                      <Star className="w-3 h-3 fill-current mr-1" /> {psy.rating}
                    </div>
                  </div>
                  <p className="text-purple-600 font-bold text-lg">{psy.specialization}</p>
                </div>
                
                <div className="flex gap-3">
                  {isPaid ? (
                    <>
                      <a 
                        href={`https://wa.me/${psy.phone}?text=${encodeURIComponent(`Halo ${psy.name}, saya ingin memulai sesi Chat via EMOVA.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 md:flex-none px-8 py-4 bg-purple-50 text-purple-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-purple-100 transition-all shadow-sm"
                      >
                        <MessageCircle className="w-5 h-5" /> Chat via WhatsApp
                      </a>
                      <a 
                        href={`https://wa.me/${psy.phone}?text=${encodeURIComponent(`Halo ${psy.name}, saya ingin memulai sesi Video Call via EMOVA.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 md:flex-none px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg"
                      >
                        <Video className="w-5 h-5" /> Video Call via WhatsApp
                      </a>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={onChat}
                        className="flex-1 md:flex-none px-8 py-4 bg-purple-50 text-purple-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-purple-100 transition-all shadow-sm group"
                      >
                        <Lock className="w-4 h-4 text-purple-400 group-hover:text-purple-600" /> Unlock Chat
                      </button>
                      <button 
                        onClick={onVideo}
                        className="flex-1 md:flex-none px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg"
                      >
                        <Lock className="w-4 h-4 text-gray-400" /> Unlock Video
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-8">
                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Tentang Saya</h3>
                    <p className="text-gray-500 leading-relaxed text-lg">
                      {psy.bio}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Pengalaman & Spesialisasi</h3>
                    <div className="flex flex-wrap gap-2">
                      {(psy.suggestions || []).map((s: string, i: number) => (
                        <span key={i} className="px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-sm font-medium border border-gray-100">
                          {s}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-purple-50 rounded-3xl border border-purple-100">
                    <h4 className="font-bold text-purple-900 mb-4 flex items-center gap-2">
                      <Shield className="w-4 h-4" /> Informasi Sesi
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm text-purple-700 font-medium">
                        <CheckCircle2 className="w-4 h-4" /> 100% Anonim & Rahasia
                      </li>
                      <li className="flex items-center gap-3 text-sm text-purple-700 font-medium">
                        <Clock className="w-4 h-4" /> Respon Cepat 24/7
                      </li>
                      <li className="flex items-center gap-3 text-sm text-purple-700 font-medium">
                        <Heart className="w-4 h-4" /> Pendekatan Tanpa Judgement
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-2">Status Saat Ini</h4>
                    <div className="flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full", psy.isOnline ? "bg-green-500 animate-pulse" : "bg-gray-300")} />
                      <span className="text-sm font-medium text-gray-600">{psy.isOnline ? 'Tersedia Sekarang' : 'Sedang Sibuk'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AIChatView = ({ onBack, psychologists, articles, onLimitReached }: { onBack: () => void, psychologists: any[], articles: any[], onLimitReached: () => void }) => {
  const [messages, setMessages] = useState([
    { id: '1', isBot: true, message: "Halo! Aku EMOVA AI. 😊 Kamu gapapa? Lagi ngerasa capek banget ya hari ini? Tenang aja, kamu gak sendirian kok 🤍. Mau cerita pelan-pelan aja?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (limitReached) {
      const timer = setTimeout(() => {
        onLimitReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [limitReached, onLimitReached]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading || limitReached) return;

    const currentCount = questionCount + 1;
    setQuestionCount(currentCount);

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newUserMsg = { id: Date.now().toString(), isBot: false, message: text, time };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');

    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.isBot ? "model" as const : "user" as const,
        parts: [{ text: m.message }]
      }));

      const systemInstruction = `Anda adalah EMOVA AI, teman curhat Gen Z yang sangat asik, hangat, dan to-the-point.
      
      GAYA BAHASA & ATURAN RESPON:
      - Respon HARUS SINGKAT dan natural (gak boleh panjang lebar/deskriptif kecuali diminta).
      - Kayak lagi chatting sama temen deket (pake 'aku' dan 'kamu').
      - Contoh: "Kamu gapapa?", "Mau cerita pelan-pelan aja 🤍", "Aku dengerin kok", "Kayaknya kamu lagi capek ya?", "Semangat ya, aku di sini buat kamu ✨".
      - Jangan pake bahasa yang kaku atau kayak ensiklopedia.
      - Pakai emoji yang hangat tapi gak berlebihan (🤍, 😊, ✨).

      TANGGUNG JAWAB:
      - Dengerin curhatan pengguna dengan empati.
      - Kasih motivasi singkat yang ngena.
      - Rekomendasikan psikolog atau artikel EMOVA cuma kalo emang beneran butuh/nyambung.

      DATA PSIKOLOG:
      ${psychologists.map(p => `- ${p.name} (${p.specialization})`).join('\n')}
      
      DATA ARTIKEL:
      ${articles.map(a => `- ${a.title}`).join('\n')}

      Kalo keadaan pengguna darurat/krisis parah, saranin hubungi psikolog sekarang juga di fitur 'Psikolog'.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...history, { role: "user", parts: [{ text }] }],
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const aiResponse = response.text || "Maaf, sepertinya aku sedang mengalami gangguan teknis. Bisa ulangi lagi?";
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        isBot: true,
        message: aiResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);

      if (currentCount >= 5) {
        setTimeout(() => {
          setLimitReached(true);
          setMessages(prev => [...prev, {
            id: 'limit-msg',
            isBot: true,
            message: "Biar berceritamu makin nyaman dan lega, yuk lanjut konsultasi bareng psikolog 🤍",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        }, 2000);
      }
    } catch (error) {
      console.error("AI Chat Error:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        isBot: true,
        message: "Aduh, koneksiku terputus sejenak. Tapi aku tetap di sini buat kamu. Bisa coba tanya lagi?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[60] bg-white flex flex-col md:flex-row h-screen"
    >
      {/* Sidebar - Quick info & Back */}
      <div className="w-full md:w-80 bg-purple-50 p-8 flex flex-col border-r border-purple-100 shrink-0">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-purple-600 font-bold hover:gap-3 transition-all mb-12"
        >
          <ArrowRight className="w-5 h-5 rotate-180" /> Kembali ke Home
        </button>

        <div className="flex-1">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-purple-600 shadow-xl mb-6">
            <Bot className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">EMOVA <span className="text-purple-600">AI</span></h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            Teman bercerita yang siap dengerin kamu 24/7. Bebas cerita apa saja, kapan saja.
          </p>

          <div className="space-y-4">
            {[
              { icon: Shield, text: "100% Rahasia & Anonim" },
              { icon: Sparkles, text: "Motivasi Setiap Hari" },
              { icon: RefreshCcw, text: "Respon Kilat Tanpa Antre" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-medium text-gray-600 bg-white/50 p-4 rounded-2xl border border-white">
                <item.icon className="w-4 h-4 text-purple-600" />
                {item.text}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 p-6 bg-purple-100 rounded-3xl border border-purple-200">
          <p className="text-[10px] uppercase font-bold text-purple-800 tracking-wider mb-2">Penting</p>
          <p className="text-[10px] text-purple-600 leading-relaxed">
            AI Chatbot adalah asisten awal. Jika kamu merasa sangat terpuruk atau berkeinginan menyakiti diri sendiri, segera hubungi profesional di fitur "Psikolog".
          </p>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-gray-900">EMOVA AI Chat</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-gray-400">Online Sekarang</span>
              </div>
            </div>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50/50 flex flex-col custom-scrollbar"
        >
          {messages.map((msg) => (
            <ChatBubble 
              key={msg.id} 
              isBot={msg.isBot} 
              message={msg.message} 
              time={msg.time} 
            />
          ))}
          {isLoading && (
            <div className="flex bg-white rounded-2xl px-4 py-3 self-start border border-gray-100 gap-2 items-center">
              <div className="flex gap-1">
                <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
              </div>
              <span className="text-xs text-gray-400 font-medium">EMOVA AI sedang mengetik...</span>
            </div>
          )}
        </div>

        {!limitReached && (
          <div className="px-6 py-2 bg-white/80 border-t border-gray-50 flex justify-between items-center">
            <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Sesi Gratis</p>
            <p className="text-[10px] font-bold text-gray-400">{5 - questionCount} pertanyaan tersisa</p>
          </div>
        )}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
          className="p-6 bg-white border-t border-gray-100 flex gap-4"
        >
          <input 
            type="text" 
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            disabled={isLoading || limitReached}
            placeholder={limitReached ? "Sesi gratis berakhir 🤍" : "Ketik pesan kamu di sini..."}
            className="flex-1 px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-purple-200 outline-none transition-all disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="bg-purple-600 text-white px-8 rounded-2xl font-bold shadow-lg shadow-purple-100 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100"
          >
            {isLoading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            <span className="hidden md:inline">Kirim</span>
          </button>
        </form>
      </div>
    </motion.div>
  );
};

const AuthView = ({ onSuccess, onBack, initialMode = 'login' }: { onSuccess: (user: any) => void, onBack: () => void, initialMode?: 'login' | 'register' }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  // Validation rules
  const ruleLen = password.length >= 6;
  const ruleNum = /\d|[\W_]/.test(password);
  const ruleChar = /[A-Za-z]/.test(password);
  const ruleMatch = password === confirmPassword && confirmPassword !== '';

  const getLocalDB = () => {
    const saved = localStorage.getItem('emova_registered_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    const defaultDB = [
      { email: 'user@emova.com', username: 'emovauser', password: 'password123', name: 'Sahabat EMOVA' },
      { email: 'razizal123@gmail.com', username: 'razizal', password: 'password123', name: 'Razizal' }
    ];
    localStorage.setItem('emova_registered_users', JSON.stringify(defaultDB));
    return defaultDB;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Isi semua field dulu ya, bestie! 🤍');
      return;
    }
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      try {
        const db = getLocalDB();
        const found = db.find((u: any) => 
          (u.email.toLowerCase() === email.toLowerCase() || u.username.toLowerCase() === email.toLowerCase()) &&
          u.password === password
        );
        if (!found) {
          throw new Error('Username/Email atau password salah nih. Coba cek lagi ya 🥺');
        }
        setSuccess(`Halo ${found.name}! Kamu berhasil masuk ✨`);
        setTimeout(() => {
          onSuccess(found);
        }, 1000);
      } catch (err: any) {
        setError(err.message || 'Ada kesalahan sistem, coba lagi nanti ya!');
      } finally {
        setLoading(false);
      }
    }, 1200);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setError('Isi semua datamu dulu ya! ✨');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Format email kamu kurang pas nih 🥺');
      return;
    }
    if (!ruleLen || !ruleNum || !ruleChar) {
      setError('Password kamu belum memenuhi syarat nih ✨');
      return;
    }
    if (!ruleMatch) {
      setError('Password dan konfirmasi password harus sama ya!');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      try {
        const db = getLocalDB();
        const exists = db?.some((u: any) => 
          u.email.toLowerCase() === email.toLowerCase() || 
          u.username.toLowerCase() === username.toLowerCase()
        );
        if (exists) {
          throw new Error('Email atau Username sudah terdaftar nih. Langsung masuk aja! 😊');
        }

        const newUser = { email, username, password, name: username };
        db.push(newUser);
        localStorage.setItem('emova_registered_users', JSON.stringify(db));

        setSuccess('Yey! Akun EMOVA kamu berhasil dibuat! 🎉');
        setTimeout(() => {
          onSuccess(newUser);
        }, 1200);
      } catch (err: any) {
        setError(err.message || 'Ada kendala pendaftaran, coba lagi ya.');
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email kamu wajib diisi ya buat reset password 🤍');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Format email kamu salah nih 🥺');
      return;
    }
    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      setSuccess(`Tautan reset aman dikirim ke ${email}! Silakan cek inbox/spam kamu ya 🤍`);
      setTimeout(() => {
        setSuccess('');
        setMode('login');
      }, 4000);
    }, 1200);
  };

  const handleGoogleSelect = (mockUser: any) => {
    setLoading(true);
    setShowGoogleModal(false);
    setTimeout(() => {
      setLoading(false);
      setSuccess(`Selamat datang kembali, ${mockUser.name}! Terkoneksi via Google 🚀`);
      setTimeout(() => {
        onSuccess(mockUser);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 bg-gradient-to-br from-violet-100 via-sky-50 to-purple-50 overflow-hidden">
      {/* Visual Ambient Blur Spheres */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-sky-200/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="w-full max-w-md relative z-10">
        {/* Back link */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-purple-600 font-bold mb-6 hover:text-purple-800 transition-colors bg-white/60 backdrop-blur-md py-2.5 px-5 rounded-full border border-purple-100/40 shadow-sm"
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> 
          <span className="text-sm">Kembali ke Home</span>
        </button>

        {/* Card Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-2xl px-8 py-10 rounded-[40px] border border-white/60 shadow-2xl shadow-purple-200/50"
        >
          {/* Logo & Slogan */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 rounded-3xl text-white shadow-lg mb-4">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">EMOVA</h2>
            <p className="text-sm font-medium text-purple-600 mt-1">Safe space buat dengerin ceritamu 🤍</p>
          </div>

          {/* Form Content */}
          <AnimatePresence mode="wait">
            {mode === 'forgot' ? (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Lupa Password?</h3>
                  <p className="text-xs text-gray-500 mt-1">Tenang, masukin email terdaftar kamu di bawah ya. Kami bakal kirim instruksi reset dalam hitungan detik ✨</p>
                </div>

                <form onSubmit={handleForgot} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 ml-1">Email Kamu</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                      <input 
                        type="email"
                        required
                        value={email}
                        onChange={e => { setEmail(e.target.value); setError(''); }}
                        placeholder="contoh@gmail.com"
                        className="w-full pl-11 pr-5 py-3.5 bg-white border border-purple-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-300 transition-all text-sm font-sans"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-2xl text-xs font-medium flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {success && (
                    <div className="bg-green-50 text-green-700 px-4 py-3 rounded-2xl text-xs font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-green-500" />
                      <span>{success}</span>
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 active:scale-[0.98] transition-all text-sm shadow-xl shadow-purple-200 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? <RefreshCcw className="w-4 h-4 animate-spin" /> : 'Kirim Tautan Reset Secure'}
                  </button>

                  <button 
                    type="button"
                    onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
                    className="w-full py-3 text-center text-xs font-bold text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    Kembali ke Login
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Custom Tab Switcher */}
                <div className="flex bg-purple-50/70 p-1 rounded-2xl mb-6 relative border border-purple-100/30">
                  <button 
                    onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all relative z-10 ${mode === 'login' ? 'text-purple-700' : 'text-gray-400'}`}
                  >
                    Masuk Akun ✨
                    {mode === 'login' && (
                      <motion.div layoutId="authTab" className="absolute inset-0 bg-white rounded-xl shadow-sm z-[-1] border border-purple-100/40" />
                    )}
                  </button>
                  <button 
                    onClick={() => { setMode('register'); setError(''); setSuccess(''); }}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all relative z-10 ${mode === 'register' ? 'text-purple-700' : 'text-gray-400'}`}
                  >
                    Join EMOVA 🤍
                    {mode === 'register' && (
                      <motion.div layoutId="authTab" className="absolute inset-0 bg-white rounded-xl shadow-sm z-[-1] border border-purple-100/40" />
                    )}
                  </button>
                </div>

                <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="space-y-4">
                  
                  {mode === 'register' && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 ml-1">Username</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                        <input 
                          type="text"
                          required
                          value={username}
                          onChange={e => { setUsername(e.target.value); setError(''); }}
                          placeholder="username_kamu"
                          className="w-full pl-11 pr-5 py-3.5 bg-white border border-purple-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-300 transition-all text-sm font-sans"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 ml-1">
                      {mode === 'login' ? 'Email atau Username' : 'Email Aktif'}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                      <input 
                        type={mode === 'login' ? 'text' : 'email'}
                        required
                        value={email}
                        onChange={e => { setEmail(e.target.value); setError(''); }}
                        placeholder={mode === 'login' ? 'contoh@gmail.com / emovauser' : 'nama@gmail.com'}
                        className="w-full pl-11 pr-5 py-3.5 bg-white border border-purple-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-300 transition-all text-sm font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-xs font-bold text-gray-700">Password</label>
                      {mode === 'login' && (
                        <button 
                          type="button" 
                          onClick={() => { setMode('forgot'); setError(''); setSuccess(''); }}
                          className="text-[11px] font-bold text-purple-600 hover:text-purple-800 transition-colors"
                        >
                          Lupa Password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                      <input 
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={e => { setPassword(e.target.value); setError(''); }}
                        placeholder="••••••"
                        className="w-full pl-11 pr-12 py-3.5 bg-white border border-purple-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-300 transition-all text-sm font-sans"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {mode === 'register' && (
                    <>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 ml-1">Konfirmasi Password</label>
                        <div className="relative">
                          <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                          <input 
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={confirmPassword}
                            onChange={e => { setConfirmPassword(e.target.value); setError(''); }}
                            placeholder="Ulangi password"
                            className="w-full pl-11 pr-5 py-3.5 bg-white border border-purple-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-300 transition-all text-sm font-sans"
                          />
                        </div>
                      </div>

                      {/* Password validation indicators (Gen Z friendly) */}
                      <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100/40 space-y-2 mt-3">
                        <p className="text-[10px] uppercase font-bold text-purple-500 tracking-wider">Syarat Akun Secure ✨</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className={`flex items-center gap-1.5 ${ruleLen ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
                            <Check className={`w-3.5 h-3.5 ${ruleLen ? 'text-green-500' : 'opacity-20'}`} />
                            <span>Min. 6 Karakter</span>
                          </div>
                          <div className={`flex items-center gap-1.5 ${ruleNum ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
                            <Check className={`w-3.5 h-3.5 ${ruleNum ? 'text-green-500' : 'opacity-20'}`} />
                            <span>Angka / Simbol</span>
                          </div>
                          <div className={`flex items-center gap-1.5 ${ruleChar ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
                            <Check className={`w-3.5 h-3.5 ${ruleChar ? 'text-green-500' : 'opacity-20'}`} />
                            <span>Ada Huruf</span>
                          </div>
                          <div className={`flex items-center gap-1.5 ${ruleMatch ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
                            <Check className={`w-3.5 h-3.5 ${ruleMatch ? 'text-green-500' : 'opacity-20'}`} />
                            <span>Match Cocok</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {error && (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-2xl text-xs font-medium flex items-center gap-2 border border-red-100">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{error}</span>
                    </div>
                  )}

                  {success && (
                    <div className="bg-green-50 text-green-700 px-4 py-3 rounded-2xl text-xs font-medium flex items-center gap-2 border border-green-100">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-green-500" />
                      <span>{success}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={loading || (mode === 'register' && (!ruleLen || !ruleNum || !ruleChar || !ruleMatch))}
                    className="w-full py-4 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 active:scale-[0.98] transition-all text-sm shadow-xl shadow-purple-200 flex items-center justify-center gap-2 disabled:opacity-40 disabled:scale-100"
                  >
                    {loading ? (
                      <RefreshCcw className="w-4 h-4 animate-spin" />
                    ) : mode === 'login' ? (
                      'Masuk Akun 🚀'
                    ) : (
                      'Buat Akun EMOVA ✨'
                    )}
                  </button>

                  {/* Google OAuth Option (Modern Social) */}
                  <div className="relative my-6 text-center">
                    <span className="absolute left-0 right-0 top-1/2 border-t border-purple-100/60 -z-10" />
                    <span className="bg-white/90 px-3 text-[10px] uppercase font-bold text-gray-400 tracking-wider">Atau via Google</span>
                  </div>

                  <button 
                    type="button"
                    onClick={() => setShowGoogleModal(true)}
                    className="w-full py-3.5 bg-white hover:bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold text-gray-700 transition-all shadow-sm flex items-center justify-center gap-2.5 active:scale-[0.98]"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.65 1.58 14.99 1 12 1 7.35 1 3.39 3.65 1.47 7.5L5.1 10.3c.9-2.7 3.38-5.26 6.9-5.26z"/>
                      <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.47h6.43c-.28 1.46-1.1 2.7-2.33 3.53l3.6 2.79c2.1-1.94 3.79-4.8 3.79-8.43z"/>
                      <path fill="#FBBC05" d="M5.1 13.7c-.24-.72-.37-1.49-.37-2.29s.13-1.57.37-2.29L1.47 6.2C.53 8.08 0 10.18 0 12.4s.53 4.32 1.47 6.2l3.63-2.9z"/>
                      <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.6-2.79c-1.1.74-2.5 1.18-4.36 1.18-3.52 0-6-2.56-6.9-5.26L1.47 16.1C3.39 19.95 7.35 23 12 23z"/>
                    </svg>
                    <span>Masuk dengan Google</span>
                  </button>

                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modern Google Account Picker Mockup Overlay */}
      <AnimatePresence>
        {showGoogleModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setShowGoogleModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-[32px] w-full max-w-sm p-6 shadow-2xl border border-gray-100"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest font-sans">Single Sign-On</span>
                </div>
                <button onClick={() => setShowGoogleModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h4 className="text-lg font-extrabold text-gray-900 leading-tight">Pilih akun Google</h4>
              <p className="text-xs text-gray-400 mt-1 mb-5">untuk melanjutkan ke aplikasi EMOVA</p>

              <div className="space-y-2">
                {[
                  { name: 'Razizal', email: 'razizal123@gmail.com', seed: 'Felix', id: 'g1' },
                  { name: 'Sahabat EMOVA', email: 'user@emova.com', seed: 'Anya', id: 'g2' },
                  { name: 'Berta Martha', email: 'bertamartha@gmail.com', seed: 'Sasha', id: 'g3' }
                ].map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => handleGoogleSelect(acc)}
                    className="w-full p-3 rounded-2xl border border-gray-50 hover:border-purple-200 hover:bg-purple-50/20 text-left transition-all flex items-center gap-3"
                  >
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${acc.seed}`} 
                      className="w-8 h-8 rounded-full border border-purple-100 bg-purple-50" 
                      alt={acc.name} 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-800 truncate">{acc.name}</p>
                      <p className="text-[10px] text-gray-400 truncate">{acc.email}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-50 text-[10px] text-gray-400 text-center">
                Keamanan kamu terenkripsi 128-bit SSL aman.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DashboardView = ({ 
  onBack, 
  psychologists, 
  onOpenDetail, 
  isPaid, 
  onPay, 
  currentUser, 
  onLogout 
}: { 
  onBack: () => void, 
  psychologists: any[], 
  onOpenDetail: (psy: any) => void, 
  isPaid: boolean, 
  onPay: () => void, 
  currentUser: any, 
  onLogout?: () => void 
}) => {
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedPsycId, setSelectedPsycId] = useState(psychologists[0]?.id || '0');
  const [inputValue, setInputValue] = useState('');
  const [usedSuggestionsMap, setUsedSuggestionsMap] = useState<{ [key: string]: string[] }>({});
  
  const [messagesMap, setMessagesMap] = useState<{ [key: string]: any[] }>(
    psychologists.reduce((acc, p) => ({
      ...acc,
      [p.id]: [{ id: `w${p.id}`, isBot: true, message: p.welcome || `Halo, saya ${p.name}. Mari kita mulai ceritanya.`, time: "10:00" }]
    }), {})
  );

  const selectedPsyc = psychologists.find(p => p.id === selectedPsycId) || psychologists[0];
  const messages = messagesMap[selectedPsycId] || [];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newUserMsg = { id: Date.now().toString(), isBot: false, message: text, time };
    
    // Mark suggestion as used if applicable
    if (selectedPsyc.suggestions && selectedPsyc.suggestions.includes(text)) {
      setUsedSuggestionsMap(prev => ({
        ...prev,
        [selectedPsycId]: [...(prev[selectedPsycId] || []), text]
      }));
    }

    setMessagesMap(prev => ({
      ...prev,
      [selectedPsycId]: [...(prev[selectedPsycId] || []), newUserMsg]
    }));
    setInputValue('');

    // Simulate reply
    setTimeout(() => {
      const responses = selectedPsyc.specialtyReplies || [
        "Terima kasih sudah berbagi. Bagaimana hal itu membuatmu merasa hari ini?",
        "Saya mengerti perasaanmu. Hal semacam ini memang sulit dihadapi sendirian.",
        "Menarik sekali. Bisakah kamu bercerita lebih lanjut tentang bagian itu?",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const botMsg = { 
        id: (Date.now() + 1).toString(), 
        isBot: true, 
        message: randomResponse, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      
      setMessagesMap(current => ({
        ...current,
        [selectedPsycId]: [...(current[selectedPsycId] || []), botMsg]
      }));
    }, 1500);
  };

  // --- Mood Tracker States & Logic ---
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedNotes, setSelectedNotes] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [moodLogs, setMoodLogs] = useState<any[]>(() => {
    const saved = localStorage.getItem(`emova_moods_${currentUser?.username || currentUser?.email || 'anon'}`);
    if (saved) {
      try { return JSON.parse(saved); } catch(e) { return []; }
    }
    const defaultLogs = [
      { id: 'm1', date: 'Kemarin', mood: 'Baik', notes: 'Sesi latihan pernapasan tadi pagi ngebantu banget biar fokus ngerjain tugas kuliah 🎯', tags: ['🧘‍♂️ Meditasi', '☕ Santai'] },
      { id: 'm2', date: '3 hari lalu', mood: 'Cemas', notes: 'Agak overthinking mikirin deadline pekan depan, semoga besok bisa lebih tenang hiks... 🥺', tags: ['🌪️ Cemas', '🧠 Overthinking'] },
      { id: 'm3', date: '5 hari lalu', mood: 'Sangat Baik', notes: 'Ketemu temen-temen lama dan nyobain kafe baru, asyik banget bisa ketawa bareng! ❤️🥗', tags: ['💖 Bersyukur', '☕ Santai', '🥪 Makan Enak'] }
    ];
    localStorage.setItem(`emova_moods_${currentUser?.username || currentUser?.email || 'anon'}`, JSON.stringify(defaultLogs));
    return defaultLogs;
  });

  const MOOD_OPTIONS = [
    { label: 'Sangat Baik', emoji: '🤗', bg: 'bg-green-50 text-green-700 border-green-100' },
    { label: 'Baik', emoji: '🙂', bg: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    { label: 'Biasa Saja', emoji: '😐', bg: 'bg-blue-50 text-blue-700 border-blue-100' },
    { label: 'Sedih', emoji: '🥺', bg: 'bg-amber-50 text-amber-700 border-amber-100' },
    { label: 'Buruk', emoji: '😭', bg: 'bg-red-50 text-red-700 border-red-100' }
  ];

  const TAGS_OPTIONS = [
    '🧘‍♂️ Meditasi', '🚀 Kerja', '🌪️ Cemas', '🧠 Overthinking', '🥪 Makan Enak', 
    '☕ Santai', '🎮 Gaming', '🎵 Musik', '🏃‍♂️ Olahraga', '😴 Kurang Tidur'
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSaveMood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) return;
    const newLog = {
      id: Date.now().toString(),
      date: 'Hari Ini',
      mood: selectedMood,
      notes: selectedNotes.trim() || 'Perasaan dicatat tanpa catatan tambahan.',
      tags: selectedTags
    };
    const updated = [newLog, ...moodLogs];
    setMoodLogs(updated);
    localStorage.setItem(`emova_moods_${currentUser?.username || currentUser?.email || 'anon'}`, JSON.stringify(updated));
    setSelectedMood(null);
    setSelectedNotes('');
    setSelectedTags([]);
  };

  const getMoodAesthetics = (moodName: string) => {
    return MOOD_OPTIONS.find(m => m.label === moodName) || { emoji: '✨', bg: 'bg-purple-50 text-purple-700 border-purple-100' };
  };

  const getMotivationalQuote = (moodName: string) => {
    switch (moodName) {
      case 'Sangat Baik': return 'Keren banget, bestie! Pertahankan energi positif ini ya! Share rasa bahagia kamu ke sekitar 💖';
      case 'Baik': return 'Hari yang indah! Semesta mendukung hal-hal baik terjadi padamu hari ini ✨';
      case 'Biasa Saja': return 'Santai aja, gak setiap hari harus produktif kok. Yuk ambil napas dalam-dalam ☕';
      case 'Sedih': return 'It\'s completely okay to feel sad. Izinkan dirimu beristirahat dan memproses emosi ini sejenak 🤍';
      case 'Buruk': return 'Keadaan ini sementara kok, badai pasti berlalu. EMOVA selalu siap dengerin ceritamu kapanpun kamu butuh 🫂';
      default: return 'Gimana aktivitasmu hari ini? Ambil secangkir air hangat dan rileks ya ✨';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#FDFCFD] flex flex-col md:flex-row"
    >
      {/* Sidebar */}
      <div className="w-full md:w-24 bg-white border-r border-gray-100 flex md:flex-col items-center py-4 md:py-8 px-4 justify-between md:justify-start gap-8 z-20 shadow-sm shrink-0">
        <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-105 transition-transform" onClick={onBack}>
          <Heart className="w-6 h-6 fill-white" />
        </div>
        
        <div className="flex md:flex-col gap-6">
          {[
            { id: 'chat', icon: MessageCircle, label: 'Chat' },
            { id: 'mood', icon: Smile, label: 'Mood' },
            { id: 'settings', icon: User, label: 'Settings' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all relative group",
                activeTab === item.id ? "bg-purple-100 text-purple-600 shadow-sm" : "text-gray-400 hover:text-purple-400"
              )}
              title={item.label}
            >
              <item.icon className="w-6 h-6" />
              {/* Tooltip */}
              <span className="absolute left-16 px-2 py-1 bg-gray-900 text-white text-[10px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:inline ml-2 whitespace-nowrap z-50">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <div className="md:mt-auto flex flex-col items-center gap-3">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.username || currentUser?.name || 'Felix'}`} 
            alt="Profile" 
            className="w-10 h-10 rounded-full border-2 border-purple-200 bg-purple-50" 
          />
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* TAB 1: CONSULTATION / CHAT */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* User List / Explorer */}
            <div className="w-full md:w-80 border-r border-gray-100 bg-white overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Konsultasi</h2>
                <div className="space-y-4">
                  {psychologists.map((dr) => (
                    <div 
                      key={dr.id} 
                      className={cn(
                        "p-4 rounded-[32px] border transition-all",
                        selectedPsycId === dr.id ? "bg-white shadow-xl shadow-purple-100/50 border-purple-100" : "bg-white border-gray-50 hover:border-purple-50"
                      )}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <img src={dr.avatar} className="w-14 h-14 rounded-2xl object-cover bg-gray-100" alt={dr.name} />
                          <div className={cn("absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white", dr.isOnline ? "bg-green-500" : "bg-gray-300")} />
                        </div>
                        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onOpenDetail(dr)}>
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="text-sm font-bold text-gray-900 truncate">{dr.name}</h4>
                            <div className="flex items-center text-[10px] font-bold text-yellow-500 shrink-0">
                              <Star className="w-3 h-3 fill-current mr-0.5" /> {dr.rating}
                            </div>
                          </div>
                          <p className="text-[10px] text-purple-600 font-medium truncate">{dr.specialization}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {isPaid ? (
                          <>
                            <a 
                              href={`https://wa.me/${dr.phone}?text=${encodeURIComponent(`Halo ${dr.name}, saya ingin memulai sesi Chat via EMOVA.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-3 rounded-xl text-[10px] font-bold flex items-center justify-center gap-2 bg-purple-50 text-purple-600 hover:bg-purple-100 transition-all"
                            >
                              <MessageCircle className="w-4 h-4" /> Chat via WA
                            </a>
                            <a 
                              href={`https://wa.me/${dr.phone}?text=${encodeURIComponent(`Halo ${dr.name}, saya ingin memulai sesi Video Call via EMOVA.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-3 rounded-xl text-[10px] font-bold bg-gray-900 text-white flex items-center justify-center gap-2 hover:bg-gray-700 transition-all"
                            >
                              <Video className="w-4 h-4" /> Video Call via WA
                            </a>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={onPay}
                              className="flex-1 py-3 rounded-xl text-[10px] font-bold flex items-center justify-center gap-2 bg-purple-50 text-purple-600 hover:bg-purple-100 transition-all group"
                            >
                              <Lock className="w-3 h-3 text-purple-400 group-hover:text-purple-600" /> Unlock Chat
                            </button>
                            <button 
                              onClick={onPay}
                              className="flex-1 py-3 rounded-xl text-[10px] font-bold bg-gray-900 text-white flex items-center justify-center gap-2 hover:bg-gray-700 transition-all"
                            >
                              <Lock className="w-3 h-3 text-gray-400" /> Unlock Video
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-purple-50/30 flex flex-col relative overflow-hidden">
              <div className="p-6 bg-white border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={selectedPsyc?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedPsyc?.name}`} className="w-10 h-10 rounded-xl bg-purple-100" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{selectedPsyc?.name}</h3>
                    <p className="text-[10px] text-green-500 font-bold">{selectedPsyc?.isVerified ? 'Partner Terverifikasi' : 'Sedang Ditinjau'}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400"><Video className="w-5 h-5" /></button>
                  <button className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400"><Star className="w-5 h-5" /></button>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto flex flex-col">
                {messages.map((msg) => (
                  <ChatBubble key={msg.id} isBot={msg.isBot} message={msg.message} time={msg.time} />
                ))}
                
                <div className="mt-auto space-y-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(selectedPsyc.suggestions || [])
                      .filter(suggestion => !(usedSuggestionsMap[selectedPsycId] || []).includes(suggestion))
                      .map((chip) => (
                      <button 
                        key={chip} 
                        onClick={() => handleSendMessage(chip)}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-all font-sans"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
                className="p-6 bg-white border-t border-gray-100 flex gap-4 items-center"
              >
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Tulis ceritamu di sini..." 
                  className="flex-1 bg-gray-50 border-none rounded-2xl px-6 py-3 text-sm focus:ring-2 focus:ring-purple-200 transition-all font-sans"
                />
                <button 
                  type="submit"
                  className="bg-purple-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200 hover:scale-105 transition-transform"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: MOOD TRACKER */}
        {activeTab === 'mood' && (
          <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden bg-[#fafafa]">
            
            {/* Left Column: Log a new mood */}
            <div className="w-full lg:w-[480px] p-6 lg:p-8 bg-white border-r border-gray-100 flex flex-col overflow-y-auto shrink-0">
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">Refleksi Diri 🌸</span>
                <h2 className="text-2xl font-black text-gray-900 mt-2 tracking-tight">Apa kabar hari ini, {currentUser?.name || 'bestie'}?</h2>
                <p className="text-xs text-gray-400 mt-1">Sediakan waktu 1 menit untuk dengerin detak perasaanmu sendiri. Privasimu aman 100%.</p>
              </div>

              <form onSubmit={handleSaveMood} className="space-y-6">
                
                {/* Mood Selectors */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-800">1. Gimana mood kamu sekarang?</label>
                  <div className="grid grid-cols-5 gap-2">
                    {MOOD_OPTIONS.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => { setSelectedMood(item.label); setError(''); }}
                        className={cn(
                          "flex flex-col items-center justify-center p-3 rounded-2xl border transition-all hover:scale-105 text-center",
                          selectedMood === item.label 
                            ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-100" 
                            : "bg-white border-gray-100 hover:border-purple-200 text-gray-800"
                        )}
                      >
                        <span className="text-2xl mb-1">{item.emoji}</span>
                        <span className="text-[9px] font-bold font-sans truncate w-full">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Motivational Quote Quote (Dynamic Visual) */}
                {selectedMood && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("p-4 rounded-2xl border text-xs leading-relaxed font-medium font-sans", getMoodAesthetics(selectedMood).bg)}
                  >
                    {getMotivationalQuote(selectedMood)}
                  </motion.div>
                )}

                {/* Tags Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-800">2. Apa yang paling memengaruhi perasaanmu?</label>
                  <div className="flex flex-wrap gap-2">
                    {TAGS_OPTIONS.map((tag) => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all active:scale-95",
                            isSelected 
                              ? "bg-purple-100 text-purple-700 border-purple-200 shadow-sm" 
                              : "bg-gray-50 text-gray-500 border-gray-100 hover:border-gray-200"
                          )}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Journaling Note */}
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-800">3. Curhat singkat tentang harimu...</label>
                  <textarea
                    rows={4}
                    value={selectedNotes}
                    onChange={e => setSelectedNotes(e.target.value)}
                    placeholder="Tulis apa aja di sini. Bebas, gak ada yang bakal baca selain kamu sendiri... 🤍"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-3xl text-sm focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-300 transition-all font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!selectedMood}
                  className="w-full py-4 bg-purple-600 text-white rounded-3xl font-bold hover:bg-purple-700 transition-all shadow-xl shadow-purple-100 flex items-center justify-center gap-2 text-sm disabled:opacity-40 disabled:scale-100"
                >
                  <Check className="w-5 h-5" />
                  <span>Simpan Catatan Harian</span>
                </button>
              </form>
            </div>

            {/* Right Column: History List */}
            <div className="flex-1 p-6 lg:p-8 overflow-y-auto flex flex-col">
              <div className="mb-6 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">Riwayat Catatan Mental</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Jurnal harian kamu tersimpan lokal dan terlindungi 🔒</p>
                </div>
                <div className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full">
                  Total Jurnal: {moodLogs.length}
                </div>
              </div>

              {moodLogs.length === 0 ? (
                <div className="flex-1 bg-white border border-gray-100/60 rounded-[40px] p-12 text-center flex flex-col items-center justify-center shadow-sm">
                  <span className="text-5xl">📝</span>
                  <h4 className="text-lg font-bold text-gray-800 mt-4">Belum ada jurnal tercatat</h4>
                  <p className="text-xs text-gray-400 mt-2 max-w-xs mx-auto">Mulai isi jurnal perasaan pertamumu hari ini untuk melatih kesadaran emosional ✨</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {moodLogs.map((log) => {
                    const aes = getMoodAesthetics(log.mood);
                    return (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-6 rounded-[32px] border border-gray-50/80 shadow-md shadow-gray-100/30 font-sans"
                      >
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{aes.emoji}</span>
                            <div>
                              <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold border", aes.bg)}>
                                {log.mood}
                              </span>
                              <span className="text-[10px] text-gray-400 font-semibold block mt-0.5">{log.date || 'Hari Ini'}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 leading-relaxed italic mb-4 font-sans bg-gray-50/50 p-3.5 rounded-xl border border-gray-50/30">
                          "{log.notes}"
                        </p>

                        {log.tags && log.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {log.tags.map((t: string) => (
                              <span key={t} className="text-[9px] font-bold bg-purple-50 text-purple-600 px-2.5 py-1 rounded-full">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 3: ACCOUNT & SETTINGS */}
        {activeTab === 'settings' && (
          <div className="flex-1 bg-gradient-to-br from-purple-50/40 via-sky-50/10 to-violet-50/40 p-6 lg:p-12 overflow-y-auto flex items-center justify-center">
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-xl bg-white p-8 lg:p-10 rounded-[48px] border border-gray-100 shadow-2xl shadow-purple-100/60 font-sans"
            >
              
              {/* Profile Card Header */}
              <div className="text-center pb-8 border-b border-gray-50">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-sky-100 p-1 flex items-center justify-center shadow-lg shadow-purple-100">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.username || currentUser?.name || 'Felix'}`} 
                      className="w-full h-full rounded-full bg-white object-cover" 
                      alt="Avatar" 
                    />
                  </div>
                  {isPaid && (
                    <span className="absolute -bottom-1 right-2 bg-yellow-400 text-white text-xs font-bold px-2 py-0.5 rounded-full border-2 border-white shadow-md">
                      👑 Premium
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-black text-gray-900 leading-none">{currentUser?.name || 'Sahabat EMOVA'}</h3>
                <p className="text-xs text-purple-600 font-bold mt-2">@{currentUser?.username || 'emova_user'}</p>
                <p className="text-xs text-gray-400 mt-1">{currentUser?.email || 'user@emova.com'}</p>
              </div>

              {/* Status & Options Content */}
              <div className="py-6 space-y-6 select-none font-sans">
                
                {/* Membership Plan Box */}
                <div className="bg-purple-50/50 p-6 rounded-3xl border border-purple-100/40 relative overflow-hidden">
                  <div className="absolute right-0 top-0 text-[100px] leading-none opacity-5 translate-y-[-20%] select-none pointer-events-none text-purple-900 font-black">EM</div>
                  
                  <div className="flex justify-between items-center gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">Status Keanggotaan</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Paket akun kamu di EMOVA hari ini</p>
                    </div>
                    {isPaid ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">Mitra Premium Aktif</span>
                    ) : (
                      <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-bold border border-gray-200">Grup Konseling Gratis</span>
                    )}
                  </div>

                  <div className="space-y-2 mt-4 font-sans text-xs">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Chatbot EMOVA AI Aktif & Bebas Tanya jawab ilahi 💬</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Mood tracker harian & riwayat kesehatan terjamin 🔒</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Check className={cn("w-4 h-4", isPaid ? "text-green-500" : "text-gray-300")} />
                      <span className={isPaid ? "text-gray-600" : "text-gray-400 line-through"}>Konsultasi Private bareng Psikolog berlisensi</span>
                    </div>
                  </div>

                  {!isPaid && (
                    <button
                      onClick={onPay}
                      className="w-full mt-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl text-xs shadow-lg shadow-purple-200/60 transition-colors"
                    >
                      Buka Fitur Psikolog Sekarang 🚀
                    </button>
                  )}
                </div>

                {/* Account Actions */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={onBack}
                    className="w-full p-4 hover:bg-gray-50 text-left rounded-2xl border border-gray-50 text-xs font-bold text-gray-700 transition-colors flex items-center justify-between"
                  >
                    <span>Kembali ke Halaman Utama</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>

                  {onLogout && (
                    <button
                      onClick={onLogout}
                      className="w-full p-4 bg-red-50/50 hover:bg-red-50 text-left rounded-2xl border border-red-100 text-xs font-bold text-red-600 transition-colors flex items-center justify-between"
                    >
                      <span>Keluar dari Akun EMOVA</span>
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  )}
                </div>

              </div>

            </motion.div>
          </div>
        )}

      </div>
    </motion.div>
  );
};

const PsychologistRegistration = ({ onBack, onSubmit }: { onBack: () => void, onSubmit: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialization: '',
    bio: '',
    experience: '',
    licenseNumber: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-[40px] shadow-2xl shadow-purple-100 p-8 md:p-12 border border-purple-50"
      >
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600 mb-8 flex items-center gap-2 group">
          <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" /> Kembali ke Beranda
        </button>

        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Bergabung Sebagai <span className="text-purple-600 italic">Mitra Psikolog</span></h2>
          <p className="text-gray-500">Bantu ribuan jiwa menemukan ketenangannya kembali bersama EMOVA.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-2">Nama Lengkap & Gelar</label>
              <input 
                required
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="cth: Dr. Sarah Smith, M.Psi"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-2">Email Profesional</label>
              <input 
                required
                type="email"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="sarah@psikologi.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-2">Spesialisasi Utama</label>
            <input 
              required
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-purple-200 outline-none transition-all"
              value={formData.specialization}
              onChange={e => setFormData({ ...formData, specialization: e.target.value })}
              placeholder="cth: Kecemasan, Depresi, Karir, Hubungan"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-2">Nomor Lisensi Praktik (SIPP)</label>
            <input 
              required
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-purple-200 outline-none transition-all"
              value={formData.licenseNumber}
              onChange={e => setFormData({ ...formData, licenseNumber: e.target.value })}
              placeholder="Masukkan nomor lisensi Anda"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-2">Biografi Singkat</label>
            <textarea 
              required
              rows={4}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Ceritakan sedikit tentang pendekatan terapi Anda..."
            />
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-gray-900 text-white rounded-[32px] font-bold shadow-xl shadow-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all text-lg"
          >
            Kirim Lamaran Menjadi Mitra
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'landing' | 'pricing' | 'app' | 'psychologist-registration' | 'payment-confirmation' | 'psychologist-selection-video' | 'article-detail' | 'psychologist-detail' | 'ai-chat' | 'auth'>('landing');
  const [isPaid, setIsPaid] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [selectedPsyForVideoCall, setSelectedPsyForVideoCall] = useState<any>(null);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [selectedPsyForDetail, setSelectedPsyForDetail] = useState<any>(null);
  
  const [currentUser, setCurrentUser] = useState<any>(() => {
    const saved = localStorage.getItem('emova_current_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null;
  });
  const [intendedView, setIntendedView] = useState<string | null>(null);
  const [initialAuthMode, setInitialAuthMode] = useState<'login' | 'register'>('login');
  
  const ARTICLES = [
    { 
      title: "How to Overcome Overthinking", 
      category: "Self-Help", 
      desc: "Kendalikan pikiran berlebih dengan mengelola pola pikir, menenangkan diri, dan fokus pada solusi konkret.",
      content: [
        "Overthinking atau berpikir berlebihan adalah kebiasaan yang melelahkan secara mental dan emosional. Seringkali, kita terjebak dalam putaran pikiran yang sama tentang masa lalu atau kekhawatiran yang tidak berujung tentang masa depan.",
        "Langkah pertama untuk mengatasi overthinking adalah kesadaran. Sadarilah kapan kamu mulai terjebak dalam loop pikiran tersebut. Begitu kamu menyadarinya, cobalah teknik 'Pause'. Ambil napas dalam-dalam dan akui bahwa pikiranmu sedang berputar.",
        "Gunakan teknik distraksi yang positif. Lakukan aktivitas fisik yang membutuhkan fokus, seperti olahraga ringan atau sekadar merapikan kamar. Aktivitas fisik membantu memindahkan energi dari otak ke tubuh, membantu menenangkan sistem saraf.",
        "Terakhir, fokuslah pada solusi, bukan pada masalah. Alih-alih bertanya 'Mengapa ini terjadi padaku?', tanyalah 'Langkah kecil apa yang bisa aku ambil sekarang?'. Fokus pada aksi nyata akan memberikanmu rasa kontrol kembali atas situasi yang sedang kamu hadapi."
      ],
      color: "bg-blue-100 text-blue-700", 
      img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1520" 
    },
    { 
      title: "Signs of Mental Fatigue", 
      category: "Kesehatan Mental", 
      desc: "Kenali ciri kelelahan mental: gampang emosi, sulit fokus, hilangnya motivasi, dan sering merasa cemas.",
      content: [
        "Kelelahan mental bukan sekadar merasa mengantuk; ini adalah kondisi kelelahan ekstrem yang memengaruhi kemampuanmu untuk berfungsi dengan baik. Seringkali hal ini terjadi setelah periode stres yang berkepanjangan tanpa istirahat yang cukup.",
        "Salah satu tandanya adalah labilitas emosional. Kamu mungkin merasa lebih mudah tersinggung, marah, atau menangis karena hal-hal kecil yang biasanya tidak mengganggumu. Ini karena energi mental untuk regulasi emosi sudah habis.",
        "Kesulitan fokus atau 'Brain Fog' juga merupakan indikator kuat. Kamu mungkin merasa sulit untuk membuat keputusan sederhana atau merasa buntu saat mengerjakan tugas. Ini adalah cara otakmu memberi tahu bahwa ia butuh dormansi sejenak.",
        "Jika kamu merasa kehilangan motivasi atau sering merasa cemas tanpa alasan yang jelas, itu saatnya untuk beristirahat. Jangan mengabaikan sinyal-sinyal ini. Kelelahan mental yang tidak ditangani bisa berujung pada burnout yang lebih parah."
      ],
      color: "bg-purple-100 text-purple-700", 
      img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1470" 
    },
    { 
      title: "Self-Healing for Gen Z", 
      category: "Panduan", 
      desc: "Pentingnya me-time, menjaga pola tidur, mendengarkan musik, dan melakukan hobi untuk kesehatan jiwa.",
      content: [
        "Bagi generasi Z yang tumbuh di era digital, self-healing sering kali berarti melakukan detoks dari kebisingan dunia maya. Tekanan sosial dari media sosial bisa sangat membebani kesehatan mental tanpa kita sadari.",
        "Prioritaskan 'Me-time' yang berkualitas. Ini bukan berarti sekadar scrolling di HP, melainkan aktivitas yang benar-benar mengisi ulang energimu, seperti membaca buku, melukis, atau sekadar duduk tenang tanpa gangguan perangkat elektronik.",
        "Kualitas tidur adalah kunci. Kurang tidur bisa merusak mood dan kemampuan kognitifmu. Cobalah untuk menetapkan rutinitas malam yang menenangkan dan batasi penggunaan HP sebelum tidur agar otakmu bisa bersiap untuk istirahat total.",
        "Jangan lupa untuk merayakan hobi. Melakukan sesuatu hanya karena kamu menyukainya, bukan karena ingin produktif atau ingin dipamerkan di medsos, adalah salah satu bentuk self-healing terbaik bagi jiwa."
      ],
      color: "bg-pink-100 text-pink-700", 
      img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1499" 
    },
    { 
      title: "Tips to Reduce Anxiety in Daily Life", 
      category: "Lifestyle", 
      desc: "Kurangi kecemasan harian melalui teknik relaksasi, olahraga ringan, dan menghindari overthinking.",
      content: [
        "Kecemasan adalah respon alami tubuh terhadap stres, tapi terkadang ia bisa menjadi berlebihan. Mengelola kecemasan harian membutuhkan pendekatan yang disiplin namun lembut terhadap diri sendiri.",
        "Teknik relaksasi sangat membantu. Cobalah pernapasan kotak: tarik napas 4 hitungan, tahan 4 hitungan, buang 4 hitungan, dan tahan 4 hitungan. Ini secara instan mengirimkan sinyal 'aman' ke otakmu.",
        "Olahraga ringan seperti jalan santai di pagi hari juga terbukti mengurangi hormon stres. Paparan sinar matahari dan udara segar membantu meningkatkan kadar serotonin dalam darah secara alami.",
        "Batasi konsumsi berita atau konten yang membuatmu merasa tidak nyaman. Mengatur batasan informasi yang masuk adalah langkah krusial dalam menjaga ketenangan pikiran di tengah dunia yang serba cepat ini."
      ],
      color: "bg-green-100 text-green-700", 
      img: "https://images.unsplash.com/photo-1499209974431-9dac3dc3c21d?auto=format&fit=crop&q=80&w=1470" 
    },
    { 
      title: "The Importance of Self-Love and Self-Confidence", 
      category: "Pertumbuhan Diri", 
      desc: "Cara menerima diri sendiri seutuhnya dan membangun kepercayaan diri untuk mental yang lebih kuat.",
      content: [
        "Kepercayaan diri yang sejati tidak datang dari pencapaian luar, melainkan dari fondasi self-love yang kuat—menerima dirimu sendiri dengan segala kelebihan dan kekurangannya.",
        "Mulailah dengan afirmasi positif setiap pagi. Perhatikan bagaimana kamu berbicara kepada dirimu sendiri di dalam pikiran. Cobalah untuk menjadi teman yang baik bagi dirimu sendiri, bukan kritikus yang paling kejam.",
        "Tetapkan batasan atau boundaries yang sehat. Belajar untuk mengatakan 'tidak' pada hal-hal yang menguras energimu atau tidak sesuai dengan nilaimu adalah bentuk penghargaan tertinggi bagi diri sendiri.",
        "Rayakan setiap kemenangan kecil. Tidak ada kemajuan yang terlalu sepele. Dengan menghargai setiap langkah yang kamu ambil, kamu sedang membangun kepercayaan diri yang kokoh dari dalam."
      ],
      color: "bg-orange-100 text-orange-700", 
      img: "https://images.unsplash.com/photo-1512438248406-306b9a047724?auto=format&fit=crop&q=80&w=1520"
    },
    {
      title: "How to Prevent Mental Health Disorders",
      category: "Kesehatan Mental",
      desc: "Langkah-langkah preventif untuk menjaga keseimbangan kesehatan mental sejak dini.",
      content: [
        "Mencegah lebih baik daripada mengobati, termasuk dalam hal kesehatan mental. Pencegahan dimulai dengan membangun ketahanan mental atau resiliensi melalui gaya hidup yang seimbang.",
        "Pertahankan koneksi sosial yang kuat. Memiliki lingkaran pertemanan atau keluarga yang bisa diajak berbicara saat masa sulit adalah faktor pelindung paling kuat terhadap gangguan mental.",
        "Pelajari cara mengelola stres secara efektif. Jangan biarkan stres menumpuk; temukan outlet kreatif atau olahraga yang bisa membantumu melepaskan tekanan harian sebelum ia menjadi beban yang berat.",
        "Terakhir, jangan ragu mencari bantuan profesional sejak awal. Membicarakan masalah kecil dengan konselor dapat mencegah masalah tersebut berkembang menjadi gangguan yang lebih kompleks di masa depan."
      ],
      color: "bg-red-100 text-red-700",
      img: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&q=80&w=1471"
    },
    {
      title: "The Importance of Maintaining Sleep Patterns for Mental Health",
      category: "Lifestyle",
      desc: "Tidur bukan cuma soal fisik, tapi kunci utama regulasi emosi dan kejernihan pikiran.",
      content: [
        "Tidur adalah waktu di mana otak memproses emosi dan membersihkan racun kognitif. Kurang tidur secara kronis berkontribusi langsung pada peningkatan risiko kecemasan dan depresi.",
        "Ciptakan rutinitas tidur yang konsisten. Cobalah untuk tidur dan bangun pada jam yang sama setiap harinya, bahkan di hari libur. Ini membantu mengatur jam biologis atau ritme sirkadian tubuhmu.",
        "Kurangi paparan cahaya biru dari gadget setidaknya satu jam sebelum tidur. Cahaya biru menekan produksi melatonin, hormon yang memberi tahu tubuh bahwa sudah waktunya untuk beristirahat.",
        "Lingkungan tidur yang nyaman juga sangat berpengaruh. Pastikan kamarmu gelap, tenang, dan sejuk. Investasi dalam kualitas tidur adalah investasi terbesar bagi kesehatan mental jangka panjangmu."
      ],
      color: "bg-indigo-100 text-indigo-700",
      img: "https://images.unsplash.com/photo-1531353826977-0941b4779a1c?auto=format&fit=crop&q=80&w=1470"
    },
    {
      title: "How to Manage Stress While Studying or Working",
      category: "Self-Help",
      desc: "Tetap produktif tanpa harus mengorbankan ketenangan jiwa di tengah tumpukan tugas.",
      content: [
        "Tuntutan akademik atau pekerjaan seringkali menjadi sumber stres utama bagi Gen Z. Kuncinya adalah pada manajemen ekspektasi dan pembagian tugas yang realistis.",
        "Gunakan teknik Pomodoro: bekerja atau belajar selama 25 menit, lalu istirahat 5 menit. Teknik ini mencegah kelelahan otak dan menjaga tingkat konsentrasi tetap optimal sepanjang waktu kerja.",
        "Belajarlah untuk memprioritaskan tugas menggunakan tabel Eisenhower. Fokuslah pada hal yang penting dan mendesak terlebih dahulu, dan jangan ragu untuk mendelegasikan atau menunda hal yang kurang krusial.",
        "Jangan lupa untuk mengambil jeda total. Benar-benar mematikan notifikasi saat jam istirahat atau libur membantu sistem sarafmu untuk 'reset' dan mencegah terjadinya burnout di kemudian hari."
      ],
      color: "bg-yellow-100 text-yellow-700",
      img: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1472"
    },
    {
      title: "The Impact of Social Media on Mental Health",
      category: "Kesehatan Mental",
      desc: "Navigasi sehat di dunia maya agar tidak terjebak dalam perangkap FOMO dan perbandingan sosial.",
      content: [
        "Media sosial adalah pedang bermata dua. Di satu sisi ia menghubungkan, di sisi lain ia bisa menjadi sumber utama rasa tidak percaya diri karena tren perbandingan sosial yang konstan.",
        "Sadarilah bahwa apa yang kamu lihat di feed orang lain hanyalah 'highlight reel' atau bagian terbaik dari hidup mereka. Berhenti membandingkan kehidupan nyatamu dengan dunia yang sudah difilter.",
        "Kurasi feed-mu secara aktif. Unfollow atau mute akun yang membuatmu merasa buruk tentang dirimu sendiri. Ikuti akun yang memberikan inspirasi, edukasi, dan energi positif bagi pertumbuhan pribadimu.",
        "Tetapkan batas waktu penggunaan media sosial. Menghabiskan waktu terlalu lama di dunia maya seringkali membuat kita terputus dari kenyataan dan interaksi sosial yang bermakna di dunia nyata."
      ],
      color: "bg-cyan-100 text-cyan-700",
      img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1374"
    },
    {
      title: "How to Calm Yourself During a Panic Attack",
      category: "Panduan",
      desc: "Langkah-langkah darurat untuk mengontrol diri saat serangan panik melanda secara tiba-tiba.",
      content: [
        "Serangan panik bisa terasa sangat menakutkan, seolah-olah kamu kehilangan kendali. Namun ingatlah, serangan panik biasanya tidak berbahaya secara fisik dan akan segera berlalu.",
        "Gunakan teknik 5-4-3-2-1 untuk grounding: sebutkan 5 hal yang kamu lihat, 4 hal yang bisa disentuh, 3 hal yang didengar, 2 hal yang tercium, dan 1 hal yang bisa dirasakan (rasa di mulut).",
        "Fokuslah pada pernapasan perut yang lambat. Tarik napas melalui hidung dan buang perlahan melalui mulut. Mengatur napas membantu menenangkan sistem saraf simpatik yang sedang bereaksi berlebihan.",
        "Katakan pada dirimu sendiri bahwa 'Ini hanya perasaan, ini akan berlalu.' Menyadari bahwa itu adalah serangan panik dapat membantu mengurangi rasa takut yang muncul akibat gejala fisik yang dirasakan."
      ],
      color: "bg-teal-100 text-teal-700",
      img: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=1483"
    },
    {
      title: "Positive Habits to Maintain Mental Health",
      category: "Lifestyle",
      desc: "Kebiasaan kecil harian yang berdampak besar bagi kesejahteraan psikologis jangka panjang.",
      content: [
        "Kesehatan mental yang stabil dibangun dari kebiasaan-kebiasaan kecil yang dilakukan secara konsisten setiap harinya. Dimulai dari bagaimana kamu mengawali pagimu.",
        "Praktikkan jurnaling atau menulis rasa syukur setiap hari. Fokus pada hal-hal baik—sekecil apapun itu—membantu melatih otakmu untuk melihat sisi positif di tengah berbagai tantangan hidup.",
        "Lakukan aktivitas yang memberikan rasa pencapaian, seperti merapikan tempat tidur atau menyelesaikan tugas kecil. Keberhasilan kecil ini melepaskan dopamin yang meningkatkan mood secara alami.",
        "Pastikan kamu memiliki waktu untuk terhubung dengan alam atau sekadar berjalan kaki tanpa distraksi. Kehadiran penuh di momen saat ini membantu meredakan kecemasan dan mengembalikan ketenangan batin."
      ],
      color: "bg-amber-100 text-amber-700",
      img: "https://images.unsplash.com/photo-1470468969717-61d5d54fd036?auto=format&fit=crop&q=80&w=1444"
    }
  ];

  const [psychologists, setPsychologists] = useState([
    { 
      id: '1', 
      name: 'Dr. Aulia Rahman, M.Psi', 
      specialization: 'Anxiety & Overthinking Specialist', 
      rating: 4.9,
      isOnline: true,
      phone: '6283134820924',
      bio: 'Ahli dalam membantu mengelola pikiran berlebih dan gangguan kecemasan.', 
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=150', 
      isVerified: true,
      welcome: "Halo! Saya Dr. Aulia. Senang sekali bisa mendampingimu hari ini.",
      suggestions: ["Atasi overthinking", "Tenangkan pikiran", "Cemas tiba-tiba", "Relaksasi"],
      specialtyReplies: [
        "Overthinking seringkali adalah cara otak kita mencoba melindungi diri, namun terkadang ia malah menghambat. Mari kita uraikan satu per satu.",
        "Cobalah tarik napas dalam 4 hitungan, tahan 4 hitungan, dan buang perlahan 4 hitungan. Apa yang kamu rasakan?",
        "Pikiranmu sangat valid. Ingatlah bahwa kamu tidak sendirian dalam menghadapi ini."
      ]
    },
    { 
      id: '2', 
      name: 'Dr. Nadia Putri, M.Psi', 
      specialization: 'Teen & Gen Z Counseling', 
      rating: 4.8,
      isOnline: true,
      phone: '6283134820924',
      bio: 'Memahami dinamika kehidupan sosial dan tekanan akademik pada generasi Z.', 
      avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=150', 
      isVerified: true,
      welcome: "Hi! Aku Nadia. Curhat aja yuk, gak ada yang bakal judging kok di sini.",
      suggestions: ["Tekanan kuliah", "FOMO", "Insecure", "Capek mental"],
      specialtyReplies: [
        "FOMO itu wajar banget di zaman sekarang. Tapi ingat, apa yang di medsos gak selalu seindah realitanya.",
        "Insecure itu manusiawi. Fokus yuk sama progres kecil kamu hari ini.",
        "Burnout kuliah emang nyata. Butuh istirahat sejenak itu investasi, bukan malas."
      ]
    },
    { 
      id: '4', 
      name: 'Dr. Tiara Maharani, M.Psi', 
      specialization: 'Stress Management', 
      rating: 4.7,
      isOnline: true,
      phone: '6283134820924',
      bio: 'Spesialis dalam mengelola stres kerja dan tekanan hidup harian.', 
      avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=150', 
      isVerified: true,
      welcome: "Halo! Saya Tiara. Tarik napas dulu yuk, mari kita bedah sumber stresmu.",
      suggestions: ["Stres kerja", "Waktu buat diri sendiri", "Capek emosional", "Manajemen waktu"],
      specialtyReplies: [
        "Stres itu sinyal dari tubuh kalau kita butuh jeda. Jangan diabaikan ya.",
        "Kadang kita cuma butuh keluar dari rutinitas sejenak buat dapet perspektif baru.",
        "Coba buat daftar apa yang bisa kamu kontrol dan apa yang gak bisa. Fokus ke yang bisa ya."
      ]
    },
    { 
      id: '5', 
      name: 'Dr. Kevin Pratama, M.Psi', 
      specialization: 'Relationship & Emotional Support', 
      rating: 4.8,
      isOnline: true,
      phone: '6283134820924',
      bio: 'Membangun koneksi yang sehat dan dukungan emosional dalam hubungan.', 
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150', 
      isVerified: true,
      welcome: "Halo, saya Kevin. Saya di sini untuk mendengarkan dinamika hubunganmu.",
      suggestions: ["Masalah pacaran", "Toxic family", "Komunikasi", "Patah hati"],
      specialtyReplies: [
        "Komunikasi adalah kunci, tapi mendengarkan juga gak kalah penting dalam hubungan.",
        "Menetapkan boundary itu sehat, bahkan dalam hubungan yang paling dekat sekalipun.",
        "Patah hati emang berat, tapi itu juga kesempatan buat kita mengenal diri lebih dalam."
      ]
    }
  ]);

  const handleStartSuccessPage = (target: 'app' | 'pricing') => {
    setView(target);
  };

  const handleStart = () => {
    if (!currentUser) {
      setIntendedView(isPaid ? 'app' : 'pricing');
      setInitialAuthMode('login');
      setView('auth');
      return;
    }
    if (isPaid) {
      setView('app');
    } else {
      setView('pricing');
    }
  };

  const handleStartChatbot = () => {
    if (!currentUser) {
      setIntendedView('ai-chat');
      setInitialAuthMode('login');
      setView('auth');
      return;
    }
    setView('ai-chat');
  };

  const handleAuthSuccess = (user: any) => {
    localStorage.setItem('emova_current_user', JSON.stringify(user));
    setCurrentUser(user);
    if (intendedView) {
      const target = intendedView;
      setIntendedView(null);
      setView(target as any);
    } else {
      setView('landing');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('emova_current_user');
    setCurrentUser(null);
    setView('landing');
  };
  
  const handleSelectPlan = (plan: any) => {
    setSelectedPlan(plan);
    setIsPaying(true);
  };

  const confirmPayment = () => {
    setIsPaying(false);
    setIsPaid(true);
    if (selectedPlan?.type === 'Video Call') {
      if (selectedPsyForVideoCall) {
        setView('payment-confirmation');
      } else {
        setView('psychologist-selection-video');
      }
    } else {
      setView('app');
    }
  };

  const handleSelectPsyForVideo = (psy: any) => {
    setSelectedPsyForVideoCall(psy);
    setView('payment-confirmation');
  };

  const handleOpenDetail = (psy: any) => {
    setSelectedPsyForDetail(psy);
    if (!currentUser) {
      setIntendedView('psychologist-detail');
      setInitialAuthMode('login');
      setView('auth');
      return;
    }
    setView('psychologist-detail');
  };

  const handleStartChatFromDetail = (psy: any) => {
    if (!isPaid) {
      setView('pricing');
      return;
    }
    setView('app');
  };

  const handleStartVideoFromDetail = (psy: any) => {
    if (!isPaid) {
      setSelectedPsyForVideoCall(psy);
      setSelectedPlan({ type: "Video Call", basePrice: "Rp50.000", icon: Video });
      setIsPaying(true);
      return;
    }
    setSelectedPsyForVideoCall(psy);
    setView('payment-confirmation');
  };

  const handleSelectArticle = (article: any) => {
    setSelectedArticle(article);
    if (!currentUser) {
      setIntendedView('article-detail');
      setInitialAuthMode('login');
      setView('auth');
      return;
    }
    setView('article-detail');
  };

  const handleRegisterPsychologist = (newPsy: any) => {
    setPsychologists(prev => [...prev, { ...newPsy, id: Date.now().toString(), isVerified: false }]);
    setView('landing');
    alert('Terima kasih! Lamaran Anda telah kami terima. Tim EMOVA akan melakukan verifikasi berkas dalam 2-3 hari kerja.');
  };

  if (view === 'auth') {
    return <AuthView onSuccess={handleAuthSuccess} onBack={() => setView('landing')} initialMode={initialAuthMode} />;
  }

  if (view === 'ai-chat') {
    return <AIChatView psychologists={psychologists} articles={ARTICLES} onBack={() => setView('landing')} onLimitReached={() => setView('pricing')} />;
  }

  if (view === 'article-detail') {
    return (
      <ArticleDetailView 
        article={selectedArticle} 
        onBack={() => setView('landing')} 
        currentUser={currentUser}
        onStart={handleStart}
        onAuth={(mode) => { setInitialAuthMode(mode); setView('auth'); }}
        onLogout={handleLogout}
      />
    );
  }

  if (view === 'psychologist-detail') {
    return (
      <PsychologistDetailView 
        psy={selectedPsyForDetail} 
        onBack={() => setView('landing')} 
        onChat={() => handleStartChatFromDetail(selectedPsyForDetail)}
        onVideo={() => handleStartVideoFromDetail(selectedPsyForDetail)}
        isPaid={isPaid}
        currentUser={currentUser}
        onStart={handleStart}
        onAuth={(mode) => { setInitialAuthMode(mode); setView('auth'); }}
        onLogout={handleLogout}
      />
    );
  }

  if (view === 'psychologist-registration') {
    return <PsychologistRegistration onBack={() => setView('landing')} onSubmit={handleRegisterPsychologist} />;
  }

  if (view === 'pricing') {
    return (
      <>
        <PricingView onBack={() => setView('landing')} onSelect={handleSelectPlan} />
        {isPaying && (
          <PaymentModal 
            plan={selectedPlan} 
            onConfirm={confirmPayment} 
            onCancel={() => setIsPaying(false)} 
          />
        )}
      </>
    );
  }

  if (view === 'app') {
    return (
      <DashboardView 
        onBack={() => setView('landing')} 
        psychologists={psychologists} 
        onOpenDetail={handleOpenDetail} 
        isPaid={isPaid} 
        onPay={() => setView('pricing')} 
        currentUser={currentUser}
        onLogout={handleLogout}
      />
    );
  }

  if (view === 'payment-confirmation') {
    return <PaymentConfirmationView onBack={() => setView('landing')} selectedPsy={selectedPsyForVideoCall} />;
  }

  if (view === 'psychologist-selection-video') {
    return (
      <PsychologistSelectionView 
        psychologists={psychologists.filter(p => p.isVerified)} 
        onBack={() => setView('landing')} 
        onSelect={handleSelectPsyForVideo} 
      />
    );
  }

  return (
    <div className="min-h-screen gradient-mesh">
      <Navbar 
        onStart={handleStart} 
        currentUser={currentUser} 
        onAuth={(mode) => { setInitialAuthMode(mode); setView('auth'); }} 
        onLogout={handleLogout} 
      />

      {/* Floating AI Chat Trigger */}
      <motion.button 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleStartChatbot}
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center group overflow-hidden border-4 border-white"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        <Bot className="w-7 h-7 relative z-10" />
        <div className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
        </div>
      </motion.button>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-xs font-bold mb-6 tracking-wide uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Safe & Anonim
            </div>
            <h1 className="text-6xl lg:text-[100px] font-bold text-gray-900 mb-8 leading-[0.88] tracking-[-0.04em]">
              Safe Space <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">Buat Curhat</span>
            </h1>
            <p className="text-xl text-gray-500 mb-10 max-w-lg leading-relaxed font-medium">
              Gak perlu nunggu antri. Langsung ngobrol bareng psikolog berlisensi dengan tampilan chat yang santai and harga <span className="text-gray-900 border-b-2 border-pink-200">sekelas kopi senja</span>.
            </p>
            <div className="flex items-center gap-2 mb-10 text-sm font-semibold text-purple-600/80">
              <Shield className="w-4 h-4" />
              <span>Privasi Terjamin • Aman • No Judgement</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleStart}
                className="px-8 py-5 bg-gray-900 text-white rounded-3xl font-bold shadow-2xl shadow-purple-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 text-lg"
              >
                Mulai Konsultasi <ArrowRight className="w-6 h-6" />
              </button>
              <button 
                onClick={handleStartChatbot}
                className="px-8 py-5 bg-white text-purple-600 border-2 border-purple-100 rounded-3xl font-bold hover:bg-purple-50 transition-all flex items-center gap-3 text-lg"
              >
                Tanya AI EMOVA <Sparkles className="w-6 h-6 text-purple-500" />
              </button>
            </div>
            
            <div className="mt-16 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Anya",
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Sasha",
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo"
                ].map((avatar, i) => (
                  <img key={i} src={avatar} className="w-12 h-12 rounded-full border-[3px] border-white shadow-md bg-purple-50" alt="User" referrerPolicy="no-referrer" />
                ))}
              </div>
              <div className="text-sm font-medium text-gray-400">
                Sudah <span className="text-gray-900 font-bold">25,000+</span> jiwa tenang bareng kami
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl skew-x-[-2deg] border-[12px] border-white group">
              <img 
                src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=2069" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                alt="Safe Space Atmosphere"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent"></div>
              
              {/* Floating Chat Bubble Illustration */}
              <div className="absolute bottom-10 left-10 right-10 glass-card p-6 rounded-3xl border-white/40 shadow-xl overflow-hidden group-hover:translate-y-[-10px] transition-transform backdrop-blur-md bg-white/60">
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center text-white">
                      <MessageCircle className="w-6 h-6" />
                   </div>
                   <p className="font-bold text-gray-900">Dr. Sarah menyapa...</p>
                </div>
                <p className="text-gray-600 text-sm italic leading-relaxed font-medium">
                  "Halo! Kabar hari ini gimana? Gak papa kok kalau lagi capek, aku di sini dengerin."
                </p>
              </div>
            </div>

            {/* Decorative Orbs */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-400 opacity-20 blur-[80px] rounded-full animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400 opacity-20 blur-[80px] rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="py-24 px-6 bg-white/40">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Semua yang kamu butuhin buat didengar dan didukung, di satu tempat.">
            Dibuat untuk <span className="text-purple-600">Jiwa Modern</span>
          </SectionHeading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <FeatureCard 
              icon={Bot} 
              title="AI Chatbot"
              description="Diskusi awal bareng AI buat dapet rekomendasi psikolog atau artikel yang pas."
              color="bg-purple-100 text-purple-700"
            />
            <FeatureCard 
              icon={MessageCircle} 
              title="Chat Real-time"
              description="Ngobrol bareng psikolog instan lewat tampilan chat yang udah kamu kenal."
              color="bg-blue-50 text-blue-600"
            />
            <FeatureCard 
              icon={Video} 
              title="Sesi Video"
              description="Interaksi video langsung buat healing yang lebih mendalam lewat sesi 1-on-1."
              color="bg-indigo-50 text-indigo-600"
            />
            <FeatureCard 
              icon={Shield} 
              title="Mode Anonim"
              description="Jaga identitasmu tetep rahasia pas kamu curhat bareng kami."
              color="bg-pink-50 text-pink-600"
            />
            <FeatureCard 
              icon={Clock} 
              title="Sesi Kilat"
              description="Buat momen-momen kecil: sesi terjangkau 15 menit pas kamu butuh."
              color="bg-orange-50 text-orange-600"
            />
          </div>
        </div>
      </section>

      {/* Why Emova */}
      <section className="py-24 px-6 overflow-hidden bg-gray-50/50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-10 leading-tight tracking-tight">
              Kenapa <span className="text-purple-600 underline decoration-pink-300 underline-offset-8">EMOVA</span> kerasa lebih oke?
            </h2>
            <div className="grid gap-8">
              {[
                { title: "Santai & Ramah", desc: "Gak ada kesan kaku kayak di klinik. Kayak ngobrol sama temen yang pinter dengerin.", icon: Smile },
                { title: "Terjangkau & Fleksibel", desc: "Mulai dari harga dua gelas kopi. Gak perlu komitmen gede.", icon: CreditCard },
                { title: "Khas Gen Z", desc: "Kami ngerti masalah overthinking, burnout tugas, dan capek sama medsos.", icon: Heart }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 group hover:translate-x-2 transition-transform">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="grid grid-cols-2 gap-6 relative z-10">
                <div className="space-y-6">
                   <div className="bg-purple-100 rounded-[48px] h-64 overflow-hidden shadow-inner">
                      <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1470" className="w-full h-full object-cover" alt="Community" referrerPolicy="no-referrer" />
                   </div>
                   <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-purple-100/50 border border-purple-50">
                      <div className="flex gap-1 mb-4 text-yellow-400">
                         {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                      </div>
                      <p className="text-gray-700 font-medium italic">"Tempat paling aman buat curhat tanpa di-judge yang pernah aku temuin."</p>
                      <p className="mt-4 text-xs font-bold text-gray-400">— Sarah, Mahasiswi</p>
                   </div>
                </div>
                <div className="space-y-6 pt-12">
                   <div className="bg-blue-600 rounded-[40px] p-8 text-white h-48 flex flex-col justify-end shadow-lg shadow-blue-200">
                      <CheckCircle2 className="w-8 h-8 mb-4 text-blue-200" />
                      <p className="font-bold text-lg leading-tight text-white/90">Dukungan Burnout Mahasiswa</p>
                   </div>
                   <div className="bg-pink-100 rounded-[48px] h-72 overflow-hidden shadow-inner">
                      <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1374" className="w-full h-full object-cover" alt="Psychologist" referrerPolicy="no-referrer" />
                   </div>
                </div>
             </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-200/20 blur-[100px] -z-10 rounded-full"></div>
          </div>
        </div>
      </section>
      <section id="harga" className="py-24 px-6 bg-purple-50/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Kesehatan mental gak harus mahal. Pilih paket yang sesuai sama kantongmu.">
            Healing yang <span className="text-pink-500">Terjangkau</span>
          </SectionHeading>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { type: "Chat Session", price: "Rp20.000", desc: "Curhatan kilat via chat", icon: MessageCircle, color: "border-blue-100" },
              { type: "Video Call", price: "Rp50.000", desc: "Interaksi mendalam 1-on-1", icon: Video, color: "border-purple-200 shadow-xl shadow-purple-100 scale-105 bg-white", featured: true },
              { type: "Premium Monthly Subscription", price: "Rp150.000 / bln", desc: "Akses mood tracking harian & panduan", icon: CreditCard, color: "border-pink-100" }
            ].map((plan, i) => (
              <div key={i} className={cn("rounded-3xl border p-10 transition-all flex flex-col", plan.color)}>
                {plan.featured && <span className="bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-6 uppercase tracking-wider">Paling Populer</span>}
                <div className="mb-6">
                   <plan.icon className={cn("w-10 h-10 mb-4", plan.featured ? "text-purple-600" : "text-gray-400")} />
                   <h3 className="text-xl font-bold text-gray-900">{plan.type}</h3>
                   <p className="text-sm text-gray-500">{plan.desc}</p>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-8">{plan.price}</div>
                <button className={cn(
                  "w-full py-4 rounded-2xl font-bold mt-auto transition-all",
                  plan.featured ? "bg-purple-600 text-white shadow-lg" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                )}
                onClick={handleStart}
                >
                  Pilih Paket
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimoni" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading>Cerita dari <span className="text-purple-600">Komunitas Kami</span></SectionHeading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-sm">
            {[
              { name: "Andini, 21", comment: "Akhirnya ada tempat di mana aku gak ngerasa dihakimi pas overthinking hal-hal kecil. Fitur chat-nya bikin nyaman banget!" },
              { name: "Sarah, 19", comment: "Suka banget fitur anonimnya. Akhirnya bisa cerita soal traumaku tanpa khawatir siapa yang denger." }
            ].map((t, i) => (
              <div key={i} className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm italic text-gray-600 relative">
                <Star className="w-5 h-5 text-yellow-400 absolute top-4 right-4 fill-yellow-400" />
                "{t.comment}"
                <p className="mt-4 not-italic font-bold text-gray-900 opacity-80">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section id="psikolog" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Ngobrol langsung bareng ahli yang siap dengerin ceritamu tanpa menghakimi.">
            Konsultasi <span className="text-purple-600">Profesional</span>
          </SectionHeading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {psychologists.map((dr) => (
              <motion.div 
                key={dr.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => handleOpenDetail(dr)}
                className="p-6 rounded-[40px] bg-white border border-gray-100 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-100/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-5 mb-6">
                  <div className="relative">
                    <img src={dr.avatar} className="w-16 h-16 rounded-2xl object-cover bg-gray-50 shadow-sm" alt={dr.name} />
                    <div className={cn("absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white", dr.isOnline ? "bg-green-500" : "bg-gray-300")} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{dr.name}</h4>
                      <div className="flex items-center text-[10px] font-bold text-yellow-500">
                        <Star className="w-3 h-3 fill-current mr-0.5" /> {dr.rating}
                      </div>
                    </div>
                    <p className="text-xs text-purple-600 font-bold uppercase tracking-wider">{dr.specialization}</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6">
                  {dr.bio}
                </p>
                <div className="flex gap-2">
                  <div className="flex-1 py-3 bg-purple-50 text-purple-600 rounded-xl text-xs font-bold text-center group-hover:bg-purple-600 group-hover:text-white transition-all">
                    Lihat Profil
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Section */}
      <section id="artikel" className="py-24 px-6 bg-white/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
             <div className="max-w-xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Small Wins, <span className="text-pink-500 underline">Healing Tiap Hari</span></h2>
                <p className="text-gray-500">Tips dan wawasan santai buat navigasi perjalanan kesehatan mentalmu.</p>
             </div>
             <button className="flex items-center gap-2 text-purple-600 font-bold hover:gap-3 transition-all">
                Baca semua artikel <ChevronRight className="w-5 h-5" />
             </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTICLES.map((blog, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleSelectArticle(blog)}
                className="group cursor-pointer bg-white p-6 rounded-[40px] border border-gray-100 hover:shadow-2xl hover:shadow-purple-100 transition-all duration-500"
              >
                <div className="aspect-[16/10] rounded-[32px] mb-6 overflow-hidden relative shadow-sm flex items-center justify-center bg-gray-50">
                   <img 
                    src={blog.img} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={blog.title} 
                    referrerPolicy="no-referrer" 
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className={cn("text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest", blog.color)}>
                    {blog.category}
                  </span>
                  <span className="text-[10px] font-medium text-gray-400">5 min read</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors leading-tight">
                  {blog.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {blog.desc}
                </p>
                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center gap-2 text-purple-600 font-bold text-sm group-hover:gap-3 transition-all">
                  Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 text-white/5 opacity-5 pointer-events-none flex items-center justify-center overflow-hidden">
           <Lock className="w-[800px] h-[800px] -rotate-12" />
        </div>
        <div className="max-w-7xl mx-auto rounded-[64px] bg-gray-900 p-12 lg:p-24 text-white relative overflow-hidden shadow-2xl z-10">
          <div className="relative z-10 lg:flex items-center justify-between gap-16">
            <div className="max-w-xl mb-12 lg:mb-0">
               <div className="inline-flex items-center gap-2 mb-8 text-purple-400">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em]">Keamanan & Kepercayaan</span>
               </div>
               <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">Privasimu adalah <br/><span className="text-purple-400 italic">Janji Suci Kami</span>.</h2>
               <p className="text-gray-400 leading-relaxed text-lg mb-10">
                 Semua data dienkripsi end-to-end. Psikolog kami adalah profesional berlisensi yang diverifikasi oleh badan klinis nasional. Kamu bisa milih buat tetep anonim sepenuhnya tanpa harus spill identitas asli.
               </p>
               <div className="flex items-center gap-6">
                  <div className="flex -space-x-3">
                     {[1,2,3].map(i => (
                        <div key={i} className="w-12 h-12 rounded-full border-2 border-gray-800 bg-gray-700 flex items-center justify-center text-gray-400 uppercase text-xs font-bold">
                           {i === 1 ? 'SL' : i === 2 ? 'HP' : 'VA'}
                        </div>
                     ))}
                  </div>
                  <div className="h-10 w-[1px] bg-white/10"></div>
                  <div className="text-xs text-gray-400 font-medium">
                     Telah diverifikasi oleh <span className="text-white font-bold">Himpunan Psikologi Indonesia (HIMPSI)</span>
                  </div>
               </div>
            </div>
            <div className="lg:w-1/3 grid grid-cols-2 gap-6">
               {[Shield, Lock, Heart, CheckCircle2].map((Icon, idx) => (
                  <div key={idx} className="group bg-white/5 border border-white/10 rounded-[32px] p-8 flex flex-col items-center justify-center aspect-square text-center hover:bg-white/10 transition-all cursor-default text-white">
                     <Icon className="w-10 h-10 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                     <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-purple-400 transition-colors">100% Aman</span>
                  </div>
               ))}
            </div>
          </div>
          {/* Decorative stuff logic */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/30 blur-[150px] rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-pink-500/10 blur-[120px] rounded-full"></div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-24 px-6 bg-purple-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10 gap-10">
          <div className="text-white max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Kamu Psikolog? Yuk, Bantu <span className="text-pink-300">Tumbuh Bersama</span>.</h2>
            <p className="text-purple-100 text-lg mb-8 opacity-90">
              Bergabunglah dengan jaringan mitra ahli kami dan gunakan teknologi untuk menjangkau lebih banyak jiwa yang membutuhkan dukunganmu.
            </p>
            <button 
              onClick={() => setView('psychologist-registration')}
              className="px-10 py-5 bg-white text-purple-600 rounded-[32px] font-bold hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-3"
            >
              Daftar Sebagai Mitra <User className="w-6 h-6" />
            </button>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <div className="w-80 h-80 bg-white/10 rounded-full blur-[80px] absolute inset-0"></div>
              <div className="relative z-10 glass-card p-8 rounded-[48px] border-white/20 w-80">
                <div className="flex gap-4 items-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-purple-600 font-bold text-xl">E</div>
                  <div>
                    <p className="text-white font-bold">EMOVA Mitra</p>
                    <p className="text-purple-200 text-xs">Untuk Profesional</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-pink-400"></div>
                  </div>
                  <p className="text-white/80 text-[10px] uppercase tracking-widest font-bold">Total Mitra Aktif: 2.5k+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-500/20 blur-[150px] -z-0 rounded-full translate-x-1/3 -translate-y-1/2"></div>
      </section>

      {/* Footer */}
      <footer className="pt-24 pb-12 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
               <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white fill-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-gray-900">EMOVA</span>
              </div>
              <p className="text-gray-500 text-sm max-w-sm mb-8 leading-relaxed">
                Platform kesehatan mental buat generasi digital. Healing, sharing, dan tumbuh bareng, tenang dan aman.
              </p>
              <div className="flex gap-4">
                 {[Camera, Send, Share2].map((Icon, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-purple-600 hover:border-purple-200 transition-all cursor-pointer">
                       <Icon className="w-5 h-5" />
                    </div>
                 ))}
              </div>
            </div>
            
            <div>
               <h4 className="font-bold text-gray-900 mb-6">Platform</h4>
               <ul className="space-y-4 text-sm text-gray-500">
                  {['Fitur', 'Psikolog', 'Keamanan', 'FAQ'].map(item => (
                    <li key={item} className="hover:text-purple-600 transition-colors cursor-pointer">{item}</li>
                  ))}
               </ul>
            </div>
            
            <div>
               <h4 className="font-bold text-gray-900 mb-6">Kontak</h4>
               <ul className="space-y-4 text-sm text-gray-500">
                  <li className="flex items-center gap-2 cursor-pointer"><MessageCircle className="w-4 h-4" /> support@emova.com</li>
                  <li className="flex items-center gap-2 cursor-pointer"><Clock className="w-4 h-4" /> 24/7 Response Time</li>
               </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-xs text-gray-400">© 2026 EMOVA. Designed for the safe self.</p>
             <button className="text-sm font-bold text-purple-600 flex items-center gap-2">
                Ikuti Workshop Mental Wellness Kami <ArrowRight className="w-4 h-4" />
             </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
