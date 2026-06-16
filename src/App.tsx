/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

// Import Pages
import Home from './pages/Home';
import Programs from './pages/Programs';
import Coaches from './pages/Coaches';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import RegistrationPage from './pages/Registration';
import Contact from './pages/Contact';
import AdminPortal from './pages/AdminPortal';

// Import Universal layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Types and Initial Collections
import { 
  Student, Registration, ClassSchedule, Coach, AcademyEvent, PaymentRecord, GalleryItem, BlogPost, Sponsor, ContactInquiry 
} from './types';
import { 
  INITIAL_COACHES, INITIAL_CLASSES, INITIAL_STUDENTS, INITIAL_REGISTRATIONS, INITIAL_EVENTS, 
  INITIAL_PAYMENTS, INITIAL_GALLERY, INITIAL_BLOG, INITIAL_SPONSORS, INITIAL_INQUIRIES 
} from './data/initialData';

export default function App() {
  
  // Theme state selector
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('bfa_theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'dark';
  });

  // Automatically apply theme class to document body
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('bfa_theme', theme);
  }, [theme]);

  // Hash route detector
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash || '#home');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // Derive currentPage and setCurrentPage compatibility for Navbar and sub-navigation links
  const currentPage = currentHash.replace('#', '');
  const setCurrentPage = (pageName: string) => {
    const cleanName = pageName.startsWith('#') ? pageName : '#' + pageName;
    window.location.hash = cleanName;
    setCurrentHash(cleanName);
  };

  // Initialize and track durable state from localStorage (falling back on elite initialData)
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('bcfa_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    const saved = localStorage.getItem('bcfa_registrations');
    return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
  });

  const [classes, setClasses] = useState<ClassSchedule[]>(() => {
    const saved = localStorage.getItem('bcfa_classes');
    return saved ? JSON.parse(saved) : INITIAL_CLASSES;
  });

  const [coaches, setCoaches] = useState<Coach[]>(() => {
    const saved = localStorage.getItem('bcfa_coaches');
    return saved ? JSON.parse(saved) : INITIAL_COACHES;
  });

  const [events, setEvents] = useState<AcademyEvent[]>(() => {
    const saved = localStorage.getItem('bcfa_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    const saved = localStorage.getItem('bcfa_payments');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('bcfa_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [blog, setBlog] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('bcfa_blog');
    return saved ? JSON.parse(saved) : INITIAL_BLOG;
  });

  const [sponsors, setSponsors] = useState<Sponsor[]>(() => {
    const saved = localStorage.getItem('bcfa_sponsors');
    return saved ? JSON.parse(saved) : INITIAL_SPONSORS;
  });

  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    const saved = localStorage.getItem('bcfa_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  // Automatically synchronize lists on modification
  useEffect(() => { localStorage.setItem('bcfa_students', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('bcfa_registrations', JSON.stringify(registrations)); }, [registrations]);
  useEffect(() => { localStorage.setItem('bcfa_classes', JSON.stringify(classes)); }, [classes]);
  useEffect(() => { localStorage.setItem('bcfa_coaches', JSON.stringify(coaches)); }, [coaches]);
  useEffect(() => { localStorage.setItem('bcfa_events', JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem('bcfa_payments', JSON.stringify(payments)); }, [payments]);
  useEffect(() => { localStorage.setItem('bcfa_gallery', JSON.stringify(gallery)); }, [gallery]);
  useEffect(() => { localStorage.setItem('bcfa_blog', JSON.stringify(blog)); }, [blog]);
  useEffect(() => { localStorage.setItem('bcfa_sponsors', JSON.stringify(sponsors)); }, [sponsors]);
  useEffect(() => { localStorage.setItem('bcfa_inquiries', JSON.stringify(inquiries)); }, [inquiries]);

  // Synchronise window hash events
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Action: Dynamic customer intake from Registration view
  const handleRegisterSubmit = (reg: Omit<Registration, 'id' | 'date' | 'status' | 'amountPaid' | 'paymentStatus'>) => {
    const pricingMap = {
      Trial: 0,
      Monthly: 650000,
      Quarterly: 1800000,
      Annual: 6500000
    };

    const newReg: Registration = {
      id: 'reg-' + Date.now(),
      studentName: reg.studentName,
      dob: reg.dob,
      parentName: reg.parentName,
      parentPhone: reg.parentPhone,
      parentEmail: reg.parentEmail,
      ageCategory: reg.ageCategory,
      packageType: reg.packageType,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      amountPaid: pricingMap[reg.packageType],
      paymentStatus: reg.packageType === 'Trial' ? 'Paid' : 'Unpaid'
    };

    setRegistrations(prev => [newReg, ...prev]);
  };

  // Action: Dynamic contact inquiry intake
  const handleInquirySubmit = (inq: Omit<ContactInquiry, 'id' | 'date' | 'status'>) => {
    const newInq: ContactInquiry = {
      id: 'inq-' + Date.now(),
      name: inq.name,
      email: inq.email,
      phone: inq.phone,
      subject: inq.subject || 'General Info Demand',
      message: inq.message,
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };

    setInquiries(prev => [newInq, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#011B41] font-sans antialiased text-white flex flex-col justify-between selection:bg-accent-blue selection:text-primary-navy">
      
      {/* Dynamic Header Navbar (Exposes admin toggle coordinates) */}
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isAdminMode={isAdminMode} 
        setIsAdminMode={setIsAdminMode} 
        pendingRegistrationsCount={registrations.filter(r => r.status === 'Pending').length}
        pendingInquiriesCount={inquiries.filter(i => i.status === 'New').length}
      />

      {/* Primary Page viewport */}
      <div className="flex-grow flex flex-col justify-between">
        <main className="flex-grow">
          {isAdminMode ? (
            <AdminPortal 
              students={students} setStudents={setStudents}
              registrations={registrations} setRegistrations={setRegistrations}
              classes={classes} setClasses={setClasses}
              coaches={coaches} setCoaches={setCoaches}
              events={events} setEvents={setEvents}
              payments={payments} setPayments={setPayments}
              gallery={gallery} setGallery={setGallery}
              blog={blog} setBlog={setBlog}
              sponsors={sponsors} setSponsors={setSponsors}
              inquiries={inquiries} setInquiries={setInquiries}
              isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode}
            />
          ) : (
            (() => {
              switch (currentHash) {
                case '#home':
                default:
                  return <Home sponsors={sponsors} setCurrentPage={setCurrentPage} />;
                case '#programs':
                  return <Programs coaches={coaches} classes={classes} setCurrentPage={setCurrentPage} />;
                case '#coaches':
                  return <Coaches coaches={coaches} setCurrentPage={setCurrentPage} />;
                case '#events':
                  return <Events events={events} setCurrentPage={setCurrentPage} />;
                case '#gallery':
                  return <Gallery galleryItems={gallery} />;
                case '#blog':
                  return <Blog posts={blog} />;
                case '#registration':
                  return <RegistrationPage onRegisterSubmit={handleRegisterSubmit} />;
                case '#contact':
                  return <Contact onInquirySubmit={handleInquirySubmit} />;
              }
            })()
          )}
        </main>

        {/* Editorial footer (Hidden during admin mode to prevent cluttering CMS space) */}
        {!isAdminMode && (
          <Footer 
            setCurrentPage={setCurrentPage} 
            setIsAdminMode={setIsAdminMode} 
          />
        )}
      </div>

      {/* Elegant Floating Theme Toggle */}
      <div className={`fixed bottom-6 right-6 z-50 flex items-center p-1 rounded-full border transition-all duration-300 shadow-2xl ${
        theme === 'light' 
          ? 'bg-white/95 border-slate-200/80 text-[#011B41] shadow-slate-400/20' 
          : 'bg-[#000d21]/95 border-white/10 text-white shadow-black/60'
      }`}>
        {/* Dark Mode Button */}
        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`p-2.5 rounded-full transition-all duration-300 relative cursor-pointer group flex items-center justify-center ${
            theme === 'dark' ? 'text-accent-blue scale-110' : 'text-slate-400 hover:text-slate-200 scale-90'
          }`}
          title="Dark Mode"
        >
          {theme === 'dark' && (
            <motion.div 
              layoutId="floatingThemeActiveBg"
              className="absolute inset-0 bg-accent-blue/15 border border-accent-blue/30 rounded-full"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <Moon size={18} className="relative z-10" />
        </button>

        {/* Light Mode Button */}
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`p-2.5 rounded-full transition-all duration-300 relative cursor-pointer group flex items-center justify-center ${
            theme === 'light' ? 'text-[#0284C7] scale-110' : 'text-slate-500 hover:text-slate-300 scale-90'
          }`}
          title="Light Mode"
        >
          {theme === 'light' && (
            <motion.div 
              layoutId="floatingThemeActiveBg"
              className="absolute inset-0 bg-sky-500/15 border border-sky-500/30 rounded-full"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <Sun size={18} className="relative z-10" />
        </button>
      </div>

    </div>
  );
}
