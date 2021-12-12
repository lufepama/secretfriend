import Head from 'next/head'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Martinita from '../public/martina.jpg'


export default function Home({ user }) {

  const [name, setName] = useState('asdasd')
  const [length, setLength] = useState(user.length)
  const [isDisable, setIsDisable] = useState(false)
  const [list, setList] = useState([])

  const sendToDB = async () => {

    const data = { name: name }

    const res = await fetch(`http://localhost:3000/api/create`, {
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
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Holiii! Escribe aqui abajo el nombre que te ha tocado en el sorteo!
        </h1>
        <h2>ASI SABREMOS QUIEN FALTA</h2>
        <h5>Martinita os ama</h5>


        {
          list.map((item) => (
            <li key={item}>{item}</li>
          ))
        }

        <form>
          <input type='text' name='name' onChange={handleChange('name')} />
          <button onClick={addUser} disabled={isDisable} >Enviar</button>
        </form>
        <Image
          src={Martinita}
          width={250}
          height={250}
          alt='Martinita'
          objectFit='contain'
        />
      </main>
    </div>
  )
}

export async function getStaticProps() {

  const res = await fetch('http://localhost:3000/api/user/', { method: 'GET' })

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