import React, { useContext, useEffect, useState } from 'react'
import { Loading, Wrapper } from '../Components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Context from '../context/Context';


const Announcements = () => {

  const [ann, setann] = useState([1,2,3,4,5,6])
  const { resetState ,isdark , setisdark, isadmin ,setadmin , setislogin, islogin , User, setUser, mandalVillageData} = useContext(Context)

  const [heading, setheading] = useState('')
  const [Description, setdescription] = useState('')

  const [annos, setAnnos] = useState([])
  const [flag, setflag] = useState(true);

  const [loading, setloading] = useState(false);
  const navigate = useNavigate();


  function formatDateToDDMMYYYY(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const date = new Date();
    const formattedDate = formatDateToDDMMYYYY(date);
    const newAnno = { heading: heading, date: formattedDate, description: Description };

    try {
      const response = await axios.post('https://prajavedika-backend.onrender.com/annos', newAnno);
      console.log('New anno created:', response.data);
      // Clear the form fields
      setheading('');
      setdescription('');
      setloading(false)
      alert('New Announcement posted successfully.')
      setflag((t) => !t);
    } catch (err) {
      console.error('Error creating new anno:', err);
      setloading(false)
    }
  };

  useEffect(() => {
    const fetchAnnos = async () => {
      try {
        const response = await axios.get('https://prajavedika-backend.onrender.com/annos');
        setAnnos(response.data.reverse());
      } catch (err) {
        console.error('Error fetching annos:', err);
      }
    };

    fetchAnnos();
  }, [flag]);

  return (
    <Wrapper>
      {loading && <Loading />}
        <div className=' mt-40 min-w-[340px]  ml-[-30px] md:ml-0 md:w-screen-xl gap-0 bg-orange-200 flex rounded-md flex-col md:flex-row justify-center'>

            <div className='h-full max-h-[600px] max-w-[720px] flex flex-col flex-1 rounded-md p-5'>
              <h1 className='text-xl mt-8 md:mt-2  text-center font-montserrat font-bold text-slate-600'>Latest Announcements</h1>
              <hr className='mb-4' />
              <div className='p-0 h-4/5  overflow-auto'>
                {annos.map((item, index) => (
                  <div className='p-4 mb-4 bg-white flex flex-col rounded-md shadow-md' index={index}>
                    <h1 className='text-md font-montserrat font-bold text-slate-500'>{item.heading}</h1>
                    <div className='flex justify-end'>
                      date : {item.date}
                    </div>
                    <p className='font-montserrat '>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {isadmin === 'mla' && (
                <div className='bg-blue-200 flex-1 flex flex-col justify-center rounded-md p-5'>
                <div className='w-full mt-5 flex justify-center'>
                  
                    
                    <form onSubmit={handlesubmit} className="bg-slate-100 p-6 rounded-lg shadow-md w-full max-w-lg">
                    <h1 className="mt-[1vh] mb-4 font-mono text-slate-500 font-bold text-2xl ">
                      New Announcement
                    </h1>
                    
                    <div className="mb-4">
                      <label htmlFor="query" className="block font-montserrat text-gray-700 font-medium mb-2">Heading</label>
                      <input type="text" id='head' required value={heading} onChange={(e) => setheading(e.target.value)} className='w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400' />
                      <label htmlFor="query" className="block mt-2 font-montserrat text-gray-700 font-medium mb-2">Description of the Announcement</label>
                      <textarea
                        id="query"
                        name="query"
                        rows="6"
                        required
                        value={Description}
                        onChange={(e) => setdescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                      ></textarea>
                    </div>
                    <button
                      className="w-full bg-orange-400 fontbold text-xl text-white py-2 px-4 rounded-lg hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                    >
                      Post
                    </button>
                  </form>
                </div>
              </div>
            )}
            
        </div>
    </Wrapper>
    
  )
}

export default Announcements