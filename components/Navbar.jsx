"use client";

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import logo from "@/public/assets/logo.jpg";
import Image from 'next/image';
import { navbarLinks } from '@/constants';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/user-info', { 
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const data = await response.json();
        setUser(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setUser(null);
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  // Corrected: Define toggleMenu as an arrow function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      setUser(null);
      router.push('/sign-in');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header>
      <nav className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-500 py-3 md:py-8 flex justify-between items-center px-4 md:px-16 fixed top-0 right-0 left-0 z-10 w-full nav">
        <div className="flex items-center gap-2 text-xl text-slate-50">
          <Image src={logo} alt="logo image" width={40} height={40} className="rounded-full" />
          <Link href={"/"}>Fortune Edge Funding</Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:block">
          <div className="links">
            {navbarLinks.map((item) => {
              const { id, route, name } = item;

              return (
                <Link key={id} href={route} className="mx-4 text-slate-50">
                  {name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Desktop CTA Buttons / User Profile */}
        <div className="hidden md:flex gap-4 items-center relative">
          {!isLoading && (user ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 text-slate-50 hover:bg-blue-600 py-4 px-4 rounded-full cursor-pointer bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400"
              >
                <User size={24} />
              </button>
              
              {isProfileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-fit bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 px-4 text-slate-50 shadow-lg rounded-lg border">
                  <button 
                    className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <User size={16} /> {user.username}
                  </button>
                  <button 
                    className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <User size={16} /> {user.email}
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href={"/pricing"} className="bg-slate-50 py-2 px-4 rounded-full text-[1.03rem] text-blue-700">
                Get Funded
              </Link>
              <Link href={"/sign-in"} className="border-[2px] border-slate-50 py-2 px-4 rounded-full text-[1.03rem] text-slate-50">
                Sign In
              </Link>
            </>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-slate-50" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-blue-500 p-4 shadow-md flex flex-col z-20">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-4 mb-6">
              {navbarLinks.map((item) => {
                const { id, route, name } = item;

                return (
                  <Link 
                    key={id} 
                    href={route} 
                    className="text-slate-50 py-2 px-4 hover:bg-blue-600 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {name}
                  </Link>
                );
              })}

              {/* Mobile User Profile / Sign In */}
              {!isLoading && (user ? (
                <>
                  <Link 
                    href="/profile"
                    className="text-slate-50 py-2 px-4 hover:bg-blue-600 rounded flex items-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={16} /> Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left text-slate-50 py-2 px-4 hover:bg-blue-600 rounded flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href={"/get-funded"} 
                    className="bg-slate-50 py-2 px-4 rounded-full text-center text-blue-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Funded
                  </Link>
                  <Link 
                    href={"/sign-in"} 
                    className="border-[2px] border-slate-50 py-2 px-4 rounded-full text-center text-slate-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;