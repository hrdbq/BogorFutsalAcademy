/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar / General Navigation
    'nav.home': 'Home',
    'nav.programs': 'Programs',
    'nav.coaches': 'Coaches & Staff',
    'nav.events': 'Events',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
    'nav.registration': 'Registration',
    'nav.cms_active': 'CMS ACTIVE',
    'nav.join_trial': 'JOIN FREE TRIAL',
    'nav.cms_hub_active': 'CMS ADMIN HUB ACTIVE',
    'nav.cms_hub_desc': 'Manage student roster, schedules, billing cycles, and media uploads below.',

    // Footer
    'footer.desc': 'Elite futsal academy based in Bogor, West Java, dedicating to youth development, athletic speed, tactical coordination, and professional pipelines.',
    'footer.nav': 'Navigation',
    'footer.contact': 'Contact Us',
    'footer.address': 'GOR Pajajaran Indoor Stadium, Bogor, West Java, Indonesia',
    'footer.rights': 'All rights reserved.',
    'footer.login': 'Staff Portal Login',

    // Home Page - Hero
    'hero.title_part1': 'DEVELOP SKILLS.',
    'hero.title_part2': 'BUILD CHARACTER.',
    'hero.title_part3': 'CREATE CHAMPIONS.',
    'hero.desc': 'Professional futsal training designs engineered to unlock every player\'s potential through highly structured licensing coach models, tactical game curriculums, and national match exposure in Bogor.',
    'hero.cta_trial': 'Join Free Trial Class',
    'hero.cta_explore': 'Explore Curriculums',
    'hero.stat_active_students': 'Active Enrolled Students',
    'hero.stat_certified_coaches': 'AFC Certified Coaches',
    'hero.stat_completed_drills': 'Completed Drills',
    'hero.stat_gold_titles': 'Championship Gold Titles',

    // Home Page - Why Choose Us / Pillars
    'why.pillars_subtitle': 'COORDINATION • TECHNIQUE • MINDSET',
    'why.pillars_title': 'WHY ELITE FUTSAL PATHS BEGIN WITH BFA',
    'why.pillars_desc': 'We operate differently than casual football clubs. Our primary core dedication is sports science efficiency, individual physical confidence, and a continuous pipeline pathway toward Indonesian national systems.',
    'choose.coaches_title': 'Licensed Pro Coaches',
    'choose.coaches_desc': 'Instruction led exclusively by AFC Futsal License holders and former Professional League athletes equipped with modern youth pedagogy.',
    'choose.curriculum_title': 'Modern Structured Curriculum',
    'choose.curriculum_desc': 'Progressive training blocks targeting rapid cognitive split-decision capabilities, physical explosiveness, and ultimate ball mastery.',
    'choose.exposure_title': 'Tournament Exposure',
    'choose.exposure_desc': 'Continuous integration in competitive leagues and regional futsal showcases ensuring high-intensity match experience.',
    'choose.pathways_title': 'Professional Pathways',
    'choose.pathways_desc': 'Direct corporate ties to scouts, official sports clubs, and youth registries preparing players for future occupational sports roles.',

    // Home Page - Player Pathway Title
    'pathway.subtitle': 'THE AGE CATEGORIES',
    'pathway.title': 'BFA PLAYER DEVELOPMENT PATHWAY',
    'pathway.desc': 'Our curriculum handles players from early coordination habits to highly complex professional setups. Find the suitable group for your athlete.',

    // Home Page - 5 Pillars
    'drills.subtitle': 'SPORTS SCIENCE TRAINING BLUEPRINT',
    'drills.title': 'THE 5 PILLARS OF BFA DRILLS',
    'drills.desc': 'Our professional training blocks don\'t rely on random pick-up matching. Every session is systematically mapped into five fundamental steps of progression.',
    'drills.step1': 'Technical Foundation',
    'drills.step1_desc': 'Developing absolute comfort with both feet using the sole, instep, and external surfaces of the foot in tight spaces.',
    'drills.step2': 'Tactical Intelligence',
    'drills.step2_desc': 'Teaching spatial rotation, visual scanner habits, passing lane alignment, and numeric overload equations.',
    'drills.step3': 'Physical Conditioning',
    'drills.step3_desc': 'Futsal-specific cardiovascular intervals, sharp multidirectional accelerations, and core injury-prevention rehab.',
    'drills.step4': 'Mental Resilience',
    'drills.step4_desc': 'Acquiring focused team synchronization, coping with mistake stress, and maintaining discipline under physical exhaustion.',
    'drills.step5': 'Competitive Peak',
    'drills.step5_desc': 'Active deployment in national tournaments, scouts exhibitions, state-level leagues, and high-intensity match structures.',

    // Home Page - Record and Testimonials
    'record.subtitle': 'VERIFIABLE OUTCOMES',
    'record.title': 'ACADEMY RECORD',
    'record.desc': 'Bogor Futsal Academy isn\'t just about coordination instruction; we enter competitive situations to verify our player development. Historically, our junior squads consistently rank at top podiums across regional, state, and invitational championships.',
    'record.item1_title': 'West Java Academy League 2025 Champions',
    'record.item1_desc': 'U15 Squad remained completely undefeated across 14 matches with a plus 32 goal difference.',
    'record.item2_title': 'Regional Junior Cup MVP Selection',
    'record.item2_desc': 'BFA Academy student Raffi Saputra selected as 2025 regional Golden Boot winner',
    'testimonials.title': 'TRUSTED BY PARENTS & ATHLETES',
    'testimonials.subtitle': 'TESTIMONIALS',

    // Programs Page
    'prog.subtitle': 'EXCELLENCE BY SPECIFICATION',
    'prog.title': 'OUR FUTSAL PROGRAMS',
    'prog.desc': 'We provide age-segmented development groups designed around bio-energetic and neuromuscular maturity phases.',
    'prog.class_schedule': 'CLASS SCHEDULES',
    'prog.download_syllabus': 'Download Syllabus PDF',
    'prog.scrolled_down': 'Download started. Check your device downloads folder.',
    'prog.age_cat': 'Age Category',
    'prog.focus': 'Session Focus',
    'prog.frequency': 'Drills Frequency',
    'prog.schedule_header': 'Current Structured Training Slots',
    'prog.register_now': 'Register Now',

    // Coaches Page
    'coaches.subtitle': 'THE TECHNICAL LEADERSHIP',
    'coaches.title': 'MEET OUR EXPERT STAFF',
    'coaches.desc': 'BFA coaches hold professional accreditation from AFC or national federation programs, combining athletic pasts with children development sciences.',
    'coaches.director_word': 'A Word From Our Technical Director',
    'coaches.director_word_desc1': 'Selamat Datang to Bogor Futsal Academy. My absolute priority when designing this sports pathway was ensuring our curriculum does not simulate simple, uncoordinated kick-around play. Futsal requires extreme visual tracking, split-second speed adjustments, and rigorous physical coordination.',
    'coaches.director_word_desc2': 'We look at player development as an investment in character, timing, and structural intelligence. Whether your child aspires to play professionally in the Pro Futsal League of Indonesia, or they simply want to develop high-level coordinate reflexes alongside disciplined team habits, BFA provides the absolute environment of excellence.',
    'coaches.accreditations': 'Accredited Training Methods',
    'coaches.national_pathway': 'National Integration Model',

    // Events Page
    'events.subtitle': 'CHRONICLES OF COMPETITION',
    'events.title': 'ACADEMY EVENTS & SCHEDULES',
    'events.desc': 'Follow major match calendars, sparring dates, and internal scouting tests planned across this quarter.',
    'events.calendar': 'CALENDAR VIEW',
    'events.upcoming': 'UPCOMING FIXTURES / SHIFT DETAILS',
    'events.history': 'PAST TOURNAMENT REPORT LOG',
    'events.sparring_title': 'Quick Info Contacts',
    'events.sparring_desc': 'If your school desires friendly sparring matches against BFA age squads, submit a coordinate request via the contact desk.',
    'events.sparring_btn': 'Contact Desk',

    // Gallery Page
    'gallery.subtitle': 'MOMENTS OF TRIUMPH',
    'gallery.title': 'ACADEMY MEDIA GALLERY',
    'gallery.desc': 'A visual compilation of tactical drills, matches, team celebrations, and core coordination sessions.',
    'gallery.all': 'All Media',
    'gallery.drills': 'Drills & Training',
    'gallery.matches': 'Matches & Tournaments',
    'gallery.celebration': 'Triumphs',
    'gallery.authorized_media': 'BFA AUTHORIZED MEDIA',

    // Blog Page
    'blog.subtitle': 'THE FUTSAL JOURNAL',
    'blog.title': 'ACADEMY NEWS & TACTICS',
    'blog.desc': 'Inside analyses of futsal layouts, player rotation models, and parent education journals written by our staff.',
    'blog.curated': 'Content curated inside Bogor Futsal Academy',
    'blog.read_more': 'Read Complete Article',
    'blog.back_to_blog': 'Back to Articles',

    // Registration Page
    'reg.subtitle': 'SECURE AN ATHLETIC FUTURES PATHWAY',
    'reg.title': 'ACADEMY ADMISSION & ADMITTANCE',
    'reg.desc': 'Enroll your student athlete in the leading futsal program of West Java. Choose the preferred training class program structure to begin.',
    'reg.step1': '1. Choose Package',
    'reg.step2': '2. Student Details',
    'reg.step3': '3. Payment Gateway',
    'reg.step4': '4. Complete',
    'reg.student_info_title': 'Student Athlete Registration Details',
    'reg.submitting': 'submitting...',
    'reg.btn_next': 'Next Phase',
    'reg.btn_prev': 'Previous Step',
    'reg.btn_submit': 'Complete Registration Session',
    'reg.success_title': 'Admission Submission Completed',
    'reg.success_desc': 'Thank you! Your registration application has been logged into the BFA Academy super-ledger. Our administration division will email your admission files and jersey details shortly.',
    'reg.payment_details': 'BFA Tuition Gateway',
    'reg.payment_desc': 'BFA operates a professional, transparent fee model representing high-end equipment access, court hires, and licensed training values.',
    'reg.payment_instruction': 'To complete enrollment securely, please transfer the corresponding package cost to our official accounts below and confirm details on this panel:',
    'reg.bank_account': 'Bank Mandiri Account',
    'reg.account_owner': 'Regency Futsal Academy',
    'reg.confirmation': 'Tuition Transfer Confirmation',
    'reg.confirmation_label': 'Mark as transfer completed',
    'reg.confirmation_desc': 'I certify that I have executed the respective transaction to BFA accounts.',

    // Contact Page
    'contact.subtitle': 'COMMUNICATE DIRECTLY',
    'contact.title': 'GET IN TOUCH WITH BFA',
    'contact.desc': 'Have inquiries regarding corporate sponsorship, sparring coordination, or student schedules? Reach our team anytime.',
    'contact.visit_title': 'BFA STADIUM FACILITY HEADQUARTERS',
    'contact.form_title': 'Inquire Directly via Secure Form',
    'contact.success': 'Your message has been received! Our operational desk will respond within 24 working hours.',
    'contact.sending': 'Sending Inquiry...',
    'contact.send_btn': 'Submit Inquiry Form',
    'contact.name': 'Your Legal Full Name',
    'contact.email': 'Your Email Address',
    'contact.phone': 'Your Phone Number',
    'contact.subject': 'Subject Matter',
    'contact.message': 'Explain Your Demand or Inquiry Detail'
  },
  id: {
    // Navbar / Navigasi Umum
    'nav.home': 'Beranda',
    'nav.programs': 'Program',
    'nav.coaches': 'Pelatih & Staf',
    'nav.events': 'Acara',
    'nav.gallery': 'Galeri',
    'nav.contact': 'Kontak',
    'nav.registration': 'Pendaftaran',
    'nav.cms_active': 'CMS AKTIF',
    'nav.join_trial': 'COBA GRATIS',
    'nav.cms_hub_active': 'DASHBOARD ADMIN CMS AKTIF',
    'nav.cms_hub_desc': 'Kelola daftar siswa, jadwal latihan, siklus tagihan, dan unggahan media di bawah ini.',

    // Footer
    'footer.desc': 'Akdemi futsal elit yang berbasis di Bogor, Jawa Barat, berdedikasi tinggi untuk pengembangan usia dini, kecepatan atletik, koordinasi taktis, dan jalur profesional.',
    'footer.nav': 'Navigasi',
    'footer.contact': 'Hubungi Kami',
    'footer.address': 'GOR Pajajaran Indoor Stadium, Bogor, Jawa Barat, Indonesia',
    'footer.rights': 'Seluruh hak cipta dilindungi.',
    'footer.login': 'Login Portal Staf',

    // Home Page - Hero
    'hero.title_part1': 'KEMBANGKAN KEAHLIAN.',
    'hero.title_part2': 'BENTUK KARAKTER.',
    'hero.title_part3': 'MENCETAK JUARA.',
    'hero.desc': 'Metode latihan futsal profesional dirancang khusus untuk memaksimalkan potensi setiap pemain melalui bimbingan pelatih bersertifikasi resmi AFC, kurikulum taktis, dan jam terbang kompetisi nasional di Bogor.',
    'hero.cta_trial': 'Daftar Kelas Uji Coba Gratis',
    'hero.cta_explore': 'Pelajari Kurikulum',
    'hero.stat_active_students': 'Siswa Aktif Terdaftar',
    'hero.stat_certified_coaches': 'Pelatih Berlisensi AFC',
    'hero.stat_completed_drills': 'Sesi Latihan Terselesaikan',
    'hero.stat_gold_titles': 'Gelar Juara Turnamen',

    // Home Page - Why Choose Us / Pilar
    'why.pillars_subtitle': 'KOORDINASI • TEKNIK • POLA PIKIR',
    'why.pillars_title': 'MENGAPA JALUR FUTSAL ELIT DIMULAI DARI BFA',
    'why.pillars_desc': 'Kami beroperasi secara berbeda dari klub sepak bola biasa. Fokus utama kami adalah efisiensi ilmu olahraga, kepercayaan diri fisik individu, dan penyediaan jalur pembinaan atlet menuju jenjang nasional Indonesia.',
    'choose.coaches_title': 'Pelatih Profesional Berlisensi',
    'choose.coaches_desc': 'Seluruh sesi dipimpin langsung oleh pemegang Lisensi Futsal AFC resmi dan mantan atlet Liga Pro yang menguasai pedagogi anak modern.',
    'choose.curriculum_title': 'Kurikulum Berstruktur Modern',
    'choose.curriculum_desc': 'Materi bertingkat yang melatih kecepatan keputusan kognitif, ledakan kekuatan fisik, serta penguasaan bola secara presisi.',
    'choose.exposure_title': 'Jam Terbang Kompetisi Luas',
    'choose.exposure_desc': 'Pemain secara berkala diikutsertakan dalam berbagai liga kompetitif dan pertandingan eksibisi regional guna membangun mental tanding.',
    'choose.pathways_title': 'Jalur Karier Profesional',
    'choose.pathways_desc': 'Memiliki jaringan komunikasi dengan pemantau bakat, klub profesional, dan perserikatan resmi untuk mempersiapkan masa depan atlet.',

    // Home Page - Player Pathway Title
    'pathway.subtitle': 'KATEGORI USIA PEMBINAAN',
    'pathway.title': 'TAHAPAN PENGEMBANGAN ATLET BFA',
    'pathway.desc': 'Sistem kurikulum kami mendampingi atlet sejak pembiasaan koordinasi motorik hingga taktik tingkat profesional yang kompleks. Temukan kelompok yang paling tepat bagi putra-putri Anda.',

    // Home Page - 5 Pilar
    'drills.subtitle': 'BLUEPRINT LATIHAN SPORT SCIENCE',
    'drills.title': '5 PILAR UTAMA METODE BFA',
    'drills.desc': 'Kurikulum kepelatihan kami tidak mengandalkan permainan acak. Setiap sesi dirancang sistematis ke dalam lima langkah perkembangan dasar.',
    'drills.step1': 'Fondasi Teknik Dasar',
    'drills.step1_desc': 'Menguasai keterampilan mengontrol bola di ruang sempit menggunakan sol sepatu, punggung kaki, maupun kaki bagian luar secara seimbang.',
    'drills.step2': 'Kecerdasan Taktik Lapangan',
    'drills.step2_desc': 'Memahami rotasi posisi, pembiasaan memantau lapangan secara visual, pembukaan jalur operan, serta keunggulan jumlah pemain.',
    'drills.step3': 'Kondisi Fisik Prima',
    'drills.step3_desc': 'Latihan ketahanan kardiovaskular khusus futsal, akselerasi eksplosif multititik, dan latihan penguatan otot untuk pencegahan cedera.',
    'drills.step4': 'Ketangguhan Mental Juara',
    'drills.step4_desc': 'Membangun komunikasi tim yang solid, melatih kesabaran dalam tekanan pertandingan, dan disiplin tinggi dalam kondisi lelah.',
    'drills.step5': 'Puncak Prestasi Kompetisi',
    'drills.step5_desc': 'Keikutsertaan aktif dalam berbagai turnamen tingkat nasional, panggung eksibisi pemantauan bakat, dan liga resmi berintensitas tinggi.',

    // Home Page - Record and Testimonials
    'record.subtitle': 'PRESTASI YANG TERBUKTI Nyata',
    'record.title': 'CATATAN ACADEMY',
    'record.desc': 'Bogor Futsal Academy tidak hanya mengajarkan teknik, kami menguji hasil latihan lewat kompetisi resmi. Tim junior kami secara konsisten menduduki posisi podium utama di berbagai kejuaraan regional dan nasional.',
    'record.item1_title': 'Juara Liga Akademi Jawa Barat 2025',
    'record.item1_desc': 'Skuat U15 tidak terkalahkan sepanjang turnamen dalam 14 pertandingan dengan selisih gol surplus 32.',
    'record.item2_title': 'Penghargaan MVP Regional Junior Cup',
    'record.item2_desc': 'Siswa didik BFA Raffi Saputra terpilih sebagai peraih sepatu emas regional 2025.',
    'testimonials.title': 'KEPERCAYAAN ORANG TUA & ATLET',
    'testimonials.subtitle': 'TESTIMONI TERBARU',

    // Programs Page
    'prog.subtitle': 'SPESIFIKASI BERBASIS KEBUTUHAN',
    'prog.title': 'PROGRAM FUTSAL KAMI',
    'prog.desc': 'Kami menawarkan kelompok pembinaan berbasis segmentasi usia yang disesuaikan dengan fase kematangan bio-energi dan perkembangan otot anak.',
    'prog.class_schedule': 'JADWAL LATIHAN',
    'prog.download_syllabus': 'Unduh Brosur PDF',
    'prog.scrolled_down': 'Unduhan sedang berjalan. Silakan periksa folder unduhan perangkat Anda.',
    'prog.age_cat': 'Kategori Usia',
    'prog.focus': 'Fokus Latihan',
    'prog.frequency': 'Frekuensi Pertemuan',
    'prog.schedule_header': 'Slot Jadwal Latihan Saat Ini',
    'prog.register_now': 'Pendaftaran Sekarang',

    // Coaches Page
    'coaches.subtitle': 'STRUKTUR TIM KEPELATIHAN',
    'coaches.title': 'PELATIH & STAF AHLI KAMI',
    'coaches.desc': 'Setiap jajaran pelatih BFA memegang sertifikat kepelatihan resmi AFC atau Federasi Nasional, menggabungkan latar belakang keprofesionalan futsal dengan pemahaman mendatar perkembangan kepribadian anak.',
    'coaches.director_word': 'Sambutan Dari Direktur Teknik',
    'coaches.director_word_desc1': 'Selamat Datang di Bogor Futsal Academy. Prioritas utama saya saat merintis jalur sepak bola ini adalah memastikan metode kurikulum kita tidak sekadar menyajikan latihan bermain secara acak. Olahraga futsal menuntut pelacakan visual yang ekstrem, penyesuaian kecepatan sepersekian detik, serta ketepatan koordinasi fisik tingkat tinggi.',
    'coaches.director_word_desc2': 'Kami memandang pembinaan pemain sebagai bentuk investasi jangka panjang bagi pembentukan karakter, ketepatan waktu, dan pemahaman strategi yang cerdas. Baik putra-putri Anda bercita-cita menginjakkan kaki di jenjang profesional Liga Futsal Indonesia, maupun sekadar ingin melatih kebugaran refleks serta pembiasaan berdisiplin tinggi, BFA hadir menyediakan wadah terbaik.',
    'coaches.accreditations': 'Metode Kepelatihan Resmi',
    'coaches.national_pathway': 'Model Pembinaan Nasional',

    // Events Page
    'events.subtitle': 'DOKUMENTASI JADWAL DAN SEJARAH KOMPETISI',
    'events.title': 'ACARA & JADWAL KEGIATAN AKADEMI',
    'events.desc': 'Pantau kalender pertandingan besar, agenda tanding sparring bersahabat, serta jadwal penilaian internal pemain di sepanjang kuartal ini.',
    'events.calendar': 'TAMPILAN KALENDER',
    'events.upcoming': 'JADWAL REVISI SHIFT & KOMPETISI MENDATANG',
    'events.history': 'LAPORAN REKAP KOMPETISI TERDAHULU',
    'events.sparring_title': 'Layanan Kontak Sparring',
    'events.sparring_desc': 'Bila sekolah atau instansi Anda berminat menjalin laga sparring persahabatan dengan skuat kelompok umur BFA, silakan ajukan permohonan melalui meja administrasi kami.',
    'events.sparring_btn': 'Meja Kontak Admin',

    // Gallery Page
    'gallery.subtitle': 'POTRET PERTEMPURAN DAN PRESTASI',
    'gallery.title': 'GALERI MEDIA AKADEMI',
    'gallery.desc': 'Koleksi dokumentasi visual dari jalannya sesi latihan, momen kompetisi, perayaan kemenangan, serta latihan ketangkasan khusus.',
    'gallery.all': 'Semua Media',
    'gallery.drills': 'Latihan & Sesi Kelas',
    'gallery.matches': 'Kompetisi & Turnamen',
    'gallery.celebration': 'Selebrasi Kemenangan',
    'gallery.authorized_media': 'DOKUMENTASI RESMI BFA',

    // Blog Page
    'blog.subtitle': 'JURNAL EDUKASI FUTSAL',
    'blog.title': 'BERITA TERBARU & BAHASAN TAKTIS',
    'blog.desc': 'Ulasan mendalam mengenai skema formasi futsal, panduan posisi dinamis, dan artikel parenting olahraga untuk mendukung putra-putri di rumah.',
    'blog.curated': 'Konten dikurasi khusus oleh tim internal Bogor Futsal Academy',
    'blog.read_more': 'Baca Artikel Lengkap',
    'blog.back_to_blog': 'Kembali Ke Daftar Artikel',

    // Registration Page
    'reg.subtitle': 'AMANKAN JALUR MASA DEPAN OLAHRAGA ANAK',
    'reg.title': 'PENDAFTARAN MASUK AKADEMI BFA',
    'reg.desc': 'Daftarkan atlet muda Anda di akademi futsal terdepan di Jawa Barat. Pilih jenis paket latihan pilihan Anda untuk memulai proses pendaftaran.',
    'reg.step1': '1. Pilih Paket Latihan',
    'reg.step2': '2. Data Diri Siswa',
    'reg.step3': '3. Konfirmasi Transaksi',
    'reg.step4': '4. Pendaftaran Selesai',
    'reg.student_info_title': 'Formulir Data Diri Atlet Baru',
    'reg.submitting': 'mengirimkan...',
    'reg.btn_next': 'Langkah Selanjutnya',
    'reg.btn_prev': 'Kembali',
    'reg.btn_submit': 'Selesaikan Pengiriman Berkas',
    'reg.success_title': 'Permohonan Pendaftaran Selesai',
    'reg.success_desc': 'Terima kasih banyak! Formulir pendaftaran calon siswa telah masuk ke dalam basis data admin BFA. Divisi administrasi kami akan segera mengirimkan konfirmasi pendaftaran beserta dokumen pendukung serta seragam jersey lewat surel terdaftar Anda.',
    'reg.payment_details': 'Gerbang Pembayaran BFA',
    'reg.payment_desc': 'Bogor Futsal Academy beroperasi dengan asas transparan mengenai rincian pemeliharaan lapangan berkualitas, penyediaan peralatan berstandar tinggi, serta kesejahteraan pelatih berlisensi kami.',
    'reg.payment_instruction': 'Untuk melengkapi proses pendaftaran, silakan kirimkan biaya investasi paket terdaftar Anda melalui metode transfer bank resmi di bawah ini:',
    'reg.bank_account': 'Nomor Rekening Bank Mandiri',
    'reg.account_owner': 'Regency Futsal Academy',
    'reg.confirmation': 'Lembar Verifikasi Pembayaran',
    'reg.confirmation_label': 'Saya menyatakan telah mengirimkan dana transfer',
    'reg.confirmation_desc': 'Saya menjamin bahwa transaksi pembayaran biaya akademi BFA telah berhasil dikirimkan.',

    // Contact Page
    'contact.subtitle': 'SALURAN LAYANAN KONSULTASI',
    'contact.title': 'HUBUNGI LAYANAN INFORMASI BFA',
    'contact.desc': 'Memiliki pertanyaan seputar proposal kerja sama komersial, agenda sparing persahabatan, maupun kendala penyesuaian jadwal latihan anak? Tim kami siap melayani Anda.',
    'contact.visit_title': 'STADIUM KANTOR UTAMA BFA',
    'contact.form_title': 'Ajukan Pertanyaan via Formulir Digital',
    'contact.success': 'Pesan Anda telah kami terima! Meja konsultasi operasional kami akan segera merespons Anda dalam kurun waktu 24 jam kerja.',
    'contact.sending': 'Mengirimkan Berkas...',
    'contact.send_btn': 'Kirimkan Formulir',
    'contact.name': 'Nama Lengkap Anda',
    'contact.email': 'Alamat Email Aktif',
    'contact.phone': 'Nomor Telepon Seluler',
    'contact.subject': 'Perihal Hubungan Kerja Sama',
    'contact.message': 'Jelaskan Secara Rinci Aspirasi Atau Kebutuhan Informasi Anda'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('bfa_lang');
    return (saved === 'en' || saved === 'id') ? saved : 'id'; // default to id
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bfa_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
