'use client';

import Link from 'next/link';

export default function Footer() {
  const footerLinks = [
    { label: 'Career advice', href: '/careeradvice' },
    { label: 'Browse jobs', href: '/' },
    { label: 'Browse companies', href: '/companies' },
    { label: 'Salaries', href: '/salaries' },
    { label: 'Our Events', href: '/events' },
    { label: 'Work at JobFynd', href: '/careers' },
    { label: 'Countries', href: '/locations' },
    { label: 'About Us', href: '/about' },
    { label: 'Help', href: '/help' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Accessibility', href: '/accessibility' },
    { label: 'Terms', href: '/terms' },
  ];

  return (
    <footer className="border-t mt-10 py-8 text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {footerLinks.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="hover:text-primary transition-colors duration-150"
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="mt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} JobFynd — All rights reserved.
      </div>
    </footer>
  );
}
