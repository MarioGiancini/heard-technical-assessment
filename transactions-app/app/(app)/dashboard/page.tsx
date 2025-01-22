import { prisma } from '@/lib/prisma'
import { DashboardPage } from '@/components/pages/DashboardPage'

export default async function Dashboard() {
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      transactionDate: 'desc'
    }
  })

  return <DashboardPage transactions={transactions || []} />
}
