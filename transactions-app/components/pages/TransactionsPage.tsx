'use client'

import type { Transaction } from '@prisma/client'
import Table from '@/components/ui/Table'

interface TransactionsPageProps {
  transactions: Transaction[]
}

export function TransactionsPage({ transactions }: TransactionsPageProps) {
  return (
    <div className="py-8">
      <Table transactions={transactions} />
    </div>
  )
} 