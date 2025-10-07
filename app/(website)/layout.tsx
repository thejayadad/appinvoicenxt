

import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className=''>
       <main>
        {children}
       </main>
    </div>
  )
}

export default layout