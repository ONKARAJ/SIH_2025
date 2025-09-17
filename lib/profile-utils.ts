import { Session } from "next-auth"

export interface ProfileCompletionStatus {
  isComplete: boolean
  missingFields: string[]
  completionPercentage: number
}

export function checkProfileCompletion(session: Session | null): ProfileCompletionStatus {
  if (!session?.user) {
    return {
      isComplete: false,
      missingFields: ['authentication'],
      completionPercentage: 0
    }
  }

  const user = session.user
  const missingFields: string[] = []

  // Check required fields
  if (!user.name?.trim()) {
    missingFields.push('name')
  }

  if (!user.phone?.trim()) {
    missingFields.push('phone')
  }

  const totalRequiredFields = 2 // name and phone
  const completedFields = totalRequiredFields - missingFields.length
  const completionPercentage = Math.round((completedFields / totalRequiredFields) * 100)

  return {
    isComplete: missingFields.length === 0,
    missingFields,
    completionPercentage
  }
}

export function getProfileCompletionMessage(status: ProfileCompletionStatus): string {
  if (status.isComplete) {
    return "Your profile is complete!"
  }

  if (status.missingFields.includes('authentication')) {
    return "Please sign in to submit reviews."
  }

  const missingFieldNames = status.missingFields.map(field => {
    switch (field) {
      case 'name': return 'full name'
      case 'phone': return 'phone number'
      default: return field
    }
  })

  if (missingFieldNames.length === 1) {
    return `Please add your ${missingFieldNames[0]} to submit reviews.`
  }

  const lastField = missingFieldNames.pop()
  return `Please add your ${missingFieldNames.join(', ')} and ${lastField} to submit reviews.`
}