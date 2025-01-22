'use client'

import { useState } from 'react'
import { classNames } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import type { Transaction } from '@prisma/client'
import { startOfDay, subDays, isAfter } from 'date-fns'

const timeRanges = [
  { name: 'Last 7 days', value: '7d' },
  { name: 'Last 30 days', value: '30d' },
  { name: 'All-time', value: 'all' },
] as const

type TimeRange = typeof timeRanges[number]['value']

interface DashboardPageProps {
  transactions: Transaction[]
}

export function DashboardPage({ transactions }: DashboardPageProps) {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('all')

  const getFilteredTransactions = (days?: number) => {
    if (!days) return transactions
    
    const cutoff = startOfDay(subDays(new Date(), days))
    return transactions.filter(t => 
      isAfter(new Date(t.transactionDate), cutoff)
    )
  }

  const calculateStats = (currentTransactions: Transaction[], previousTransactions: Transaction[]) => {
    const totalAmount = currentTransactions.reduce((sum, t) => sum + t.amount, 0)
    const previousTotalAmount = previousTransactions.reduce((sum, t) => sum + t.amount, 0)
    const percentChange = previousTotalAmount === 0 
      ? 100 
      : ((totalAmount - previousTotalAmount) / previousTotalAmount) * 100

    return {
      totalAmount,
      averageAmount: currentTransactions.length > 0 ? totalAmount / currentTransactions.length : 0,
      percentChange
    }
  }

  const getCurrentAndPreviousTransactions = () => {
    switch (selectedRange) {
      case '7d':
        return {
          current: getFilteredTransactions(7),
          previous: getFilteredTransactions(14).filter(t => 
            isAfter(new Date(t.transactionDate), startOfDay(subDays(new Date(), 14))) &&
            !isAfter(new Date(t.transactionDate), startOfDay(subDays(new Date(), 7)))
          )
        }
      case '30d':
        return {
          current: getFilteredTransactions(30),
          previous: getFilteredTransactions(60).filter(t => 
            isAfter(new Date(t.transactionDate), startOfDay(subDays(new Date(), 60))) &&
            !isAfter(new Date(t.transactionDate), startOfDay(subDays(new Date(), 30)))
          )
        }
      default:
        const halfLength = Math.floor(transactions.length / 2)
        return {
          current: transactions,
          previous: transactions.slice(0, halfLength)
        }
    }
  }

  const { current, previous } = getCurrentAndPreviousTransactions()
  const { totalAmount, averageAmount, percentChange } = calculateStats(current, previous)

  const stats = [
    {
      name: 'Total Transactions',
      value: current.length.toString(),
      change: `${((current.length - previous.length) / (previous.length || 1) * 100).toFixed(2)}%`,
      changeType: current.length >= previous.length ? 'positive' : 'negative'
    },
    {
      name: 'Total Amount',
      value: `$${(totalAmount / 100).toFixed(2)}`,
      change: `${percentChange.toFixed(2)}%`,
      changeType: percentChange >= 0 ? 'positive' : 'negative'
    },
    {
      name: 'Average Transaction',
      value: `$${(averageAmount / 100).toFixed(2)}`,
      change: current.length === 0 ? '0%' : 
        `${((averageAmount - (previous.reduce((sum, t) => sum + t.amount, 0) / (previous.length || 1))) / (previous.reduce((sum, t) => sum + t.amount, 0) / (previous.length || 1)) * 100).toFixed(2)}%`,
      changeType: averageAmount >= (previous.reduce((sum, t) => sum + t.amount, 0) / (previous.length || 1)) ? 'positive' : 'negative'
    },
    {
      name: 'Recent Activity',
      value: current[0]?.transactionDate 
        ? new Date(current[0].transactionDate).toLocaleDateString()
        : 'None',
      change: current.length > 0 ? 'Active' : 'No activity',
      changeType: current.length > 0 ? 'positive' : 'negative'
    },
  ]

  return (
    <main>
      <div className="relative isolate overflow-hidden pt-16">
        {/* Secondary navigation */}
        <header className="pb-4 pt-6 sm:pb-6">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
            <h1 className="text-base/7 font-semibold text-gray-900">Dashboard Overview</h1>
            <div className="order-last flex w-full gap-x-8 text-sm/6 font-semibold sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:text-sm/7">
              {timeRanges.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setSelectedRange(item.value)}
                  className={classNames(
                    selectedRange === item.value ? 'text-indigo-600' : 'text-gray-700',
                    'hover:text-indigo-500'
                  )}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <Button
              variant="primary"
              size="sm"
              className="ml-auto flex items-center gap-x-1"
            >
              New transaction
            </Button>
          </div>
        </header>

        {/* Stats */}
        <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
          <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
            {stats.map((stat, statIdx) => (
              <div
                key={stat.name}
                className={classNames(
                  statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
                  'flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8',
                )}
              >
                <dt className="text-sm/6 font-medium text-gray-500">{stat.name}</dt>
                <dd
                  className={classNames(
                    stat.changeType === 'negative' ? 'text-rose-600' : 'text-emerald-600',
                    'text-xs font-medium',
                  )}
                >
                  {stat.change}
                </dd>
                <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </main>
  )
} 