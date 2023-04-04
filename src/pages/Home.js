import supabase from "../config/supabaseClient"
import { useEffect,useState } from "react"
import { useSearchParams, createSearchParams } from "react-router-dom"
import { BrowserRouter, Link } from "react-router-dom"

const Home = () => {
  const[fetchError, setFetchError]=useState(null)
  const[test, setTest]=useState(null)
  const[rol, setRol]=useState(null)

  const [searchparams] = useSearchParams();
  const [user_id] = useState(searchparams.get('id'));
  const [dni, setDni] = useState('');
  const [patient, setPatient] = useState('');

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

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const {data,error}=await supabase
    .rpc('get_info_from_paciente_with_dni',{p_dni:dni})
    if(error){
      console.log(error)
    }
    if(data){
      console.log(data)
    }
  }

  return (
    <div className="page home">
      <div className="header">
        <nav>
          <h1>Pagina inicial</h1>
          {test&&(<h6>Bienvenido {test[0].nombre}</h6>)}
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
        <div className="search">
          <form onSubmit={handleSubmit}>
            <h2>Buscar paciente</h2>
            <input className='search-input' placeholder='DNI' type="text" value={dni} onChange={(e) => setDni(e.target.value)}/>
            <button className='search-button' type='submit'>Buscar</button>
          </form>
        </div>
        <div id='result'>
          {patient&&(
            <p></p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home