import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import logo from '@/assets/logo-apvs-gold.png';
import { useTheme } from '@/contexts/ThemeContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '/#inicio' },
    { name: 'Como Funciona', href: '/#como-funciona' },
    { name: 'Benefícios', href: '/#beneficios' },
    { name: 'Sobre Nós', href: '/#sobre' },
    { name: 'FAQ', href: '/#faq' },
  ];

  const NavLink: React.FC<{ href: string; children: React.ReactNode; className?: string; onClick?: () => void }> = ({ href, children, className, onClick }) => {
    if (isHomePage) {
      return <a href={href.substring(1)} className={className} onClick={onClick}>{children}</a>;
    }
    return <Link to={href} className={className} onClick={onClick}>{children}</Link>;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage ? 'bg-apvs-blue-900 shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="APVS Brasil" className="h-12" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="h-8 w-px bg-white/30"></div>
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink 
                    href={link.href} 
                    className="text-sm font-medium text-gray-200 hover:text-apvs-accent-500 transition-colors"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4">
              <NavLink 
                href="/#cotacao" 
                className="relative overflow-hidden bg-apvs-accent-500 hover:bg-apvs-accent-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shine-effect"
              >
                Cotação Online
              </NavLink>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-white bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </div>
          </nav>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-white bg-transparent hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button 
              className="p-2 rounded-md text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 origin-top ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0 overflow-hidden'}`}>
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <NavLink 
              key={link.name}
              href={link.href} 
              className="text-gray-800 dark:text-gray-200 font-medium py-2 border-b border-gray-100 dark:border-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
          <div className="mt-2">
            <NavLink 
              href="/#cotacao" 
              className="block w-full bg-apvs-accent-500 text-white text-center px-6 py-3 rounded-md font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Fazer Cotação Agora
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};