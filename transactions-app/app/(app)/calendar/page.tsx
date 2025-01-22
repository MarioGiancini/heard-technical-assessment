import { prisma } from '@/lib/prisma'
import { CalendarPage } from '@/components/pages/CalendarPage'

export default async function Calendar() {
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      transactionDate: 'desc'
    }
  })

  return <CalendarPage transactions={transactions || []} />
} 