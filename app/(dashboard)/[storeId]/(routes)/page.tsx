import db from '@/lib/db'
import React from 'react'

interface DashboardPageProps {
  storeId: string
}

const DashboardPage = async ({storeId}: DashboardPageProps) => {

  const store = await db.store.findFirst({
    where:{
      id: storeId
    }
  })

  return (
    <div>
      active store {store?.name}
    </div>
  )
}

export default DashboardPage
