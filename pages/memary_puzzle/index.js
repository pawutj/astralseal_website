import Head from 'next/head';
import Image from 'next/image';
export default function Home() {
const styles ={}
  return (

    <div className={styles.container}>
      <Head>
        <title>The Picture of Café au lait</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
      <hr/>
        <Image
          src="/landingpage.png"
          width={784}
          height={572}
          alt="Picture of the author"
        />

        
      </main>


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
      `}</style>
    </div>
  )
}
