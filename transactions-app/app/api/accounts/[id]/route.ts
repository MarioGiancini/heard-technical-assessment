import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const account = await prisma.account.findUnique({
      where: {
        id
      }
    })
    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 })
    }
    return NextResponse.json(account)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching account', details: error }, { status: 500 }
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
    const account = await prisma.account.update({
      where: {
        id
      },
      data: json
    })
    return NextResponse.json(account)
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json(
      { error: 'Error updating account', details: error }, { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    await prisma.account.delete({
      where: {
        id
      }
    })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Error deleting account', details: error }, { status: 500 }
    )
  }
} 