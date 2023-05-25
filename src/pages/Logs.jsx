import supabase from "../config/supabaseClient"
import { useEffect,useState } from "react"
import { useSearchParams } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"

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
      <Header user_id={user_id} test={fecthData} rol={rol} />
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
      <Footer />
    </div>
  )
}

export default Logs