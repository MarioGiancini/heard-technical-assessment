import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// Using new Next.js 15 await params syntax

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id
      },
      include: {
        fromAccount: true,
        toAccount: true,
      }
    })
    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 })
    }
    return NextResponse.json(transaction)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching transaction', details: error }, { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const json = await request.json()
    const transaction = await prisma.transaction.update({
      where: {
        id
      },
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
    console.error('Update error:', error)
    return NextResponse.json(
      { error: 'Error updating transaction', details: error }, { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    await prisma.transaction.delete({
      where: {
        id
      }
    })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Error deleting transaction', details: error }, { status: 500 }
    )
  }
} 