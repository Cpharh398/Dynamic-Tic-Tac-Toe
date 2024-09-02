
import React from 'react'
import { WelcomeText, Single_Multiyplayer } from '@/components/WelcomeText'


function page() {

  return (
      <div className='flex flex-col items-center gap-2 '  >

        <WelcomeText/>
        <Single_Multiyplayer/>

      </div>

  )
}



export default page