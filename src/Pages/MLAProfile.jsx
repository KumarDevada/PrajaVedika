import React, { useState } from 'react';
import mla from '../assets/mla2.jpg'
const MLAProfile = () => {
  const [showFullBio, setShowFullBio] = useState(false);

  const toggleBio = () => {
    setShowFullBio(!showFullBio);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Header */}
      <header className="flex flex-col items-center md:flex-row md:items-start md:space-x-6 bg-yellow-400 p-4 rounded-t-lg">
        <img
          src={mla}
          alt="MLA Profile"
          className="w-36 h-36 rounded-full border-4 border-white mb-4 md:mb-0"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-white">Varupula Satya Prabha</h1>
          <h2 className="text-xl text-slate-100">MLA, Prathipadu Constituency</h2>
          <h2 className="text-xl text-slate-100">Born : 1979</h2>
          <h2 className="text-xl text-slate-100">Telugu Desam Party</h2>
        </div>
      </header>

      {/* Bio Section */}
      <section className="mt-6 px-4">
        <h3 className="text-2xl font-semibold text-orange-600">Biography</h3>
        <p className="mt-2 text-gray-700">
        Varupula Satyaprabha (born 1979) is an Indian politician from Andhra Pradesh. She is an MLA of Telugu Desam Party from Prathipadu, Kakinada Assembly Constituency in Kakinada district. She won the 2024 Andhra Pradesh Legislative Assembly Election.
        </p>
        <button onClick={toggleBio} className="text-orange-500 mt-2 focus:outline-none">
          {showFullBio ? 'Show Less' : 'Read More'}
        </button>
        
          <div className={`mt-4 text-gray-700 transition-all duration-1000 ease-in-out ${
            showFullBio ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <p>
            Prabha won the 2024 Andhra Pradesh Legislative Assembly election as TDP candidate from Prathipadu Assembly Constituency. 
            </p>
            <p>
            She defeated Varupula Subbarao of YSR Congress Party by a margin of 38,768 votes. In April 2024, she left the campaigning to perform a surgery on a pregnant woman.
            </p>
          </div>
        
      </section>

      
      
      

      
      


        <div className='w-full flex flex-col md:flex-row'>
            <section className="mt-6 flex-1 px-4">
                <h3 className="text-2xl font-semibold text-orange-600">Political Background</h3>
                <p className="mt-2 text-gray-700">
                <strong>Political Party:</strong>  TDP
                </p>
                <p className="mt-2 text-gray-700">
                <strong>Portfolio:</strong> Telugu Desam Party politician
                </p>
                <p className="mt-2 text-gray-700">
                Varupula Satya Prabha is the Telugu Desam Party (TDP) candidate from 93. Prathipadu (Scheduled Caste) Assembly constituency in Andhra Pradesh in the 2024 Andhra Pradesh Assembly elections
                </p>
            </section>

            <section className="mt-6 flex-1 px-4">
                <h3 className="text-2xl font-semibold text-orange-600">Personal Information</h3>
                <p className="mt-2 text-gray-700">
                <strong>Education:</strong> Doctorate
                Post Graduate M.B.A. from Andhra University, Visakhapatnam, A.P. in the year 2006
                </p>
                <p className="mt-2 text-gray-700">
                <strong>Career:</strong> Business
                </p>
                <p className="mt-2 text-gray-700">
                <strong>Achievements:</strong> -
                </p>
                <p className="mt-2 text-gray-700">
                <strong>Interests:</strong> Reading, Community Service & Social Worker
                </p>
            </section>


        </div>



        <div className='w-full flex flex-col md:flex-row'>

        <section className="mt-6 flex-1 px-4">
            <h3 className="text-2xl font-semibold text-orange-600">Constituency Information</h3>
            <p className="mt-2 text-gray-700">
            <strong>Constituency Name:</strong> Prathipadu Constituency
            </p>
            <p className="mt-2 text-gray-700">
            Prathipadu Assembly constituency is a constituency in Kakinada district of Andhra Pradesh that elects representatives to the Andhra Pradesh Legislative Assembly in India. It is one of the seven assembly segments of the Kakinada Lok Sabha constituency.
            </p>
        </section>


        <section className="mt-6 flex-1 px-4">
            <h3 className="text-2xl font-semibold text-orange-600">Contact Information</h3>
            <div className="mt-2 space-y-2 text-gray-700">
            <p>
                <strong>Office Address:</strong> 123 Main St, Constituency Name
            </p>
            <p>
                <strong>Phone:</strong> <a href="tel:+1234567890" className="text-orange-500">+1234567890</a>
            </p>
            <p>
                <strong>Email:</strong> <a href="mailto:email@example.com" className="text-orange-500">email@example.com</a>
            </p>
            <div className="flex space-x-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-orange-500">Twitter</a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-orange-500">Facebook</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-orange-500">LinkedIn</a>
            </div>
            </div>
        </section>




      </div>
      

      

      {/* Quote or Message */}
      <section className="mt-6 px-4 bg-orange-100 p-4 rounded-lg">
        <h3 className="text-2xl font-semibold text-orange-600">Message from Varupula Satya Prabha</h3>
        <p className="mt-2 italic text-gray-700">
          "I am committed to serving the people of Pratipadu Constituency with integrity and dedication. Together, we can build a stronger, more vibrant community."
        </p>
      </section>

      {/* Call-to-Action */}
      <section className="mt-6 px-4">
        <button onClick={() => alert('Feature coming soon')} className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
          Contact Me
        </button>
      </section>
    </div>
  );
};

export default MLAProfile;
