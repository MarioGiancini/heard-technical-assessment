'use client'

import Container from '@/components/layout/Containter'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Container>{children}</Container>
}
