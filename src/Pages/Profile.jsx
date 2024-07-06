import React, { useContext, useEffect, useState } from 'react';
import mla from '../assets/newprofile.jpg'

import Context from '../context/Context';
import { Loading} from "../Components";

const Profile = () => {
  const [showFullBio, setShowFullBio] = useState(false);
  const [loading, setloading] = useState(false);
  const { resetState ,isdark , setisdark, setadmin , setislogin, islogin , User, setUser, mandalVillageData} = useContext(Context)

    const [total, settotal] = useState(0)
    const [solved, setsolved] = useState(0)

  const handlelogout = () => {
    const yes = confirm('Are you sure you want to log out ?');
    if(yes) {
      localStorage.clear();
      sessionStorage.clear();
      resetState(); // Reset the context state
      navigate('/')
    }
  }

  useEffect(() => {
    setloading(true);
    console.log('Profile page is opened....');
    async function fetchData() {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            console.log(storedUser);
            setUser(JSON.parse(storedUser));
            setislogin(true);// Assuming you want to set the user as logged in if there's a user in localStorage
            
            console.log('fetching user');
            // console.log(User);
            
            const villageNameToSearch = User?.villageName ; // Replace with the actual village name you want to search
            

            
            const findMptcIdByVillageName = (villageName) => {
                for (const mandal in mandalVillageData) {
                    if (mandalVillageData.hasOwnProperty(mandal)) {
                        const mptcs = mandalVillageData[mandal].mptc;
                        for (const mptc of mptcs) {
                            if (mptc.villages.includes(villageName)) {
                                return mptc.id;
                            }
                        }
                        
                    }
                }
                return null; // Return null if no matching village name is found
            };

            
            let mptcId = '';
            mptcId = findMptcIdByVillageName(villageNameToSearch);
            

            const fetchQueries = async () => {
                try {
                  
                  // Replace 'http://localhost:3000' with your actual backend URL
                  const response = await fetch(`https://prajavedika-backend.onrender.com/mptc-queries/${mptcId}`);
                  
                  if (!response.ok) {
                    throw new Error('Failed to fetch queries');
                  }
          
                  const data = await response.json();
                  console.log('successfully fetched all queries for mptc');
                  const total = data.filter(query => query.phoneNumber === User.phoneNumber).length;
                  const solved = data.filter(query => ((query.phoneNumber === User.phoneNumber) && query.resolved)).length;
                  console.log(total);
                  settotal(total);
                  setsolved(solved);
                } catch (error) {
                  console.error('Error fetching queries:', error);
                  // Handle error state or show a message to the user
                }
              };



            if (mptcId) {
                console.log(`MPTC ID for village ${villageNameToSearch}: ${mptcId}`);
                await fetchQueries();
                setloading(false);
                // console.log(queries);
            } else {
                setloading(false);
                navigate('/')
                console.log(`No MPTC found for village ${villageNameToSearch}`);
            }
        }
    }
    fetchData();
  }, []);

  return (

    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {loading && <Loading />}
      {/* Header */}
      <header className="flex flex-col items-center md:flex-row md:items-center md:space-x-6 bg-blue-200 p-4 rounded-lg">
        <img
          src={mla}
          alt="MLA Profile"
          className="w-36 h-36 rounded-full border-4 border-white mb-4 md:mb-0"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl mb-1 font-bold text-blue-600">{User.username}</h1>
          <h2 className="text-xl mb-1 text-slate-500 font-semibold"><i class="fa-solid fa-phone"></i> : {User.phoneNumber}</h2>
          <h2 className="text-xl text-slate-500 font-semibold"> Aadhar : {User.aadhar}</h2>
        </div>

        
      </header>

    


      

      <section className="mt-6 flex flex-col gap-6 md:flex-row px-4 bg-orange-100 p-4 rounded-lg">
        
        <div className="text-center p-4 w-fit">
            <h1 className='text-center text-2xl mt-2 font-bold text-orange-500'><i class="fa-solid fa-location-dot"></i> Address</h1>
            <h2 className="text-2xl text-orange-400 font-semibold">{User.mandalName} Mandal</h2>
            <h2 className="text-xl text-orange-400 font-semibold">{User.villageName} Village</h2>
        </div>
        

        <div className='flex-auto flex flex-col p-6 bg-white rounded-lg shadow-md'>
            <h1 className='text-center text-2xl font-bold mb-2 text-slate-500'>Queries/Complaints</h1>
            <hr />
            <div className='flex mt-2 flex-row justify-evenly items-center'>
                <div>
                    <h1 className='text-center text-md font-semibold text-slate-500'>Posted</h1>
                    <h1 className='text-center text-3xl font-bold text-blue-500'>{total}</h1>
                </div>
                <div>
                    <h1 className='text-center text-md font-semibold text-slate-500'>Solved</h1>
                    <h1 className='text-center text-3xl font-bold text-green-500'>{solved}</h1>
                </div>
                <div>
                    <h1 className='text-center text-md font-semibold text-slate-500'>Pending</h1>
                    <h1 className='text-center text-3xl font-bold text-orange-500'>{total - solved}</h1>
                </div>
            </div>
        </div>
      </section>

      <section className="mt-6 w-full flex justify-center items-center px-4">
        <button onClick={() => handlelogout()} className="bg-blue-500 font-semibold text-white py-2 px-4 rounded-full hover:bg-orange-600">
          Log Out <i class="fa-solid fa-right-to-bracket"></i>
        </button>
      </section>
    </div>
  );
};

export default Profile;
