import React, { useEffect, useState } from 'react'
import { Wrapper , CatCard } from '../Components'
import { useContext } from 'react';
import axios from 'axios';
import Context from '../context/Context'
import { useNavigate } from 'react-router-dom'
import { Loading} from "../Components";
const category1 = [1,2,3,4]

const Explore = () => {
    const navigate = useNavigate();
    const [queries, setQueries] = useState([]);
    const [loading, setloading] = useState(false);
    const [mptcname, setmptcname] = useState('');
    const [zptc, setzptc] = useState('')
    const [mpp, setmpp] = useState('')
    const mla = 'Varupula Satya Prabha'
    const {setislogin, islogin,isadmin , User, setUser, setmptcid, mandalVillageData }  = useContext(Context)

    const fetchmpp = async () => {
        console.log('fetching queries for mpp');
        const i = mandalVillageData[User.mandalName].mpp.name;
        setmpp(i);
        const j = mandalVillageData[User.mandalName].zptc.name;
        setzptc(j);
        setloading(true);
        try {
            const queryPromises = mandalVillageData[User.mandalName].mptc.map(async (element) => {
              const response = await axios.get(`https://prajavedika-backend.onrender.com/mptc-queries/${element.id}`);
              return response.data;
            });
      
            // Wait for all promises to resolve
            const allQueries = await Promise.all(queryPromises);
            console.log(allQueries);
            // Flatten the array of arrays
            // const flattenedQueries = allQueries.flat();
            const filteredQueries = allQueries
                .flat()
                .filter(query => query.level.toLowerCase() === isadmin.toLowerCase());
            // console.log('no filtered queries');
            setQueries(filteredQueries);
            console.log('Fetched queries:', filteredQueries);
        } catch (error) {
            console.error('Error fetching queries:', error);
        } finally {
            setloading(false);
        }
    }

    const fetchmla = async() => {
        console.log('fetching queries for mla');
        setloading(true);
        try {
            const queryPromises = [];

            // Iterate through each mandal
            for (const mandal in mandalVillageData) {
                if (mandalVillageData.hasOwnProperty(mandal)) {
                    const mptcList = mandalVillageData[mandal].mptc;

                    // Iterate through each MPTC in the mandal
                    mptcList.forEach((element) => {
                        const tempid = element.id;
                        queryPromises.push(axios.get(`https://prajavedika-backend.onrender.com/mptc-queries/${tempid}`));
                    });
                }
            }

            // Wait for all promises to resolve
            const allQueries = await Promise.all(queryPromises);

            // Flatten the array of arrays
            // const flattenedQueries = allQueries.map(response => response.data).flat();
            const filteredQueries = allQueries
                .map(response => response.data)
                .flat()
                .filter(query => query.level.toLowerCase() === isadmin.toLowerCase());
            setQueries(filteredQueries);
            console.log('Fetched queries:', filteredQueries);
        } catch (error) {
            console.error('Error fetching queries:', error);
        } finally {
            setloading(false);
        }
    }


    useEffect(() => {
        setloading(true);
        console.log('Queries page is opened....');
        if(!islogin) {
            navigate('/')
            return;
        }
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
                                    setmptcname(mptc.name);
                                    return mptc.id;
                                }
                            }
                            
                        }
                    }
                    return null; // Return null if no matching village name is found
                };

                if(isadmin === 'mpp') {
                    fetchmpp();
                    return;
                }
                if(isadmin === 'mla') {
                    fetchmla();
                    return;
                }
                let mptcId = '';
                if(User?.mptc) {
                    mptcId = User.mptc
                    setmptcid(mptcId);
                }
                else {
                    mptcId = findMptcIdByVillageName(villageNameToSearch);
                    setmptcid(mptcId);
                }
                

                const t1 = mandalVillageData[User?.mandalName].zptc.name
                const t2 = mandalVillageData[User?.mandalName].mpp.name
                setzptc(t1);
                setmpp(t2);
                

                const fetchQueries = async () => {
                    try {
                      
                      // Replace 'http://localhost:3000' with your actual backend URL
                      const response = await fetch(`https://prajavedika-backend.onrender.com/mptc-queries/${mptcId}`);
                      
                      if (!response.ok) {
                        throw new Error('Failed to fetch queries');
                      }
              
                      const data = await response.json();
                      console.log('successfully fetched all queries for mptc');
                      const filteredQueries = data.filter(query => query.level.toLowerCase() === 'mptc');
                      console.log(filteredQueries);
                      setQueries(filteredQueries);
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

        const [filteredQueries, setFilteredQueries] = useState([]);
        const [filterType, setFilterType] = useState('unresolved'); // all, resolved, unresolved

        useEffect(() => {
            applyFilterAndSort('unresolved');
        }, [queries]); // Apply filter and sort whenever queries change

        const applyFilterAndSort = (type) => {
            let filtered = queries;

            if(type === 'my') {
                filtered = queries.filter(query => (query.phoneNumber === User.phoneNumber));
            } else if (type === 'resolved') {
                filtered = queries.filter(query => query.resolved);
            } else if (type === 'unresolved') {
                filtered = queries.filter(query => !query.resolved);
            }

            // Sort by length of upvotes array in descending order
            filtered.sort((a, b) => b.upvotes.length - a.upvotes.length);

            setFilteredQueries(filtered);
        };

        const handleFilterClick = (type) => {
            setFilterType(type);
            applyFilterAndSort(type);
        };


        
        
        


  return (
    <Wrapper>
        {loading && <Loading />}
        <h1 className="mt-[1vh] text-center mb-4 font-montserrat text-slate-500 font-bold text-2xl ">
           {filterType} queries : {filteredQueries.length}
        </h1>

        <div className=' w-full flex flex-col md:flex-row'>
            <div className='hidden text-center p-2 md:block w-[25vw] h-[75vh] '>
                <div className='w-full bg-white p-2 rounded-md shadow-sm'>
                    <h1 className='font-medium text-2xl mb-3 text-green-600'>{User?.mandalName} {(isadmin !== 'mla') && 'Mandal'}</h1>
                    
                    {((isadmin === '')) && (
                        <div>
                            <h1 className='font-medium mb-4 text-xl text-slate-600'>{User?.villageName} Village</h1>
                            <hr />
                            <h1 className='font-medium mt-3 text-md text-slate-500'>MPTC</h1>
                            <h1 className='font-medium mb-3 text-xl text-orange-400'>{mptcname}</h1>
                        </div>
                    )}
                    {((isadmin === 'mptc')) && (
                        <div>
                            
                            <hr />
                            <h1 className='font-medium mt-3 text-md text-slate-500'>MPTC for mptc</h1>
                            <h1 className='font-medium mb-3 text-xl text-orange-400'>{User.username}</h1>
                        </div>
                    )}
                        
                    <hr />

                    {(isadmin !== 'mla') && (
                        <div>
                            <h1 className='font-medium mt-3 text-md text-slate-500'>MPP</h1>
                            <h1 className='font-medium mb-3 text-xl text-orange-400'>{mpp}</h1>
                            <hr />
                            <h1 className='font-medium mt-3 text-md text-slate-500'>ZPTC</h1>
                            <h1 className='font-medium mb-3 text-xl text-orange-400'>{zptc}</h1>
                            <hr />
                        </div>
                    )}
                    
                    <h1 className='font-medium mt-3 text-md text-slate-500'>MLA</h1>
                    <h1 className='font-medium mb-3 text-xl text-orange-400'>{mla}</h1>
                    
                </div>
                
            </div>

            <div className=' w-full md:w-[45vw] h-[75vh] overflow-auto  px-0'>
                <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-3'>
                    {filteredQueries?.map((item, index) => (
                        <CatCard item={item} key={index} />
                    ))}
                </div>
            </div>

            <div className='flex flex-col justify-between items-center w-full mt-16 md:mt-0 md:w-[22vw] h-[75vh] '>
                {(isadmin === '') && (
                    <div>
                        <button className='text-lg text-slate-500 font-montserrat font-bold bg-orange-300 p-2 px-8 rounded-md shadow-md hover:bg-green-300 active:bg-green-600' onClick={() => navigate('/queryform')}>New Query</button>

                    </div>
                )}
                

                <div className='w-full flex flex-col gap-3  md:ml-8 mt-4 bg-white p-4 rounded-lg'>
                    <h1 className='text-lg text-slate-500 font-montserrat font-bold text-center'>Filter</h1>
                    <button className='text-md text-slate-500 font-montserrat font-bold bg-slate-200 p-2 px-8 rounded-md shadow-md hover:bg-green-300 active:bg-green-600' onClick={() => handleFilterClick('my')}>My Queries</button>
                    <button className='text-md text-slate-500 font-montserrat font-bold bg-slate-200 p-2 px-8 rounded-md shadow-md hover:bg-green-300 active:bg-green-600' onClick={() => handleFilterClick('resolved')}>Resolved</button>
                    <button className='text-md text-slate-500 font-montserrat font-bold bg-slate-200 p-2 px-8 rounded-md shadow-md hover:bg-green-300 active:bg-green-600' onClick={() => handleFilterClick('unresolved')}>Un-resolved</button>
                </div>


                <div className='w-full md:ml-8 mb-12 bg-white p-4 rounded-lg'>
                    <h2 className='text-lg text-slate-500 font-montserrat font-bold'>Status Levels</h2>
                    <ul className='font-semibold text-slate-400'>
                        <li>1. MPTC</li>
                        <li>2. MPP</li>
                        <li>3. MLA</li>
                    </ul>

                </div>
            </div>
        </div>
        
    </Wrapper>
  )
}

export default Explore