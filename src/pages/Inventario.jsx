import supabase from "../config/supabaseClient"
import { useEffect,useState } from "react"
import { useSearchParams, createSearchParams } from "react-router-dom"
import { Link } from "react-router-dom"

const Inventario = () => {
  const[searchparams] = useSearchParams();
  const[user_id] = useState(searchparams.get('id'));
  
  const[fetchError, setFetchError]=useState(null)
  const[rol, setRol]=useState(null)
  
  const[test, setTest]=useState(null)
  const[sesion, setSesion]=useState('')

  useEffect(()=>{
    const fetchTest= async ()=>{
      const {data,error}=await supabase
      .rpc('get_medico_using_user_id',{user_id:user_id})

        if(error){
          setFetchError('Could not fetch')
          setTest(null)
          console.log(fetchError)
        }
        if(data){
          setTest(data)
          setFetchError(null)
          setSesion(data[0].user_mail)
          if(data[0].user_rol==='admin'){
            setRol(true)
          }
        }

    }
    fetchTest()
  },[user_id,fetchError])

  const[id_ins, setId_ins]=useState('')
  const[nombre, setNombre]=useState('')

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const {data,error}=await supabase
    .rpc('set_insumo',{
      id_ins:id_ins,
      nombre:nombre,
      log_mail:sesion,
      log_info:"Se ingresó el insumo "+nombre+" con el ID "+id_ins
    })

    if(error){
      console.log(error)
    }else{
      alert("Ingresado correctamente")
      setId_ins('')
      setNombre('')
    }
    if(data){
      //alert("Ingresado correctamente")
    }
  
  }

  return (
    <div className="page registro insumo">
      <div className="header">
      <nav>
          <h1>Página principal</h1>
          {/*Public paths*/}
          <Link to={{pathname:'/home',search: createSearchParams({id: user_id}).toString()}}>Home</Link>
          <Link to={{pathname:'/reportes',search: createSearchParams({id: user_id}).toString()}}>Reportes</Link>
          <Link to={{pathname:'/registro_paciente',search: createSearchParams({id: user_id}).toString()}}>Registro de paciente</Link>
          <Link to={{pathname:'/ingreso_paciente',search: createSearchParams({id: user_id}).toString()}}>Ingreso de paciente</Link>
          <Link to={{pathname:'/inventario',search: createSearchParams({id: user_id}).toString()}}>Inventario</Link>
          <Link to={{pathname:'/act_datos',search: createSearchParams({id: user_id}).toString()}}>Act. de datos</Link>
          {/*Private paths*/}
          {test&&rol&&(
            <>
              <Link to={{pathname:'/registro',search: createSearchParams({id: user_id}).toString()}}>Registro de médicos</Link>
              <Link to={{pathname:'/logs',search: createSearchParams({id: user_id}).toString()}}>Logs</Link>
            </>
          )}
          <Link to="/" className="logout">Logout</Link>
        </nav>
      </div>
      <div className="body">
        <form className="form-registro" onSubmit={handleSubmit}>
          <h2 className='login_title'>Registro de insumo</h2>
          <div className="text-box">
            <input type="text" required value={id_ins} onChange={(e) => setId_ins(e.target.value)}/>
            <label>Id Insumo</label>
          </div>
          <div className="text-box">
            <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <label>Nombre</label>
          </div>
          <div className="submit-button">
            <button className='btn' type='submit'>Registrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Inventario