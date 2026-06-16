/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, ShieldCheck, Mail, Calendar, UserCheck, Star, Sparkles, PhoneCall, ChevronRight, X 
} from 'lucide-react';
import { Coach } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface CoachesProps {
  coaches: Coach[];
  setCurrentPage: (page: string) => void;
}

function getTranslatedCoach(c: Coach, language: 'en' | 'id'): Coach {
  if (c.id === 'c1') {
    return {
      ...c,
      position: language === 'en' ? 'Head Coach & Technical Director' : 'Pelatih Kepala & Direktur Teknis',
      license: language === 'en' ? 'AFC Futsal Level 2 License' : 'Lisensi AFC Futsal Tingkat 2',
      experience: language === 'en' ? '12 Years Professional Coaching' : '12 Tahun Melatih Profesional',
      specialization: language === 'en' ? 'Tactical Playbook & Youth Pathway' : 'Taktik Permainan & Jalur Pengembangan Usia Muda',
      achievements: language === 'en' ? [
        'Led West Java Futsal Team to Gold Medal at National Games (PON)',
        'Former Professional Futsal Player (Pro Futsal League Ind.)',
        'Certified Youth Elite Coach'
      ] : [
        'Membawa Skuat Futsal Jabar Meraih Medali Emas di PON',
        'Mantan Pemain Futsal Profesional (Liga Pro Futsal Indonesia)',
        'Pelatih Muda Elite Bersertifikasi'
      ],
      bio: language === 'en'
        ? "Coach Andra believes that disciplined practice and understanding the tactical rhythms of the game are what separate great players from champions. He spent a decade playing at the national level before dedicating his life to cultivating West Java's future elite athletes."
        : "Coach Andra meyakini bahwa latihan disiplin dan pemahaman ritme taktik permainan adalah pembeda utama antara pemain hebat dengan sang juara. Beliau berkarier selama satu dekade di tingkat nasional sebelum mendedikasikan hidupnya untuk membina bibit-bibit atlet elite Jawa Barat."
    };
  }
  if (c.id === 'c2') {
    return {
      ...c,
      position: language === 'en' ? 'Elite Performance Lead Coach' : 'Pelatih Utama Performa Elite',
      license: language === 'en' ? 'AFC Futsal Level 1 License' : 'Lisensi AFC Futsal Tingkat 1',
      experience: language === 'en' ? '8 Years Development Coaching' : '8 Tahun Melatih Pengembangan Bakat',
      specialization: language === 'en' ? 'Technical Speed, Footwork & Ball Mastery' : 'Kecepatan Teknik, Kontak Kaki & Penguasaan Bola',
      achievements: language === 'en' ? [
        'Developed 14 players currently signed to Pro League Academies',
        'Futsal tactics panelist for regional sports programs'
      ] : [
        'Mengembangkan 14 pemain yang kini dikontrak Akademi Liga Profesional',
        'Panelis taktik futsal untuk program olahraga regional'
      ],
      bio: language === 'en'
        ? "Focusing on split-second control and decision making, Coach Rian pushes U13 to U18 players to reach their maximum athletic potential. His sessions are intense, extremely structured, and completely ball-centric."
        : "Fokus pada kontrol sepersekian detik dan pengambilan keputusan cepat, Coach Rian memotivasi pemain usia U13 hingga U18 untuk mencapai potensi atletik maksimal mereka. Sesi latihannya berlangsung intens, sangat terstruktur, dan sepenuhnya berpusat pada penguasaan bola."
    };
  }
  if (c.id === 'c3') {
    return {
      ...c,
      position: language === 'en' ? 'Youth Development Coordinator (U6 - U12)' : 'Koordinator Pengembangan Usia Dini (U6 - U12)',
      license: language === 'en' ? 'S-C License / Youth Grassroots Specialist' : 'Lisensi Pelatih C / Spesialis Pembinaan Usia Dini',
      experience: language === 'en' ? '6 Years Grassroots Coaching' : '6 Tahun Melatih Usia Dini',
      specialization: language === 'en' ? 'Motor Skills, Agility & Mental Preparedness' : 'Keterampilan Motorik, Kelincahan & Kesiapan Mental',
      achievements: language === 'en' ? [
        'Pioneered the "Fun Futsal" play-centric learning program in Bogor schools',
        'Certified Senior Instructor for physical education'
      ] : [
        'Memelopori program belajar terpusat gerak ramah anak "Fun Futsal" di sekolah-sekolah Bogor',
        'Instruktur Senior Bersertifikasi untuk pendidikan jasmani'
      ],
      bio: language === 'en'
        ? "Siti is passionate about introducing the absolute joy of futsal to children at their earliest developmental stages. She builds confidence, motor skills, and robust collaboration guidelines that extend far beyond the pitch."
        : "Siti memiliki dedikasi besar untuk mengenalkan kesenangan bermain futsal kepada anak-anak pada masa keemasan usia dini mereka. Beliau membangun rasa percaya diri, ketangkasan motorik, serta kerja sama tim yang solid yang bernilai tinggi bahkan di luar lapangan."
    };
  }
  if (c.id === 'c4') {
    return {
      ...c,
      position: language === 'en' ? 'Academy Physiotherapist & Conditioning Coach' : 'Fisioterapis Akademi & Pelatih Fisik',
      license: language === 'en' ? 'M.Sc. Sports Medicine / Performance Physio' : 'Gelar M.Sc. Kedokteran Olahraga / Fisioterapis Performa',
      experience: language === 'en' ? '10 Years Sports Rehab' : '10 Tahun Rehabilitasi Olahraga',
      specialization: language === 'en' ? 'Injury Prevention, Strength & Conditioning' : 'Pencegahan Cedera, Kekuatan & Pengondisian Fisik',
      achievements: language === 'en' ? [
        'Official Medical Team Member for Bogor Regional Olympics delegation',
        'Expert in short-muscle fatigue rehabilitation'
      ] : [
        'Anggota Resmi Tim Medis untuk delegasi Pekan Olahraga Daerah Bogor',
        'Spesialis dalam pemulihan kelelahan otot jangka pendek'
      ],
      bio: language === 'en'
        ? "Dr. Teddy designs individual recovery and core-strength programs ensuring academy players perform at 100% capacity while preventing common knee and ankle stress issues common to futsal court surfaces."
        : "Dr. Teddy merancang program pemulihan individu dan latihan kekuatan otot inti guna memastikan bahwa seluruh atlet akademi tampil 100% prima sembari mencegah risiko cedera lutut dan pergelangan kaki di lapangan futsal."
    };
  }
  return c;
}

