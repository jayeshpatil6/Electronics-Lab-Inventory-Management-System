"use client"

import { useEffect, useState } from "react"
import Layout from "../../src/components/Layout"
import { useComponents } from "../../src/contexts/ComponentsContext"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Package, AlertTriangle, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const { components } = useComponents()
  const [dashboardData, setDashboardData] = useState({
    totalComponents: 0,
    lowStockItems: 0,
    recentTransactions: 0,
    oldStockItems: 0,
  })
  const [currentTime, setCurrentTime] = useState("")
  const [mounted, setMounted] = useState(false)

  // Helper function to format dates consistently
  const formatDate = (dateString: string) => {
    if (!mounted) return '--/--/----'
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${month}/${day}/${year}`
  }

  useEffect(() => {
    // Set mounted state for proper hydration
    setMounted(true)
    
    // Function to format time consistently
    const updateTime = () => {
      const now = new Date()
      // Use a consistent 24-hour format to avoid server/client mismatch
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const seconds = now.getSeconds().toString().padStart(2, '0')
      setCurrentTime(`${hours}:${minutes}:${seconds}`)
    }
    
    updateTime()
    const timer = setInterval(updateTime, 1000)
    
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Calculate dashboard metrics
    const lowStock = components.filter((comp) => comp.quantity <= comp.minQuantity)
    const oldStock = components.filter((comp) => {
      const lastUpdated = new Date(comp.lastUpdated)
      const threeMonthsAgo = new Date()
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
      return lastUpdated < threeMonthsAgo
    })

    setDashboardData({
      totalComponents: components.length,
      lowStockItems: lowStock.length,
      recentTransactions: 45, // Mock data
      oldStockItems: oldStock.length,
    })
  }, [components])

  // Mock chart data
  const monthlyData = [
    { month: "Jan", inward: 65, outward: 28 },
    { month: "Feb", inward: 59, outward: 48 },
    { month: "Mar", inward: 80, outward: 40 },
    { month: "Apr", inward: 81, outward: 19 },
    { month: "May", inward: 56, outward: 96 },
    { month: "Jun", inward: 55, outward: 27 },
  ]

  const categoryData = [
    { name: "Microcontrollers", value: 30, color: "#0088FE" },
    { name: "Resistors", value: 25, color: "#00C49F" },
    { name: "Capacitors", value: 20, color: "#FFBB28" },
    { name: "LEDs", value: 15, color: "#FF8042" },
    { name: "Others", value: 10, color: "#8884D8" },
  ]

  const lowStockComponents = components.filter((comp) => comp.quantity <= comp.minQuantity)
  const oldStockComponents = components.filter((comp) => {
    const lastUpdated = new Date(comp.lastUpdated)
    const threeMonthsAgo = new Date()
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
    return lastUpdated < threeMonthsAgo
  })

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Page Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-600">Monitor your laboratory inventory overview</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Live Data
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {mounted ? currentTime : '--:--:--'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Components</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.totalComponents}</p>
                  <p className="text-xs text-green-600">↗ 5% from last month</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.lowStockItems}</p>
                  <p className="text-xs text-red-600">Requires attention</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Recent Transactions</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.recentTransactions}</p>
                  <p className="text-xs text-green-600">This month</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Inactive Stock</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.oldStockItems}</p>
                  <p className="text-xs text-amber-600">Review needed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Monthly Transaction Trends</h3>
                <p className="text-sm text-gray-600">Track inward and outward stock movements</p>
              </div>
              <div className="p-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis 
                        dataKey="month" 
                        fontSize={12} 
                        tick={{ fill: '#6b7280' }}
                        axisLine={{ stroke: '#e5e7eb' }}
                      />
                      <YAxis 
                        fontSize={12} 
                        tick={{ fill: '#6b7280' }}
                        axisLine={{ stroke: '#e5e7eb' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                      />
                      <Bar dataKey="inward" fill="#10B981" name="Inward" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="outward" fill="#EF4444" name="Outward" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Inventory Distribution</h3>
                <p className="text-sm text-gray-600">Components breakdown by category</p>
              </div>
              <div className="p-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        fontSize={11}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Data Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Critical Low Stock */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Critical Low Stock</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {lowStockComponents.length} items
                  </span>
                </div>
                <p className="text-sm text-gray-600">Components requiring immediate attention</p>
              </div>
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Component
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current / Min
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {lowStockComponents.slice(0, 5).map((component) => (
                      <tr key={component.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link
                            href={`/components/${component.id}`}
                            className="text-sm font-medium text-blue-600 hover:text-blue-800"
                          >
                            {component.name}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {component.quantity} / {component.minQuantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Critical
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {lowStockComponents.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Package className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-500">All components are adequately stocked</p>
                  </div>
                )}
              </div>
            </div>

            {/* Inactive Inventory */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Inactive Inventory</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    {oldStockComponents.length} items
                  </span>
                </div>
                <p className="text-sm text-gray-600">Components with no recent activity</p>
              </div>
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Component
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Updated
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Days Ago
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {oldStockComponents.slice(0, 5).map((component) => {
                      const daysSince = Math.floor((new Date().getTime() - new Date(component.lastUpdated).getTime()) / (1000 * 60 * 60 * 24))
                      return (
                        <tr key={component.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Link
                              href={`/components/${component.id}`}
                              className="text-sm font-medium text-blue-600 hover:text-blue-800"
                            >
                              {component.name}
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDate(component.lastUpdated)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                              {daysSince} days
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                {oldStockComponents.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-500">All inventory is actively managed</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
