'use client';

import Link from 'next/link';

const Footer = () => {
  const footerLinks = [
    'Career advice',
    'Browse jobs',
    'Browse companies',
    'Salaries',
    'Our Events',
    'Work at JobFynd',
    'Countries',
    'About Us',
    'Help',
    'Privacy Policy',
    'Accessibility',
    'Terms'
  ];

  return (
    <footer className="w-full mt-12 border-t">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm">
        {footerLinks.map((label, index) => (
          <Link key={index} href="#" className="hover:underline">
            {label}
          </Link>
        ))}
      </div>
      <div className="text-center text-xs py-4">
        © 2025 JobFynd
      </div>
    </footer>
  );
};

export default Footer;
