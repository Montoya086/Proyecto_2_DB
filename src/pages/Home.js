import supabase from "../config/supabaseClient"
import { useEffect,useState } from "react"
import { useSearchParams } from "react-router-dom"

const Home = () => {
  const[fetchError, setFetchError]=useState(null)
  const[test, setTest]=useState(null)

  const [searchparams] = useSearchParams();
  const [user_id] = useState(searchparams.get('id'));

  useEffect(()=>{
    const fetchTest= async ()=>{
      const {data,error}=await supabase
        .from('usuario')
        .select('correo')
        .eq('id_usuario', user_id)

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
  },[user_id])

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {test && (
        <div className="test">
            {test.map(t=>(
              <p key={'mail'}>{t.correo}</p>
            ))}
        </div>
      )}
    </div>
  )
}

export default Home