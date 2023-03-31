import supabase from "../config/supabaseClient"
import { useEffect,useState } from "react"

const Home = () => {
  const[fetchError, setFetchError]=useState(null)
  const[test, setTest]=useState(null)

  useEffect(()=>{
    const fetchTest= async ()=>{
      const {data,error}=await supabase
        .from('test')
        .select()

        if(error){
          setFetchError('Could not fetch')
          setTest(null)
          console.log(error)
        }
        if(data){
          setTest(data)
          setFetchError(null)
        }

    }

    fetchTest()
  },[])

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {test && (
        <div className="test">
          <table border={1}>
            <tr>
              <td><p>ID</p></td>
              <td><p>Dato</p></td>
              <td><p>Creado en</p></td>
            </tr>
            {test.map(t=>(
              <tr>
                <td><p>{t.id}</p></td>
                <td><p>{t.data}</p></td>
                <td><p>{t.created_at}</p></td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  )
}

export default Home