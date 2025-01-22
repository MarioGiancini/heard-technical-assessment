'use client'

import { useState, useMemo } from 'react'
import type { Transaction } from '@prisma/client'
import { Button } from './Button'
import { TransactionDialog } from './TransactionDialog'
import { TrashIcon, PencilIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { Modal } from './Modal'
import { Toast } from './Toast'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

interface TransactionWithAccounts extends Transaction {
  fromAccount: { id: string; name: string }
  toAccount: { id: string; name: string }
}

interface Account {
  id: string
  name: string
}

type SortField = 'title' | 'description' | 'amount' | 'fromAccount' | 'toAccount' | 'transactionDate'
type SortDirection = 'asc' | 'desc'

interface TableProps {
  transactions: TransactionWithAccounts[]
  accounts: Account[]
  onUpdate?: () => void
}

export default function Table({ transactions, accounts, onUpdate }: TableProps) {
  const [editingTransaction, setEditingTransaction] = useState<TransactionWithAccounts | null>(null)
  const [deletingTransaction, setDeletingTransaction] = useState<Transaction | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('transactionDate')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  })

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredAndSortedTransactions = useMemo(() => {
    return transactions
      .filter(transaction => {
        const searchLower = searchTerm.toLowerCase()
        return (
          transaction.title.toLowerCase().includes(searchLower) ||
          transaction.description?.toLowerCase().includes(searchLower) ||
          transaction.fromAccount.name.toLowerCase().includes(searchLower) ||
          transaction.toAccount.name.toLowerCase().includes(searchLower)
        )
      })
      .sort((a, b) => {
        const direction = sortDirection === 'asc' ? 1 : -1
        switch (sortField) {
          case 'title':
            return direction * a.title.localeCompare(b.title)
          case 'amount':
            return direction * (a.amount - b.amount)
          case 'transactionDate':
            return direction * (new Date(a.transactionDate).getTime() - new Date(b.transactionDate).getTime())
          case 'fromAccount':
            return direction * a.fromAccount.name.localeCompare(b.fromAccount.name)
          case 'toAccount':
            return direction * a.toAccount.name.localeCompare(b.toAccount.name)
          default:
            return 0
        }
      })
  }, [transactions, searchTerm, sortField, sortDirection])

  const handleEdit = async (data: Partial<Transaction>) => {
    const isNewTransaction = !editingTransaction?.id

    try {
      const response = await fetch(
        isNewTransaction ? '/api/transactions' : `/api/transactions/${editingTransaction?.id}`,
        {
          method: isNewTransaction ? 'POST' : 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || `Failed to ${isNewTransaction ? 'create' : 'update'} transaction`)
      }
      
      setEditingTransaction(null)
      onUpdate?.()
      setToast({
        show: true,
        message: `Transaction ${isNewTransaction ? 'created' : 'updated'} successfully`,
        type: 'success'
      })
    } catch (error) {
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
        type: 'error'
      })
    }
  }

  const handleDelete = async () => {
    if (!deletingTransaction) return

    try {
      const response = await fetch(`/api/transactions/${deletingTransaction.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete transaction')
      }
      
      setDeletingTransaction(null)
      onUpdate?.()
      setToast({
        show: true,
        message: 'Transaction deleted successfully',
        type: 'success'
      })
    } catch (error) {
      setToast({
        show: true,
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
        type: 'error'
      })
    }
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">Transactions</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all transactions including their title, amount, and accounts involved.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Button
              variant="primary"
              onClick={() => setEditingTransaction(null)}
            >
              Add transaction
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    {[
                      { field: 'title' as const, label: 'Title' },
                      { field: 'description' as const, label: 'Description' },
                      { field: 'amount' as const, label: 'Amount' },
                      { field: 'fromAccount' as const, label: 'From Account' },
                      { field: 'toAccount' as const, label: 'To Account' },
                      { field: 'transactionDate' as const, label: 'Date' },
                    ].map(({ field, label }) => (
                      <th
                        key={field}
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSort(field)}
                      >
                        <div className="group inline-flex">
                          {label}
                          <span className="ml-2 flex-none rounded text-gray-400">
                            <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        </div>
                      </th>
                    ))}
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAndSortedTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {transaction.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {transaction.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        ${(transaction.amount / 100).toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.fromAccount.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.toAccount.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(transaction.transactionDate).toLocaleDateString()}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setEditingTransaction(transaction)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => setDeletingTransaction(transaction)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <TransactionDialog
        isOpen={editingTransaction !== null}
        onClose={() => setEditingTransaction(null)}
        onSubmit={handleEdit}
        transaction={editingTransaction || undefined}
        title={editingTransaction?.id ? 'Edit Transaction' : 'New Transaction'}
        accounts={accounts}
      />

      <Modal
        isOpen={!!deletingTransaction}
        onClose={() => setDeletingTransaction(null)}
        title="Delete Transaction"
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this transaction? This action cannot be undone.
          </p>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => setDeletingTransaction(null)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Modal>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />
    </>
  )
}