export default function Coaches({ coaches, setCurrentPage }: CoachesProps) {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

  // Filters the coaches based on category choice
  const filteredCoaches = coaches
    .map(c => getTranslatedCoach(c, language))
    .filter(c => {
      if (selectedCategory === 'All' || selectedCategory === 'Semua') return true;
      if (selectedCategory === 'Tactical') return c.position.includes('Head') || c.position.includes('Pelatih Kepala') || c.position.includes('Elite') || c.position.includes('Performa');
      if (selectedCategory === 'Youth') return c.position.includes('Youth') || c.position.includes('Dini') || c.license.includes('Grassroots') || c.license.includes('Usia Dini');
      if (selectedCategory === 'Medical') return c.position.includes('Physio') || c.position.includes('Fisio') || c.position.includes('Rehab') || c.position.includes('Fisik');
      return true;
    });

  return (
    <div id="coaches-view-container" className="glow-entrance">
      
      {/* Editorial Hero Banner */}
      <section className="relative pt-32 sm:pt-40 pb-20 bg-secondary-navy border-b border-white/10 overflow-hidden">
        {/* Changed background image to an active soccer training field image with training cones and team activity */}
        <div className="absolute inset-0 opacity-15 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80&w=1200')" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="font-mono text-xs font-bold text-accent-blue uppercase tracking-[0.25em] block mb-3">
            {language === 'en' ? 'TECHNICAL LEADERSHIP & ACCREDITED PEDAGOGY' : 'KEPEMIMPINAN TEKNIS & PEDAGOGI TERAKREDITASI'}
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
            {language === 'en' ? 'COACHES & STAFF' : 'PELATIH & STAF AHLI'}
          </h1>
          <p className="text-white/70 max-w-2xl text-xs sm:text-sm leading-relaxed mt-3">
            {language === 'en' 
              ? 'Our staff members are certified directly by the Asian Football Confederation (AFC) and the Indonesian Futsal Federation. We operate on professional athletic guidelines ensuring maximum tactical and safety progression.'
              : 'Staf pelatih kami tersertifikasi langsung oleh Konfederasi Sepak Bola Asia (AFC) dan Federasi Futsal Indonesia. Kami bekerja berdasarkan pedoman atletik profesional guna menjamin kemajuan taktis serta keselamatan atlet secara maksimal.'}
          </p>
        </div>
      </section>

      {/* Head Coach Editorial Message Box */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="director-message-card bg-gradient-to-br from-secondary-navy to-[#000d21] rounded-3xl p-6 sm:p-10 border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-4 max-w-sm mx-auto lg:mx-0">
            {/* Added solid fallback, z-index, and drop shadows to ensure white text and red details in first card are 100% visible and un-obscured */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-accent-blue/30 aspect-square lg:aspect-auto lg:h-[350px]">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=500" 
                alt="Head Coach Andra Wijaya" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-transparent to-transparent opacity-85 z-0" />
              <div className="absolute bottom-4 left-4 right-4 text-center z-10 bg-black/40 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                <span className="director-card-position font-mono text-[9px] text-[#64B5E6] !text-[#64B5E6] font-black tracking-widest uppercase block mb-1 drop-shadow-md">
                  {language === 'en' ? 'FOUNDER & DIRECTOR' : 'PENDIRI & DIREKTUR'}
                </span>
                <h4 className="director-card-name font-display font-black text-xs sm:text-sm text-white !text-white uppercase tracking-tight drop-shadow-md">
                  COACH ANDRA WIJAYA
                </h4>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-accent-blue/10 border border-accent-blue/20 px-3 py-1 rounded-full text-accent-blue font-mono text-[10px] font-bold uppercase tracking-wider">
              <Sparkles size={14} />
              <span>{language === 'en' ? 'Technical Director Message' : 'Pesan Direktur Teknis'}</span>
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3.5xl text-white uppercase tracking-tight leading-tighter">
              {language === 'en' 
                ? '“DISCIPLINE IS THE SEED; CHAMPIONS ARE THE HARVEST.”' 
                : '“KEDISIPLINAN ADALAH BENIHNYA; PARA JUARA ADALAH HASIL PANENNYA.”'}
            </h3>
            
            <p className="text-white/80 font-sans text-xs sm:text-sm leading-relaxed">
              {language === 'en'
                ? 'Welcome to Bogor Futsal Academy. My absolute priority when designing this sports pathway was ensuring our curriculum does not simulate simple, uncoordinated kick-around play. Futsal requires extreme visual tracking, split-second speed adjustments, and rigorous physical coordination.'
                : 'Selamat Datang di Bogor Futsal Academy. Prioritas utama saya ketika merancang pembinaan olahraga ini adalah memastikan kurikulum latihan kami tidak sekadar meniru permainan sepak bola santai yang tidak terkoordinasi. Futsal menuntut fokus visual yang tajam, penyesuaian kecepatan sepersekian detik, serta koordinasi fisik yang disiplin.'}
            </p>
            <p className="text-white/80 font-sans text-xs sm:text-sm leading-relaxed">
              {language === 'en'
                ? 'We look at player development as an investment in character, timing, and structural intelligence. Whether your child aspires to play professionally in the Pro Futsal League of Indonesia, or they simply want to develop high-level coordinate reflexes alongside disciplined team habits—BFA provides the absolute environment of excellence.'
                : 'Kami melihat pengembangan pemain sebagai investasi dalam pembentukan karakter, ketepatan waktu, dan kecerdasan taktis lapangan. Baik anak Anda bercita-cita bermain secara profesional di Liga Futsal Profesional Indonesia, atau sekadar ingin melatih koordinasi refleks motorik tinggi bersamaan dengan kebiasaan tim yang disiplin—BFA menyediakan ekosistem keunggulan terbaik.'}
            </p>

            <div className="flex items-center space-x-4 pt-4 border-t border-white/5 font-mono text-xs text-white/50">
              <div>
                <span className="font-bold text-white block">Coach Andra Wijaya</span>
                <span className="text-[11px] text-accent-blue/80">
                  {language === 'en' 
                    ? 'AFC Futsal Level 2 License Holder • Ex-PON Coach' 
                    : 'Pemegang Lisensi AFC Futsal Level 2 • Mantan Pelatih PON'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Filtering Tabs */}
      <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="flex w-full items-center justify-between flex-wrap gap-4">
          <h4 className="font-mono text-xs font-bold text-white/40 uppercase tracking-widest">
            {language === 'en' ? 'FILTER ACADEMY SQUAD OFFICERS:' : 'SARING MENURUT BIDANG STAF:'}
          </h4>
          
          <div className="flex items-center bg-[#000d21]/60 p-1 rounded-lg border border-white/10 overflow-x-auto scrollbar-none gap-1">
            {[
              { id: 'All', label: language === 'en' ? 'All Staff' : 'Semua Staf' },
              { id: 'Tactical', label: language === 'en' ? 'Tactical Lead Coaches' : 'Pelatih Kepala Taktis' },
              { id: 'Youth', label: language === 'en' ? 'Youth Grassroots Team' : 'Pembinaan Usia Dini' },
              { id: 'Medical', label: language === 'en' ? 'Medical & Conditioning' : 'Medis & Fisik' }
            ].map(tab => (
              <button
                key={tab.id}
                id={`filter-btn-${tab.id}`}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded font-display text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer min-h-[35px] whitespace-nowrap ${
                  selectedCategory === tab.id
                    ? 'bg-accent-blue text-primary-navy font-black'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredCoaches.map((c) => (
            <div 
              key={c.id} 
              id={`coach-card-${c.id}`}
              className="coach-card bg-secondary-navy/20 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-accent-blue/30 transition-all flex flex-col justify-between glow-border group"
            >
              
              {/* Photo Area */}
              <div className="relative aspect-square overflow-hidden bg-[#000d21]">
                <img 
                  src={c.imageUrl} 
                  alt={c.name} 
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=500";
                  }}
                />
                
                <div className="coach-photo-overlay absolute inset-0 bg-gradient-to-t from-primary-navy via-transparent to-transparent opacity-80" />
                
                {/* Specific License Floating Tag */}
                <span className="absolute top-4 left-4 bg-accent-blue text-primary-navy font-mono font-black text-[9px] px-2.5 py-1 rounded shadow-md tracking-wider uppercase">
                  {c.license}
                </span>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="coach-card-position font-mono text-[9px] text-accent-blue uppercase tracking-widest block font-extrabold">{c.position}</span>
                  <h4 className="coach-card-name font-display font-black text-lg text-white uppercase tracking-tight mt-0.5">{c.name}</h4>
                </div>
              </div>

              {/* Bio & stats information snippet */}
              <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-3.5">
                  <div className="coach-spec-container grid grid-cols-1 gap-2 border-b border-white/5 pb-3">
                    <span className="coach-stat-label text-white/40 font-mono text-[9px] uppercase tracking-wider block">
                      {language === 'en' ? 'Specialization Field' : 'Bidang Keahlian Spesifik'}
                    </span>
                    <span className="coach-stat-value font-display text-xs font-bold uppercase block text-accent-blue">
                      {c.specialization}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="coach-stat-label text-white/40 font-mono text-[9px] uppercase tracking-wider block">
                      {language === 'en' ? 'Key Achievements' : 'Pencapaian Utama'}
                    </span>
                    <ul className="coach-achievements-list space-y-1 text-white/70 text-[11px] font-sans">
                      {c.achievements.slice(0, 2).map((ach, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <ShieldCheck size={12} className="text-accent-blue shrink-0 mt-0.5" />
                          <span className="leading-tight">{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <button
                    id={`btn-coach-bio-${c.id}`}
                    onClick={() => setSelectedCoach(c)}
                    className="coach-bio-btn w-full py-2 bg-secondary-navy hover:bg-white/5 text-white/80 hover:text-white rounded-xl font-display font-bold text-xs uppercase tracking-wider border border-white/10 transition-all min-h-[40px] cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <span>{language === 'en' ? 'Read Executive Bio' : 'Baca Biografi Pelatih'}</span>
                    <ChevronRight size={13} />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Core Bio Modal Box for individual staff details */}
      <AnimatePresence>
        {selectedCoach && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-navy/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="coach-modal bg-secondary-navy max-w-2xl w-full rounded-2xl overflow-hidden border border-white/15 relative text-left shadow-2xl"
            >
              
              {/* Close icon */}
              <button
                onClick={() => setSelectedCoach(null)}
                className="coach-modal-close absolute top-4 right-4 p-2 bg-primary-navy rounded-full border border-white/10 text-white/50 hover:text-white transition-all min-h-[40px] cursor-pointer"
                title={language === 'en' ? 'Close' : 'Tutup'}
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 p-6 sm:p-8">
                
                <div className="sm:col-span-5 relative aspect-square sm:aspect-auto sm:h-full rounded-xl overflow-hidden min-h-[160px]">
                  <img 
                    src={selectedCoach.imageUrl} 
                    alt={selectedCoach.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="sm:col-span-7 space-y-4">
                  <div className="space-y-1">
                    <span className="bg-accent-blue/15 text-accent-blue font-mono text-[9px] font-black px-2 py-0.5 rounded uppercase">
                      {selectedCoach.license}
                    </span>
                    <h3 className="coach-modal-name font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight mt-1">
                      {selectedCoach.name}
                    </h3>
                    <p className="coach-modal-position text-white/40 font-mono text-[11px] uppercase tracking-wider">{selectedCoach.position}</p>
                  </div>

                  <p className="coach-modal-bio text-white/85 font-sans text-xs sm:text-sm leading-relaxed italic border-l-2 border-accent-blue pl-3">
                    &ldquo;{selectedCoach.bio}&rdquo;
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <h5 className="font-mono text-[10px] font-bold text-accent-blue uppercase tracking-wider">
                      {language === 'en' ? 'Historical Records:' : 'Portofolio & Rekor Historis:'}
                    </h5>
                    <ul className="coach-modal-achievements space-y-1 text-white/70 text-xs font-sans">
                      {selectedCoach.achievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 size={13} className="text-accent-blue shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="coach-modal-footer pt-2 text-xs font-mono text-white/40 flex justify-between items-center bg-primary-navy/40 px-3 py-2 rounded-lg">
                    <span>{language === 'en' ? 'Exp:' : 'Pengalaman:'} {selectedCoach.experience}</span>
                    <span>{language === 'en' ? 'Spec:' : 'Keahlian:'} {selectedCoach.specialization}</span>
                  </div>

                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Quick helper
function CheckCircle2({ size, className }: { size: number, className?: string }) {
  return (
    <span className={`inline-block w-4 h-4 rounded-full bg-accent-blue/10 flex items-center justify-center font-bold text-accent-blue text-[9px] ${className}`}>
      ✓
    </span>
  );
}
