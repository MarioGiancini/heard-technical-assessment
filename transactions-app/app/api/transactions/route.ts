import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
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
      data: json
    })
    return NextResponse.json(transaction)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating transaction', details: error }, { status: 500 }
    )
  }
} 