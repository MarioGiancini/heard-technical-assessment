import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const accounts = await prisma.account.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    return NextResponse.json(accounts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching accounts', details: error }, { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const account = await prisma.account.create({
      data: json
    })
    return NextResponse.json(account)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating account', details: error }, { status: 500 }
    )
  }
} 