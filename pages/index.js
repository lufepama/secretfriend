import Head from 'next/head'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Martinita from '../public/martina.JPG'
import styles from '../styles.module.css'


export default function Home({ user }) {

  const [name, setName] = useState('asdasd')
  const [length, setLength] = useState(user.length)
  const [isDisable, setIsDisable] = useState(false)
  const [list, setList] = useState([])

  const sendToDB = async () => {

    const data = { name: name }

    const res = await fetch(`https://amigo-secreto-inv0wjsoh-lufepama.vercel.app/api/create`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  const addUser = (e) => {
    console.log(list)
    e.preventDefault()

    setList(prevState => [...prevState, name])
    sendToDB()
    setIsDisable(true)
  }



  const handleChange = (name) =>
    (event) => {
      setName(event.target.value)
    };

  useEffect(() => {

    setList(user)

  }, [])

  return (
    <div className="container ">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} >
        <h1 className={styles.title}>
          Holiii! Escribe aqui abajo el nombre que te ha tocado en el sorteo!
        </h1>
        <h2 className={styles.title}>ASI SABREMOS QUIEN FALTA</h2>
        <h5 className={styles.title}>(Martinita os ama)</h5>

        {
          list.map((item) => (
            <li key={item} className={styles.items} >{item}</li>
          ))
        }

        <form className={styles.formulario}>
          <input type='text' name='name' onChange={handleChange('name')} className={styles.input} />
          <button className={styles.button} onClick={addUser} disabled={isDisable} >Enviar</button>
        </form>
        {
          isDisable && (
            <h1 className={styles.message}>Gracias, y que viva Colombia!</h1>
          )
        }
        <Image
          src={Martinita}
          width={350}
          height={350}
          alt='Martinita'
          objectFit='contain'
        />
      </main>
    </div>
  )
}

export async function getServerSideProps() {

  const res = await fetch('https://amigo-secreto-inv0wjsoh-lufepama.vercel.app/api/user', { method: 'GET' })

  const { response } = await res.json()

  const arrayList = []

  response.map(item => {
    arrayList.push(item.name)
  })

  return {
    props: {
      user: arrayList
    }
  }
}