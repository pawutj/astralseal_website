import Head from 'next/head';
import Image from 'next/image';
import MainContent from './MainContent';
import TableDecode from './TableDecode';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
export default function Home() {
  const defaultKey= "**************************"
  //const defaultKey= "--------------------------"
  const [decodeKey, setDecodeKey] = useState([...defaultKey])


  const decodeString = s =>{
    const sArray = [...s]
    return sArray.map(x => decode(x)).reduce((sum,x) => sum+x,"")    
  }

  const decode = s=> {

    const a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    //const b = "*****n**********ad************************A*********"
    const _decodeKey = decodeKey.map(x => x!=""?x:"*")
    const b = [..._decodeKey.map(x => x.toLowerCase()),..._decodeKey.map(x => x.toUpperCase())]
        if(a.indexOf(s) >=0){
            return b[a.indexOf(s)]
        } 
        return s
    }



  const encryptedString1 = `Q egflztssqzogf ol qf qktq gf zit etstlzoqs lhitkt of vioei q ukgxh gy colowst lzqkl ygkdl q htketoctr hqzztkf gk gxzsoft
  , znhoeqssn kthktltfzofu qf qfodqs, dnzigsguoeqs lxwptez, gk ofqfodqzt gwptez.[1] `
  
  const encryptedString2 =
  `Zit gkouofl gy zit tqksotlz egflztssqzogfl soatsn ug wqea zg hktiolzgkn.
  Htghst xltr zitd zg ktsqzt lzgkotl gy zitok wtsotyl, tbhtkotfetl, ektqzogf, gk dnzigsgun.
  Royytktfz exszxktl qfr egxfzkotl ofctfztr zitok gvf egflztssqzogfl, lgdt gy vioei sqlztr ofzg zit tqksn 20zi etfzxkn wtygkt zgrqn'l egflztssqzogfl vtkt ofztkfqzogfqssn ktegufomtr.
  Zit ktegufozogf gy egflztssqzogfl iql eiqfutr loufoyoeqfzsn gctk zodt. Dqfn eiqfutr of lomt gk liqht.
  Lgdt wteqdt hghxsqk, gfsn zg rkgh ofzg gwlexkozn. Lgdt vtkt sodoztr zg q lofust exszxkt gk fqzogf.
  Fqdofu egflztssqzogfl qslg itshtr qlzkgfgdtkl qfr fqcouqzgkl ortfzoyn lzqkl dgkt tqlosn.[2]
`
const styles ={}
  return (

    <div className={styles.container}>
      <Head>
        <title>The Picture of Café au lait</title>
        <link rel="icon" href="/icon.png" />
      </Head>


    
      <div style={{display :'flex' , justifyContent:'center'}}>
        <div>
      <MainContent  encryptedString1 = {encryptedString1}  encryptedString2 =  {encryptedString2} />
      <br></br>
      <MainContent  encryptedString1 = {decodeString(encryptedString1)}  encryptedString2 =  {decodeString(encryptedString2)} />
      </div>
      <div>
      <TableDecode decodeKey = {decodeKey}  setDecodeKey = {setDecodeKey} part ={0}/>
    
      </div>
    </div>
      {/* <hr/>
        <Image
          src="/landingpage.png"
          width={784}
          height={572}
          alt="Picture of the author"
        /> */}

        



      <style jsx>{`




        hr{
          border-top: 1px solid red !important;
        }
        .btn_2{
          
            border: none;
            display: inline-block;
            margin-left: 10px;
            padding: 7px 12px;
            // background-color: #ff5cca;
            background-color: #D21404;
            border-radius: 3px;
            color: #ffffff;
            font-weight: bold;
            transition: 0.5s;
            -mox-transition: 0.5s;
            -webkit-transition: 0.5s;
        }

        .main_2 {
     
          color:rgb(88,66,60);
       
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }

        .fix-size {
          font-family:'Courier New'
        }
      `}</style>
    </div>
  )
}


