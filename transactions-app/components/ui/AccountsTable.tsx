'use client'

import { useState } from 'react'
import { Account } from '@prisma/client'
import { Button } from './Button'
import { PencilIcon } from '@heroicons/react/24/outline'
import { Toast } from './Toast'
import { AccountDialog } from './AccountDialog'

interface AccountsTableProps {
  accounts: Account[]
  onUpdate?: () => void
}

export function AccountsTable({ accounts, onUpdate }: AccountsTableProps) {
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  })

  const handleEdit = async (data: Partial<Account>) => {
    const isNewAccount = !editingAccount?.id

    try {
      const response = await fetch(
        isNewAccount ? '/api/accounts' : `/api/accounts/${editingAccount?.id}`,
        {
          method: isNewAccount ? 'POST' : 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to save account')
      }
      
      setEditingAccount(null)
      onUpdate?.()
      setToast({
        show: true,
        message: `Account ${isNewAccount ? 'created' : 'updated'} successfully`,
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
            <h1 className="text-base font-semibold text-gray-900">Accounts</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all accounts in the system.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Button
              variant="primary"
              onClick={() => setEditingAccount({} as Account)}
            >
              Add account
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
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Created
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Last Updated
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {accounts.map((account) => (
                    <tr key={account.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {account.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(account.createdAt).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(account.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setEditingAccount(account)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <AccountDialog
        isOpen={!!editingAccount}
        onClose={() => setEditingAccount(null)}
        onSubmit={handleEdit}
        account={editingAccount || undefined}
        title={editingAccount?.id ? 'Edit Account' : 'New Account'}
      />

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />
    </>
  )
} 