'use client'

import { Fragment, useState, useEffect } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Button } from './Button'
import { Toast } from './Toast'
import type { Transaction } from '@prisma/client'
import { Select } from './Select'

interface TransactionWithAccounts extends Transaction {
  fromAccount: { id: string; name: string }
  toAccount: { id: string; name: string }
}

interface TransactionDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Partial<Transaction>) => Promise<void>
  transaction?: TransactionWithAccounts
  title: string
  accounts: { id: string; name: string }[]
}

export function TransactionDialog({ 
  isOpen, 
  onClose, 
  onSubmit, 
  transaction, 
  title,
  accounts 
}: TransactionDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  })
  const [selectedFromAccount, setSelectedFromAccount] = useState<{ id: string; name: string } | null>(
    transaction?.fromAccount ? {
      id: transaction.fromAccount.id,
      name: transaction.fromAccount.name
    } : null
  )
  const [selectedToAccount, setSelectedToAccount] = useState<{ id: string; name: string } | null>(
    transaction?.toAccount ? {
      id: transaction.toAccount.id,
      name: transaction.toAccount.name
    } : null
  )

  // Reset selected accounts when transaction changes
  useEffect(() => {
    setSelectedFromAccount(transaction?.fromAccount ? {
      id: transaction.fromAccount.id,
      name: transaction.fromAccount.name
    } : null)
    setSelectedToAccount(transaction?.toAccount ? {
      id: transaction.toAccount.id,
      name: transaction.toAccount.name
    } : null)
  }, [transaction])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const formData = new FormData(e.currentTarget)
      
      if (!selectedFromAccount?.id || !selectedToAccount?.id) {
        throw new Error('Please select both accounts')
      }

      const data = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        amount: Math.round(parseFloat(formData.get('amount') as string) * 100),
        fromAccountId: selectedFromAccount.id,
        toAccountId: selectedToAccount.id,
        transactionDate: new Date(formData.get('transactionDate') as string),
      }
      await onSubmit(data)
      setToast({ show: true, message: 'Transaction saved successfully', type: 'success' })
      onClose()
    } catch (error) {
      let errorMessage = 'Failed to save transaction. '
      if (error instanceof Error) {
        errorMessage += error.message
      } else {
        errorMessage += 'An unexpected error occurred'
      }
      setToast({ 
        show: true, 
        message: errorMessage,
        type: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Format date for datetime-local input
  const formatDateForInput = (date: Date) => {
    return date.toISOString().slice(0, 16)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </DialogTitle>
                  <form onSubmit={handleSubmit} className="mt-4 space-y-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        defaultValue={transaction?.title}
                        required
                        className="mt-1.5 block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        id="description"
                        defaultValue={transaction?.description || ''}
                        className="mt-1.5 block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>

                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                        Amount
                      </label>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        defaultValue={transaction ? (transaction.amount / 100).toFixed(2) : ''}
                        required
                        step="0.01"
                        min="0"
                        pattern="\d+(\.\d{2})?"
                        onBlur={(e) => {
                          // Format to always show 2 decimal places
                          const value = parseFloat(e.target.value)
                          if (!isNaN(value)) {
                            e.target.value = value.toFixed(2)
                          }
                        }}
                        onChange={(e) => {
                          // Limit to 2 decimal places while typing
                          const value = e.target.value
                          if (value.includes('.') && value.split('.')[1].length > 2) {
                            e.target.value = parseFloat(value).toFixed(2)
                          }
                        }}
                        className="mt-1.5 block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>

                    <div>
                      <Select
                        label="From Account"
                        value={selectedFromAccount}
                        onChange={setSelectedFromAccount}
                        options={accounts.filter(account => account.id !== selectedToAccount?.id)}
                        placeholder="Select account"
                        required
                        name="fromAccount"
                      />
                    </div>

                    <div>
                      <Select
                        label="To Account"
                        value={selectedToAccount}
                        onChange={setSelectedToAccount}
                        options={accounts.filter(account => account.id !== selectedFromAccount?.id)}
                        placeholder="Select account"
                        required
                        name="toAccount"
                      />
                    </div>

                    <div>
                      <label htmlFor="transactionDate" className="block text-sm font-medium text-gray-700">
                        Transaction Date
                      </label>
                      <input
                        type="datetime-local"
                        name="transactionDate"
                        id="transactionDate"
                        defaultValue={transaction?.transactionDate ? formatDateForInput(transaction.transactionDate) : undefined}
                        required
                        className="mt-1.5 block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          'Save'
                        )}
                      </Button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />
    </>
  )
} 