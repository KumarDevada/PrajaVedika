import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../context/Context'


const CatCard = ({item}) => {

  const navigate = useNavigate()
  const { User, isadmin, setisLoading} = useContext(Context);
  const [upvote, setupvote] = useState(false);
  const [passed, setpassed] = useState(false)
  

  const st = ["Ward Member", "MPTC", "MPP", "MLA"]

  const api1 = ['http://localhost:3000/solve-query', 'https://prajavedika-backend.onrender.com/solve-query']
  const api2 = ['http://localhost:3000/next-query', 'https://prajavedika-backend.onrender.com/next-query']
  const api3 = ['http://localhost:3000/upvote-query', 'https://prajavedika-backend.onrender.com/upvote-query']

  const solve = async(queryId, mptc) => {
    console.log('solve button clicked');
    setisLoading(true);
    try {
      const res = await fetch(
        api1[1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({mptcId:mptc , queryId:queryId}),
        }
      );
  
      const data = await res.json();

      console.log('solve api called with mptc id', mptc);

      if (res.status == 200) {
        alert('query solved successfully, changes need some time to reflect...')
        item.resolved = true;
      } else {
        alert(res.data.msg);
      }
    } catch (err) {
      console.error(err.message);
    }
    setisLoading(false)
  }

  const next = async(queryId, mptc) => {
    console.log('next button clicked');
    setisLoading(true);
    try {
      const res = await fetch(
        api2[1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({mptcId:mptc , queryId:queryId}),
        }
      );
  
      const data = await res.json();

      console.log('next api called with mptc id', mptc);

      if (res.status == 200) {
        alert('query passed to next level, changes need some time to reflect...')
        if(item.level === 'MPTC') item.level = 'MPP';
        else if(item.level === 'MPP') item.level = 'MLA';
        setpassed(true);
      } else {
        alert(res.data.msg);
      }
    } catch (err) {
      console.error(err.message);
    }
    setisLoading(false)
  }

  const handleUpvote = async (queryId, mptc) => {
    console.log('upvote button clicked');
    setisLoading(true)
    try {
      const res = await fetch(
        api3[1],
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({phoneNumber: User.phoneNumber, mptcId:mptc , queryId:queryId}),
        }
      );
  
      const data = await res.json();

      console.log('upvote api called with mptc id', mptc);

      if (res.status == 200) {
        alert('upvoted successfully, changes need some time to reflect...')
        setupvote(true);
      } else {
        alert(res.data.msg);
      }
    } catch (err) {
      console.error(err.message);
    }
    setisLoading(false)
  };

  useEffect(() => {
    if (item.upvotes.some(upvote => upvote === User.phoneNumber)) {
      setupvote(true);
    }
    // console.log(isadmin);
  }, [])

  return (
    <div className=' bg-white md:max-w-full shadow-sm p-4 md:p-8 rounded-md flex flex-col  gap-[2vh] cursor-pointer ' >
        {/* <div className="w-full max-h-[25vh] flex z-10">
              <img src={image} alt="" className=" object-cover rounded-xl " />
        </div> */}
        
        <div className='w-full h-full  flex flex-col justify-between'>
          <div className='w-full mb-6'>
            <div className='w-full mb-3 flex '>
              <h1 className='text-lg text-orange-600  font-semibold'> <i className='fa fa-user text-slate-500 text-md mr-2'> </i> {item.username}</h1>
            </div>
            <div className='w-full mb-3 flex justify-between'>
              {(isadmin !== '') && <p className='text-md text-slate-700 font-montserrat font-bold'><i className='fa fa-phone text-slate-500 text-md mr-2'> </i>{item.phoneNumber}</p>}
              <p className='text-md text-slate-700 font-montserrat font-bold'>{item.date}</p>
            </div>
            <hr />
            <br />
            <p className='font-montserrat text-slate-500 font-semibold'>{item.description}</p>
            <br />
            <hr />
          </div>
          
          
          <div className='w-full flex items-center justify-between h-8'>
            <div className='flex gap-2 items-center'>
              {(isadmin === '') && <button  disabled={upvote} onClick={() => handleUpvote(item._id, item.mptc)} className=' rounded-xl hover:bg-blue-300 active:bg-orange-500 px-4 py-1 ml-2'><i  className={`text-xl font-bold fa-solid fa-thumbs-up ${ upvote ? 'text-blue-500' : 'text-slate-400'}`}></i></button>}
              <p className='text-md text-slate-700  font-montserrat font-bold'>{(isadmin !== '') && '+ '} {item.upvotes.length}</p>
            </div>

            <div>
              <p className='text-slate-700 font-semibold mr-2'>Current Level - <span className='text-md text-green-600  font-bold'>{item.level}</span></p>
            </div>
          </div>
          <div className='w-full mt-4 mb-3 flex items-center justify-between h-8'>
            {item.resolved && <p className='text-xl text-green-500 text-center font-semibold'>This query has been Resolved</p>}
            {(isadmin !== '' && (!item.resolved) && (!passed)) && <button onClick={() => solve(item._id, item.mptc)} className='active:bg-orange-500 text-md p-3 rounded-md font-semibold font-montserrat'>Solve Query</button>}
            {((!item.resolved) && (!passed) && isadmin !== '' && isadmin !== 'mla') && <button onClick={() => next(item._id, item.mptc)} className='active:bg-orange-500 text-md p-3 rounded-md font-semibold font-montserrat'>Next Level</button>}
          </div>

        </div>
    </div>
  )
}

export default CatCard