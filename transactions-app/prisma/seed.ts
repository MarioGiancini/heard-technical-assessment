import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
import { join } from 'path'

const prisma = new PrismaClient()

async function main() {
  // Read transactions from JSON file
  const transactionsData = JSON.parse(
    readFileSync(join(__dirname, '../data/transactions.json'), 'utf-8')
  )

  // Clear existing data
  await prisma.transaction.deleteMany()

  // Insert transactions
  for (const transaction of transactionsData) {
    await prisma.transaction.create({
      data: {
        title: transaction.title,
        description: transaction.description,
        amount: transaction.amount,
        fromAccount: transaction.fromAccount,
        toAccount: transaction.toAccount,
        transactionDate: new Date(transaction.transactionDate),
      },
    })
  }

  console.log('Database seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 