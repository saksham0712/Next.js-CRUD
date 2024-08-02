import { queryData } from '@/utils/getQueryOutput'
import React from 'react'

const page = async() => {
    // Fetch data from an API or database
    const queryOutput = await queryData();
    console.log(JSON.stringify(queryOutput, null, 2));
    // console.log('run')  
    return (
    <div>
      page
    </div>
  )
}

export default page
