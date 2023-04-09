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
  const[dataMedico, setDataMedico]=useState([])
  const[estabList, setEstabList]=useState('')
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
  const[newEstablecimientoMedico, setNewEstablecimientoMedico]=useState('')
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

  //fetch establecimientos
  useEffect(()=>{
    const fetchTest= async ()=>{
      const {data,error}=await supabase
      .rpc('get_establecimientos')

      if(error){
        setEstabList(null)
        console.log(error)
      }
      if(data){
        setEstabList(data)
      }
    }
    fetchTest()
  },[])

  const handleRadio1 =(e)=>{
    setIsPaciente(true)
    setIsMedico(false)
  }
  const handleRadio2 =(e)=>{
    setIsPaciente(false)
    setIsMedico(true)
  }

  const handleSubmitPaciente= async(e)=>{
    e.preventDefault()
    const {data,error}=await supabase
    .rpc('set_act_paciente',{
      dni_paciente:dniPaciente,
      nombre_paciente:nombrePaciente,
      ind_masa_paciente:indMasaPaciente,
      altura_paciente:alturaPaciente,
      peso_paciente:pesoPaciente,
      adicciones_paciente:adiccionesPaciente,
      sexo_paciente:sexoPaciente,
      telefono_paciente:telefonoPaciente,
      direccion_paciente:direccionPaciente,
      nacimiento_paciente:nacimientoPaciente,
      log_mail: sesion,
      log_info: "Se actualizaron los datos del paciente con DNI: "+dniPaciente
    })
    if(error){
      console.log(error)
    }else{
      setDataPaciente([])
      setDniPaciente('')
      alert('Guardado correctamente.')
    }
    if(data){}
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

  //Medico
  const handleSubmitMedico=async(e)=>{
    e.preventDefault()
    if(newEstablecimientoMedico===establecimientoMedico){
      const {data,error}=await supabase
      .rpc('set_act_medico',{
        dni_medico:dniMedico,
        nombre_medico:nombreMedico,
        telefono_medico:telefonoMedico,
        direccion_medico:direccionMedico,
        num_colegiado_medico:numColegiadoMedico,
        especialidad_medico:especialidadMedico,
        establecimiento_medico:newEstablecimientoMedico,
        old_estab_medico: establecimientoMedico,
        rol_medico:rolMedico,
        est_change: false,
        log_mail: sesion,
        log_info: "Se actualizaron los datos del médico con DNI: "+dniMedico
      })
      if(error){
        console.log(error)
      }else{
        setDataMedico([])
        setDniMedico('')
        alert('Guardado correctamente.')
      }
      if(data){}
    }
    else{
      const {data,error}=await supabase
      .rpc('set_act_medico',{
        dni_medico:dniMedico,
        nombre_medico:nombreMedico,
        telefono_medico:telefonoMedico,
        direccion_medico:direccionMedico,
        num_colegiado_medico:numColegiadoMedico,
        especialidad_medico:especialidadMedico,
        establecimiento_medico:newEstablecimientoMedico,
        old_estab_medico: establecimientoMedico,
        rol_medico:rolMedico,
        est_change: true,
        log_mail: sesion,
        log_info: "Se actualizaron los datos del médico con DNI: "+dniMedico
      })
      if(error){
        console.log(error)
      }else{
        setDataMedico([])
        setDniMedico('')
        alert('Guardado correctamente.')
      }
      if(data){}
    }
  }
  const handleBusquedaMedico=async(e)=>{
    e.preventDefault()
    const {data,error}=await supabase
    .rpc('get_medico_using_dni',{dni_medico:dniMedico})
    if(error){
      setDataMedico(null)
      console.log(error)
    }
    if(data){
      setDataMedico(data)
    }
  }
  useEffect(()=>{
    if(dataMedico[0]){
      setNombreMedico(dataMedico[0].nombre_medico)
      setTelefonoMedico(dataMedico[0].telefono_medico)
      setDireccionMedico(dataMedico[0].direccion_medico)
      setNumColegiadoMedico(dataMedico[0].num_colegiado_medico)
      setEspecialidadMedico(dataMedico[0].especialidad_medico)
      setEstablecimientoMedico(dataMedico[0].establecimiento_medico)
      setNewEstablecimientoMedico(dataMedico[0].establecimiento_medico)
      setRolMedico(dataMedico[0].rol_medico)
    }
  },[dataMedico])

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
          {dataMedico[0]&&(
            <form className="form-registro form-ingreso-paciente" onSubmit={handleSubmitMedico}>
              <h2 className='login_title'>Registro de médicos</h2>
              <div className="text-box">
                <input type="text" required value={nombreMedico} onChange={(e) => setNombreMedico(e.target.value)} />
                <label>Nombre Completo</label>
              </div>
              <div className="text-box">
                <input type="text" required value={telefonoMedico} onChange={(e) => setTelefonoMedico(e.target.value)} />
                <label>Número Telefónico</label>
              </div>
              <div className="text-box">
                <input type="text" required value={direccionMedico} onChange={(e) => setDireccionMedico(e.target.value)} />
                <label>Dirección</label>
              </div>
              <div className="text-box">
                <input type="text" required value={numColegiadoMedico} onChange={(e) => setNumColegiadoMedico(e.target.value)} />
                <label>No. Colegiado</label>
              </div>
              <div className="text-box">
                <input type="text" required value={especialidadMedico} onChange={(e) => setEspecialidadMedico(e.target.value)} />
                <label>Especialidad</label>
              </div>
              <div className="select-box">
                <select name="Establecimientos" required value={newEstablecimientoMedico} onChange={(e) => setNewEstablecimientoMedico(e.target.value)}>
                  {estabList&&(
                    <>
                      <option value="">Seleccione un Establecimiento</option>
                      {estabList.map(e=>(
                        <>
                          <option value={e.id}>{e.estab+", "+e.direccion+", "+e.departamento+", "+e.municipio}</option>
                        </>
                      ))}
                    </>
                  )}
                </select>
              </div>
              <div className="select-box">
                <select name="Roles" required value={rolMedico} onChange={(e) => setRolMedico(e.target.value)}>
                  <option value="">Seleccione un rol</option>
                  <option value="admin">Administrador</option>
                  <option value="usuario">Usuario</option>
                </select>
              </div>
              <div className="submit-button">
                <button className='btn' type='submit'>Registrar</button>
              </div>
            </form>
          )}
        </>
      )}
      </div>
    </div>
  )
}

export default ActualizacionDatos