import { useTool } from '@hashbrownai/react'
import React from 'react'
import MapComponent from './components/Map/MapComponent'

export const useChatTools = () => {
  const showAlert = useTool({
    name: 'showAlert',
    description: 'Show an alert',
    handler: async () => alert('this is an alert'),
    deps: [],
  })

  const showOrderStatus = useTool({
    name: 'showOrderStatus',
    description: 'Show the users order status with delivery route map when they ask about their order status or delivery tracking',
    handler: async () => {
      return React.createElement(MapComponent)
    },
    deps: [],
  })

  return [showAlert, showOrderStatus]
}
