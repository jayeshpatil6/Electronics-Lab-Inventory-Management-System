"use client"

import type React from "react"

import { useState } from "react"
import Layout from "../../../src/components/Layout"
import { useComponents } from "../../../src/contexts/ComponentsContext"
import { ArrowUpDown, Save, Search, AlertTriangle } from "lucide-react"

export default function OutwardStock() {
  const { components, updateComponent } = useComponents()
  const [formData, setFormData] = useState({
    componentId: "",
    quantity: 0,
    reason: "",
    projectName: "",
    requestedBy: "",
    approvedBy: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const filteredComponents = components.filter(
    (comp) =>
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.partNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const selectedComponent = components.find((comp) => comp.id === formData.componentId)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number.parseFloat(value) || 0 : value,
    }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (selectedComponent) {
        if (formData.quantity > selectedComponent.quantity) {
          setError("Insufficient stock available")
          setIsLoading(false)
          return
        }

        const newQuantity = selectedComponent.quantity - formData.quantity
        updateComponent(selectedComponent.id, { quantity: newQuantity })

        setSuccess(true)
        setFormData({
          componentId: "",
          quantity: 0,
          reason: "",
          projectName: "",
          requestedBy: "",
          approvedBy: "",
        })

        setTimeout(() => setSuccess(false), 3000)
      }
    } catch (error) {
      console.error("Error processing outward stock:", error)
      setError("Failed to process outward stock")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <ArrowUpDown className="h-8 w-8 text-orange-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Outward Stock</h1>
              <p className="mt-2 text-gray-600">Remove components from inventory</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
            Stock removed successfully!
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            {error}
          </div>
        )}

        {/* Form */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Remove Stock Transaction</h3>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Component Selection */}
            <div>
              <label htmlFor="componentId" className="block text-sm font-medium text-gray-700 mb-2">
                Select Component *
              </label>
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search components..."
                    className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  id="componentId"
                  name="componentId"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.componentId}
                  onChange={handleChange}
                >
                  <option value="">Choose a component</option>
                  {filteredComponents.map((component) => (
                    <option key={component.id} value={component.id}>
                      {component.name} ({component.partNumber}) - Available: {component.quantity}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selected Component Info */}
            {selectedComponent && (
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-900 mb-2">Selected Component</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Name:</span> {selectedComponent.name}
                  </div>
                  <div>
                    <span className="text-gray-500">Part Number:</span> {selectedComponent.partNumber}
                  </div>
                  <div>
                    <span className="text-gray-500">Available Stock:</span>
                    <span
                      className={`ml-1 ${selectedComponent.quantity <= selectedComponent.minQuantity ? "text-red-600 font-medium" : ""}`}
                    >
                      {selectedComponent.quantity}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Location:</span> {selectedComponent.location}
                  </div>
                </div>
                {selectedComponent.quantity <= selectedComponent.minQuantity && (
                  <div className="mt-2 flex items-center text-red-600 text-sm">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Low stock warning: This component is at or below minimum quantity
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quantity */}
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantity to Remove *
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  required
                  min="1"
                  max={selectedComponent?.quantity || 0}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.quantity}
                  onChange={handleChange}
                />
                {selectedComponent && formData.quantity > 0 && (
                  <p className="mt-1 text-sm text-gray-500">
                    Remaining stock will be: {selectedComponent.quantity - formData.quantity}
                  </p>
                )}
                {selectedComponent && formData.quantity > selectedComponent.quantity && (
                  <p className="mt-1 text-sm text-red-600">Insufficient stock available</p>
                )}
              </div>

              {/* Project Name */}
              <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.projectName}
                  onChange={handleChange}
                  placeholder="Enter project name"
                />
              </div>

              {/* Requested By */}
              <div>
                <label htmlFor="requestedBy" className="block text-sm font-medium text-gray-700">
                  Requested By
                </label>
                <input
                  type="text"
                  id="requestedBy"
                  name="requestedBy"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.requestedBy}
                  onChange={handleChange}
                  placeholder="Enter requester name"
                />
              </div>

              {/* Approved By */}
              <div>
                <label htmlFor="approvedBy" className="block text-sm font-medium text-gray-700">
                  Approved By
                </label>
                <input
                  type="text"
                  id="approvedBy"
                  name="approvedBy"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.approvedBy}
                  onChange={handleChange}
                  placeholder="Enter approver name"
                />
              </div>
            </div>

            {/* Reason */}
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                Reason for Outward Stock *
              </label>
              <textarea
                id="reason"
                name="reason"
                required
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Enter reason for removing stock (e.g., Project usage, Testing, Defective, etc.)"
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    componentId: "",
                    quantity: 0,
                    reason: "",
                    projectName: "",
                    requestedBy: "",
                    approvedBy: "",
                  })
                }
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={
                  isLoading ||
                  !formData.componentId ||
                  formData.quantity <= 0 ||
                  (selectedComponent && formData.quantity > selectedComponent.quantity)
                }
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Remove from Stock
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}
