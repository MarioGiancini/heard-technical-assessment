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
    // First check if transaction exists
    const existingTransaction = await prisma.transaction.findUnique({
      where: {
        id,
      }
    })

    // throw a test error
    // throw new Error('Test error')

    if (!existingTransaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 })
    }

    const json = await request.json()
    const transaction = await prisma.transaction.update({
      where: {
        id
      },
      data: json
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
    // First check if transaction exists
    const existingTransaction = await prisma.transaction.findUnique({
      where: {
        id
      }
    })

    if (!existingTransaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 })
    }

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