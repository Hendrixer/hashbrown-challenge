import { useTool } from '@hashbrownai/react'

export const useChatTools = () => {
  const showAlert = useTool({
    name: 'showAlert',
    description: 'Show an alert',
    handler: async () => alert('this is an alert'),
    deps: [],
  })

  return [showAlert]
}
