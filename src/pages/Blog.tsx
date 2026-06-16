/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Calendar, User, Clock, ChevronLeft, CalendarDays, ThumbsUp, MessageCircle, AlertCircle 
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { BlogPost } from '../types';

interface BlogProps {
  posts: BlogPost[];
}

export function getDisplayCategory(category: string, language: 'en' | 'id') {
  if (language === 'en') return category;
  if (category === 'News') return 'Berita';
  if (category === 'Match Reports') return 'Laporan Pertandingan';
  if (category === 'Training Tips') return 'Tips Latihan';
  if (category === 'Spotlight') return 'Sorotan';
  if (category === 'Resources') return 'Panduan Edukasi';
  return category;
}

function getTranslatedBlogPost(post: BlogPost, language: 'en' | 'id'): BlogPost {
  if (post.id === 'b1') {
    return {
      ...post,
      title: language === 'en' 
        ? 'Mastering the Futsal "Sole Roll": Why Touch Surface Matters' 
        : 'Menguasai "Sole Roll" Futsal: Alasan Mengapa Kontrol Sol Sepatu Sangat Penting',
      excerpt: language === 'en'
        ? 'Deep dive into why rolling the ball under the sole of your foot is the core foundation of professional futsal, and how to perfect it in daily training.'
        : 'Ulasan mendalam mengapa menggulirkan bola di bawah sol kaki Anda adalah fondasi utama futsal profesional, serta cara menyempurnakannya dalam latihan harian.',
      content: language === 'en'
        ? `In the lightning-fast environment of futsal, every tenth of a second determines whether you retain possession or suffer an immediate counter-attack. The standard football habit of control with the inside or instep of the foot restricts your immediate kinetic angle. 

The 'Sole Roll' is the primary signature of elite futsal players worldwide. Why?
1. **Immediate Shielding:** By resting your sole on the ball, you maintain physical separation between defender and object.
2. **Multi-directional Trajectory:** The sole lets you roll the ball forward, backward, left, or right in a fluid 360-degree arc without resetting your stance.
3. **Misdirection:** Under sole control, minor shifts of your weight look identical to direct passing motions, forcing the defender to commit prematurely.

How to perfect this at home:
- Work on continuous lateral rolling back and forth on a hard surface for 10 minutes daily.
- Focus on maintaining high body stability. Your hips should stay lowered, while your arms are prepared to buffer contact.
- Alternate with blind sole touches (eyes up and monitoring the environment, never staring down at your feet).`
        : `Dalam lingkungan futsal yang sangat cepat, setiap persepuluh detik menentukan apakah Anda mempertahankan penguasaan bola atau terkena serangan balik cepat. Kebiasaan mengontrol sepak bola biasa menggunakan kaki bagian dalam membatasi sudut gerak aktif Anda.

"Sole Roll" adalah ciri khas utama pemain futsal elite di seluruh dunia. Mengapa?
1. **Pelindung Instan:** Dengan menaruh sol sepatu di atas bola, Anda menjaga jarak fisik langsung antara bek lawan dan bola.
2. **Arah Bola 360 Derajat:** Sol sepatu memungkinkan Anda menggulirkan bola ke depan, belakang, kiri, atau kanan secara fleksilbel tanpa mengubah tumpuan.
3. **Gerakan Tipu:** Lewat kontrol sol, pergeseran kecil berat badan terlihat sangat mirip dengan gerakan mengumpan, memaksa bek lawan bereaksi terlalu dini.

Cara melatih ini di rumah:
- Latih gerakan menggulirkan bola ke samping kanan-kiri secara terus menerus di permukaan keras selama 10 menit setiap hari.
- Fokus menjaga stabilitas tubuh. Pinggul Anda harus tetap rendah, dan kedua lengan bersiap menahan kontak fisik.
- Variasikan dengan sentuhan sol tanpa melihat bola (pandangan lurus ke depan memantau lapangan, bukan melihat kaki).`
    };
  }
  if (post.id === 'b2') {
    return {
      ...post,
      title: language === 'en'
        ? 'Recap: How BFA U18 Stunned Bandung in the Finals'
        : 'Ulasan Taktis: Kejutan Skuat BFA U18 Tundukkan Bandung di Laga Final',
      excerpt: language === 'en'
        ? "An inside look at the tactical adjustment Coach Rian Pratama made during halftime to overcome Bandung Raya's high defensive press, winning the championship cup."
        : "Analisis mendalam mengenai penyesuaian taktik yang dilakukan Coach Rian Pratama pada waktu rehat babak pertama guna mengatasi tekanan pertahanan tinggi Bandung Raya, merebut gelar juara.",
      content: language === 'en'
        ? `It was a high-octane battle of nerves in Bandung. For the first twenty minutes, our U18 squad appeared suffocated by Bandung Raya's physical 1-2-2 press structure. We fell behind 1-2 due to simple passing transition lag near our own circle.

At halftime, Coach Rian adjusted the pivot mechanism:
- **Rotational Shift:** Instructed our wingers (alas) to cut horizontally inside simultaneously rather than staying deep, clearing absolute path for our pivot to drop.
- **Transition Speed:** Demanded 2-touch soccer in our own half.
- **Goalkeeper Participation:** Handed our keeper the liberty to act as a fifth runner (flying goalkeeper) to create numeric overload.

The outcome was masterful. Bandung's energy depleted trying to close the spatial traps, allowing Farhan to strike consecutive brace goals at the 12th and 18th minutes of the second period. Final scoreboard reading 5-3, placing Bogor Futsal Academy as regional champions yet again!`
        : `Laga di Bandung berlangsung dengan tensi yang sangat tinggi. Selama dua puluh menit pertama, skuat U18 kami tampak tertekan oleh skema pertahanan fisik 1-2-2 yang agresif dari Bandung Raya. Kami tertinggal 1-2 akibat keterlambatan transisi umpan di daerah pertahanan sendiri.

Pada jeda babak pertama, Coach Rian mengubah mekanisme pergerakan pivot:
- **Rotasi Sayap:** Meminta pemain sayap (alas) berotasi merapat ke tengah secara mendatar secara bersamaan ketimbang menunggu di sayap luar, membuka ruang lebar bagi pivot untuk menjemput bola.
- **Kecepatan Transisi:** Menginstruksikan permainan maksimal 2 sentuhan di pertahanan sendiri.
- **Partisipasi Kiper:** Memberi keleluasaan bagi kiper untuk terlibat aktif sebagai pemain kelima (flying goalkeeper) guna memenangi keunggulan jumlah pemain.

Hasilnya luar biasa. Stamina Bandung terkuras habis karena mengejar perangkap ruang kami, memberi celah bagi Farhan untuk membobol gawang lawan pada menit ke-12 dan ke-18 babak kedua. Skor akhir 5-3, menobatkan kembali Bogor Futsal Academy sebagai juara daerah!`
    };
  }
  if (post.id === 'b3') {
    return {
      ...post,
      title: language === 'en'
        ? "A Parent's Guide to Futsal vs. Soccer Pathing"
        : "Panduan Orang Tua: Memahami Jalur Futsal vs. Sepak Bola Lapangan",
      excerpt: language === 'en'
        ? "Why starting your child with futsal at age 6-12 yields much higher coordination, reaction speeds, and ball mastery indicators than standard outdoor soccer."
        : "Mengapa membiasakan anak bermain futsal pada rentang usia 6-12 tahun menghasilkan tingkat koordinasi motorik, kecepatan reaksi, dan kematangan teknik kontrol yang lebih tinggi daripada sepak bola biasa.",
      content: language === 'en'
        ? `Many parents ask us: "Why should my child play futsal instead of starting immediately in a massive 11v11 grass field soccer routine?"

Statistics and international research (including testimonials from legends like Messi, Neymar, and Ronaldinho) prove that futsal is the absolute cradle of world-class coordination:
- **600% More Touches:** A child in a futsal game receives, passes, and dribbles the ball nearly six times more frequently than in a regular field soccer match. Higher touches translate code directly into faster neurological adaptation.
- **Tight-Space Decision Making:** Futsal is played within strict boundaries. There is no sideline buffer. Your child learns to think under heavy pressure.
- **No Flat Recovery:** Because there are fewer players, everyone is constantly dynamic. Defending, transitioning, and scoring are team-wide responsibilities.

At Bogor Futsal Academy, we structure our programs to ensure the motor coordination built in futsal seamlessly prepares your athlete for professional pursuits—whether on the indoor court or transitioning eventually to the soccer field.`
        : `Banyak orang tua yang bertanya kepada kami: "Mengapa sebaiknya anak saya melatih futsal terlebih dahulu, bukan langsung terjun ke lapangan sepak bola rumput besar 11v11?"

Statistik resmi dan penelitian olahraga internasional (termasuk pengakuan dari bintang dunia seperti Messi, Neymar, dan Ronaldinho) membuktikan bahwa futsal adalah tempat lahirnya bakat dengan koordinasi kelas dunia:
- **600% Sentuhan Bola Lebih Banyak:** Anak-anak di permainan futsal menerima, mengoper, dan menggiring bola hampir enam kali lebih sering dibanding sepak bola biasa. Sentuhan yang melimpah ini membangun memori kecepatan motorik adaptif anak secara masif.
- **Pengambilan Keputusan di Ruang Sempit:** Futsal dimainkan di batas garis yang ketat. Anak Anda belajar menguasai ketenangan berpikir dalam situasi tekanan tinggi lawan.
- **Peran Aktif Tanpa Jeda:** Karena jumlah pemain yang terbatas, semua orang wajib bergerak dinamis. Bertahan, menyusun transisi, dan mencetak gol merupakan tanggung jawab bersama seluruh tim.

Di Bogor Futsal Academy, we structure our programs to ensure the motor coordination built in futsal seamlessly prepares your athlete for professional pursuits—whether on the indoor court or transitioning eventually to the soccer field.`
    };
  }
  return post;
}

