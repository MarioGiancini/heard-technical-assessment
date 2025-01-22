'use client'

import { useState } from 'react'
import { Transaction } from '@prisma/client'
import { Button } from './Button'
import { TransactionDialog } from './TransactionDialog'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import { Modal } from './Modal'
import { Toast } from './Toast'

interface TableProps {
  transactions: Transaction[]
  onUpdate?: () => void
}

export default function Table({ transactions, onUpdate }: TableProps) {
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [deletingTransaction, setDeletingTransaction] = useState<Transaction | null>(null)
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  })

  const handleEdit = async (data: Partial<Transaction>) => {
    if (!editingTransaction) return

    try {
      const response = await fetch(`/api/transactions/${editingTransaction.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to update transaction')
      }
      
      setEditingTransaction(null)
      onUpdate?.()
      setToast({
        show: true,
        message: 'Transaction updated successfully',
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
              onClick={() => setEditingTransaction({} as Transaction)}
            >
              Add transaction
            </Button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Title
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Description
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Amount
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      From Account
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      To Account
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {transaction.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.description}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        ${(transaction.amount / 100).toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.fromAccount}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.toAccount}</td>
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
        isOpen={!!editingTransaction}
        onClose={() => setEditingTransaction(null)}
        onSubmit={handleEdit}
        transaction={editingTransaction || undefined}
        title={editingTransaction?.id ? 'Edit Transaction' : 'New Transaction'}
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
