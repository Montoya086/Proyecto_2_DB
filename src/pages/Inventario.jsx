import supabase from "../config/supabaseClient"
import { useEffect,useState } from "react"
import { useSearchParams, createSearchParams } from "react-router-dom"
import { Link } from "react-router-dom"

const Inventario = () => {
  const[searchparams] = useSearchParams();
  const[user_id] = useState(searchparams.get('id'));
  
  const[fetchError, setFetchError]=useState(null)
  const[rol, setRol]=useState(null)
  const[estab, setEstab]=useState(null)
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

  //fetch establecimientos
  useEffect(()=>{
    const fetchTest= async ()=>{
      const {data,error}=await supabase
      .rpc('get_establecimientos')

      if(error){
        setFetchError('Could not fetch')
        setEstab(null)
        console.log(error)
      }
      if(data){
        setEstab(data)
        setFetchError(null)
      }

    }
    fetchTest()
  },[])

  

  const[nombre, setNombre]=useState('')
  const[estab_ins, setEstab_ins]=useState('')
  const[cant_ins, setCant_ins]=useState('')
  //registro de insumo
  const handleSubmit = async (e) =>{
    e.preventDefault();

    const {data,error}=await supabase
    .rpc('set_insumo',{
      nombre:nombre,
      log_mail:sesion,
      log_info:"Se registró el insumo "+nombre
    })

    if(error){
      console.log(error)
    }else{
      setNombre('')
      alert("Ingresado correctamente")
    }
    if(data){
      //alert("Ingresado correctamente")
    }
  
  }
  //ingreso de insumo
  const handleSubmit2 = async (e) =>{
    e.preventDefault();

    /*const {data,error}=await supabase
    .rpc('set_insumo',{
      id_ins:id_ins,
      estab_ins:estab_ins,
      cant_ins:cant_ins,
      log_mail:sesion,
      log_info:"Se ingresó el insumo "+id_ins+" al establecimiento "+estab_ins+" con la cantidad "+cant_ins
    })

    if(error){
      console.log(error)
    }else{
      setId_ins('')
      setNombre('')
    }
    if(data){
      //alert("Ingresado correctamente")
    }*/
  
  }

  const [isRegistro, setIsRegistro]=useState(false)
  const [isIngreso, setIsIngreso]=useState(false)
  const [isLista, setIsLista]=useState(true)
  const handleRadio1 =(e)=>{
    setIsRegistro(true)
    setIsIngreso(false)
    setIsLista(false)
  }
  const handleRadio2 =(e)=>{
    setIsRegistro(false)
    setIsIngreso(true)
    setIsLista(false)
  }
  const handleRadio3 =(e)=>{
    setIsRegistro(false)
    setIsIngreso(false)
    setIsLista(true)
  }

  const [estabSelected, setEstabSelected]=useState('')
  const [dataInsumos, setDataInsumos] = useState(null)

  const handleEstabSelection = async (e)=>{
    e.preventDefault();
    const {data,error}=await supabase
    .rpc('get_inventario',{
      id_estab:estabSelected
    })
    if(error){
      console.log(error)
    }
    if(data){
      setDataInsumos(data)
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
        <form className="radio-selection">
          {rol&&(
            <>
            <div className="radio-button">
            <input type="radio" onChange={handleRadio3} id="listaInsumo" checked={isLista===true}/>
            <label for="listaInsumo">Inventario</label>
            </div>
            <div className="radio-button">
            <input type="radio" onChange={handleRadio1} id="registroInsumo" checked={isRegistro===true}/>
            <label for="registroInsumo">Registrar insumo</label>
            </div>
            <div className="radio-button">
            <input type="radio" onChange={handleRadio2} id="ingresoInsumo" checked={isIngreso===true}/>
            <label for="ingresoInsumo">Ingresar insumo</label>
            </div>
            </>
          )}
          
        </form>
        {/*Registro de insumo */}
        {isRegistro&&(
          <form className="form-registro" onSubmit={handleSubmit}>
          <h2 className='login_title'>Registro de insumo</h2>
            <div className="text-box">
              <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
              <label>Nombre</label>
            </div>
            <div className="submit-button">
              <button className='btn' type='submit'>Registrar</button>
            </div>
          </form>
        )}

        {isIngreso&&(
          <form className="form-registro" onSubmit={handleSubmit2}>
          <h2 className='login_title'>Establecimiento</h2>
            <div className="select-box">
              <select name="Establecimientos" required value={estab_ins} onChange={(e) => setEstab_ins(e.target.value)}>
                {estab&&(
                  <>
                    <option value="">Seleccione un Establecimiento</option>
                    {estab.map(e=>(
                      <>
                        <option value={e.id}>{e.estab+", "+e.direccion+", "+e.departamento+", "+e.municipio}</option>
                      </>
                    ))}
                  </>
                )}
              </select>
            </div>
            <br></br>
            <h2 className='login_title'>Ingreso de insumo</h2>
            <div className="text-box">
              <input type="text" required value={cant_ins} onChange={(e) => setCant_ins(e.target.value)} />
              <label>Cantidad</label>
            </div>
            <div className="submit-button">
              <button className='btn' type='submit'>Registrar</button>
            </div>
          </form>
        )}
        {/*Despliega la lista de insumos */}
        {isLista&&(
          <>
          <form className="estab-selection" onSubmit={handleEstabSelection}>
            <select name="Establecimientos" required value={estabSelected} onChange={(e) => setEstabSelected(e.target.value)}>
              {estab&&(
                <>
                  <option value="">Seleccione un Establecimiento</option>
                  {estab.map(e=>(
                    <>
                      <option value={e.id}>{e.estab+", "+e.direccion+", "+e.departamento+", "+e.municipio}</option>
                    </>
                  ))}
                </>
              )}
            </select>
            <button type="submit">Mostrar</button>
          </form>
          {dataInsumos&&(
              <div className="table-area">
                <table className="rwd-table">
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Establecimiento</th>
                        <th>Cantidad</th>
                    </tr>
                    {dataInsumos.map(dins=>(
                        <>
                        <tr>
                            <td>{dins.id_insumo}</td>
                            <td>{dins.nombre_insumo}</td>
                            <td>{dins.estab_insumo}</td>
                            <td>{dins.cant_insumo}</td>
                        </tr>
                        </>
                    ))}
                    </tbody>
                </table>
              </div>
          )}
            </>
        )}
      </div>
    </div>
  )
}

export default Inventario