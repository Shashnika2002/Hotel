import React, { useState, useEffect } from 'react';
import {
  Menu, X, Phone, Mail, MapPin, Compass, Tv, Coffee,
  Bath, Utensils, ChevronLeft, ChevronRight, Flame,
  Maximize2, Send, Calendar, Wind, Check, ExternalLink,
  Home, Map, Sparkles, Building, Footprints
} from 'lucide-react';


const ROOMS_DATA = [
  {
    id: 'deluxe-double-balcony',
    name: 'Deluxe Double Room Balcony',
    folder: 'Deluxe Double Room Balcony',
    images: [
      '/Rooms/Deluxe Double Room Balcony/Room.jpg',
      '/Rooms/Deluxe Double Room Balcony/Room1.jpg',
      '/Rooms/Deluxe Double Room Balcony/balcony.jpg',
      '/Rooms/Deluxe Double Room Balcony/bathroom.jpg',
      '/Rooms/Deluxe Double Room Balcony/bathroom1.jpg',
      '/Rooms/Deluxe Double Room Balcony/bathroom2.jpg',
    ],
    details: [
      '1 King-size bed',
      'Size: 22 m²',
      'Mountain views',
      'Private Balcony',
      'Flat-screen TV',
      'Mini-bar',
      'Coffee/tea maker',
      'Free toiletries',
      'Upper floors accessible by stairs only',
    ],
    features: {
      beds: '1 King Bed',
      size: '22 m²',
      view: 'Mountain views',
      amenity: 'Private Balcony'
    },
    highlights: ['Mountain View', 'Private Balcony', 'Cozy Vibe'],
    whatsapp: 'https://wa.me/94703169000?text=Hi%20Alben%20Castle%2C%20I%20would%20like%20to%20book%20a%20Deluxe%20Double%20Room%20with%20Balcony'
  },
  {
    id: 'king-suite-balcony',
    name: 'King Suite Balcony',
    folder: 'King Suite Balcony',
    images: [
      '/Rooms/King Suite Balcony/Room.jpg',
      '/Rooms/King Suite Balcony/Romm1.jpg',
      '/Rooms/King Suite Balcony/bathroom.jpg',
      '/Rooms/King Suite Balcony/bathroom1.jpg',
    ],
    details: [
      '1 King-size bed & 1 Sofa bed',
      'Size: 28 m²',
      'Mountain views',
      'Private Balcony',
      'Minibar',
      'Flat-screen TV',
      'Bathrobe',
      'Outdoor dining area',
    ],
    features: {
      beds: '1 King & 1 Sofa Bed',
      size: '28 m²',
      view: 'Mountain views',
      amenity: 'Outdoor Dining'
    },
    highlights: ['Spacious Suite', 'Sofa Bed included', 'Balcony Dining'],
    whatsapp: 'https://wa.me/94703169000?text=Hi%20Alben%20Castle%2C%20I%20would%20like%20to%20book%20a%20King%20Suite%20with%20Balcony'
  },
  {
    id: 'deluxe-double',
    name: 'Deluxe Double Room',
    folder: 'Deluxe Double Room',
    images: [
      '/Rooms/Deluxe Double Room/Room.jpg',
      '/Rooms/Deluxe Double Room/Room1.jpg',
      '/Rooms/Deluxe Double Room/Room2.jpg',
      '/Rooms/Deluxe Double Room/bathroom.jpg',
      '/Rooms/Deluxe Double Room/refrigerator.jpg',
    ],
    details: [
      '1 King-size bed',
      'Size: 21 m²',
      'Garden views',
      'Entire unit situated on ground floor',
      'Private bathroom',
      'Flat-screen TV',
      'Minibar',
      'Tea/Coffee maker',
    ],
    features: {
      beds: '1 King Bed',
      size: '21 m²',
      view: 'Garden views',
      amenity: 'Ground Floor'
    },
    highlights: ['Garden View', 'Ground Floor Access', 'Private & Quiet'],
    whatsapp: 'https://wa.me/94703169000?text=Hi%20Alben%20Castle%2C%20I%20would%20like%20to%20book%20a%20Deluxe%20Double%20Room'
  },
  {
    id: 'deluxe-bungalow',
    name: 'Deluxe Bungalow',
    folder: 'Deluxe Bungalow',
    images: [
      '/Rooms/Deluxe Bungalow/Sofa.jpg',
      '/Rooms/Deluxe Bungalow/Dining area.jpg',
      '/Rooms/Deluxe Bungalow/Outdoor furniture.jpg',
      '/Rooms/Deluxe Bungalow/Seating area.jpg',
      '/Rooms/Deluxe Bungalow/Barbeque grills.jpg',
      '/Rooms/Deluxe Bungalow/Bathroom.jpg',
      '/Rooms/Deluxe Bungalow/Bathroom1.jpg',
    ],
    details: [
      '5 Bedrooms | 5 Bathrooms',
      'Size: 500 m²',
      'Cozy Fireplace',
      'Private entrance',
      'Full Kitchenette/Kitchen (Stovetop, Refrigerator, Dishwasher, Microwave, Oven)',
      'Barbeque grills',
      'Seating area',
      'Washing machine',
    ],
    features: {
      beds: '5 Bedrooms / 5 Baths',
      size: '500 m²',
      view: 'Full Castle Estate',
      amenity: 'Cozy Fireplace'
    },
    highlights: ['Entire Bungalow', 'Cozy Fireplace', 'Full Kitchenette'],
    whatsapp: 'https://wa.me/94703169000?text=Hi%20Alben%20Castle%2C%20I%20would%20like%20to%20book%20the%20Deluxe%20Bungalow'
  }
];

