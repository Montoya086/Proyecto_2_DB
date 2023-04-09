import supabase from "../config/supabaseClient"
import { useEffect,useState } from "react"
import { useSearchParams, createSearchParams } from "react-router-dom"
import { Link } from "react-router-dom"

const Logs = () => {
  const[fetchError, setFetchError]=useState(null)
  const[fecthData, setFetchData]=useState(null)
  const[rol, setRol]=useState(null)
  const[logdata, setLogdata]=useState(null)
  const[count, setCount]=useState(10)

  const [searchparams] = useSearchParams();
  const [user_id] = useState(searchparams.get('id'));

  //user data
  useEffect(()=>{
    const fetchTest= async ()=>{
      const {data,error}=await supabase
        .rpc('get_medico_using_user_id',{user_id:user_id})

        if(error){
          setFetchError('Could not fetch')
          setFetchData(null)
          console.log(fetchError)
        }
        if(data){
          setFetchData(data)
          setFetchError(null)
          if(data[0].user_rol==='admin'){
            setRol(true)
          }
        }

    }

    fetchTest()
  },[user_id,fetchError])

  //logs
  useEffect(()=>{
    const fetchTest= async ()=>{
        const {data,error}=await supabase
          .rpc('get_logs',{num:count})
  
          if(error){
            setLogdata(null)
            console.log(error)
          }
          if(data){
            setLogdata(data)
          }
      }
      fetchTest()
  },[count])

  const handleSubmitMore = (e) =>{
    e.preventDefault();

    setCount(count+10)
  }
  const handleSubmitLess = (e) =>{
    e.preventDefault();
    if(count>10){
        setCount(count-10)
    }
  }

  return (
    <div className="page">
      <div className="header">
      <nav>
          <h1>Registro de cambios</h1>
          {/*Public paths*/}
          <Link to={{pathname:'/home',search: createSearchParams({id: user_id}).toString()}}>Home</Link>
          <Link to={{pathname:'/registro_paciente',search: createSearchParams({id: user_id}).toString()}}>Registro de paciente</Link>
          <Link to={{pathname:'/ingreso_paciente',search: createSearchParams({id: user_id}).toString()}}>Ingreso de paciente</Link>
          <Link to={{pathname:'/inventario',search: createSearchParams({id: user_id}).toString()}}>Inventario</Link>
          <Link to={{pathname:'/act_datos',search: createSearchParams({id: user_id}).toString()}}>Act. de datos</Link>
          {/*Private paths*/}
          {fecthData&&rol&&(
            <>
              <Link to={{pathname:'/registro',search: createSearchParams({id: user_id}).toString()}}>Registro de médicos</Link>
              <Link to={{pathname:'/reportes',search: createSearchParams({id: user_id}).toString()}}>Reportes</Link>
              <Link to={{pathname:'/logs',search: createSearchParams({id: user_id}).toString()}}>Logs</Link>
            </>
          )}
          <Link to="/" className="logout">Logout</Link>
        </nav>
      </div>
      <div className="body">
        {logdata&&(
            <>
            <div className="table-area">
                <table className="rwd-table">
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Usuario</th>
                        <th>Descripción</th>
                    </tr>
                    {logdata.map(log=>(
                        <>
                            <tr>
                                <td>{log.id_log}</td>
                                <td>{log.fecha}</td>
                                <td>{log.correo}</td>
                                <td>{log.descripcion}</td>
                            </tr>
                        </>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="table-area">
                <br/>
                <form onSubmit={handleSubmitMore}>
                    <button type='submit' className="btn">Cargar más</button>
                </form>
                <form onSubmit={handleSubmitLess}>
                    <button type='submit' className="btn">Cargar menos</button>
                </form>
            </div>
            </>
        )}
      </div>
    </div>
  )
}

export default Logs