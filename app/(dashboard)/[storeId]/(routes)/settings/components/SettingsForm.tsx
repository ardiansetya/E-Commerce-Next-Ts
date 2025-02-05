"use client"

import { Store } from "@prisma/client"


interface SettingsFormProps {
    initialData: Store
}


const SettingsForm: React.FC<SettingsFormProps> = ({initialData}) => {
    console.log(initialData)
    
  return (
    <div>
      {
        initialData.name
      }
    </div>
  )
}

export default SettingsForm
