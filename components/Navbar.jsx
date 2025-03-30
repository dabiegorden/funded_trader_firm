"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X, User, LogOut, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

const navbarLinks = [
  {
    id: 1,
    name: "Home",
    route: "/",
  },
  {
    id: 2,
    name: "About",
    route: "/about",
  },
  {
    id: 3,
    name: "Contact",
    route: "/contact",
  },
  {
    id: 4,
    name: "Blog",
    route: "/blog",
  },
]

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const router = useRouter()
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

  // Fetch user data on component mount and when route changes
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${apiBaseUrl}/api/auth/getCurrentUser`, {
          credentials: "include",
        })

        if (!response.ok) {
          throw new Error("Failed to fetch user info")
        }

        const data = await response.json()
        setUser(data)
      } catch (error) {
        console.error("Error fetching user info:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserInfo()

    // Listen for route changes to refresh user data
    const handleRouteChange = () => {
      fetchUserInfo()
    }

    window.addEventListener("popstate", handleRouteChange)

    return () => {
      window.removeEventListener("popstate", handleRouteChange)
    }
  }, [apiBaseUrl])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Logout failed")
      }

      setUser(null)
      setIsProfileDropdownOpen(false)
      router.push("/sign-in")
    } catch (error) {
      console.error("Logout failed", error)
    }
  }

  // Completely redesigned avatar rendering without size parameter
  const renderUserAvatar = (avatarSize) => {
    const avatarClasses = {
      small: "w-8 h-8", // 32px
      medium: "w-10 h-10", // 40px
      large: "w-12 h-12" // 48px
    }
    
    const iconSizes = {
      small: 16,
      medium: 20,
      large: 24
    }
    
    const sizeClass = avatarClasses[avatarSize] || avatarClasses.small
    const iconSize = iconSizes[avatarSize] || iconSizes.small
    
    if (user?.profile?.avatarUrl && !imageError) {
      return (
        <div className={`${sizeClass} rounded-full overflow-hidden flex-shrink-0`}>
          <Image
            src={`${apiBaseUrl}${user.profile.avatarUrl}`}
            alt="Profile"
            width={48}
            height={48}
            className="w-full h-full object-cover rounded-full"
            onError={() => setImageError(true)}
          />
        </div>
      )
    } else {
      return (
        <div className={`${sizeClass} rounded-full bg-blue-800 flex items-center justify-center flex-shrink-0`}>
          <User size={iconSize} className="text-white" />
        </div>
      )
    }
  }

  return (
    <header>
      <nav className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-500 py-3 md:py-8 flex justify-between items-center px-4 md:px-16 fixed top-0 right-0 left-0 z-10 w-full nav">
        <div className="flex items-center gap-2 text-xl text-slate-50">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-blue-700 font-bold">FE</span>
          </div>
          <Link href={"/"}>Fortune Edge Funding</Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:block">
          <div className="links">
            {navbarLinks.map((item) => {
              const { id, route, name } = item

              return (
                <Link key={id} href={route} className="mx-4 text-slate-50">
                  {name}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Desktop CTA Buttons / User Profile */}
        <div className="hidden md:flex gap-4 items-center relative">
          {!isLoading &&
            (user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-4 text-slate-50 hover:bg-blue-600 py-2 px-4 rounded-full cursor-pointer"
                >
                  {renderUserAvatar("small")}
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white text-gray-800 shadow-lg rounded-lg border overflow-hidden">
                    <div className="p-4 border-b bg-gray-50">
                      <div className="flex items-center">
                        {renderUserAvatar("large")}
                        <div className="ml-3">
                          <div className="font-medium">{user.username}</div>
                          <div className="text-sm text-gray-500 truncate">{user.email}</div>
                        </div>
                      </div>
                      {user.profile?.fullName && (
                        <div className="mt-2 text-sm text-gray-600">{user.profile.fullName}</div>
                      )}
                      {user.profile?.location && <div className="text-sm text-gray-500">{user.profile.location}</div>}
                    </div>

                    <div className="py-1 border-t">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center cursor-pointer"
                      >
                        <LogOut size={16} className="mr-2" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href={"/pricing"} className="bg-slate-50 py-2 px-4 rounded-full text-[1.03rem] text-blue-700">
                  Get Funded
                </Link>
                <Link
                  href={"/login"}
                  className="border-[2px] border-slate-50 py-2 px-4 rounded-full text-[1.03rem] text-slate-50"
                >
                  Sign In
                </Link>
              </>
            ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-slate-50" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-blue-500 p-4 shadow-md flex flex-col z-20">
            {/* Mobile User Profile Info (if logged in) */}
            {!isLoading && user && (
              <div className="flex items-center p-4 border-b border-blue-400 mb-4">
                {renderUserAvatar("medium")}
                <div className="ml-3">
                  <div className="font-medium text-white">{user.username}</div>
                  <div className="text-sm text-blue-100 truncate">{user.email}</div>
                </div>
              </div>
            )}

            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-2">
              {navbarLinks.map((item) => {
                const { id, route, name } = item

                return (
                  <Link
                    key={id}
                    href={route}
                    className="text-slate-50 py-2 px-4 hover:bg-blue-600 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {name}
                  </Link>
                )
              })}

              {/* Mobile User Profile / Sign In */}
              {!isLoading &&
                (user ? (
                  <>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-slate-50 py-2 px-4 hover:bg-blue-600 rounded flex items-center gap-2 cursor-pointer mt-2"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href={"/pricing"}
                      className="bg-slate-50 py-2 px-4 rounded-full text-center text-blue-700 mt-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Funded
                    </Link>
                    <Link
                      href={"/login"}
                      className="border-[2px] border-slate-50 py-2 px-4 rounded-full text-center text-slate-50 mt-2"
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
  )
}

export default Navbar