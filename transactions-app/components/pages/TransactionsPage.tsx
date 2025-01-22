'use client'

import { useRouter } from 'next/navigation'
import type { Transaction } from '@prisma/client'
import Table from '@/components/ui/Table'

interface TransactionsPageProps {
  transactions: Transaction[]
}

export function TransactionsPage({ transactions }: TransactionsPageProps) {
  const router = useRouter()

  const handleUpdate = () => {
    router.refresh()
  }

  return (
    <div className="py-8">
      <Table transactions={transactions} onUpdate={handleUpdate} />
    </div>
  )
} 