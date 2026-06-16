/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, MapPin, Trophy, ShieldAlert, BadgeInfo, Users, Award, ChevronRight, ChevronLeft, CheckCircle 
} from 'lucide-react';
import { AcademyEvent } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

import kidsPathwayImg from '../assets/images/kids_pathway_player_1781504530272.jpg';
import juniorPathwayImg from '../assets/images/junior_pathway_player_1781504547865.jpg';
import elitePathwayImg from '../assets/images/elite_pathway_player_1781504567042.jpg';
import eliteProPathwayImg from '../assets/images/elitepro_pathway_player_1781504587654.jpg';

interface EventsProps {
  events: AcademyEvent[];
  setCurrentPage: (page: string) => void;
}

function getTranslatedEvent(ev: AcademyEvent, language: 'en' | 'id'): AcademyEvent {
  if (ev.id === 'ev1') {
    return {
      ...ev,
      title: language === 'en' ? 'Bogor Youth Championships' : 'Kejuaraan Futsal Remaja Bogor',
      location: language === 'en' ? 'GOR Pajajaran Arena Sempur' : 'GOR Pajajaran Arena Sempur',
      details: language === 'en' 
        ? 'Our Elite U15 squad fights for the ultimate municipal futsal prestige. General attendance is wide open.' 
        : 'Skuat Elite U15 kami bersaing memperebutkan takhta kasta futsal tertinggi di kota. Penonton diperbolehkan hadir langsung.'
    };
  }
  if (ev.id === 'ev2') {
    return {
      ...ev,
      title: language === 'en' ? 'BFA Elite Friendly Match' : 'Exhibition Sparring Elite BFA',
      location: language === 'en' ? 'GOR Pajajaran - Indoor' : 'Lapangan Futsal Indoor GOR Pajajaran',
      details: language === 'en' 
        ? 'Exhibition sparring against Sukabumi Futsal Academy to test alternative defensive formation variables.' 
        : 'Pertandingan sparring eksibisi melawan Sukabumi Futsal Academy untuk menguji variasi formasi pertahanan tim.'
    };
  }
  if (ev.id === 'ev3') {
    return {
      ...ev,
      title: language === 'en' ? 'Summer Training Camps start' : 'Pembukaan Kamp Latihan Intensif',
      location: language === 'en' ? 'Sempur Outdoor Pitch C' : 'Lapangan Sempur Outdoor C',
      details: language === 'en' 
        ? 'A 6-day immersive physical coordination camp dedicated to youth foundations.' 
        : 'Kamp pelatihan koordinasi fisik mendalam selama 6 hari yang dikhususkan untuk membangun fondasi pemain.'
    };
  }
  return ev;
}

