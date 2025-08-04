"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { useAuth } from "../contexts/AuthContext"
import { Menu, X, Home, Package, Bell, Users, LogOut, Moon, Sun, ArrowUpDown, ArrowDownUp } from "lucide-react"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Components", href: "/components", icon: Package },
    { name: "Inward Stock", href: "/transactions/inward", icon: ArrowDownUp },
    { name: "Outward Stock", href: "/transactions/outward", icon: ArrowUpDown },
    { name: "Notifications", href: "/notifications", icon: Bell },
    ...(user?.role === "Admin" ? [{ name: "Users", href: "/users", icon: Users }] : []),
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${darkMode ? "dark" : ""}`}>
      {/* Desktop Top Navigation */}
      <div className="hidden lg:block">
        {/* Top Header with Logo and User */}
        <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
          <div className="max-w-8xl mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              {/* Logo Section */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Package className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Lab Inventory
                  </h1>
                  <p className="text-sm text-gray-500">Management System</p>
                </div>
              </div>

              {/* Desktop Navigation Menu */}
              <nav className="flex items-center space-x-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                        isActive 
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                          : "text-gray-700 hover:bg-white/80 hover:text-gray-900 hover:shadow-md"
                      }`}
                    >
                      <Icon className={`mr-3 h-5 w-5 transition-colors ${isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"}`} />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )
                })}
              </nav>

              {/* User Section */}
              <div className="flex items-center gap-x-4">
                <button 
                  onClick={() => setDarkMode(!darkMode)} 
                  className="p-3 text-gray-500 hover:text-gray-700 hover:bg-white/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>

                <div className="flex items-center space-x-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl px-4 py-2 border border-gray-200/50">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.role}</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {user?.name?.charAt(0) || 'A'}
                  </div>
                </div>

                <button 
                  onClick={handleLogout} 
                  className="p-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content for Desktop */}
        <main className="py-8">
          <div className="mx-auto max-w-8xl px-6">{children}</div>
        </main>

        {/* Desktop Footer */}
        <footer className="bg-white/80 backdrop-blur-xl border-t border-gray-200/50 shadow-lg">
          <div className="max-w-8xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Lab Inventory
                    </h3>
                    <p className="text-sm text-gray-500">Management System</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 max-w-md">
                  Streamline your laboratory inventory management with our comprehensive tracking system. 
                  Monitor stock levels, track transactions, and optimize your lab operations.
                </p>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>System Online</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>v2.1.0</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {navigation.slice(0, 4).map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="#" className="hover:text-blue-600 transition-colors duration-200">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-600 transition-colors duration-200">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-600 transition-colors duration-200">
                      Contact Support
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-600 transition-colors duration-200">
                      System Status
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-8 pt-6 border-t border-gray-200/50">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <span>© 2025 Lab Inventory Management System</span>
                  <span>•</span>
                  <a href="#" className="hover:text-blue-600 transition-colors duration-200">Privacy Policy</a>
                  <span>•</span>
                  <a href="#" className="hover:text-blue-600 transition-colors duration-200">Terms of Service</a>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">Made with ❤️ by Jayesh & Karan</span>
                  <div className="flex space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
                      <span className="text-white text-xs font-bold">J&K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile Layout (Sidebar) */}
      <div className="lg:hidden">
        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/90 backdrop-blur-xl shadow-2xl border-r border-white/20 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-all duration-300 ease-out`}
        >
          <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Lab Inventory
              </h1>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="p-2 rounded-xl hover:bg-gray-100/80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <nav className="mt-8 px-4">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                      isActive 
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105" 
                        : "text-gray-700 hover:bg-white/60 hover:text-gray-900 hover:shadow-md hover:scale-105"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className={`mr-4 h-5 w-5 transition-colors ${isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"}`} />
                    <span className="font-medium">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full shadow-sm"></div>
                    )}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* User Info at Bottom */}
          <div className="absolute bottom-6 left-4 right-4">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Top Bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-white/20 bg-white/90 backdrop-blur-xl px-4 shadow-lg">
          <button 
            type="button" 
            className="p-2.5 text-gray-700 hover:bg-gray-100/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" 
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h2 className="text-lg font-bold text-gray-900">Lab Inventory</h2>
        </div>

        {/* Mobile Content */}
        <main className="py-4">
          <div className="mx-auto max-w-7xl px-4">{children}</div>
        </main>

        {/* Mobile Footer */}
        <footer className="bg-white/80 backdrop-blur-xl border-t border-gray-200/50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center space-y-4">
              {/* Mobile Company Info */}
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Lab Inventory
                  </h3>
                </div>
              </div>

              {/* Mobile Quick Links */}
              <div className="grid grid-cols-2 gap-4 py-4">
                {navigation.slice(0, 4).map((item) => (
                  <Link 
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2 bg-gray-50/50 rounded-lg"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Status */}
              <div className="flex justify-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>Online</span>
                </div>
                <span>•</span>
                <span>v2.1.0</span>
                <span>•</span>
                <span>© 2025</span>
              </div>

              {/* Mobile Bottom */}
              <div className="pt-4 border-t border-gray-200/50">
                <p className="text-xs text-gray-500">
                  Made with ❤️ by Jayesh & Karan
                </p>
              </div>
            </div>
          </div>
        </footer>

        {/* Sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        )}
      </div>
    </div>
  )
}
