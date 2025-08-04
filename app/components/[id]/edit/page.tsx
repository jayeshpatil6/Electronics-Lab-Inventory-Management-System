"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Layout from "../../../../src/components/Layout"
import { useComponents } from "../../../../src/contexts/ComponentsContext"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function EditComponent() {
  const params = useParams()
  const router = useRouter()
  const { getComponent, updateComponent } = useComponents()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    partNumber: "",
    category: "",
    location: "",
    quantity: 0,
    minQuantity: 0,
    description: "",
    manufacturer: "",
    price: 0,
    supplier: "",
  })

  const component = getComponent(params.id as string)

  useEffect(() => {
    if (component) {
      setFormData({
        name: component.name,
        partNumber: component.partNumber,
        category: component.category,
        location: component.location,
        quantity: component.quantity,
        minQuantity: component.minQuantity,
        description: component.description,
        manufacturer: component.manufacturer,
        price: component.price,
        supplier: component.supplier,
      })
    }
  }, [component])

  const categories = [
    "Microcontrollers",
    "Resistors",
    "Capacitors",
    "LEDs",
    "Transistors",
    "Sensors",
    "ICs",
    "Connectors",
    "Prototyping",
    "Power Supplies",
    "Other",
  ]

  const locations = [
    "Shelf A1",
    "Shelf A2",
    "Shelf A3",
    "Drawer B1",
    "Drawer B2",
    "Drawer B3",
    "Drawer C1",
    "Drawer C2",
    "Drawer C3",
    "Drawer D1",
    "Drawer D2",
    "Drawer D3",
    "Cabinet E1",
    "Cabinet E2",
    "Storage Room",
  ]

  if (!component) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h3 className="mt-2 text-sm font-medium text-gray-900">Component not found</h3>
          <div className="mt-6">
            <Link
              href="/components"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Back to Components
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

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
      updateComponent(component.id, formData)
      router.push(`/components/${component.id}`)
    } catch (error) {
      console.error("Error updating component:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              href={`/components/${component.id}`}
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Component
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Component</h1>
          <p className="mt-2 text-gray-600">Update component information</p>
        </div>

        {/* Form */}
        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Component Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Component Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* Part Number */}
              <div>
                <label htmlFor="partNumber" className="block text-sm font-medium text-gray-700">
                  Part Number *
                </label>
                <input
                  type="text"
                  id="partNumber"
                  name="partNumber"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.partNumber}
                  onChange={handleChange}
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location *
                </label>
                <select
                  id="location"
                  name="location"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.location}
                  onChange={handleChange}
                >
                  <option value="">Select a location</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Current Quantity *
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  required
                  min="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>

              {/* Minimum Quantity */}
              <div>
                <label htmlFor="minQuantity" className="block text-sm font-medium text-gray-700">
                  Minimum Quantity *
                </label>
                <input
                  type="number"
                  id="minQuantity"
                  name="minQuantity"
                  required
                  min="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.minQuantity}
                  onChange={handleChange}
                />
              </div>

              {/* Manufacturer */}
              <div>
                <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700">
                  Manufacturer
                </label>
                <input
                  type="text"
                  id="manufacturer"
                  name="manufacturer"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.manufacturer}
                  onChange={handleChange}
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Unit Price ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>

              {/* Supplier */}
              <div className="md:col-span-2">
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
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Link
                href={`/components/${component.id}`}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Update Component
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
