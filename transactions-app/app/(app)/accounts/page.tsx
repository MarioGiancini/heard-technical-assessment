import { prisma } from '@/lib/prisma'
import { AccountsPage } from '@/components/pages/AccountsPage'

export default async function Page() {
  const accounts = await prisma.account.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  return <AccountsPage accounts={accounts} />
} 