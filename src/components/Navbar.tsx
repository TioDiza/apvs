import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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
        isScrolled || !isHomePage ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <ShieldCheck className="w-8 h-8 text-apvs-green-500" />
            <span className={`text-2xl font-bold transition-colors ${isScrolled || !isHomePage ? 'text-apvs-blue-900' : 'text-white'}`}>
              APVS <span className="text-apvs-green-500">Brasil</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink 
                    href={link.href} 
                    className={`text-sm font-medium hover:text-apvs-green-500 transition-colors ${
                      isScrolled || !isHomePage ? 'text-gray-700' : 'text-gray-200'
                    }`}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <NavLink 
              href="/#cotacao" 
              className="relative overflow-hidden bg-apvs-green-500 hover:bg-apvs-green-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shine-effect"
            >
              Cotação Online
            </NavLink>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden p-2 rounded-md ${isScrolled || !isHomePage ? 'text-apvs-blue-900' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-xl transition-all duration-300 origin-top ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0 overflow-hidden'}`}>
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <NavLink 
              key={link.name}
              href={link.href} 
              className="text-gray-800 font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink 
            href="/#cotacao" 
            className="bg-apvs-green-500 text-white text-center px-6 py-3 rounded-md font-semibold mt-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Fazer Cotação Agora
          </NavLink>
        </div>
      </div>
    </header>
  );
};