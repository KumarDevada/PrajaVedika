import Context from "./Context";
import { useState , useEffect} from "react";

const State = (props) => {

    const [isdark, setisdark] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [ispopup, setispopup] = useState(false)
    const [islogin, setislogin] = useState(true);
    const [User, setUser] = useState(null);
    const [mptcid, setmptcid] = useState(null);
    const [isadmin, setadmin] = useState('')

    const [mladata , setmladata] = useState({
      name : 'Burla Ramanjaneyulu',
      phone: '123'
    })


    const [mandalVillageData, setnothing] = useState({
      Sankhavaram: {

          mptc: [
            {
              name : 'Duggaraju Narayya',
              villages : ['Pedamallapuram'],
              party: 'YSRCP',
              id: '668176e43f27c81426d64fc3'
            },
            {
              name: 'Nadigatla Veeraraju',
              villages: ['Konthangi'],
              party: 'YSRCP',
              id : '668177323f27c81426d64fc5'
            },
            {
              name: 'Kondi Lakshmi',
              villages: ['Annavaram-1'],
              party: 'YSRCP',
              id:'6681774d3f27c81426d64fc7'
            },
            {
              name: 'Dhara Venkata Ramana',
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
              name: 'Kunisetli Satyavathi',
              villages: ['Mandapam'],
              party: 'YSRCP',
              id : '668177c83f27c81426d64fd1'
            }
          ],
          mpp : {
            name : 'BADDI MANI',
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
            name: 'Bhaskara Rao Sindripu',
            villages: ['Prathipadu-1'],
            party: 'YSRCP',
            id: "668178183f27c81426d64fd3"
          },
          {
            name: 'Chintapalli Padmavathi',
            villages: ['Prathipadu-2'],
            party: 'TDP',
            id : '668178303f27c81426d64fd5'
          },
          {
            name: 'Amrutha Varshini Pinisetti',
            villages: ['Prathipadu-3'],
            party: 'YSRCP',
            id : '6681784b3f27c81426d64fd7'
          },
          {
            name: 'Pandi Bhargavi',
            villages: ['Lampakalova'],
            party: 'YSRCP',
            id : '668178643f27c81426d64fd9'
          },
          {
            name: 'Acchanna Ummidi',
            villages: ['Uttarakanchi', 'Routupalem'],
            party: 'YSRCP',
            id : '668178783f27c81426d64fdb'
          },
          {
            name: 'Jyothi Kumari Pampanaboina',
            villages: ['Rachapalli-1'],
            party: 'TDP',
            id :"6681788e3f27c81426d64fdd"
          },
          {
            name: 'Buddaraju Venkata Satya Surya Rama Lakshmi',
            villages: ['Rachapalli-2'],
            party: 'YSRCP',
            id : '668178a73f27c81426d64fdf'
          },
          {
            name: 'Molli Veerababu',
            villages: ['Gajjanapudi'],
            party: 'YSRCP',
            id : '668178bc3f27c81426d64fe1'
          },
          {
            name: 'Sujatha Juvvala',
            villages: ['Dharmavaram-1'],
            party: 'YSRCP',
            id : '668178d23f27c81426d64fe3'
          },
          {
            name: 'Satyavathi Annika',
            villages: ['Gokavaram', 'Pandavulapalem', 'Buradakota'],
            party: 'YSRCP',
            id : '668178e83f27c81426d64fe5'
          },
          {
            name: 'Kasi Jagannadham Amaradhi',
            villages: ['Sarabhavaram', 'Bavouruvaka'],
            party: 'YSRCP',
            id : '668178fd3f27c81426d64fe7'
          },
          {
            name: 'Siva Naga Venkata Simhadri Medasani',
            villages: ['U.Jagannadhapuram', 'Venkatanagaram'],
            party: 'YSRCP',
            id:'6681791a3f27c81426d64fe9'
          },
          {
            name: 'Ratnakumari Londa',
            villages: ['Peddipalem'],
            party: 'YSRCP',
            id : '6681792e3f27c81426d64feb'
          },
          {
            name: 'Golla Kanthi Sudhakar',
            villages: ['Dharmavaram-2'],
            party: 'YSRCP',
            id : '668179443f27c81426d64fed'
          },
          {
            name: 'Nanipalli Satyavathi',
            villages: ['Dharmavaram-3'],
            party: 'YSRCP',
            id : '668179593f27c81426d64fef'
          },
          {
            name: 'Apparao Sadanala',
            villages: ['Vommangi-1'],
            party: 'YSRCP',
            id : '6681796c3f27c81426d64ff1'
          },
          {
            name: 'Nancy Catherin Golla',
            villages: ['Vommangi-2'],
            party: 'YSRCP',
            id : '6681798a3f27c81426d64ff3'
          },
          {
            name: 'Kondalarao Pilla',
            villages: ['Chinasankarlapudi'],
            party: 'YSRCP',
            id : '668179a13f27c81426d64ff5'
          },
          {
            name: 'Dadisetti Rani',
            villages: ['Yeluru-1'],
            party: 'YSRCP',
            id : '668179b53f27c81426d64ff7'
          },
          {
            name: 'Ramannadora Tatavarthi',
            villages: ['Yeluru-2', 'T Rayavaram'],
            party: 'YSRCP',
            id : '668179ca3f27c81426d64ff9'
          },
          {
            name: 'Dale Chitti Kumari',
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
            name: 'Yesubabu Muppidi',
            villages: ['Pothuluru', 'Vakapalli'],
            party: 'YSRCP',
            id : '66817a0f3f27c81426d64fff'
          }
        ],
        mpp : {
          name : 'BATHULA LOVAKUMARI',	
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
              name: 'Nanisetti Sankuramma',
              villages: ['Marrivedu'],
              party: 'YSRCP',
              id : '66817a333f27c81426d65001'
            },
            {
              name: 'Kalari Girisha',
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
              name: 'Rajyalakshmi Devi Chikkala',
              villages: ['Lingamparthi - 1'],
              party: 'YSRCP',
              id : '66817a883f27c81426d65007'
            },
            {
              name: 'Padmavathi Adapa',
              villages: ['Lingamparthi - 2'],
              party: 'YSRCP',
              id : '66817a9c3f27c81426d65009'
            },
            {
              name: 'Appalaraju Bellala',
              villages: ['Lingamparthi - 3'],
              party: 'Independent',
              id : '66817ab23f27c81426d6500b'
            },
            {
              name: 'Koppulu Babji',
              villages: ['Bhadravaram'],
              party: 'YSRCP',
              id : '66817ac53f27c81426d6500d'
            },
            {
              name: 'Boddu Manga',
              villages: ['Peravaram'],
              party: 'YSRCP',
              id : '66817ad83f27c81426d6500f'
            },
            {
              name: 'Sade Lova Raju',
              villages: ['Siripuram'],
              party: 'YSRCP',
              id : '66817aed3f27c81426d65011'
            },
            {
              name: 'Pasala Surya Narayana',
              villages: ['Tirumali'],
              party: 'TDP',
              id : '66817aff3f27c81426d65013'
            },
            {
              name: 'Lakshmana Swamy Boddu',
              villages: ['Yerravaram'],
              party: 'YSRCP',
              id : '66817b153f27c81426d65015'
            }
          ],
          mpp : {
            name : 'Smt. Styavathi aiyala',	
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
            name: 'Sri Somarouthu Ranganayakulu',
            villages: ['Balarampuram'],
            party: 'TDP',
            id : '66817b533f27c81426d65019'
          },
          {
            name: 'Bijja Raju',
            villages: ['Rowthulapudi-2'],
            party: 'TDP',
            id : '66817b693f27c81426d6501b'
          },
          {
            name: 'Gadhi Rajuababu',
            villages: ['Srungavaram'],
            party: 'YSRCP',
            id : '66817b7c3f27c81426d6501d'
          },
          {
            name: 'Deyala Baby',
            villages: ['P.Chamavaram'],
            party: 'YSRCP',
            id : '66817b8f3f27c81426d6501f'
          },
          {
            name: 'Tantapureddi Lovakumari',
            villages: ['Gidajam'],
            party: 'YSRCP',
            id : '66817ba33f27c81426d65021'
          },
          {
            name: 'Seetha Ramaswamy Somarouthu',
            villages: ['Rajavaram'],
            party: 'YSRCP',
            id : '66817bb83f27c81426d65023'
          },
          {
            name: 'Ayitea Nagaratnam',
            villages: ['Raghvapatnam'],
            party: 'YSRCP',
            id : '66817bcb3f27c81426d65025'
          },
          {
            name: 'Yamala Suresh',
            villages: ['Mulagapudi'],
            party: 'TDP',
            id : '66817be63f27c81426d65027'
          },
          {
            name: 'Boddu Raju',
            villages: ['A.Mallavaram'],
            party: 'YSRCP',
            id : '66817bfa3f27c81426d65029'
          },
          {
            name: 'Gantimalla Rajyalashmi',
            villages: ['Gangavaram'],
            party: 'YSRCP',
            id : '66817c0c3f27c81426d6502b'
          },
          {
            name: 'Geddam Venkatalaskhmi',
            villages: ['Parupaka'],
            party: 'YSRCP',
            id : '66817c213f27c81426d6502d'
          },
          {
            name: 'Ramanamma Medapureddi',
            villages: ['Nnpatnam'],
            party: 'YSRCP',
            id : '66817c333f27c81426d6502f'
          },
          {
            name: 'Mangalaskhmi Vasireddi',
            villages: ['Rowthulapudi-1'],
            party: 'YSRCP',
            id : '66817c473f27c81426d65031'
          },
          {
            name: 'Kollu Pallaya',
            villages: ['S.Aghraham'],
            party: 'YSRCP',
            id : '66817c5b3f27c81426d65033'
          }
        ],
        mpp : {
          name : 'Surya Bhaskara Rao',	
          phone: '9866630463'
        },
        zptc : {
          name : 'Sri. Chennada Sathibabu',
          phone : '9676632226'
        }
      }
    })
    

  

  return (
    <Context.Provider value={{setisLoading ,isadmin , setadmin, mptcid, setmptcid, mladata, mandalVillageData ,isdark, User , setUser , setisdark , ispopup , setispopup ,islogin, setislogin }}>
        {props.children}
    </Context.Provider>
  )
}

export default State