export default function Events({ events, setCurrentPage }: EventsProps) {
  const { language } = useLanguage();
  const [selectedMonth, setSelectedMonth] = useState<string>('July 2026');
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past'>('all');
  const [selectedDay, setSelectedDay] = useState<number | null>(18); // default selection for upcoming tournament

  // Filters events count
  const filteredEvents = events
    .map(ev => getTranslatedEvent(ev, language))
    .filter(ev => {
      if (activeTab === 'all') return true;
      if (activeTab === 'upcoming') return ev.status === 'Upcoming';
      if (activeTab === 'past') return ev.status === 'Past';
      return true;
    });

  // Simulated July 2026 Calendar days matrix (starts on Wednesday)
  const calendarDays = [
    { day: null, hasEvent: false }, { day: null, hasEvent: false }, // empty cells padding
    { day: 1, hasEvent: true }, 
    { day: 2, hasEvent: false }, { day: 3, hasEvent: false }, { day: 4, hasEvent: false }, { day: 5, hasEvent: false },
    { day: 6, hasEvent: false }, { day: 7, hasEvent: false }, { day: 8, hasEvent: false }, { day: 9, hasEvent: false },
    { day: 10, hasEvent: false }, { day: 11, hasEvent: false }, { day: 12, hasEvent: false }, { day: 13, hasEvent: false },
    { day: 14, hasEvent: false }, { day: 15, hasEvent: false }, { day: 16, hasEvent: false }, { day: 17, hasEvent: false },
    { day: 18, hasEvent: true }, 
    { day: 19, hasEvent: false }, { day: 20, hasEvent: false }, { day: 21, hasEvent: false }, { day: 22, hasEvent: false },
    { day: 23, hasEvent: false }, { day: 24, hasEvent: false }, 
    { day: 25, hasEvent: true }, 
    { day: 26, hasEvent: false }, { day: 27, hasEvent: false }, { day: 28, hasEvent: false }, { day: 29, hasEvent: false },
    { day: 30, hasEvent: false }, { day: 31, hasEvent: false }
  ];

  const getEventForDay = (day: number | null) => {
    if (!day) return null;
    let evId = '';
    if (day === 18) evId = 'ev1';
    if (day === 25) evId = 'ev2';
    if (day === 1) evId = 'ev3';
    
    const ev = events.find(e => e.id === evId);
    return ev ? getTranslatedEvent(ev, language) : null;
  };

  const currentDayEvent = getEventForDay(selectedDay);

  // Sunday to Saturday or Wednesday to Tuesday headers
  const dayNames = language === 'en' 
    ? ['W', 'T', 'F', 'S', 'S', 'M', 'T']
    : ['R', 'K', 'J', 'S', 'M', 'S', 'S']; // Rabu, Kamis, Jumat, Sabtu, Minggu, Senin, Selasa

  const translatedMonthStr = language === 'en' ? 'July 2026' : 'Juli 2026';

  return (
    <div id="events-view-container" className="glow-entrance">
      
      {/* Editorial Header Banner */}
      <section className="relative pt-32 sm:pt-40 pb-20 bg-secondary-navy border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1200')" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="font-mono text-xs font-bold text-accent-blue uppercase tracking-[0.25em] block mb-3">
            {language === 'en' ? 'ACADEMIC MATCH SCHEDULES & WORKSHOPS' : 'JADWAL TANDING & WORKSHOP AKADEMI'}
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
            {language === 'en' ? 'EVENTS & CALENDAR' : 'KALENDAR EVENT & JADWAL'}
          </h1>
          <p className="text-white/70 max-w-2xl text-xs sm:text-sm leading-relaxed mt-3">
            {language === 'en' 
              ? 'Track our tournament fixtures, parent workshops, friendly exhibition events, and youth training clinics. Come down and support Bogors future champions live!'
              : 'Dapatkan info lengkap turnamen resmi, workshop orang tua, pertandingan persahabatan, serta klinik pelatihan. Hadir dan dukung langsung calon juara masa depan Bogor!'}
          </p>
        </div>
      </section>

      {/* Main interactive grid: Calendar on left, Event details/Filters on right */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Calendar Board Column (Left - 7 cols) */}
          <div className="lg:col-span-7 bg-[#000d21]/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            
            {/* Month Head block */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center space-x-2.5">
                <Calendar className="text-accent-blue" size={20} />
                <h3 className="font-display font-black text-sm sm:text-base text-white uppercase tracking-wider">
                  {language === 'en' ? 'Interactive Fixtures Calendar' : 'Kalender Jadwal Interaktif'}
                </h3>
              </div>
              
              <div className="flex items-center space-x-2 bg-primary-navy/80 border border-white/10 px-3 py-1 rounded-lg font-mono text-xs text-white">
                <button className="opacity-40 hover:opacity-100 min-h-[30px] px-1" title={language === 'en' ? 'Previous Month' : 'Bulan Sebelumnya'}>⟨</button>
                <span className="font-bold uppercase tracking-wider px-2">{translatedMonthStr}</span>
                <button className="opacity-40 hover:opacity-100 min-h-[30px] px-1" title={language === 'en' ? 'Next Month' : 'Bulan Berikutnya'}>⟩</button>
              </div>
            </div>

            {/* Calendar Days grid */}
            <div className="grid grid-cols-7 gap-2 text-center">
              {dayNames.map((dayName, idx) => (
                <span key={idx} className="font-mono text-[10px] font-black text-accent-blue/60 uppercase tracking-widest py-2">
                  {dayName}
                </span>
              ))}

              {calendarDays.map((dt, idx) => {
                const isSelected = selectedDay === dt.day;
                const hasEv = dt.hasEvent;
                
                return (
                  <button
                    key={idx}
                    id={`calendar-day-${dt.day || 'empty-' + idx}`}
                    disabled={!dt.day}
                    onClick={() => dt.day && setSelectedDay(dt.day)}
                    className={`aspect-square sm:p-2 rounded-xl text-xs sm:text-sm font-semibold transition-all relative flex flex-col items-center justify-center min-h-[44px] ${
                      !dt.day 
                        ? 'bg-transparent opacity-0 pointer-events-none' 
                        : isSelected 
                          ? 'bg-accent-blue text-primary-navy font-black shadow-lg shadow-accent-blue/25 scale-105 z-10 cursor-pointer' 
                          : hasEv 
                            ? 'bg-accent-blue/15 text-accent-blue border border-accent-blue/30 hover:bg-accent-blue/25 cursor-pointer' 
                            : 'bg-secondary-navy/20 hover:bg-secondary-navy/60 text-white/70 cursor-pointer'
                    }`}
                  >
                    <span>{dt.day}</span>
                    {hasEv && !isSelected && (
                      <span className="absolute bottom-1 bg-accent-blue h-1 w-1 rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Helper block for Selected Day */}
            <div className="bg-primary-navy/40 p-4 rounded-2xl border border-white/5 space-y-3">
              <h5 className="font-mono text-[10px] font-bold text-white/50 uppercase tracking-wider flex items-center gap-1.5 leading-none">
                <BadgeInfo size={13} className="text-accent-blue" />
                {language === 'en' ? 'Active date selection details:' : 'Detail tanggal yang Anda pilih:'}
              </h5>
              
              {currentDayEvent ? (
                <div className="flex items-center justify-between text-xs sm:text-sm gap-4">
                  <div>
                    <span className="font-display font-black text-white uppercase text-xs sm:text-sm block">
                      {currentDayEvent.title}
                    </span>
                    <span className="block text-[10px] font-mono text-white/40 mt-1 uppercase">
                      {language === 'en' ? 'Type' : 'Jenis'}: {currentDayEvent.type} • {language === 'en' ? 'Venue' : 'Tempat'}: {currentDayEvent.location}
                    </span>
                  </div>
                  
                  <button
                    id="calendar-event-view-more"
                    onClick={() => {
                      const el = document.getElementById(`event-card-${currentDayEvent.id}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="p-2 text-accent-blue hover:text-white transition-all text-xs font-bold uppercase tracking-wider flex items-center min-h-[44px] shrink-0"
                  >
                    <span>{language === 'en' ? 'View Detail' : 'Lihat Detail'}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              ) : (
                <p className="text-white/40 text-xs font-mono">
                  {language === 'en' 
                    ? `No main events scheduled for July ${selectedDay || ''}. Select any highlighted blue date above.` 
                    : `Tidak ada agenda utama pada tanggal ${selectedDay || ''} Juli. Silakan klik tanggal berwarna biru di atas.`}
                </p>
              )}
            </div>

          </div>

          {/* List display and filters section (Right - 5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Page Filters tabs */}
            <div className="bg-[#000d21]/60 p-1.5 rounded-2xl border border-white/10 flex items-center gap-1 w-full text-center">
              {[
                { id: 'all', label: language === 'en' ? 'All Items' : 'Semua Event' },
                { id: 'upcoming', label: language === 'en' ? 'Upcoming Only' : 'Mendatang' },
                { id: 'past', label: language === 'en' ? 'Match Results' : 'Hasil Tanding' }
              ].map(tab => (
                <button
                  key={tab.id}
                  id={`event-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full py-2.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider transition-all cursor-pointer min-h-[40px] ${
                    activeTab === tab.id
                      ? 'bg-accent-blue text-primary-navy font-black'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Scoreboard highlights block (displaying past events nicely) */}
            {activeTab !== 'upcoming' && (
              <div className="bg-gradient-to-br from-[#0c234a] to-primary-navy p-5 rounded-2xl border border-accent-blue/30 space-y-4">
                <span className="text-[10px] bg-accent-blue/15 border border-accent-blue/30 text-accent-blue font-mono px-2.5 py-1 rounded uppercase tracking-wider font-extrabold leading-none inline-block">
                  {language === 'en' ? 'LATEST FIELD SCORE DIRECTORY' : 'DIREKTORI HASIL SKOR AKHIR TERBARU'}
                </span>
                
                <div className="flex items-center justify-between text-center py-2">
                  <div className="space-y-1">
                    <span className="h-9 w-9 bg-accent-blue flex items-center justify-center rounded-lg font-display font-black text-primary-navy text-xs mx-auto">BF</span>
                    <span className="block font-display font-black text-xs text-white uppercase tracking-tight">BFA U18</span>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="font-display font-black text-2xl text-white tracking-widest">
                      5 : 3
                    </span>
                    <span className="block text-[8px] font-mono text-green-400 uppercase tracking-widest">{language === 'en' ? 'FINAL WINNER' : 'PEMENANG UTAMA'}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="h-9 w-9 bg-[#E1E5E8] flex items-center justify-center rounded-lg font-display font-black text-primary-navy text-[10px] mx-auto">BR</span>
                    <span className="block font-display font-black text-xs text-white/50 uppercase tracking-tight">BANDUNG R.</span>
                  </div>
                </div>

                <p className="text-[11px] text-white/70 font-sans leading-relaxed text-center">
                  {language === 'en'
                    ? 'BFA U18 clinched the gold trophy after scoring three outstanding clean goals during 2nd half fast transitions.'
                    : 'BFA U18 berhasil mengunci piala emas setelah melesakkan tiga gol bersih luar biasa melalui keunggulan transisi cepat di babak kedua.'}
                </p>
              </div>
            )}

            <div className="bg-secondary-navy/20 p-5 rounded-2xl border border-white/5">
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                {language === 'en' ? 'Quick Info Contacts' : 'Kontak Cepat Laga Uji Coba'}
              </h4>
              <p className="text-white/60 text-xs mt-1">
                {language === 'en'
                  ? 'If your school desires friendly sparring matches against BFA age squads, submit a coordinate request via the contact desk.'
                  : 'Jika sekolah atau akademi Anda ingin menyelenggarakan uji coba persahabatan melawan skuat BFA, kirim formulir permintaan sparring di sini.'}
              </p>
              <button 
                onClick={() => setCurrentPage('contact')} 
                className="mt-3 text-xs font-semibold text-accent-blue hover:underline uppercase flex items-center min-h-[40px] cursor-pointer"
              >
                {language === 'en' ? 'Inquire Sparring Form ➜' : 'Kirim Pengajuan Sparring ➜'}
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Seasonal Tournament Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="space-y-12">
          
          {/* Header block with official branding colors */}
          <div className="space-y-4">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-accent-blue uppercase tracking-tight">
              {language === 'en' ? 'Seasonal Tournament' : 'Kejuaraan Musiman & Pembinaan Liga'}
            </h2>
            <p className="text-white/80 text-xs sm:text-sm font-sans leading-relaxed max-w-5xl">
              {language === 'en'
                ? 'In addition to participating in official academy internal league matches such as LIGA AAFI, BOGOR FA also regularly competes in prestigious tournaments around Bogor City across all youth age divisions, including: AFKOT Bogor League, PSSI Cup Bogor, Summer Football Fest, and more.'
                : 'Selain mengikuti event resmi lingkup akademi seperti LIGA AAFI, BOGOR FA juga mengikuti kejuaraan-kejuaraan lain di Kota Bogor di semua kategori usia seperti : Liga AFKOT Bogor, PSSI Cup Bogor, Summer Football Fest, dan kejuaraan lainnya.'}
            </p>
          </div>

          {/* 4-Column responsive poster cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Card 1: U-8 */}
            <div className="flex flex-col items-center">
              <div className="w-full relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 hover:border-accent-blue/40 shadow-lg group transition-all duration-350">
                <img 
                  src={kidsPathwayImg} 
                  alt="U-8 Squad - Summer Football Fest" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-black text-2xl sm:text-2xl text-white hover:text-accent-blue transition-colors tracking-wider uppercase mt-4 block">
                U-8
              </span>
            </div>

            {/* Card 2: U-10 */}
            <div className="flex flex-col items-center">
              <div className="w-full relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 hover:border-accent-blue/40 shadow-lg group transition-all duration-350">
                <img 
                  src={juniorPathwayImg} 
                  alt="U-10 Squad - PSSI Cup Bogor" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-black text-2xl sm:text-2xl text-white hover:text-accent-blue transition-colors tracking-wider uppercase mt-4 block">
                U-10
              </span>
            </div>

            {/* Card 3: U-13 */}
            <div className="flex flex-col items-center">
              <div className="w-full relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 hover:border-accent-blue/40 shadow-lg group transition-all duration-350">
                <img 
                  src={elitePathwayImg} 
                  alt="U-13 Squad - PSSI Cup 2026 Bogor" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-black text-2xl sm:text-2xl text-white hover:text-accent-blue transition-colors tracking-wider uppercase mt-4 block">
                U-13
              </span>
            </div>

            {/* Card 4: U-16 */}
            <div className="flex flex-col items-center">
              <div className="w-full relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 hover:border-accent-blue/40 shadow-lg group transition-all duration-350">
                <img 
                  src={eliteProPathwayImg} 
                  alt="U-16 Squad - Liga AFKOT Bogor 2025" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-black text-2xl sm:text-2xl text-white hover:text-accent-blue transition-colors tracking-wider uppercase mt-4 block">
                U-16
              </span>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
