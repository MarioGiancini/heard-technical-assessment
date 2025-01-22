import { prisma } from '@/lib/prisma'
import { TransactionsPage } from '@/components/pages/TransactionsPage'

export default async function Page() {
  const [transactions, accounts] = await Promise.all([
    prisma.transaction.findMany({
      include: {
        fromAccount: true,
        toAccount: true,
      },
      orderBy: {
        transactionDate: 'desc'
      }
    }),
    prisma.account.findMany({
      orderBy: {
        name: 'asc'
      }
    })
  ])

  return <TransactionsPage transactions={transactions} accounts={accounts} />
} 