'use client'

import { useRouter } from 'next/navigation'
import type { Transaction, Account } from '@prisma/client'
import Table from '@/components/ui/Table'

interface TransactionWithAccounts extends Transaction {
  fromAccount: { id: string; name: string }
  toAccount: { id: string; name: string }
}

interface TransactionsPageProps {
  transactions: TransactionWithAccounts[]
  accounts: Account[]
}

export function TransactionsPage({ transactions, accounts }: TransactionsPageProps) {
  const router = useRouter()

  const handleUpdate = () => {
    router.refresh()
  }

  return (
    <div className="py-8">
      <Table transactions={transactions} accounts={accounts} onUpdate={handleUpdate} />
    </div>
  )
} 