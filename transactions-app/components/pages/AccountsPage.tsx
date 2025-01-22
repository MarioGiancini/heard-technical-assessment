'use client'

import { useRouter } from 'next/navigation'
import type { Account } from '@prisma/client'
import { AccountsTable } from '@/components/ui/AccountsTable'

interface AccountsPageProps {
  accounts: Account[]
}

export function AccountsPage({ accounts }: AccountsPageProps) {
  const router = useRouter()

  const handleUpdate = () => {
    router.refresh()
  }

  return (
    <div className="py-8">
      <AccountsTable accounts={accounts} onUpdate={handleUpdate} />
    </div>
  )
} 