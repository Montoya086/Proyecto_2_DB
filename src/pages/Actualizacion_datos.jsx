import supabase from "../config/supabaseClient"
import { useEffect,useState } from "react"
import { useSearchParams, createSearchParams } from "react-router-dom"
import { Link } from "react-router-dom"

const ActualizacionDatos = () => {
  const [searchparams] = useSearchParams();
  const [user_id] = useState(searchparams.get('id'));

  const[fetchError, setFetchError]=useState(null)
  const[fecthData, setFetchData]=useState(null)
  const[rol, setRol]=useState(null)
  const[sesion, setSesion]=useState('')
  const[isMedico, setIsMedico]=useState(false)
  const[isPaciente, setIsPaciente]=useState(true)
  const[dniPaciente, setDniPaciente]=useState('')
  const[dniMedico, setDniMedico]=useState('')
  const[dataPaciente, setDataPaciente]=useState([])
  //variables con datos del paciente
  const[nombrePaciente, setNombrePaciente]=useState('')
  const[indMasaPaciente, setIndMasaPaciente]=useState('')
  const[alturaPaciente, setAlturaPaciente]=useState('')
  const[pesoPaciente, setPesoPaciente]=useState('')
  const[adiccionesPaciente, setAdiccionesPaciente]=useState('')
  const[sexoPaciente, setSexoPaciente]=useState('')
  const[telefonoPaciente, setTelefonoPaciente]=useState('')
  const[direccionPaciente, setDireccionPaciente]=useState('')
  const[nacimientoPaciente, setNacimientoPaciente]=useState('')
  //variables con datos del medico
  const[nombreMedico, setNombreMedico]=useState('')
  const[telefonoMedico, setTelefonoMedico]=useState('')
  const[direccionMedico, setDireccionMedico]=useState('')
  const[numColegiadoMedico, setNumColegiadoMedico]=useState('')
  const[especialidadMedico, setEspecialidadMedico]=useState('')
  const[establecimientoMedico, setEstablecimientoMedico]=useState('')
  const[rolMedico, setRolMedico]=useState('')

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
          setSesion(data[0].user_mail)
          if(data[0].user_rol==='admin'){
            setRol(true)
          }
        }

    }

    fetchTest()
  },[user_id,fetchError])

  const handleRadio1 =(e)=>{
    setIsPaciente(true)
    setIsMedico(false)
  }
  const handleRadio2 =(e)=>{
    setIsPaciente(false)
    setIsMedico(true)
  }

  const handleSubmitPaciente=(e)=>{
    e.preventDefault()
  }
  const handleSubmitMedico=(e)=>{
    e.preventDefault()
  }
  const handleBusquedaPaciente= async(e)=>{
    e.preventDefault()
    const {data,error}=await supabase
    .rpc('get_paciente_using_dni',{dni_paciente:dniPaciente})
    if(error){
      setDataPaciente(null)
      console.log(error)
    }
    if(data){
      setDataPaciente(data)
    }
  }
  useEffect(()=>{
    if(dataPaciente[0]){
      setNombrePaciente(dataPaciente[0].nombre_paciente)
      setIndMasaPaciente(dataPaciente[0].ind_masa_paciente)
      setAlturaPaciente(dataPaciente[0].altura_paciente)
      setPesoPaciente(dataPaciente[0].peso_paciente)
      setAdiccionesPaciente(dataPaciente[0].adicciones_paciente)
      setTelefonoPaciente(dataPaciente[0].telefono_paciente)
      setDireccionPaciente(dataPaciente[0].direccion_paciente)
      setNacimientoPaciente(dataPaciente[0].nacimiento_paciente)
      setSexoPaciente(dataPaciente[0].sexo_paciente)
    }
  },[dataPaciente])
  const handleBusquedaMedico=(e)=>{
    e.preventDefault()
  }

  return (
    <div className="page">
      <div className="header">
      <nav>
          <h1>Actualización de datos</h1>
          {/*Public paths*/}
          <Link to={{pathname:'/home',search: createSearchParams({id: user_id}).toString()}}>Home</Link>
          <Link to={{pathname:'/reportes',search: createSearchParams({id: user_id}).toString()}}>Reportes</Link>
          <Link to={{pathname:'/registro_paciente',search: createSearchParams({id: user_id}).toString()}}>Registro de paciente</Link>
          <Link to={{pathname:'/ingreso_paciente',search: createSearchParams({id: user_id}).toString()}}>Ingreso de paciente</Link>
          <Link to={{pathname:'/inventario',search: createSearchParams({id: user_id}).toString()}}>Inventario</Link>
          <Link to={{pathname:'/act_datos',search: createSearchParams({id: user_id}).toString()}}>Act. de datos</Link>
          {/*Private paths*/}
          {fecthData&&rol&&(
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
          <input type="radio" onChange={handleRadio1} id="actPaciente" checked={isPaciente===true}/>
          <label htmlFor="actPaciente">Paciente</label>
          </div>
          <div className="radio-button">
          <input type="radio" onChange={handleRadio2} id="actMedico" checked={isMedico===true}/>
          <label htmlFor="actMedico">Médico</label>
          </div>
          </>
        )}
      </form>
      {/*Actualizacion de paciente */}
      {isPaciente&&(
        <>
          <div className="search">
            <form onSubmit={handleBusquedaPaciente}>
              <h2>Buscar paciente</h2>
              <input className='search-input' placeholder='DNI' type="text" value={dniPaciente} onChange={(e) => setDniPaciente(e.target.value)}/>
              <button className='search-button' type='submit'>Buscar</button>
            </form>
          </div>
          {dataPaciente[0]&&(
            <form className="form-registro form-ingreso-paciente" onSubmit={handleSubmitPaciente}>
              <h2 className='login_title'>Datos de paciente</h2>
              <div className="text-box">
                <input type="text" required value={nombrePaciente} onChange={(e) => setNombrePaciente(e.target.value)} />
                <label>Nombre Completo</label>
              </div>
              <div className="text-box">
                <input type="text" required value={indMasaPaciente} onChange={(e) => setIndMasaPaciente(e.target.value)} />
                <label>Índice de masa corporal</label>
              </div>
              <div className="text-box">
                <input type="text" required value={alturaPaciente} onChange={(e) => setAlturaPaciente(e.target.value)} />
                <label>Altura</label>
              </div>
              <div className="text-box">
                <input type="text" required value={pesoPaciente} onChange={(e) => setPesoPaciente(e.target.value)} />
                <label>Peso</label>
              </div>
              <div className="select-box">
                <select value={adiccionesPaciente} required onChange={(e) => setAdiccionesPaciente(e.target.value)}>
                  <option value="">Seleccione una opción</option>
                  <option value="No">No</option>
                  <option value="Si">Si</option>
                </select>
                <label>Adicciones</label>
              </div>
              <div className="text-box">
                <input type="date" required value={nacimientoPaciente} onChange={(e) => setNacimientoPaciente(e.target.value)} />
              </div>
              <div className="select-box">
                <select value={sexoPaciente} required onChange={(e) => setSexoPaciente(e.target.value)}>
                  <option value="">Seleccione una opción</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
                <label>Sexo</label>
              </div>
              <div className="text-box">
                <input type="text" required value={telefonoPaciente} onChange={(e) => setTelefonoPaciente(e.target.value)} />
                <label>Número Telefónico</label>
              </div>
              <div className="text-box">
                <input type="text" required value={direccionPaciente} onChange={(e) => setDireccionPaciente(e.target.value)} />
                <label>Dirección</label>
              </div>
              <div className="submit-button">
                <button className='btn' type='submit'>Guardar</button>
              </div>
            </form>
          )}
        </>
      )}
      {/*Actualizacion de médico */}
      {isMedico&&(
        <>
          <div className="search">
            <form onSubmit={handleBusquedaMedico}>
              <h2>Buscar médico</h2>
              <input className='search-input' placeholder='DNI' type="text" value={dniMedico} onChange={(e) => setDniMedico(e.target.value)}/>
              <button className='search-button' type='submit'>Buscar</button>
            </form>
          </div>
          <form className="form-registro" onSubmit={handleSubmitMedico}>
            
          </form>
        </>
      )}
      </div>
    </div>
  )
}

export default ActualizacionDatos