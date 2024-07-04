import React from 'react'

const Wrapper = ({children , name}) => {
  return (
    <div className={`w-full max-w-[1500px] px-5 md:px-10 mx-auto ${name || "" }`}>{children}</div>
  )
}

export default Wrapper