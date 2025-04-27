import Link from 'next/link'
import React from 'react'

const CustomGetFundedBtn = () => {
  return (
    <div className="text-center py-6">
        <Link href={"/pricing"} className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 py-2 px-4 rounded-full text-slate-50">
            Get Funded
        </Link>
    </div>
  )
}

export default CustomGetFundedBtn