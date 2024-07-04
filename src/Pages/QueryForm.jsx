import React, { useContext, useEffect, useState } from 'react'
import Context from "../context/Context";
import { Wrapper , Loading} from "../Components";
import { useNavigate } from 'react-router-dom';


const QueryForm = () => {

  const {category, islogin,setislogin, User,setUser,  mandalVillageData, mptcid, setmptcid }  = useContext(Context)
  const [Description, setdescription] = useState('')

  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Query form is opened....');

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log(storedUser);
      setUser(JSON.parse(storedUser));
      setislogin(true); // Assuming you want to set the user as logged in if there's a user in localStorage
    }

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

    // console.log(User);

    // Example village name to search for
    const villageNameToSearch = User?.villageName ; // Replace with the actual village name you want to search
    const mptcId = findMptcIdByVillageName(villageNameToSearch);
    setmptcid(mptcId);

    if (mptcId) {
      console.log(`MPTC ID for village ${villageNameToSearch}: ${mptcId}`);
    } else {
      console.log(`No MPTC found for village ${villageNameToSearch}`);
      navigate('/')
    }
  }, []);

  function formatDateToDDMMYYYY(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }
  
  // Usage example:
  
  // console.log(formattedDate);


  const handlesubmit = async (event) => {
    event.preventDefault();

    if(Description.length < 20) {
      alert('A Query should have atleast 20 characters.')
      return;
    }
    // mptcId, username, phoneNumber, mandalName, villageName, description, date, level, mptc
    try {
      // navigate('/')
      setloading(true);
      const date = new Date();
      const formattedDate = formatDateToDDMMYYYY(date);
      const res = await fetch(
        "https://prajavedika-backend.onrender.com/post-query",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({username: User.username, phoneNumber: User.phoneNumber, mandalName: User.mandalName, villageName: User.villageName, aadhar: User.aadhar, description: Description, date: formattedDate, level:'MPTC', mptc: mptcid, mptcId: mptcid}),
        }
      );
  
      const data = await res.json();
      // console.log(data);
      setloading(false);
      if (res.status == 201) {
        alert("Query posted Successfully")
        navigate('/explore')
      } else {
        alert("MPTC not found");
      }
    } catch (error) {
      setloading(false);
      alert("Internal Server Error");
    }
  }
  
  
  

  return (
    <div className='w-full mt-5 flex justify-center'>
      {loading && <Loading />}
        
        <form onSubmit={handlesubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="mt-[1vh] mb-4 font-mono text-slate-500 font-bold text-2xl ">
          Post Query / Complaint
        </h1>
        
        <div className="mb-4">
            
          <label htmlFor="query" className="block text-gray-700 font-medium mb-2">Describe your query in brief...</label>
          <textarea
            id="query"
            name="query"
            rows="6"
            required
            value={Description}
            onChange={(e) => setdescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          ></textarea>
        </div>
        <button
          className="w-full bg-orange-400 text-white py-2 px-4 rounded-lg hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default QueryForm