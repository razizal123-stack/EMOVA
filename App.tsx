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
  Wallet
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Navbar = ({ onStart }: { onStart: () => void }) => {
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
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">EMOVA</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Fitur", "Harga", "Testimoni", "Artikel"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors">
              {item}
            </a>
          ))}
          <button 
            onClick={onStart}
            className="px-5 py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-full hover:bg-purple-700 transition-all shadow-lg shadow-purple-200"
          >
            Mulai Ceritamu
          </button>
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
            <div className="flex flex-col gap-4">
              {["Fitur", "Harga", "Testimoni", "Artikel"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-800">
                  {item}
                </a>
              ))}
              <button 
                onClick={() => { setIsOpen(false); onStart(); }}
                className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold"
              >
                Mulai Ceritamu
              </button>
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
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Pembayaran Berhasil!</h3>
              <p className="text-gray-500 max-w-sm mb-8">
                Keren! Pembayaranmu sudah kami terima. Kamu akan segera dialihkan ke ruang curhat.
              </p>
              <div className="flex items-center gap-2 text-purple-600 font-bold">
                 <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                 Menyiapkan ruangan...
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
    { type: "Sesi Chat", basePrice: "Rp35.000", desc: "Curhatan kilat via chat", icon: MessageCircle, color: "border-blue-100" },
    { type: "Video Call", basePrice: "Rp125.000", desc: "Interaksi mendalam 1-on-1", icon: Video, color: "border-purple-200 shadow-xl shadow-purple-100 bg-white", featured: true },
    { type: "Langganan", basePrice: "Rp75.000", desc: "Akses mood tracking & panduan", icon: CreditCard, color: "border-pink-100" }
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

