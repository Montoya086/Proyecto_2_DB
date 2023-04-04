import supabase from "../config/supabaseClient"
import { useEffect,useState } from "react"
import { useSearchParams, createSearchParams } from "react-router-dom"
import { BrowserRouter, Link } from "react-router-dom"

const Registro = () => {
  const[fetchError, setFetchError]=useState(null)
  const[test, setTest]=useState(null)
  const[rol, setRol]=useState(null)

  const [searchparams] = useSearchParams();
  const [user_id] = useState(searchparams.get('id'));

  useEffect(()=>{
    const fetchTest= async ()=>{
      const {data,error}=await supabase
        .rpc('get_medico_using_user_id',{user_id:user_id})

        if(error){
          setFetchError('Could not fetch')
          setTest(null)
          console.log(error)
        }
        if(data){
          setTest(data)
          setFetchError(null)
          if(data[0].user_rol==='admin'){
            setRol(true)
          }
        }

    }

    fetchTest()
  },[user_id])

  return (
    <div className="page registro">
      <div className="header">
        <nav>
          <h1>Registo de Médicos</h1>
          <Link to={{pathname:'/home',search: createSearchParams({id: user_id}).toString()}}>Home</Link>
          <Link to="/">Logout</Link>
          {test&&rol&&(
            <>
              <Link to={{pathname:'/registro',search: createSearchParams({id: user_id}).toString()}}>Registro</Link>
              <Link to="/">Reportes</Link>
            </>
          )}
        </nav>
      </div>
      <div className="body">
        <form className="form-registro">
          <h2 className='login_title'>Registro</h2>
          <label></label>
        </form>
      </div>
    </div>
  )
}

export default Registro