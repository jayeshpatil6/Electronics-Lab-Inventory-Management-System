"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import Layout from "../../../src/components/Layout"
import { useComponents } from "../../../src/contexts/ComponentsContext"
import { ArrowLeft, Edit, Trash2, Package, MapPin, Calendar, DollarSign, User, Building } from "lucide-react"
import Link from "next/link"

export default function ComponentDetails() {
  const params = useParams()
  const router = useRouter()
  const { getComponent, deleteComponent, updateComponent } = useComponents()
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [transactionType, setTransactionType] = useState<"inward" | "outward">("inward")
  const [transactionData, setTransactionData] = useState({
    quantity: 0,
    reason: "",
  })

  const component = getComponent(params.id as string)

  if (!component) {
    return (
      <Layout>
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Component not found</h3>
          <p className="mt-1 text-sm text-gray-500">The component you're looking for doesn't exist.</p>
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

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this component?")) {
      deleteComponent(component.id)
      router.push("/components")
    }
  }

  const handleTransaction = (type: "inward" | "outward") => {
    setTransactionType(type)
    setTransactionData({ quantity: 0, reason: "" })
    setShowTransactionModal(true)
  }

  const submitTransaction = () => {
    const newQuantity =
      transactionType === "inward"
        ? component.quantity + transactionData.quantity
        : component.quantity - transactionData.quantity

    if (newQuantity < 0) {
      alert("Insufficient stock for outward transaction")
      return
    }

    updateComponent(component.id, { quantity: newQuantity })
    setShowTransactionModal(false)
    setTransactionData({ quantity: 0, reason: "" })
  }

  const getStockStatus = () => {
    if (component.quantity <= component.minQuantity) {
      return { status: "Low Stock", color: "bg-red-100 text-red-800" }
    } else if (component.quantity <= component.minQuantity * 2) {
      return { status: "Medium Stock", color: "bg-yellow-100 text-yellow-800" }
    } else {
      return { status: "Good Stock", color: "bg-green-100 text-green-800" }
    }
  }

  const stockStatus = getStockStatus()

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/components" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Components
            </Link>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{component.name}</h1>
              <p className="mt-2 text-gray-600">{component.partNumber}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => handleTransaction("inward")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Add Stock
              </button>
              <button
                onClick={() => handleTransaction("outward")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
              >
                Remove Stock
              </button>
              <Link
                href={`/components/${component.id}/edit`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Component Details */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Component Information</h3>
          </div>
          <div className="px-6 py-4">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Package className="h-4 w-4 mr-2" />
                  Current Quantity
                </dt>
                <dd className="mt-1 text-sm text-gray-900 flex items-center">
                  <span className="text-2xl font-bold mr-3">{component.quantity}</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stockStatus.color}`}>
                    {stockStatus.status}
                  </span>
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Minimum Quantity</dt>
                <dd className="mt-1 text-sm text-gray-900">{component.minQuantity}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Category</dt>
                <dd className="mt-1 text-sm text-gray-900">{component.category}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Location
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{component.location}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  Manufacturer
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{component.manufacturer || "N/A"}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Unit Price
                </dt>
                <dd className="mt-1 text-sm text-gray-900">${component.price.toFixed(2)}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Supplier
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{component.supplier || "N/A"}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Last Updated
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{new Date(component.lastUpdated).toLocaleDateString()}</dd>
              </div>

              {component.description && (
                <div className="md:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="mt-1 text-sm text-gray-900">{component.description}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Stock Value */}
        <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Stock Value</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <dt className="text-sm font-medium text-gray-500">Total Value</dt>
                <dd className="mt-1 text-2xl font-bold text-gray-900">
                  ${(component.quantity * component.price).toFixed(2)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Unit Price</dt>
                <dd className="mt-1 text-xl font-semibold text-gray-900">${component.price.toFixed(2)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Quantity</dt>
                <dd className="mt-1 text-xl font-semibold text-gray-900">{component.quantity} units</dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Modal */}
      {showTransactionModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {transactionType === "inward" ? "Add Stock" : "Remove Stock"}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    max={transactionType === "outward" ? component.quantity : undefined}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={transactionData.quantity}
                    onChange={(e) =>
                      setTransactionData((prev) => ({
                        ...prev,
                        quantity: Number.parseInt(e.target.value) || 0,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Reason</label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={transactionData.reason}
                    onChange={(e) =>
                      setTransactionData((prev) => ({
                        ...prev,
                        reason: e.target.value,
                      }))
                    }
                    placeholder="Enter reason for transaction..."
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowTransactionModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={submitTransaction}
                  disabled={transactionData.quantity <= 0}
                  className={`px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                    transactionType === "inward"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-orange-600 hover:bg-orange-700"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {transactionType === "inward" ? "Add Stock" : "Remove Stock"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
