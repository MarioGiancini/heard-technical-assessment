import { PrismaClient } from '@prisma/client'
import transactionsData from '../data/transactions.json'

const prisma = new PrismaClient()

async function main() {
  // First, collect all unique account names
  const accountNames = new Set<string>()
  
  for (const transaction of transactionsData) {
    accountNames.add(transaction.fromAccount)
    accountNames.add(transaction.toAccount)
  }

  // Create accounts
  const accountMap = new Map<string, string>() // Map account names to their IDs
  for (const name of accountNames) {
    const account = await prisma.account.create({
      data: {
        name,
      }
    })
    accountMap.set(name, account.id)
  }

  // Create transactions with account references
  for (const transaction of transactionsData) {
    const fromAccountId = accountMap.get(transaction.fromAccount)
    const toAccountId = accountMap.get(transaction.toAccount)

    if (!fromAccountId || !toAccountId) {
      console.error(`Missing account reference for transaction: ${transaction.title}`)
      continue
    }

    await prisma.transaction.create({
      data: {
        title: transaction.title,
        description: transaction.description,
        amount: transaction.amount,
        transactionDate: new Date(transaction.transactionDate),
        fromAccountId,
        toAccountId,
      }
    })
  }

  console.log('Seed completed')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 