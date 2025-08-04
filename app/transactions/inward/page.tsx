"use client"

import type React from "react"

import { useState } from "react"
import Layout from "../../../src/components/Layout"
import { useComponents } from "../../../src/contexts/ComponentsContext"
import { ArrowDownUp, Save, Search } from "lucide-react"

export default function InwardStock() {
  const { components, updateComponent } = useComponents()
  const [formData, setFormData] = useState({
    componentId: "",
    quantity: 0,
    reason: "",
    supplier: "",
    batchNumber: "",
    expiryDate: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [success, setSuccess] = useState(false)

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
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (selectedComponent) {
        const newQuantity = selectedComponent.quantity + formData.quantity
        updateComponent(selectedComponent.id, { quantity: newQuantity })

        setSuccess(true)
        setFormData({
          componentId: "",
          quantity: 0,
          reason: "",
          supplier: "",
          batchNumber: "",
          expiryDate: "",
        })

        setTimeout(() => setSuccess(false), 3000)
      }
    } catch (error) {
      console.error("Error processing inward stock:", error)
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
            <ArrowDownUp className="h-8 w-8 text-green-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Inward Stock</h1>
              <p className="mt-2 text-gray-600">Add components to inventory</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
            Stock added successfully!
          </div>
        )}

        {/* Form */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Add Stock Transaction</h3>
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
                      {component.name} ({component.partNumber}) - Current: {component.quantity}
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
                    <span className="text-gray-500">Current Stock:</span> {selectedComponent.quantity}
                  </div>
                  <div>
                    <span className="text-gray-500">Location:</span> {selectedComponent.location}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quantity */}
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantity to Add *
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  required
                  min="1"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.quantity}
                  onChange={handleChange}
                />
                {selectedComponent && formData.quantity > 0 && (
                  <p className="mt-1 text-sm text-gray-500">
                    New total will be: {selectedComponent.quantity + formData.quantity}
                  </p>
                )}
              </div>

              {/* Supplier */}
              <div>
                <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">
                  Supplier
                </label>
                <input
                  type="text"
                  id="supplier"
                  name="supplier"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.supplier}
                  onChange={handleChange}
                  placeholder="Enter supplier name"
                />
              </div>

              {/* Batch Number */}
              <div>
                <label htmlFor="batchNumber" className="block text-sm font-medium text-gray-700">
                  Batch Number
                </label>
                <input
                  type="text"
                  id="batchNumber"
                  name="batchNumber"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.batchNumber}
                  onChange={handleChange}
                  placeholder="Enter batch number"
                />
              </div>

              {/* Expiry Date */}
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.expiryDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Reason */}
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                Reason for Inward Stock *
              </label>
              <textarea
                id="reason"
                name="reason"
                required
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Enter reason for adding stock (e.g., New purchase, Return from project, etc.)"
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
                    supplier: "",
                    batchNumber: "",
                    expiryDate: "",
                  })
                }
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={isLoading || !formData.componentId || formData.quantity <= 0}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Add to Stock
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
