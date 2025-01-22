import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        fromAccount: true,
        toAccount: true,
      },
      orderBy: {
        transactionDate: 'desc'
      }
    })
    return NextResponse.json(transactions)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching transactions', details: error }, { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const transaction = await prisma.transaction.create({
      data: {
        title: json.title,
        description: json.description,
        amount: json.amount,
        transactionDate: json.transactionDate,
        fromAccountId: json.fromAccountId,
        toAccountId: json.toAccountId,
      },
      include: {
        fromAccount: true,
        toAccount: true,
      }
    })
    return NextResponse.json(transaction)
  } catch (error) {
    console.error('Create error:', error)
    return NextResponse.json(
      { error: 'Error creating transaction', details: error }, { status: 500 }
    )
  }
} 