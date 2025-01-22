import { prisma } from '@/lib/prisma'
import { TransactionsPage } from '@/components/pages/TransactionsPage'

export default async function Transactions() {
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      transactionDate: 'desc'
    }
  })

  return <TransactionsPage transactions={transactions || []} />
} 