const ATTRACTIONS = [
  { name: 'Kothmale Hanging Bridge', distance: '830 m', type: 'Scenic' },
  { name: "St Francis Xavier's church", distance: '1.2 km', type: 'Historical' },
  { name: 'Single Tree Hill', distance: '1.5 km', type: 'Hiking & Viewpoint' },
  { name: 'Victoria Park of Nuwara Eliya', distance: '2 km', type: 'Nature Reserve' },
  { name: 'Gregory Lake', distance: '2 km', type: 'Water Activities' },
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [roomImgIndices, setRoomImgIndices] = useState({
    'deluxe-double-balcony': 0,
    'king-suite-balcony': 0,
    'deluxe-double': 0,
    'deluxe-bungalow': 0
  });

  const [lightbox, setLightbox] = useState({
    isOpen: false,
    roomId: '',
    imgIndex: 0
  });

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [bookingModal, setBookingModal] = useState({
    isOpen: false,
    room: null
  });

  const [bookingForm, setBookingForm] = useState({
    checkIn: '',
    checkOut: '',
    adults: 2
  });

  const [bookingError, setBookingError] = useState('');

  const getTodayDateString = () => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localToday = new Date(today.getTime() - (offset * 60 * 1000));
    return localToday.toISOString().split('T')[0];
  };

  const openBookingModal = (room) => {
    setBookingModal({
      isOpen: true,
      room
    });
    setBookingForm({
      checkIn: '',
      checkOut: '',
      adults: 2
    });
    setBookingError('');
  };

  const closeBookingModal = () => {
    setBookingModal({
      isOpen: false,
      room: null
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingError('');

    const checkInDate = new Date(bookingForm.checkIn);
    const checkOutDate = new Date(bookingForm.checkOut);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkInMidnight = new Date(checkInDate);
    checkInMidnight.setHours(0, 0, 0, 0);

    const checkOutMidnight = new Date(checkOutDate);
    checkOutMidnight.setHours(0, 0, 0, 0);

    if (checkInMidnight < today) {
      setBookingError('Check-in date cannot be in the past.');
      return;
    }

    if (checkOutMidnight <= checkInMidnight) {
      setBookingError('Check-out date must be after the check-in date.');
      return;
    }

    // WhatsApp dynamically built message
    const baseMsg = `Hi Alben Castle, I would like to book the ${bookingModal.room.name}.\nCheck-in Date: ${bookingForm.checkIn}\nCheck-out Date: ${bookingForm.checkOut}\nAdults: ${bookingForm.adults}`;
    const encodedMsg = encodeURIComponent(baseMsg);
    const whatsappUrl = `https://wa.me/94703169000?text=${encodedMsg}`;

    window.open(whatsappUrl, '_blank');
    setBookingModal({ isOpen: false, room: null });
  };


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNextImage = (roomId, maxLen, e) => {
    e.stopPropagation();
    setRoomImgIndices(prev => ({
      ...prev,
      [roomId]: (prev[roomId] + 1) % maxLen
    }));
  };

  const handlePrevImage = (roomId, maxLen, e) => {
    e.stopPropagation();
    setRoomImgIndices(prev => ({
      ...prev,
      [roomId]: (prev[roomId] - 1 + maxLen) % maxLen
    }));
  };

  const openLightbox = (roomId, imgIndex) => {
    setLightbox({
      isOpen: true,
      roomId,
      imgIndex
    });
  };

  const closeLightbox = () => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
  };

  const handleLightboxNext = () => {
    const room = ROOMS_DATA.find(r => r.id === lightbox.roomId);
    if (!room) return;
    setLightbox(prev => ({
      ...prev,
      imgIndex: (prev.imgIndex + 1) % room.images.length
    }));
  };

  const handleLightboxPrev = () => {
    const room = ROOMS_DATA.find(r => r.id === lightbox.roomId);
    if (!room) return;
    setLightbox(prev => ({
      ...prev,
      imgIndex: (prev.imgIndex - 1 + room.images.length) % room.images.length
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  const activeLightboxRoom = ROOMS_DATA.find(r => r.id === lightbox.roomId);

  return (
    <div className="min-h-screen bg-misty-gray text-[#1B3530] selection:bg-gold-luxury selection:text-white">

      {/* 1. NAVIGATION BAR */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0A2B20]/95 backdrop-blur-md shadow-2xl py-3 border-b border-gold-luxury/20' : 'bg-gradient-to-b from-black/80 to-transparent py-5'
        }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          {/* Logo Section */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold-luxury/50 group-hover:border-gold-luxury transition-all duration-300 shadow-lg">
              <img src="/Logo/logo.jpg" alt="Alben Castle Logo" className="w-full h-full object-cover scale-110" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg lg:text-xl font-bold tracking-widest text-gold-luxury leading-none">ALBEN CASTLE</span>
              <span className="text-[10px] tracking-[0.25em] text-white/80 font-light uppercase">Glenfall Hotel</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-white hover:text-gold-luxury font-medium tracking-wide text-sm transition-colors duration-300">Home</a>
            <a href="#rooms" className="text-white/90 hover:text-gold-luxury font-medium tracking-wide text-sm transition-colors duration-300">Rooms</a>
            <a href="#attractions" className="text-white/90 hover:text-gold-luxury font-medium tracking-wide text-sm transition-colors duration-300">Attractions</a>
            <a href="#contact" className="text-white/90 hover:text-gold-luxury font-medium tracking-wide text-sm transition-colors duration-300">Contact Us</a>
          </nav>

          {/* Primary CTA Button */}
          <div className="hidden md:block">
            <a
              href="https://wa.me/94703169000?text=Hi%20Alben%20Castle%20Glenfall%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20room."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full border border-gold-luxury bg-gold-luxury text-emerald-luxury-dark font-semibold tracking-wide text-sm hover:bg-transparent hover:text-gold-luxury transition-all duration-300 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            >
              Book Now
            </a>
          </div>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-gold-luxury p-1.5 focus:outline-none transition-colors duration-300"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`fixed inset-0 z-40 bg-[#0A2B20] transition-all duration-500 md:hidden flex flex-col justify-center items-center ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
        <nav className="flex flex-col gap-6 text-center">
          <a
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-2xl text-white hover:text-gold-luxury transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="#rooms"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-2xl text-white hover:text-gold-luxury transition-colors duration-300"
          >
            Rooms
          </a>
          <a
            href="#attractions"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-2xl text-white hover:text-gold-luxury transition-colors duration-300"
          >
            Nearby Attractions
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-2xl text-white hover:text-gold-luxury transition-colors duration-300"
          >
            Contact Us
          </a>
          <a
            href="https://wa.me/94703169000?text=Hi%20Alben%20Castle%20Glenfall%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20room."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-6 px-8 py-3 rounded-full bg-gold-luxury text-emerald-luxury-dark font-bold tracking-wider hover:bg-white transition-all duration-300 shadow-xl"
          >
            Book via WhatsApp
          </a>
        </nav>
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src="/Hero/hero.jpg"
            alt="Alben Castle Glenfall Hotel Exterior"
            className="w-full h-full object-cover scale-105 animate-fade-in filter brightness-[0.45] contrast-[1.05]"
          />
          {/* Smooth bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-misty-gray via-transparent to-black/60 z-10" />
        </div>

        {/* Elegant Content Overlay */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-gold-luxury/30 bg-gold-luxury/10 backdrop-blur-md animate-fade-in shadow-inner">
            <Sparkles size={16} className="text-gold-luxury" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-luxury font-medium">A Cozy Colonial Heritage Sanctuary</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight animate-fade-in text-glow-gold">
            Alben Castle <br className="hidden md:inline" />
            <span className="text-gold-luxury">Glenfall</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl font-light leading-relaxed mb-10 tracking-wide animate-fade-in">
            Experience Luxury Amidst the Misty Hills of Nuwara Eliya.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto animate-fade-in">
            <a
              href="#rooms"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white font-medium hover:bg-white hover:text-emerald-luxury-dark hover:border-white transition-all duration-300 text-center"
            >
              Explore Our Rooms
            </a>
            <a
              href="https://wa.me/94703169000?text=Hi%20Alben%20Castle%2C%20I%20would%20like%20to%20book%20a%20stay%20at%20your%20hotel."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gold-luxury border border-gold-luxury text-emerald-luxury-dark font-bold hover:bg-gold-luxury-dark hover:border-gold-luxury-dark transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] text-center flex items-center justify-center gap-2"
            >
              <Phone size={18} />
              Book via WhatsApp
            </a>
          </div>
        </div>

        {/* Floating scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 text-white/60 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest">Scroll to explore</span>
          <div className="w-1.5 h-1.5 rounded-full bg-gold-luxury" />
        </div>
      </section>

      {/* Intro Divider Section */}
      <section className="py-16 md:py-24 bg-misty-gray relative z-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-emerald-luxury font-bold mb-6">Colonial Grandeur Meets Modern Indulgence</h2>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg font-light max-w-2xl mx-auto">
            Nestled in the cozy heart of Nuwara Eliya, Alben Castle Glenfall preserves the majestic elegance of old Ceylon. Step into stone fireplaces, misty pine views, and absolute luxury serviced by warm, hospitality experts.
          </p>
          <div className="w-24 h-0.5 bg-gold-luxury mx-auto mt-8" />
        </div>
      </section>

      {/* 3. ROOMS SECTION */}
      <section id="rooms" className="py-20 md:py-32 bg-[#0B1B3D] text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,61,46,0.35),transparent)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

          <div className="text-center mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 mb-4">
              <Building size={16} className="text-gold-luxury" />
              <span className="text-xs uppercase tracking-[0.25em] text-gold-luxury font-semibold">Exquisite Living Space</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Our Luxury Rooms & Suites
            </h2>
            <p className="text-white/70 max-w-xl mx-auto font-light text-sm md:text-base">
              Indulge in absolute comfort inside our carefully themed rooms, boasting panoramic mountain views, modern facilities, and colonial fireplaces.
            </p>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {ROOMS_DATA.map((room) => {
              const activeIndex = roomImgIndices[room.id];
              return (
                <div
                  key={room.id}
                  className="bg-[#051026] rounded-2xl overflow-hidden border border-white/5 hover:border-gold-luxury/30 transition-all duration-500 shadow-2xl flex flex-col group"
                >
                  {/* Interactive Slider */}
                  <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-black/20">
                    <img
                      src={room.images[activeIndex]}
                      alt={`${room.name} View ${activeIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                      onClick={() => openLightbox(room.id, activeIndex)}
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/40 pointer-events-none" />

                    {/* Lightbox Trigger Icon */}
                    <button
                      onClick={() => openLightbox(room.id, activeIndex)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-gold-luxury hover:text-emerald-luxury-dark text-white transition-all duration-300 shadow-lg"
                      title="View gallery fullscreen"
                    >
                      <Maximize2 size={16} />
                    </button>

                    {/* Image navigation controls */}
                    <button
                      onClick={(e) => handlePrevImage(room.id, room.images.length, e)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center transition-all duration-300"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={(e) => handleNextImage(room.id, room.images.length, e)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center transition-all duration-300"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>

                    {/* Slides count badge */}
                    <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs text-white/90 font-medium tracking-wider">
                      {activeIndex + 1} / {room.images.length} Photos
                    </div>

                    {/* Highlight Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-luxury/80 backdrop-blur-sm text-[10px] text-gold-luxury font-semibold uppercase tracking-wider border border-gold-luxury/20">
                      {room.highlights[0]}
                    </div>
                  </div>

                  {/* Room Content Card */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <h3 className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-gold-luxury transition-colors duration-300">
                          {room.name}
                        </h3>
                      </div>

                      {/* Primary Quick Features Grid */}
                      <div className="grid grid-cols-2 gap-4 py-4 my-2 border-t border-b border-white/10 text-xs text-white/70">
                        <div className="flex items-center gap-2">
                          <Wind size={15} className="text-gold-luxury" />
                          <span>{room.features.view}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building size={15} className="text-gold-luxury" />
                          <span>{room.features.size}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Compass size={15} className="text-gold-luxury" />
                          <span>{room.features.beds}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sparkles size={15} className="text-gold-luxury" />
                          <span>{room.features.amenity}</span>
                        </div>
                      </div>

                      {/* All details list */}
                      <div className="mt-4">
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-luxury mb-3">Room Specifications:</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {room.details.map((detail, index) => (
                            <li key={index} className="flex items-start gap-2 text-xs text-white/80">
                              <Check size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Book Button */}
                    <div className="mt-8 pt-6 border-t border-white/5">
                      <button
                        onClick={() => openBookingModal(room)}
                        className="w-full py-3.5 rounded-xl bg-gold-luxury hover:bg-gold-luxury-dark text-emerald-luxury-dark font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] cursor-pointer"
                      >
                        <Phone size={16} />
                        Book via WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. NEARBY ATTRACTIONS */}
      <section id="attractions" className="py-20 md:py-32 bg-white relative text-[#1A302B]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">

          <div className="text-center mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 mb-4">
              <Compass size={16} className="text-emerald-luxury animate-spin-slow" />
              <span className="text-xs uppercase tracking-[0.25em] text-emerald-luxury font-semibold">Location Highlights</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-emerald-luxury mb-6">
              Explore Nuwara Eliya
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto font-light text-sm md:text-base">
              Alben Castle Glenfall is ideally situated, providing easy access to Nuwara Eliya's iconic waterfalls, landmarks, and colonial garden parks.
            </p>
          </div>

          {/* Attractions Timeline/Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ATTRACTIONS.map((spot, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-gray-100 hover:border-gold-luxury/30 bg-misty-gray/50 hover:bg-white transition-all duration-500 shadow-md flex flex-col justify-between hover:shadow-xl group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-luxury/10 text-emerald-luxury text-[10px] font-bold uppercase tracking-wider">
                      {spot.type}
                    </span>
                    <span className="text-gold-luxury font-serif font-bold text-sm tracking-wide">
                      {spot.distance}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-emerald-luxury mb-2 group-hover:text-gold-luxury transition-colors duration-300">
                    {spot.name}
                  </h3>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200/50 flex items-center gap-1.5 text-xs text-gray-500 font-medium group-hover:text-emerald-luxury transition-colors duration-300">
                  <Footprints size={15} />
                  <span>Proximity from Alben Castle</span>
                </div>
              </div>
            ))}
          </div>

          {/* Info Card banner */}
          <div className="mt-16 p-8 rounded-2xl bg-emerald-luxury text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.2),transparent)]" />
            <div className="relative z-10 text-center md:text-left">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-luxury mb-2">Need a guided tour?</h3>
              <p className="text-white/80 text-sm font-light">We arrange premium custom travel packages and tour guides around the hills.</p>
            </div>
            <a
              href="https://wa.me/94703169000?text=Hi%20Alben%20Castle%2C%20I'm%20planning%20a%20trip%20and%20would%20like%20to%20know%20more%20about%20tours%20around%20Nuwara%20Eliya."
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 px-6 py-3 rounded-full bg-gold-luxury text-emerald-luxury-dark font-bold text-xs tracking-wider uppercase hover:bg-white transition-all duration-300 shrink-0 shadow-lg"
            >
              Contact Travel Desk
            </a>
          </div>

        </div>
      </section>

      {/* 5. FOOTER & CONTACT INFO */}
      <section id="contact" className="py-20 md:py-32 bg-emerald-luxury text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(11,27,61,0.5),transparent)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* ── LEFT COLUMN: Contact Details + Map ── */}
            <div className="flex flex-col gap-6">

              {/* Logo + Title */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gold-luxury/30">
                  <img src="/Logo/logo.jpg" alt="Alben Castle Logo" className="w-full h-full object-cover" />
                </div>
                <span className="font-serif text-lg tracking-widest text-gold-luxury">ALBEN CASTLE GLENFALL</span>
              </div>

              {/* Heading + Description */}
              <div>
                <h2 className="font-serif text-4xl font-bold tracking-tight text-white mb-4">
                  Get in Touch
                </h2>
                <p className="text-white/80 max-w-md font-light leading-relaxed">
                  Plan your dream mountain getaway. Send us a message or call directly for reservations, event bookings, and bespoke services.
                </p>
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com/your-page"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Alben Castle Glenfall on Facebook"
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 transition-all duration-300 hover:shadow-[0_0_12px_rgba(245,158,11,0.35)]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Alben Castle Glenfall on Instagram"
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 transition-all duration-300 hover:shadow-[0_0_12px_rgba(245,158,11,0.35)]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              </div>

              {/* Contact Info Rows */}
              <div className="flex flex-col gap-6">

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-gold-luxury shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-gold-luxury/70 font-semibold mb-1">Our Location</h4>
                    <p className="text-sm text-white/90">39, Glenfall road, Nuwara Eliya, Sri Lanka.</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-gold-luxury shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-gold-luxury/70 font-semibold mb-1">Email Address</h4>
                    <a href="mailto:albencastle@gmail.com" className="text-sm text-white/90 hover:text-gold-luxury transition-colors duration-300">
                      albencastle@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-gold-luxury shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-gold-luxury/70 font-semibold mb-1">Call / WhatsApp</h4>
                    <a href="tel:+94703169000" className="text-sm text-white/90 hover:text-gold-luxury transition-colors duration-300 block">
                      +94 70 316 9000
                    </a>
                  </div>
                </div>

              </div>
              {/* END Contact Info Rows */}

              {/* Google Maps Widget — standalone, outside contact info */}
              <div className="mt-8 rounded-xl overflow-hidden border border-white/10 shadow-2xl w-full bg-white/5" style={{ height: '224px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.534293816781!2d80.7634426!3d6.9461461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae380eb7501a357%3A0xe54e60ef2b79a0cf!2sAlben%20Castle%20Glenfall!5e0!3m2!1sen!2slk!4v1717415000000!5m2!1sen!2slk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Alben Castle Glenfall Google Map location"
                />
              </div>

            </div>
            {/* END LEFT COLUMN */}

            {/* ── RIGHT COLUMN: Contact Form ── */}
            <div className="p-8 md:p-10 rounded-2xl bg-white/5 border border-white/10 shadow-2xl relative">
              <h3 className="font-serif text-2xl font-semibold mb-6">Reservation &amp; Inquiries</h3>

              {formSubmitted ? (
                <div className="h-64 flex flex-col justify-center items-center text-center p-6 bg-emerald-900/40 rounded-xl border border-emerald-500/30">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                    <Check size={32} />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-white mb-2">Message Sent Successfully!</h4>
                  <p className="text-white/80 text-xs font-light">Thank you. Our travel desk will contact you via email shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="form-name" className="block text-xs uppercase tracking-widest text-gold-luxury font-semibold mb-2">Full Name</label>
                    <input
                      type="text"
                      id="form-name"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-gold-luxury focus:outline-none transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="form-email" className="block text-xs uppercase tracking-widest text-gold-luxury font-semibold mb-2">Email Address</label>
                    <input
                      type="email"
                      id="form-email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="johndoe@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-gold-luxury focus:outline-none transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="form-message" className="block text-xs uppercase tracking-widest text-gold-luxury font-semibold mb-2">Your Message</label>
                    <textarea
                      id="form-message"
                      rows="4"
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Specify dates, room category preference, or query..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-gold-luxury focus:outline-none transition-all duration-300 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gold-luxury hover:bg-gold-luxury-dark text-emerald-luxury-dark font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
            {/* END RIGHT COLUMN */}

          </div>
          {/* END GRID */}

          {/* Footer Bottom copyright */}
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
            <p>&copy; {new Date().getFullYear()} Alben Castle Glenfall. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gold-luxury transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-gold-luxury transition-colors duration-300">Terms of Service</a>
              <a href="https://wa.me/94703169000" target="_blank" rel="noopener noreferrer" className="hover:text-gold-luxury transition-colors duration-300 flex items-center gap-1">
                <span>Support</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* LIGHTBOX / FULLSCREEN GALLERY COMPONENT */}
      {lightbox.isOpen && activeLightboxRoom && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-6">
          {/* Header */}
          <div className="flex justify-between items-center text-white">
            <div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-gold-luxury">{activeLightboxRoom.name}</h3>
              <p className="text-white/60 text-xs uppercase tracking-widest mt-1">Image {lightbox.imgIndex + 1} of {activeLightboxRoom.images.length}</p>
            </div>
            <button
              onClick={closeLightbox}
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-300"
              aria-label="Close fullscreen gallery"
            >
              <X size={24} />
            </button>
          </div>

          {/* Main Photo Slider */}
          <div className="relative flex-1 flex items-center justify-center max-h-[70vh] my-4 select-none">
            <button
              onClick={handleLightboxPrev}
              className="absolute left-0 w-14 h-14 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-all duration-300 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>

            <img
              src={activeLightboxRoom.images[lightbox.imgIndex]}
              alt={`${activeLightboxRoom.name} - View ${lightbox.imgIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg border border-white/10 shadow-2xl transition-all duration-300"
            />

            <button
              onClick={handleLightboxNext}
              className="absolute right-0 w-14 h-14 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-all duration-300 z-10"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex gap-2 justify-center overflow-x-auto py-2">
            {activeLightboxRoom.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setLightbox(prev => ({ ...prev, imgIndex: index }))}
                className={`w-16 h-12 rounded overflow-hidden border-2 shrink-0 transition-all duration-300 ${lightbox.imgIndex === index ? 'border-gold-luxury scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
              >
                <img src={img} alt="Thumbnail view" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 6. BOOKING MODAL */}
      {bookingModal.isOpen && bookingModal.room && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#051026] rounded-2xl border border-gold-luxury/30 p-6 md:p-8 text-white relative shadow-2xl animate-fade-in">
            {/* Close Button */}
            <button
              onClick={closeBookingModal}
              className="absolute top-4 right-4 text-white/60 hover:text-gold-luxury transition-colors duration-300 p-1 rounded-full hover:bg-white/5 cursor-pointer"
              aria-label="Close booking modal"
            >
              <X size={20} />
            </button>

            {/* Modal Title */}
            <div className="mb-6">
              <span className="text-xs uppercase tracking-[0.2em] text-gold-luxury font-semibold">Reservation Request</span>
              <h3 className="font-serif text-2xl font-bold mt-1 text-white">{bookingModal.room.name}</h3>
            </div>

            {/* Error Message */}
            {bookingError && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-start gap-2">
                <span className="font-bold">Error:</span>
                <span>{bookingError}</span>
              </div>
            )}

            {/* Booking Form */}
            <form onSubmit={handleBookingSubmit} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gold-luxury font-semibold mb-2 flex items-center gap-1.5">
                  <Calendar size={14} className="text-gold-luxury" />
                  Check-in Date
                </label>
                <input
                  type="date"
                  required
                  min={getTodayDateString()}
                  value={bookingForm.checkIn}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, checkIn: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold-luxury focus:outline-none transition-all duration-300 color-scheme-dark"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gold-luxury font-semibold mb-2 flex items-center gap-1.5">
                  <Calendar size={14} className="text-gold-luxury" />
                  Check-out Date
                </label>
                <input
                  type="date"
                  required
                  min={bookingForm.checkIn || getTodayDateString()}
                  value={bookingForm.checkOut}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, checkOut: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-gold-luxury focus:outline-none transition-all duration-300 color-scheme-dark"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gold-luxury font-semibold mb-2 flex items-center gap-1.5">
                  <span className="font-serif font-bold text-sm text-gold-luxury">Adults</span>
                  Number of Adults
                </label>
                <select
                  value={bookingForm.adults}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, adults: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 rounded-xl bg-[#051026] border border-white/10 text-white focus:border-gold-luxury focus:outline-none transition-all duration-300"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <option key={n} value={n} className="bg-[#051026]">{n} {n === 1 ? 'Adult' : 'Adults'}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-6 rounded-xl bg-gold-luxury hover:bg-gold-luxury-dark text-emerald-luxury-dark font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone size={16} />
                Confirm Booking via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
