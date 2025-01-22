'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { format, startOfToday, eachDayOfInterval, startOfMonth, endOfMonth, isToday, isSameMonth } from 'date-fns'
import type { Transaction } from '@prisma/client'
import { classNames } from '@/lib/utils'

interface CalendarPageProps {
  transactions: Transaction[]
}

export function CalendarPage({ transactions }: CalendarPageProps) {
  const today = startOfToday()
  const days = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  })

  const transactionsByDate = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.transactionDate).toISOString().split('T')[0]
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(transaction)
    return acc
  }, {} as Record<string, Transaction[]>)

  return (
    <div className="py-8">
      <div className="mx-auto max-w-md px-4 sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto text-sm font-semibold text-gray-900">
                {format(today, 'MMMM yyyy')}
              </h2>
              <button type="button" className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button type="button" className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="mt-2 grid grid-cols-7 text-sm">
              {days.map((day, dayIdx) => {
                const dateKey = format(day, 'yyyy-MM-dd')
                const dayTransactions = transactionsByDate[dateKey] || []
                
                return (
                  <div
                    key={day.toString()}
                    className={classNames(
                      dayIdx === 0 && colStartClasses[format(day, 'EEEE') as keyof typeof colStartClasses] || '',
                      'py-2'
                    )}
                  >
                    <button
                      type="button"
                      className={classNames(
                        isToday(day) && 'text-white' || '',
                        !isToday(day) && isSameMonth(day, today) && 'text-gray-900' || '',
                        !isToday(day) && !isSameMonth(day, today) && 'text-gray-400' || '',
                        isToday(day) && 'bg-indigo-600' || '',
                        !isToday(day) && 'hover:bg-gray-200' || '',
                        (isToday(day) || dayTransactions.length > 0) && 'font-semibold' || '',
                        'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                      )}
                    >
                      <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
                    </button>
                    {dayTransactions.length > 0 && (
                      <div className="mt-1">
                        <div className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                          <div className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-14">
            <h2 className="text-base font-semibold text-gray-900">
              Transactions for {format(today, 'MMM d, yyy')}
            </h2>
            <div className="mt-6 space-y-4">
              {(transactionsByDate[format(today, 'yyyy-MM-dd')] || []).map((transaction) => (
                <div
                  key={transaction.id}
                  className="group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100"
                >
                  <div className="flex-auto">
                    <p className="text-sm font-semibold text-gray-900">{transaction.title}</p>
                    <p className="mt-0.5 text-sm text-gray-500">${(transaction.amount / 100).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

const colStartClasses = {
  Sunday: 'col-start-1',
  Monday: 'col-start-2',
  Tuesday: 'col-start-3',
  Wednesday: 'col-start-4',
  Thursday: 'col-start-5',
  Friday: 'col-start-6',
  Saturday: 'col-start-7',
} 