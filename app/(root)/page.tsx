"use client"
import Modal from '@/components/ui/modal'
import { useStoreModal } from '@/hooks/useStoreModal'
import React, { useEffect } from 'react'

const SetupPage = () => {
  const isOpen = useStoreModal((state) => state.isOpen)
  const onOpen = useStoreModal((state) => state.onOpen)

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  return (
    <div className='p-3'>
      root page
    </div>
  )
}

export default SetupPage