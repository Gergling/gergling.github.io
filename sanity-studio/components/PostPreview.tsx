import { CheckmarkCircleIcon, CloseCircleIcon, HelpCircleIcon } from '@sanity/icons'
import { Box, Flex, Text } from '@sanity/ui'
import { PreviewProps } from 'sanity'

type ChecklistItem = {
  isComplete?: boolean
}

// I made a second PostPreview
export function PostPreview2(props: PreviewProps & {
  checklist?: ChecklistItem[],
  standard?: string
}) {
  console.log('preview2', props)
  const { checklist, standard, renderDefault } = props

  const totalTasks = checklist?.length ?? 0
  const completedTasks = checklist?.filter(item => item.isComplete).length ?? 0
  const isChecklistComplete = totalTasks > 0 && completedTasks === totalTasks

  const getStandardIcon = () => {
    switch (standard) {
      case 'perfect':
      case 'excellent':
        return <Text size={1}><CheckmarkCircleIcon style={{ color: 'green' }} /></Text>
      case 'good':
      case 'ok':
        return <Text size={1}><HelpCircleIcon style={{ color: 'orange' }} /></Text>
      case 'incomplete':
      default:
        return <Text size={1}><CloseCircleIcon style={{ color: 'red' }} /></Text>
    }
  }

  // Even when commented out, the preview still displays the title and author and nothing else.
  return (
    <Flex align="center">
      <Box flex={1}>{renderDefault(props)}</Box>
      <>Wat</>
      <Flex align="center" gap={3} paddingRight={3}>
        {getStandardIcon()}
        {totalTasks > 0 && <Text size={1}>{isChecklistComplete ? '✅' : '⏳'} {completedTasks}/{totalTasks}</Text>}
      </Flex>
    </Flex>
  )
};

export function PostPreview(props: {
  checklist?: ChecklistItem[],
  standard?: string
}) {
  console.log('preview', props)
  const { checklist, standard } = props

  const totalTasks = checklist?.length ?? 0
  const completedTasks = checklist?.filter(item => item.isComplete).length ?? 0
  const isChecklistComplete = totalTasks > 0 && completedTasks === totalTasks

  const getStandardIcon = () => {
    switch (standard) {
      case 'perfect':
      case 'excellent':
        return <Text size={1}><CheckmarkCircleIcon style={{ color: 'green' }} /></Text>
      case 'good':
      case 'ok':
        return <Text size={1}><HelpCircleIcon style={{ color: 'orange' }} /></Text>
      case 'incomplete':
      default:
        return <Text size={1}><CloseCircleIcon style={{ color: 'red' }} /></Text>
    }
  }

  // Even when commented out, the preview still displays the title and author and nothing else.
  return (
    <Flex align="center">
      {/* <Box flex={1}>{renderDefault(props)}</Box> */}
      <Flex align="center" gap={3} paddingRight={3}>
        {getStandardIcon()}
        {totalTasks > 0 && <Text size={1}>{isChecklistComplete ? '✅' : '⏳'} {completedTasks}/{totalTasks}</Text>}
      </Flex>
    </Flex>
  )
}