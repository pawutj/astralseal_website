import Image from "next/image"

export default function Treat() {
  return (

    <div>
      <Head>
        <title>Re:Fragment ~ Halloween Puzzle</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'black',
        flexDirection: 'column'
      }}>
        <Image
          src="/halox.png"
          alt="Treat"
          width={400}
          height={523}
          priority
        />
        <h2 style={{
          color: 'black',
          marginTop: '20px',
          fontSize: '12px'
        }}>

        </h2>
      </div>
    </div>
  )
}