const DashboardView = ({ onBack, psychologists }: { onBack: () => void, psychologists: any[] }) => {
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#FDFCFD] flex flex-col md:flex-row"
    >
      {/* Sidebar */}
      <div className="w-full md:w-24 bg-white border-r border-gray-100 flex md:flex-col items-center py-4 md:py-8 px-4 justify-between md:justify-start gap-8 z-20">
        <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg cursor-pointer" onClick={onBack}>
          <Heart className="w-6 h-6 fill-white" />
        </div>
        
        <div className="flex md:flex-col gap-6">
          {[
            { id: 'chat', icon: MessageCircle },
            { id: 'users', icon: User },
            { id: 'mood', icon: Smile },
            { id: 'settings', icon: Lock }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                activeTab === item.id ? "bg-purple-100 text-purple-600 shadow-sm" : "text-gray-400 hover:text-purple-400"
              )}
            >
              <item.icon className="w-6 h-6" />
            </button>
          ))}
        </div>

        <div className="md:mt-auto">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-10 h-10 rounded-full border-2 border-purple-200" />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* User List / Explorer */}
        <div className="w-full md:w-80 border-r border-gray-100 bg-white overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Konsultasi</h2>
            <div className="space-y-4">
              {psychologists.map((dr) => (
                <div 
                  key={dr.id} 
                  onClick={() => setSelectedPsycId(dr.id)}
                  className={cn(
                    "flex items-center gap-4 p-3 rounded-2xl transition-colors cursor-pointer group",
                    selectedPsycId === dr.id ? "bg-purple-100" : "hover:bg-purple-50"
                  )}
                >
                  <div className="relative">
                    <img src={dr.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${dr.name}`} className="w-12 h-12 rounded-2xl bg-gray-100" />
                    <div className={cn("absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white", dr.isVerified ? "bg-green-500" : "bg-orange-500")} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{dr.name}</h4>
                    <p className="text-[10px] text-gray-400">{dr.specialization} {dr.isVerified ? '• Terverifikasi' : '• Pending'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-purple-50/30 flex flex-col relative">
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
  const [view, setView] = useState<'landing' | 'pricing' | 'app' | 'psychologist-registration'>('landing');
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [psychologists, setPsychologists] = useState([
    { 
      id: '1', 
      name: 'Dr. Sarah', 
      specialization: 'Kecemasan & Depresi', 
      bio: 'Berpengalaman 10 tahun membantu Gen Z menavigasi Quarter Life Crisis.', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', 
      isVerified: true,
      welcome: "Halo! Selamat datang di EMOVA. Kamu bisa cerita apa aja hari ini tanpa perlu khawatir.",
      suggestions: ["Cemas berlebih", "Bantu aku tenang", "Tidur gak nyenyak", "Trauma masa lalu"],
      specialtyReplies: [
        "Saya bisa merasakan kepedihanmu. Mari kita atur napas dulu bersama.",
        "Secara psikologis, apa yang kamu alami sangat valid. Bisa ceritakan akarnya?",
        "Mari kita coba teknik grounding untuk meredakan kecemasanmu."
      ]
    },
    { 
      id: '2', 
      name: 'Budi Santoso, M.Psi', 
      specialization: 'Relationship & Karir', 
      bio: 'Pakar hubungan interpersonal dan pengembangan diri.', 
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi', 
      isVerified: true,
      welcome: "Halo, saya Budi. Mari kita cari jalan keluar bersama untuk masalahmu.",
      suggestions: ["Burnout kerja", "Bingung arah hidup", "Mau produktif", "Breakdown masalah"],
      specialtyReplies: [
        "Sangat menarik. Langkah kecil apa yang sudah kamu coba hari ini?",
        "Mari kita bedah masalahmu jadi bagian-bagian yang lebih kecil dan bisa dikelola.",
        "Hidup memang penuh tantangan, tapi setiap masalah punya solusi strategis."
      ]
    },
  ]);

  const handleStart = () => setView('pricing');
  
  const handleSelectPlan = (plan: any) => {
    setSelectedPlan(plan);
    setIsPaying(true);
  };

  const confirmPayment = () => {
    setIsPaying(false);
    setView('app');
  };

  const handleRegisterPsychologist = (newPsy: any) => {
    setPsychologists(prev => [...prev, { ...newPsy, id: Date.now().toString(), isVerified: false }]);
    setView('landing');
    alert('Terima kasih! Lamaran Anda telah kami terima. Tim EMOVA akan melakukan verifikasi berkas dalam 2-3 hari kerja.');
  };

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
    return <DashboardView onBack={() => setView('landing')} psychologists={psychologists} />;
  }

  return (
    <div className="min-h-screen gradient-mesh">
      <Navbar onStart={handleStart} />

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
              Gak perlu nunggu antri. Langsung ngobrol bareng psikolog berlisensi dengan tampilan chat yang santai dan harga <span className="text-gray-900 border-b-2 border-pink-200">sekelas kopi senja</span>.
            </p>
            <div className="flex items-center gap-2 mb-10 text-sm font-semibold text-purple-600/80">
              <Shield className="w-4 h-4" />
              <span>Privasi Terjamin • Aman • No Judgement</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleStart}
                className="px-10 py-5 bg-gray-900 text-white rounded-3xl font-bold shadow-2xl shadow-purple-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 text-lg"
              >
                Mulai Ceritamu Sekarang <ArrowRight className="w-6 h-6" />
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              color="bg-purple-50 text-purple-600"
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
              { type: "Sesi Chat", price: "Rp20k - 50k", desc: "Curhatan kilat via chat", icon: MessageCircle, color: "border-blue-100" },
              { type: "Video Call", price: "Rp50k - 150k", desc: "Interaksi mendalam 1-on-1", icon: Video, color: "border-purple-200 shadow-xl shadow-purple-100 scale-105 bg-white", featured: true },
              { type: "Langganan Bulanan", price: "Rp50k - 100k", desc: "Akses mood tracking harian & panduan", icon: CreditCard, color: "border-pink-100" }
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
              { name: "Rizky, 23", comment: "Pas baru lulus nyari kerja, kecemasan bener-bener nyata. Sesi EMOVA ngebantu aku tetep tenang." },
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
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Cara Atasi Overthinking", category: "Self-Help", color: "bg-blue-100 text-blue-700", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1520" },
              { title: "Tanda Kamu Butuh Rehat", category: "Kesehatan Mental", color: "bg-purple-100 text-purple-700", img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1470" },
              { title: "Tips Self-Healing buat Gen Z", category: "Panduan", color: "bg-pink-100 text-pink-700", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1499" }
            ].map((blog, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-video rounded-3xl mb-6 overflow-hidden relative shadow-md flex items-center justify-center bg-gray-100">
                   <img src={blog.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={blog.title} referrerPolicy="no-referrer" />
                </div>
                <span className={cn("text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest", blog.color)}>{blog.category}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-4 group-hover:text-purple-600 transition-colors leading-tight">{blog.title}</h3>
              </div>
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
