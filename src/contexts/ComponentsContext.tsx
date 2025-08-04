"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { componentsData } from "../data/components"

export interface Component {
  id: string
  name: string
  partNumber: string
  category: string
  location: string
  quantity: number
  minQuantity: number
  description: string
  manufacturer: string
  lastUpdated: string
  price: number
  supplier: string
}

interface ComponentsContextType {
  components: Component[]
  addComponent: (component: Omit<Component, "id" | "lastUpdated">) => void
  updateComponent: (id: string, component: Partial<Component>) => void
  deleteComponent: (id: string) => void
  getComponent: (id: string) => Component | undefined
  searchComponents: (query: string) => Component[]
  filterComponents: (filters: ComponentFilters) => Component[]
}

interface ComponentFilters {
  category?: string
  location?: string
  minQuantity?: number
  maxQuantity?: number
}

const ComponentsContext = createContext<ComponentsContextType | undefined>(undefined)

export const useComponents = () => {
  const context = useContext(ComponentsContext)
  if (context === undefined) {
    throw new Error("useComponents must be used within a ComponentsProvider")
  }
  return context
}

export const ComponentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [components, setComponents] = useState<Component[]>([])

  useEffect(() => {
    // Load initial data
    setComponents(componentsData)
  }, [])

  const addComponent = (componentData: Omit<Component, "id" | "lastUpdated">) => {
    const newComponent: Component = {
      ...componentData,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString(),
    }
    setComponents((prev) => [...prev, newComponent])
  }

  const updateComponent = (id: string, componentData: Partial<Component>) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === id ? { ...comp, ...componentData, lastUpdated: new Date().toISOString() } : comp,
      ),
    )
  }

  const deleteComponent = (id: string) => {
    setComponents((prev) => prev.filter((comp) => comp.id !== id))
  }

  const getComponent = (id: string) => {
    return components.find((comp) => comp.id === id)
  }

  const searchComponents = (query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return components.filter(
      (comp) =>
        comp.name.toLowerCase().includes(lowercaseQuery) ||
        comp.partNumber.toLowerCase().includes(lowercaseQuery) ||
        comp.category.toLowerCase().includes(lowercaseQuery),
    )
  }

  const filterComponents = (filters: ComponentFilters) => {
    return components.filter((comp) => {
      if (filters.category && comp.category !== filters.category) return false
      if (filters.location && comp.location !== filters.location) return false
      if (filters.minQuantity && comp.quantity < filters.minQuantity) return false
      if (filters.maxQuantity && comp.quantity > filters.maxQuantity) return false
      return true
    })
  }

  return (
    <ComponentsContext.Provider
      value={{
        components,
        addComponent,
        updateComponent,
        deleteComponent,
        getComponent,
        searchComponents,
        filterComponents,
      }}
    >
      {children}
    </ComponentsContext.Provider>
  )
}
