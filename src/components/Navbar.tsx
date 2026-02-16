'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/context/CartContext';

// Icons (Font Awesome 6 via react-icons/fa6)
import {
  FaBars,
  FaXmark,
  FaPhone,
  FaUser,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaChevronDown,
  FaLaptopCode,
  FaScrewdriverWrench,
  FaBoxOpen,
  FaReact,
  FaCubes,
  FaServer,
  FaWordpress,
  FaPenNib,
  FaObjectGroup,
  FaBullhorn,
  FaCode,
  FaMobileScreenButton,
  FaCartShopping,
  FaChartLine,
  FaCloud,
  FaUsersGear,
  FaGraduationCap,
  FaStore,
  FaEnvelope,
  FaCircle,
} from 'react-icons/fa6';
import { apiService } from '@/services/apiService';
import { Course, UpcomingBatch, ServiceItem, Product } from '@/types';
import type { IconType } from 'react-icons';

interface NavbarProps {
  onNavigate?: (target: string) => void;
}

interface LogoProps {
  dark?: boolean;
}

type DropdownKey = 'training' | 'services' | 'products' | null;

type DropdownItem = {
  label: string;
  href: string;
  icon: any;
};

const Navbar = ({ onNavigate }: NavbarProps) => {
  const { data: session } = useSession();
  const { itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [liveCourses, setLiveCourses] = useState<Course[]>([]);
  const [upcomingBatches, setUpcomingBatches] = useState<UpcomingBatch[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // Desktop dropdown state
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);

  // Mobile collapsibles
  const [mobileOpen, setMobileOpen] = useState<Partial<Record<Exclude<DropdownKey, null>, boolean>>>({
    training: false,
    services: false,
    products: false,
  });

  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ---------------- Site Settings ----------------
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courses, batches, fetchedServices, fetchedProducts, settings] = await Promise.all([
          apiService.getCourses(),
          apiService.getBatches(),
          apiService.getServices(),
          apiService.getProducts(),
          apiService.getSiteSettings()
        ]);
        setLiveCourses(courses);
        setUpcomingBatches(batches);
        setServices(fetchedServices);
        setProducts(fetchedProducts);
        if (settings) setSiteSettings(settings);
      } catch (err) {
        console.error('Navbar data fetch error:', err);
      }
    };
    fetchData();
  }, []);

  // Click outside to close desktop dropdowns
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // ESC to close menus
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const getCourseIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'frontend': return FaReact;
      case 'backend': return FaServer;
      case 'js': return FaCode;
      case 'wp': return FaWordpress;
      case 'design': return FaPenNib;
      case 'dm': return FaBullhorn;
      case 'robotics': return FaCubes;
      default: return FaLaptopCode;
    }
  };

  const handleLinkClick = (href: string) => {
    onNavigate?.(href);
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const Logo = ({ dark = false }: LogoProps) => (
    <div
      className="flex items-center gap-3 group cursor-pointer"
      onClick={() => handleLinkClick('/')}
      aria-label="Go to home"
    >
      <div
        className={`${dark ? 'bg-white' : 'bg-[#00548B]'
          } w-12 h-12 flex items-center justify-center rounded-lg shrink-0 shadow-lg group-hover:rotate-6 transition-transform duration-300`}
      >
        <span
          className={`${dark ? 'text-[#00548B]' : 'text-white'
            } font-serif text-3xl font-bold italic tracking-tighter`}
        >
          ST
        </span>
      </div>
      <div
        className={`flex flex-col justify-center border-b-[2px] ${dark ? 'border-white/40' : 'border-[#00548B]/30'
          } pb-0.5`}
      >
        <h1
          className={`${dark ? 'text-white' : 'text-[#00548B]'
            } text-xl md:text-2xl font-black tracking-tight leading-none`}
        >
          SANGALO <span className="font-light">TECH</span>
        </h1>
        <p
          className={`${dark ? 'text-white/70' : 'text-[#00548B]/80'
            } text-[8px] font-bold tracking-[0.25em] mt-1`}
        >
          WE PUT THE FUTURE IN YOUR HANDS
        </p>
      </div>
    </div>
  );

  // Desktop dropdown togglers (click to open)
  const toggleMenu = (key: Exclude<DropdownKey, null>) =>
    setOpenDropdown((prev) => (prev === key ? null : key));

  /* ---------------------------------- Data ---------------------------------- */

  const trainingDev: DropdownItem[] = [
    { label: 'React & Next.js', href: '/courses/react-and-next-js-training', icon: FaReact },
    { label: 'MERN Stack', href: '/courses/full-stack-mern-development', icon: FaCubes },
    { label: 'Laravel', href: '/courses/full-stack-laravel-development', icon: FaServer },
    { label: 'WordPress', href: '/courses/wordpress-theme-and-plugin-development', icon: FaWordpress },
  ];

  const trainingDesign: DropdownItem[] = [
    { label: 'UI/UX Design', href: '/courses/ui-ux-design-training', icon: FaPenNib },
    { label: 'Web Design', href: '/courses/web-design-training', icon: FaObjectGroup },
    { label: 'Digital Marketing', href: '/courses/digital-marketing-mastery', icon: FaBullhorn },
  ];

  const servicesCol1: DropdownItem[] = [
    { label: 'Web App Development', href: '/services/web-app-development', icon: FaCode },
    { label: 'Mobile Apps', href: '/services/mobile-app-development', icon: FaMobileScreenButton },
    { label: 'UI/UX & Prototyping', href: '/services/ui-ux-design-and-prototyping', icon: FaObjectGroup },
  ];

  const servicesCol2: DropdownItem[] = [
    { label: 'E‑Commerce', href: '/services/e-commerce-development', icon: FaCartShopping },
    { label: 'SEO & Performance', href: '/services/seo-and-performance-optimization', icon: FaChartLine },
    { label: 'Cloud & DevOps', href: '/services/cloud-and-devops-services', icon: FaCloud },
  ];

  const productsMenu: DropdownItem[] = [
    { label: 'School Management System', href: '/products/', icon: FaGraduationCap },
    { label: 'News Portal with Mobile App', href: '/products/', icon: FaUsersGear },
    { label: 'Clinic Management System', href: '/products/', icon: FaStore },
  ];

  /* ------------------------------ Desktop Menus ----------------------------- */

  const ParentBtn = ({
    label,
    icon: Icon,
    open,
    onClick,
  }: {
    label: string;
    icon: IconType;
    open: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className="flex items-center gap-2 hover:text-[#00548B] transition font-bold text-slate-600"
      aria-haspopup="menu"
      aria-expanded={open}
    >
      <Icon className={`text-sm ${open ? 'text-[#00548B]' : 'text-slate-500'}`} />
      <span>{label}</span>
      <FaChevronDown
        className={`text-[10px] transition-transform duration-300 ${open ? 'rotate-180 text-[#00548B]' : 'rotate-0 text-slate-500'}`}
        aria-hidden
      />
    </button>
  );

  const DesktopDropdownShell: React.FC<{
    open: boolean;
    widthClass?: string;
    children: React.ReactNode;
  }> = ({ open, widthClass = 'w-[560px]', children }) => {
    if (!open) return null;
    return (
      <div
        role="menu"
        className={`absolute left-0 mt-3 ${widthClass} bg-white border border-slate-200 rounded-2xl shadow-2xl p-6
        origin-top transition-transform duration-200 ease-out
        animate-in fade-in slide-in-from-top-2
        `}
      >
        {children}
      </div>
    );
  };

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' : 'bg-white'}`}
    >
      {/* Top Bar */}
      <div
        className={`bg-[#004a61] text-white text-[11px] font-medium transition-all duration-300 overflow-hidden ${isScrolled ? 'h-0' : 'h-10'
          }`}
      >
        <div className="max-w-[1400px] mx-auto flex justify-between items-center h-full px-6">
          <div className="flex gap-6 items-center text-[14px]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-ping" />
              <span className="text-blue-100 ">Limited Seats Available</span>
            </span>

            <a
              href={`tel:${siteSettings?.phone?.split('/')[0]?.trim() || '9851228383'}`}
              className="hidden sm:flex items-center text-[14px] gap-1.5 hover:text-blue-200 transition no-underline"
            >
              <FaPhone /> {siteSettings?.phone?.split('/')[0]?.trim() || '9851228383'}
            </a>

            <a
              href={`mailto:${siteSettings?.email || 'info@sangalotech.com'}`}
              className="hidden sm:flex items-center gap-1.5 text-[14px] hover:text-blue-200 transition no-underline"
            >
              <FaEnvelope />
              {siteSettings?.email || 'info@sangalotech.com'}
            </a>

          </div>

          <div className="flex gap-4 items-center">
            <a href={siteSettings?.facebook || "#"} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href={siteSettings?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href={siteSettings?.instagram || "#"} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="max-w-[1400px] mx-auto px-6 flex items-center justify-between py-3">
        <Link href="/" className="no-underline">
          <Logo />
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-10">
          {/* About */}
          <Link href="/about" className="hover:text-[#00548B] transition font-bold text-slate-600 no-underline text-sm">
            About Us
          </Link>

          {/* Training */}
          <div className="relative">
            <ParentBtn
              label="Training"
              icon={FaLaptopCode}
              open={openDropdown === 'training'}
              onClick={() => toggleMenu('training')}
            />
            <DesktopDropdownShell open={openDropdown === 'training'} widthClass="w-[660px]">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                    Development
                  </div>
                  <ul className="space-y-1.5">
                    {liveCourses.slice(0, 4).map((course) => {
                      const Icon = getCourseIcon(course.category);
                      return (
                        <li key={course.id}>
                          <Link
                            role="menuitem"
                            href={`/courses/${course.slug}`}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#00548B] no-underline group/item"
                            onClick={() => handleLinkClick(`/courses/${course.slug}`)}
                          >
                            <Icon className="text-[#00548B] group-hover/item:rotate-12 transition-transform" />
                            <span className="text-sm font-semibold text-slate-700">{course.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                    {liveCourses.length === 0 && trainingDev.map((item) => (
                      <li key={item.href}>
                        <Link
                          role="menuitem"
                          href={item.href}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#00548B] no-underline"
                          onClick={() => handleLinkClick(item.href)}
                        >
                          <item.icon className="text-[#00548B]" />
                          <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                    Design & Specialization
                  </div>
                  <ul className="space-y-1.5">
                    {liveCourses.slice(4, 8).map((course) => {
                      const Icon = getCourseIcon(course.category);
                      return (
                        <li key={course.id}>
                          <Link
                            role="menuitem"
                            href={`/courses/${course.slug}`}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#00548B] no-underline group/item"
                            onClick={() => handleLinkClick(`/courses/${course.slug}`)}
                          >
                            <Icon className="text-[#00548B] group-hover/item:scale-110 transition-transform" />
                            <span className="text-sm font-semibold text-slate-700">{course.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                    {liveCourses.length === 0 && trainingDesign.map((item) => (
                      <li key={item.href}>
                        <Link
                          role="menuitem"
                          href={item.href}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#00548B] no-underline"
                          onClick={() => handleLinkClick(item.href)}
                        >
                          <item.icon className="text-[#00548B]" />
                          <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </DesktopDropdownShell>
          </div>

          {/* Services */}
          <div className="relative">
            <ParentBtn
              label="Services"
              icon={FaScrewdriverWrench}
              open={openDropdown === 'services'}
              onClick={() => toggleMenu('services')}
            />
            <DesktopDropdownShell open={openDropdown === 'services'} widthClass="w-[560px]">
              <div className="grid grid-cols-2 gap-6">
                <ul className="space-y-1.5">
                  {services.length > 0 ? (
                    services.slice(0, Math.ceil(services.length / 2)).map((item) => (
                      <li key={item.id}>
                        <Link
                          role="menuitem"
                          href={`/services/${item.slug}`}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#00548B] no-underline"
                          onClick={() => handleLinkClick(`/services/${item.slug}`)}
                        >
                          <FaScrewdriverWrench className="text-[#00548B]" />
                          <span className="font-semibold text-slate-700">{item.title}</span>
                        </Link>
                      </li>
                    ))
                  ) : (
                    servicesCol1.map((item) => (
                      <li key={item.href}>
                        <Link
                          role="menuitem"
                          href={item.href}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#00548B] no-underline"
                          onClick={() => handleLinkClick(item.href)}
                        >
                          <item.icon className="text-[#00548B]" />
                          <span className="font-semibold text-slate-700">{item.label}</span>
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
                <ul className="space-y-1.5">
                  {services.length > 0 ? (
                    services.slice(Math.ceil(services.length / 2)).map((item) => (
                      <li key={item.id}>
                        <Link
                          role="menuitem"
                          href={`/services/${item.slug}`}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#00548B] no-underline"
                          onClick={() => handleLinkClick(`/services/${item.slug}`)}
                        >
                          <FaScrewdriverWrench className="text-[#00548B]" />
                          <span className="font-semibold text-slate-700">{item.title}</span>
                        </Link>
                      </li>
                    ))
                  ) : (
                    servicesCol2.map((item) => (
                      <li key={item.href}>
                        <Link
                          role="menuitem"
                          href={item.href}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-[#00548B] no-underline"
                          onClick={() => handleLinkClick(item.href)}
                        >
                          <item.icon className="text-[#00548B]" />
                          <span className="font-semibold text-slate-700">{item.label}</span>
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </DesktopDropdownShell>
          </div>

          {/* Products */}
          <div className="relative">
            <ParentBtn
              label="Products"
              icon={FaBoxOpen}
              open={openDropdown === 'products'}
              onClick={() => toggleMenu('products')}
            />
            <DesktopDropdownShell open={openDropdown === 'products'} widthClass="min-w-[330px]">
              <div className="space-y-1">
                {products.length > 0 ? (
                  products.map((item) => (
                    <Link
                      key={item.id || (item as any)._id}
                      role="menuitem"
                      href={item.link || '#'}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-50 hover:text-[#00548B] no-underline"
                      onClick={() => handleLinkClick(item.link || '#')}
                    >
                      <FaBoxOpen className="text-[#00548B]" />
                      <span className="font-semibold text-slate-700">{item.title}</span>
                    </Link>
                  ))
                ) : (
                  productsMenu.map((item) => (
                    <Link
                      key={item.href}
                      role="menuitem"
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-50 hover:text-[#00548B] no-underline"
                      onClick={() => handleLinkClick(item.href)}
                    >
                      <item.icon className="text-[#00548B]" />
                      <span className="font-semibold text-slate-700">{item.label}</span>
                    </Link>
                  ))
                )}
              </div>
            </DesktopDropdownShell>
          </div>

          {/* Upcoming */}
          <Link href="/upcoming" className="group relative hover:text-[#00548B] transition font-bold text-slate-600 no-underline text-sm flex items-center gap-2">
            <span>Upcoming Classes</span>
            {upcomingBatches.some(b => b.status === 'Enrolling' || b.status === 'Started') ? (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            ) : (
              <span className="absolute -top-3 -right-6 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg shadow-red-500/20">
                HOT
              </span>
            )}
          </Link>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative p-2.5 bg-slate-100 hover:bg-[#00548B] text-slate-600 hover:text-white rounded-full transition-all group no-underline"
            aria-label="View Cart"
          >
            <FaCartShopping className="text-lg group-hover:scale-110 transition-transform" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-white animate-in zoom-in duration-300">
                {itemCount}
              </span>
            )}
          </Link>

          {session ? (
            <div className="flex items-center gap-4">
              <Link
                href={(session.user as any).role === 'admin' ? '/adminpanel' : '/dashboard/student'}
                className="hidden md:flex items-center gap-2 bg-[#00548B] text-white px-5 py-2 rounded-full font-bold text-sm hover:shadow-xl hover:-translate-y-0.5 transition shadow-lg shadow-blue-900/20 no-underline"
              >
                <FaUser /> {session.user?.name?.split(' ')[0]}
              </Link>
              <button
                onClick={() => signOut()}
                className="hidden md:flex text-slate-600 font-bold hover:text-red-500 transition text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/studentlogin"
              className="hidden md:flex items-center gap-2 bg-[#00548B] text-white px-6 py-2.5 rounded-full font-bold hover:shadow-xl hover:-translate-y-0.5 transition shadow-lg shadow-blue-900/20 no-underline"
            >
              <FaUser /> Login
            </Link>
          )}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t p-6 space-y-6 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="space-y-4">
            <Link
              href="/about"
              onClick={() => handleLinkClick('/about')}
              className="block text-xl font-bold text-slate-800 no-underline"
            >
              About Us
            </Link>

            {/* Training collapsible */}
            <div className="border rounded-2xl">
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-left text-xl font-bold text-slate-800"
                onClick={() => setMobileOpen((s) => ({ ...s, training: !s.training }))}
                aria-expanded={!!mobileOpen.training}
              >
                <span className="flex items-center gap-3">
                  <FaLaptopCode className="text-[#00548B]" /> Training
                </span>
                <span className={`transition ${mobileOpen.training ? 'rotate-180' : ''}`}>⌄</span>
              </button>
              {mobileOpen.training && (
                <div className="px-2 pb-3 space-y-1.5">
                  {liveCourses.length > 0 ? (
                    liveCourses.map((course) => {
                      const Icon = getCourseIcon(course.category);
                      return (
                        <Link
                          key={course.id}
                          href={`/courses/${course.slug}`}
                          onClick={() => handleLinkClick(`/courses/${course.slug}`)}
                          className="flex items-center gap-3 px-4 py-2 text-slate-700 rounded-xl hover:bg-slate-50 no-underline"
                        >
                          <Icon className="text-[#00548B]" />
                          {course.title}
                        </Link>
                      );
                    })
                  ) : (
                    [...trainingDev, ...trainingDesign].map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => handleLinkClick(l.href)}
                        className="flex items-center gap-3 px-4 py-2 text-slate-700 rounded-xl hover:bg-slate-50 no-underline"
                      >
                        <l.icon className="text-[#00548B]" />
                        {l.label}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Services collapsible */}
            <div className="border rounded-2xl">
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-left text-xl font-bold text-slate-800"
                onClick={() => setMobileOpen((s) => ({ ...s, services: !s.services }))}
                aria-expanded={!!mobileOpen.services}
              >
                <span className="flex items-center gap-3">
                  <FaScrewdriverWrench className="text-[#00548B]" /> Services
                </span>
                <span className={`transition ${mobileOpen.services ? 'rotate-180' : ''}`}>⌄</span>
              </button>
              {mobileOpen.services && (
                <div className="px-2 pb-3 space-y-1.5">
                  {services.length > 0 ? (
                    services.map((l) => (
                      <Link
                        key={l.id}
                        href={`/services/${l.slug}`}
                        onClick={() => handleLinkClick(`/services/${l.slug}`)}
                        className="flex items-center gap-3 px-4 py-2 text-slate-700 rounded-xl hover:bg-slate-50 no-underline"
                      >
                        <FaScrewdriverWrench className="text-[#00548B]" />
                        {l.title}
                      </Link>
                    ))
                  ) : (
                    [...servicesCol1, ...servicesCol2].map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => handleLinkClick('/services')}
                        className="flex items-center gap-3 px-4 py-2 text-slate-700 rounded-xl hover:bg-slate-50 no-underline"
                      >
                        <l.icon className="text-[#00548B]" />
                        {l.label}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Products collapsible */}
            <div className="border rounded-2xl">
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-left text-xl font-bold text-slate-800"
                onClick={() => setMobileOpen((s) => ({ ...s, products: !s.products }))}
                aria-expanded={!!mobileOpen.products}
              >
                <span className="flex items-center gap-3">
                  <FaBoxOpen className="text-[#00548B]" /> Products
                </span>
                <span className={`transition ${mobileOpen.products ? 'rotate-180' : ''}`}>⌄</span>
              </button>
              {mobileOpen.products && (
                <div className="px-2 pb-3 space-y-1.5">
                  {products.length > 0 ? (
                    products.map((l) => (
                      <Link
                        key={l.id || (l as any)._id}
                        href={l.link || '#'}
                        onClick={() => handleLinkClick(l.link || '#')}
                        className="flex items-center gap-3 px-4 py-2 text-slate-700 rounded-xl hover:bg-slate-50 no-underline"
                      >
                        <FaBoxOpen className="text-[#00548B]" />
                        {l.title}
                      </Link>
                    ))
                  ) : (
                    productsMenu.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => handleLinkClick(l.href)}
                        className="flex items-center gap-3 px-4 py-2 text-slate-700 rounded-xl hover:bg-slate-50 no-underline"
                      >
                        <l.icon className="text-[#00548B]" />
                        {l.label}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            <Link
              href="/upcoming"
              onClick={() => handleLinkClick('/upcoming')}
              className="flex items-center justify-between text-xl font-bold text-slate-800 no-underline"
            >
              <span>Upcoming Batches</span>
              {upcomingBatches.some(b => b.status === 'Enrolling' || b.status === 'Started') && (
                <span className="relative flex h-3 w-3 mr-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              )}
            </Link>
          </div>

          <div className="pt-6 border-t">
            <Link
              href="/dashboard"
              onClick={() => handleLinkClick('/dashboard')}
              className="flex items-center justify-center gap-2 bg-[#00548B] text-white py-4 rounded-2xl font-bold no-underline"
            >
              Student Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;