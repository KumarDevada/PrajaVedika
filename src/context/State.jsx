import Context from "./Context";
import { useState , useEffect} from "react";

const initialState = {
  isdark: false,
  isLoading: false,
  ispopup: false,
  islogin: false,
  User: null,
  mptcid: null,
  isadmin: '',
  // Include any other initial state values here
};

const State = (props) => {

    const [isdark, setisdark] = useState(initialState.isdark)
    const [isLoading, setisLoading] = useState(initialState.isLoading)
    const [ispopup, setispopup] = useState(initialState.ispopup)
    const [islogin, setislogin] = useState(initialState.islogin);
    const [User, setUser] = useState(initialState.User);
    const [mptcid, setmptcid] = useState(initialState.mptcid);
    const [isadmin, setadmin] = useState(initialState.isadmin)

    const [mladata , setmladata] = useState({
      name : 'Varupula Satya Prabha',
      phone: '123'
    })

    const resetState = () => {
      setisdark(initialState.isdark);
      setisLoading(initialState.isLoading);
      setispopup(initialState.ispopup);
      setislogin(initialState.islogin);
      setUser(initialState.User);
      setmptcid(initialState.mptcid);
      setadmin(initialState.isadmin);
      // Reset any other state values here
    };


    const [mandalVillageData, setnothing] = useState({
      Sankhavaram: {

          mptc: [
            {
              name : 'Duggaraju Narayya & Gundu Nagadevi',
              villages : ['Pedamallapuram'],
              party: 'YSRCP',
              id: '668176e43f27c81426d64fc3'
            },
            {
              name: 'Nadigatla Veeraraju & Dudala Ramaswamy',
              villages: ['Konthangi'],
              party: 'YSRCP',
              id : '668177323f27c81426d64fc5'
            },
            {
              name: 'Kondi Lakshmi & Setibathula Kumar Raja',
              villages: ['Annavaram-1'],
              party: 'YSRCP',
              id:'6681774d3f27c81426d64fc7'
            },
            {
              name: 'Dhara Venkata Ramana & Setibathula Kumar Raja',
              villages: ['Annavaram-3'],
              party: 'YSRCP',
              id:'668177683f27c81426d64fc9'
            },
            {
              name: 'Chappa Manga Devi',
              villages: ['Kathipudi-1'],
              party: 'YSRCP',
              id:'6681777d3f27c81426d64fcb'
            },
            {
              name: 'Jeelakarra Vishnu',
              villages: ['Kathipudi-2'],
              party: 'YSRCP',
              id:'668177943f27c81426d64fcd'
            },
            {
              name: 'Challa Ganga Satya Prasad',
              villages: ['Kathipudi-3'],
              party: 'YSRCP',
              id : '668177af3f27c81426d64fcf'
            },
            {
              name: 'Kunisetli Satyavathi & Kunisetti Manikyam',
              villages: ['Mandapam'],
              party: 'YSRCP',
              id : '668177c83f27c81426d64fd1'
            }
          ],
          mpp : {
            name : 'BADDI MANI & MPDO Sankhavaram',
            phone: '9704931122',
          },
          zptc : {
            name : 'Sri. Bachala Manga',
            phone : '9959351924'
          }
      },
      Prathipadu: {
        
        mptc : [
          {
            name: 'Bhaskara Rao Sindripu & Vijayalakshmi Gudala',
            villages: ['Prathipadu-1'],
            party: 'YSRCP',
            id: "668178183f27c81426d64fd3"
          },
          {
            name: 'Chintapalli Padmavathi & Vijayalakshmi Gudala',
            villages: ['Prathipadu-2'],
            party: 'TDP',
            id : '668178303f27c81426d64fd5'
          },
          {
            name: 'Amrutha Varshini Pinisetti & Vijayalakshmi Gudala',
            villages: ['Prathipadu-3'],
            party: 'YSRCP',
            id : '6681784b3f27c81426d64fd7'
          },
          {
            name: 'Pandi Bhargavi & Y V Gangadhara Kumar',
            villages: ['Lampakalova'],
            party: 'YSRCP',
            id : '668178643f27c81426d64fd9'
          },
          {
            name: 'Acchanna Ummidi & Venkataramana Manthina',
            villages: ['Uttarakanchi', 'Routupalem'],
            party: 'YSRCP',
            id : '668178783f27c81426d64fdb'
          },
          {
            name: 'Jyothi Kumari Pampanaboina & Lova Lakshmi Saripalli',
            villages: ['Rachapalli-1'],
            party: 'TDP',
            id :"6681788e3f27c81426d64fdd"
          },
          {
            name: 'Buddaraju Venkata Satya Surya Rama Lakshmi & Lova Lakshmi Saripalli',
            villages: ['Rachapalli-2'],
            party: 'YSRCP',
            id : '668178a73f27c81426d64fdf'
          },
          {
            name: 'Molli Veerababu & Gonagala Appalaraju',
            villages: ['Gajjanapudi'],
            party: 'YSRCP',
            id : '668178bc3f27c81426d64fe1'
          },
          {
            name: 'Sujatha Juvvala & Suseela Benthukurthi',
            villages: ['Dharmavaram-1'],
            party: 'YSRCP',
            id : '668178d23f27c81426d64fe3'
          },
          {
            name: 'Satyavathi Annika & Chinnalamma Chintala & Ramalakshmi Vanaparthi & Ramalakshmi Gummadi',
            villages: ['Gokavaram', 'Pandavulapalem', 'Buradakota'],
            party: 'YSRCP',
            id : '668178e83f27c81426d64fe5'
          },
          {
            name: 'Kasi Jagannadham Amaradhi & Satyanarayana Doddi & Venkataro Amaradhi',
            villages: ['Sarabhavaram', 'Bavouruvaka'],
            party: 'YSRCP',
            id : '668178fd3f27c81426d64fe7'
          },
          {
            name: 'Siva Naga Venkata Simhadri Medasani & Trimurtulu Nadigatla & Ramadevi Simhadri',
            villages: ['U.Jagannadhapuram', 'Venkatanagaram'],
            party: 'YSRCP',
            id:'6681791a3f27c81426d64fe9'
          },
          {
            name: 'Ratnakumari Londa & Manasa Pampanaboyana',
            villages: ['Peddipalem'],
            party: 'YSRCP',
            id : '6681792e3f27c81426d64feb'
          },
          {
            name: 'Golla Kanthi Sudhakar & Suseela Benthukurthi',
            villages: ['Dharmavaram-2'],
            party: 'YSRCP',
            id : '668179443f27c81426d64fed'
          },
          {
            name: 'Nanipalli Satyavathi & Suseela Benthukurthi',
            villages: ['Dharmavaram-3'],
            party: 'YSRCP',
            id : '668179593f27c81426d64fef'
          },
          {
            name: 'Apparao Sadanala & Bhavani Tummala',
            villages: ['Vommangi-1'],
            party: 'YSRCP',
            id : '6681796c3f27c81426d64ff1'
          },
          {
            name: 'Nancy Catherin Golla & Bhavani Tummala',
            villages: ['Vommangi-2'],
            party: 'YSRCP',
            id : '6681798a3f27c81426d64ff3'
          },
          {
            name: 'Kondalarao Pilla & Ramarao Yepuri',
            villages: ['Chinasankarlapudi'],
            party: 'YSRCP',
            id : '668179a13f27c81426d64ff5'
          },
          {
            name: 'Dadisetti Rani & Satyanarayana Rongala',
            villages: ['Yeluru-1'],
            party: 'YSRCP',
            id : '668179b53f27c81426d64ff7'
          },
          {
            name: 'Ramannadora Tatavarthi & Subbarao Thatavarthy & Satyanarayana Rongala',
            villages: ['Yeluru-2', 'T Rayavaram'],
            party: 'YSRCP',
            id : '668179ca3f27c81426d64ff9'
          },
          {
            name: 'Dale Chitti Kumari & Nagartanam Surneedhi',
            villages: ['Pedasankarlapudi'],
            party: 'YSRCP',
            id : '668179e03f27c81426d64ffb'
          },
          {
            name: 'Makarapu Sharmila',
            villages: ['Chinthaluru'],
            party: 'YSRCP',
            id : '668179f83f27c81426d64ffd'
          },
          {
            name: 'Yesubabu Muppidi & Rambabu Bondi & Rongala Nageswararao',
            villages: ['Pothuluru', 'Vakapalli'],
            party: 'YSRCP',
            id : '66817a0f3f27c81426d64fff'
          }
        ],
        mpp : {
          name : 'BATHULA LOVAKUMARI & MPDO Prathipadu',	
          phone: '7729043926'
        },
        zptc : {
          name : 'Sri. Lovalaxmi Mudunuri	',
          phone : '9959375727'
        }
      },

        Yeleswaram: {
          mptc : [
            {
              name: 'Nanisetti Sankuramma & Nanisetti Shankuramma',
              villages: ['Marrivedu'],
              party: 'YSRCP',
              id : '66817a333f27c81426d65001'
            },
            {
              name: 'Kalari Girisha & Bajinku Kalyani',
              villages: ['J.Annavaram'],
              party: 'YSRCP',
              id : '66817a5e3f27c81426d65003'
            },
            {
              name: 'Isanagiri Siva Prasad',
              villages: ['Turpulakshmi puram'],
              party: 'YSRCP',
              id : '66817a743f27c81426d65005'
            },
            {
              name: 'Rajyalakshmi Devi Chikkala & Chandra Lekha Sambattula',
              villages: ['Lingamparthi - 1'],
              party: 'YSRCP',
              id : '66817a883f27c81426d65007'
            },
            {
              name: 'Padmavathi Adapa & Chandra Lekha Sambattula',
              villages: ['Lingamparthi - 2'],
              party: 'YSRCP',
              id : '66817a9c3f27c81426d65009'
            },
            {
              name: 'Appalaraju Bellala & Chandra Lekha Sambattula',
              villages: ['Lingamparthi - 3'],
              party: 'Independent',
              id : '66817ab23f27c81426d6500b'
            },
            {
              name: 'Koppulu Babji & KunapuReddy Subbararao',
              villages: ['Bhadravaram'],
              party: 'YSRCP',
              id : '66817ac53f27c81426d6500d'
            },
            {
              name: 'Boddu Manga & Bheri SuryaVaralakshmi',
              villages: ['Peravaram'],
              party: 'YSRCP',
              id : '66817ad83f27c81426d6500f'
            },
            {
              name: 'Sade Lova Raju & Peethala Nookaraju',
              villages: ['Siripuram'],
              party: 'YSRCP',
              id : '66817aed3f27c81426d65011'
            },
            {
              name: 'Pasala Surya Narayana & Soothi VeeraKrishna Prasad',
              villages: ['Tirumali'],
              party: 'TDP',
              id : '66817aff3f27c81426d65013'
            },
            {
              name: 'Lakshmana Swamy Boddu & Beesetti Appala Raju',
              villages: ['Yerravaram'],
              party: 'YSRCP',
              id : '66817b153f27c81426d65015'
            }
          ],
          mpp : {
            name : 'Smt. Styavathi aiyala & MPDO Yeleswaram',	
            phone: '8019360896'
          },
          zptc : {
            name : 'Sri. Jyothula Veera Swamy',
            phone : '9248064446'
          }
        } ,
       
      Rowthulapudi: {
        mptc : [
          {
            name: 'Tirumala Rayal Sureddi',
            villages: ['L.R.Palem'],
            party: 'YSRCP',
            id : '66817b353f27c81426d65017'
          },
          {
            name: 'Sri Somarouthu Ranganayakulu & Dasari Sanyasi',
            villages: ['Balarampuram'],
            party: 'TDP',
            id : '66817b533f27c81426d65019'
          },
          {
            name: 'Bijja Raju & Katari Arjamma',
            villages: ['Rowthulapudi-2'],
            party: 'TDP',
            id : '66817b693f27c81426d6501b'
          },
          {
            name: 'Gadhi Rajuababu & Pulugu Yesubabu',
            villages: ['Srungavaram'],
            party: 'YSRCP',
            id : '66817b7c3f27c81426d6501d'
          },
          {
            name: 'Deyala Baby & Nandamuri Venkannadora',
            villages: ['P.Chamavaram'],
            party: 'YSRCP',
            id : '66817b8f3f27c81426d6501f'
          },
          {
            name: 'Tantapureddi Lovakumari & Nimmagadala Pram Jyothi',
            villages: ['Gidajam'],
            party: 'YSRCP',
            id : '66817ba33f27c81426d65021'
          },
          {
            name: 'Seetha Ramaswamy Somarouthu & Sri Somarowthu Venkata Varaha Lakshmi Narasayamma',
            villages: ['Rajavaram'],
            party: 'YSRCP',
            id : '66817bb83f27c81426d65023'
          },
          {
            name: 'Ayitea Nagaratnam & Rayipalli Lovaraju',
            villages: ['Raghavapatnam'],
            party: 'YSRCP',
            id : '66817bcb3f27c81426d65025'
          },
          {
            name: 'Yamala Suresh & Tamarala Satyanarayana',
            villages: ['Mulagapudi'],
            party: 'TDP',
            id : '66817be63f27c81426d65027'
          },
          {
            name: 'Boddu Raju & Chinadha Peddaraju',
            villages: ['A.Mallavaram'],
            party: 'YSRCP',
            id : '66817bfa3f27c81426d65029'
          },
          {
            name: 'Gantimalla Rajyalashmi & Saipureddi Kanaka Lakshmiaq',
            villages: ['Gangavaram'],
            party: 'YSRCP',
            id : '66817c0c3f27c81426d6502b'
          },
          {
            name: 'Geddam Venkatalaskhmi & Pakkurthi Lakshmi',
            villages: ['Parupaka'],
            party: 'YSRCP',
            id : '66817c213f27c81426d6502d'
          },
          {
            name: 'Ramanamma Medapureddi & Singampalli Venkatalakshmi',
            villages: ['N.N.Patnam'],
            party: 'YSRCP',
            id : '66817c333f27c81426d6502f'
          },
          {
            name: 'Mangalaskhmi Vasireddi & Katari Arjamma',
            villages: ['Rowthulapudi-1'],
            party: 'YSRCP',
            id : '66817c473f27c81426d65031'
          },
          {
            name: 'Kollu Pallaya & Sarnam Srinivasu',
            villages: ['S.Agraharam'],
            party: 'YSRCP',
            id : '66817c5b3f27c81426d65033'
          }
        ],
        mpp : {
          name : 'Surya Bhaskara Rao & Rowthulapudi',	
          phone: '9866630463'
        },
        zptc : {
          name : 'Sri. Chennada Sathibabu',
          phone : '9676632226'
        }
      }
    })
    

  

  return (
    <Context.Provider value={{ resetState ,setisLoading ,isadmin , setadmin, mptcid, setmptcid, mladata, mandalVillageData ,isdark, User , setUser , setisdark , ispopup , setispopup ,islogin, setislogin }}>
        {props.children}
    </Context.Provider>
  )
}

export default State