export default function Blog({ posts }: BlogProps) {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);

  const rawCategories = ['All', 'News', 'Match Reports', 'Training Tips', 'Spotlight', 'Resources'];
  
  const categories = language === 'en' 
    ? ['All', 'News', 'Match Reports', 'Training Tips', 'Spotlight', 'Resources']
    : ['Semua', 'Berita', 'Laporan Pertandingan', 'Tips Latihan', 'Sorotan', 'Panduan Edukasi'];

  // Automatically reset category when language changes so they match category states
  useEffect(() => {
    setSelectedCategory(language === 'en' ? 'All' : 'Semua');
  }, [language]);

  // Filters post elements based on tag choice
  const filteredPosts = posts.map(post => getTranslatedBlogPost(post, language)).filter(post => {
    const activeSelected = selectedCategory;
    if (activeSelected === 'All' || activeSelected === 'Semua') return true;

    // Map selected language label to raw English category
    const categoryIdx = categories.indexOf(activeSelected);
    if (categoryIdx === -1) return true;
    const rawCategory = rawCategories[categoryIdx];

    return post.category === rawCategory;
  });

  return (
    <div id="blog-view-container" className="glow-entrance">
      
      {/* Editorial Header Banner if NOT presently reading an article */}
      {!readingPost && (
        <section className="relative pt-32 sm:pt-40 pb-20 bg-secondary-navy border-b border-white/10 overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=1200')" }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <span className="font-mono text-xs font-bold text-accent-blue uppercase tracking-[0.25em] block mb-3">
              {language === 'en' ? 'EDITORIAL PERFORMANCE LOGS & RESOURCES' : 'CATATAN IKHTISAR & JURNAL TAKTIS ACADEMY'}
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
              {language === 'en' ? 'NEWS & ACADEMY BLOG' : 'BERITA & BLOG AKADEMI'}
            </h1>
            <p className="text-white/77 max-w-3xl text-sm leading-relaxed mt-3">
              {language === 'en' 
                ? 'Explore tactical guides written by licensing directors, parent guides on youthful nutrition, scouting spotlight overviews, and official match reports.' 
                : 'Temukan panduan taktis dari direktur lisensi kepelatihan kami, tips nutrisi atlet muda untuk orang tua, ulasan pemandu bakat, serta laporan pertandingan resmi.'}
            </p>
          </div>
        </section>
      )}

      {/* ARTICLE READER VIEW */}
      {readingPost ? (
        <section className="pt-32 sm:pt-40 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
          
          {/* Back indicators */}
          <button
            id="blog-back-btn"
            onClick={() => {
              setReadingPost(null);
              window.scrollTo({ top: 0 });
            }}
            className="flex items-center space-x-2 text-accent-blue hover:text-white font-display font-bold text-xs uppercase tracking-wider min-h-[44px] cursor-pointer"
          >
            <ChevronLeft size={16} />
            <span>{language === 'en' ? 'Back to Editorial Catalog' : 'Kembali ke Katalog Berita'}</span>
          </button>

          {/* Large image and title */}
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src={readingPost.imageUrl} 
              alt={readingPost.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <span className="bg-accent-blue text-primary-navy font-mono text-[9px] font-black px-2.5 py-1 rounded inline-block uppercase">
                {getDisplayCategory(readingPost.category, language)}
              </span>
              <h1 className="font-display font-black text-2xl sm:text-4xl text-white uppercase">
                {readingPost.title}
              </h1>
            </div>
          </div>

          {/* Author/Date Row */}
          <div className="flex flex-wrap items-center gap-6 py-4 border-b border-t border-white/10 text-xs text-white/50 font-mono">
            <p className="flex items-center gap-2">
              <User size={14} className="text-accent-blue" />
              <span>{language === 'en' ? 'Written by' : 'Ditulis oleh'}: <strong>{readingPost.author}</strong></span>
            </p>
            <p className="flex items-center gap-2">
              <Calendar size={14} className="text-accent-blue" />
              <span>{language === 'en' ? 'Published' : 'Dipublikasikan'}: {readingPost.date}</span>
            </p>
            <p className="flex items-center gap-2">
              <Clock size={14} className="text-accent-blue" />
              <span>{language === 'en' ? 'Duration' : 'Waktu Baca'}: {readingPost.readTime}</span>
            </p>
          </div>

          {/* Beautiful Editorial markup content */}
          <div className="prose prose-invert max-w-none text-white/90 text-sm sm:text-base leading-relaxed space-y-6 font-sans">
            {readingPost.content.split('\n\n').map((paragraph, index) => {
              const isQuote = paragraph.trim().startsWith('- ') || paragraph.trim().startsWith('* ');
              
              if (isQuote) {
                return (
                  <blockquote 
                    key={index} 
                    className="border-l-4 border-accent-blue pl-4 italic text-accent-blue/90 bg-secondary-navy/40 p-3 rounded-r-xl"
                  >
                    {paragraph.replace(/^[-*]\s+/, '')}
                  </blockquote>
                );
              }

              return (
                <p key={index} className="whitespace-pre-line">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Editorial appreciation actions */}
          <div className="pt-8 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-white/40 text-xs font-mono">
              <AlertCircle size={14} className="text-accent-blue" />
              <span>{language === 'en' ? 'Content curated inside Bogor Futsal Academy' : 'Konten dikurasi khusus oleh Bogor Futsal Academy'}</span>
            </div>
            
            <button
              onClick={() => {
                setReadingPost(null);
                window.scrollTo({ top: 0 });
              }}
              className="px-5 py-2 rounded-xl bg-secondary-navy border border-white/10 text-xs font-bold text-white uppercase hover:bg-white/5 min-h-[40px] cursor-pointer"
            >
              {language === 'en' ? 'Back to Catalog list' : 'Kembali ke Daftar Berita'}
            </button>
          </div>

        </section>
      ) : (
        /* STANDARD ARTICLE CATALOG LIST VIEW */
        <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Categories directory line */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6 mb-12">
            <div className="flex items-center space-x-2 text-white/50 font-mono text-xs">
              <BookOpen size={14} className="text-accent-blue" />
              <span>{language === 'en' ? 'Select category filters' : 'Pilih filter kategori'}:</span>
            </div>

            <div className="flex items-center bg-[#000d21]/60 p-1 rounded-lg border border-white/10 overflow-x-auto max-w-full scrollbar-none gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`blog-tab-${cat}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded font-display text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer min-h-[35px] whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-accent-blue text-primary-navy font-black'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat === 'All' || cat === 'Semua' ? (language === 'en' ? 'All Guides' : 'Semua Berita') : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  id={`blog-post-card-${post.id}`}
                  onClick={() => {
                    setReadingPost(post);
                    window.scrollTo({ top: 0 });
                  }}
                  className="bg-secondary-navy/20 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-accent-blue/30 transition-all flex flex-col justify-between cursor-pointer glow-border group"
                >
                  
                  {/* Image header */}
                  <div className="relative aspect-video bg-[#000d21]">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=500";
                      }}
                    />
                    
                    <span className="absolute top-4 left-4 bg-[#011B41]/90 backdrop-filter text-accent-blue font-mono font-black text-[9px] px-2.5 py-1 rounded tracking-wider uppercase">
                      {getDisplayCategory(post.category, language)}
                    </span>
                  </div>

                  {/* Body textual content */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      
                      <div className="flex items-center space-x-3.5 text-[10px] font-mono text-white/40 leading-none">
                        <span className="flex items-center gap-1">
                          <CalendarDays size={11} className="text-accent-blue" />
                          {post.date}
                        </span>
                        <span className="block border-l border-white/10 h-2.5" />
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="font-display font-black text-base sm:text-lg text-white uppercase tracking-tight group-hover:text-accent-blue transition-colors leading-tight">
                        {post.title}
                      </h3>

                      <p className="text-white/70 text-xs leading-relaxed font-sans line-clamp-3">
                        {post.excerpt}
                      </p>

                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-white/50 text-[10px] uppercase font-mono">{language === 'en' ? 'By' : 'Oleh'}: {post.author}</span>
                      </div>

                      <span className="text-accent-blue font-mono text-xs font-bold block uppercase group-hover:underline">
                        {language === 'en' ? 'Read Guide ➜' : 'Baca Selengkapnya ➜'}
                      </span>

                    </div>

                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-secondary-navy/20 rounded-2xl border border-white/10">
              <BookOpen size={44} className="text-white/25 mx-auto mb-3" />
              <span className="font-display font-bold text-white uppercase text-sm block">
                {language === 'en' ? 'No articles matches selected category' : 'Tidak ada artikel yang cocok dengan kategori terpilih'}
              </span>
              <p className="text-white/40 text-xs font-mono mt-1">
                {language === 'en' ? 'Upload records in the Admin CMS to populate this newsfeed.' : 'Unggah data di Admin CMS untuk memperbarui halaman berita ini.'}
              </p>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
