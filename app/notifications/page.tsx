"use client"

import { useMemo } from "react"
import Link from "next/link"
import Layout from "../../src/components/Layout"
import { useComponents } from "../../src/contexts/ComponentsContext"
import { Bell, AlertTriangle, Clock, Package, ExternalLink } from "lucide-react"

export default function Notifications() {
  const { components } = useComponents()

  const notifications = useMemo(() => {
    const lowStockNotifications = components
      .filter((comp) => comp.quantity <= comp.minQuantity)
      .map((comp) => ({
        id: `low-stock-${comp.id}`,
        type: "low-stock" as const,
        title: "Low Stock Alert",
        message: `${comp.name} (${comp.partNumber}) is running low`,
        details: `Current: ${comp.quantity}, Minimum: ${comp.minQuantity}`,
        componentId: comp.id,
        severity: comp.quantity === 0 ? "critical" : "warning",
        timestamp: new Date().toISOString(),
      }))

    const oldStockNotifications = components
      .filter((comp) => {
        const lastUpdated = new Date(comp.lastUpdated)
        const threeMonthsAgo = new Date()
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
        return lastUpdated < threeMonthsAgo
      })
      .map((comp) => ({
        id: `old-stock-${comp.id}`,
        type: "old-stock" as const,
        title: "Inactive Component",
        message: `${comp.name} (${comp.partNumber}) has no recent activity`,
        details: `Last updated: ${new Date(comp.lastUpdated).toLocaleDateString()}`,
        componentId: comp.id,
        severity: "info" as const,
        timestamp: comp.lastUpdated,
      }))

    return [...lowStockNotifications, ...oldStockNotifications].sort((a, b) => {
      // Sort by severity first, then by timestamp
      const severityOrder = { critical: 0, warning: 1, info: 2 }
      if (severityOrder[a.severity] !== severityOrder[b.severity]) {
        return severityOrder[a.severity] - severityOrder[b.severity]
      }
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    })
  }, [components])

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "info":
        return <Clock className="h-5 w-5 text-blue-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "info":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "low-stock":
        return <Package className="h-4 w-4" />
      case "old-stock":
        return <Clock className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-2 text-gray-600">Stay updated with inventory alerts and warnings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Critical Alerts</p>
                <p className="text-2xl font-bold text-red-600">
                  {notifications.filter((n) => n.severity === "critical").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Warnings</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {notifications.filter((n) => n.severity === "warning").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Bell className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Notifications</p>
                <p className="text-2xl font-bold text-blue-600">{notifications.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Notifications</h3>
          </div>

          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
              <p className="mt-1 text-sm text-gray-500">All components are properly stocked and active.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 pt-1">{getSeverityIcon(notification.severity)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityBadge(notification.severity)}`}
                          >
                            {getTypeIcon(notification.type)}
                            <span className="ml-1 capitalize">{notification.severity}</span>
                          </span>
                        </div>
                        <Link
                          href={`/components/${notification.componentId}`}
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
                        >
                          View Component
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                      <p className="mt-1 text-xs text-gray-500">{notification.details}</p>
                      <p className="mt-2 text-xs text-gray-400">
                        {notification.type === "low-stock"
                          ? "Just now"
                          : `Last activity: ${new Date(notification.timestamp).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {notifications.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/components?filter=low-stock"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Package className="h-4 w-4 mr-2" />
                View Low Stock Components
              </Link>
              <Link
                href="/transactions/inward"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Package className="h-4 w-4 mr-2" />
                Add Stock
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
