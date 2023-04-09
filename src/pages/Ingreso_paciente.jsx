import supabase from "../config/supabaseClient"
import { useEffect,useRef,useState } from "react"
import { useSearchParams, createSearchParams } from "react-router-dom"
import { Link } from "react-router-dom"

const IngresoPaciente = () => {
  const [searchparams] = useSearchParams();
  const [user_id] = useState(searchparams.get('id'));

  const[sesion, setSesion]=useState('')
  const[fetchError, setFetchError]=useState(null)
  const[fecthData, setFetchData]=useState(null)
  const[rol, setRol]=useState(null)
  const[estabList, setEstabList]=useState(null)
  const[estabSelected, setEstabSelected]=useState('')
  const[estabInventario, setEstabInventario]=useState(null)
  const[estabMedicos, setEstabMedicos]=useState(null)
  const[listaEnfermedades, setListaEnfermedades]=useState(null)
  const[listaExamenes, setListaExamenes]=useState(null)
  const[listaCirugias, setListaCirugias]=useState(null)
  const[cantInsumo, setCantInsumo]=useState([])
  //variables del form de ingreso
  const[dniPaciente, setDniPaciente]=useState('')
  const[dniMedico, setDniMedico]=useState('')
  const[evolucionPaciente, setEvolucionPaciente]=useState('')
  const[statusPaciente, setStatusPaciente]=useState('')
  const[enfermedadPaciente, setEnfermedadPaciente]=useState('')
  const[precedentesPaciente, setPrecedentesPaciente]=useState('')
  const[descDiagPaciente, setDescDiagPaciente]=useState('')
  const[examenPaciente, setExamenPaciente]=useState('')
  const[descResultPaciente, setDescResultPaciente]=useState('')
  const[cirugiaPaciente, setCirugiaPaciente]=useState('')
  const[descRealizPaciente, setDescRealizPaciente]=useState('')
  const[insumoPaciente, setInsumoPaciente]=useState('')
  const[cantInsumoPaciente, setCantInsumoPaciente]=useState('')
  //references
  const cantInsumoPaciente_ref = useRef(cantInsumoPaciente);
  const cirugiaPaciente_ref = useRef(cirugiaPaciente);
  const descDiagPaciente_ref = useRef(descDiagPaciente);
  const descRealizPaciente_ref = useRef(descRealizPaciente);
  const descResultPaciente_ref = useRef(descResultPaciente);
  const dniMedico_ref = useRef(dniMedico);
  const dniPaciente_ref = useRef(dniPaciente);
  const enfermedadPaciente_ref = useRef(enfermedadPaciente);
  const estabSelected_ref = useRef(estabSelected);
  const evolucionPaciente_ref = useRef(evolucionPaciente);
  const examenPaciente_ref = useRef(examenPaciente);
  const insumoPaciente_ref = useRef(insumoPaciente);
  const precedentesPaciente_ref = useRef(precedentesPaciente);
  const sesion_ref = useRef(sesion);
  const statusPaciente_ref = useRef(statusPaciente);
  //fetch user data
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
  },[user_id, fetchError])

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
  //handle establecimiento selection
  const handleEstabSelection = (e)=>{
    e.preventDefault();
    //fecth inventario
    const fetchInventario=async ()=>{
      const {data,error}=await supabase
      .rpc('get_inventario_from_estab',{
        id_estab: estabSelected
      })

      if(error){
        setEstabInventario(null)
        console.log(error)
      }
      if(data){
        setEstabInventario(data)
      }
    }
    //fetch medicos
    const fetchMedicos=async ()=>{
      const {data,error}=await supabase
      .rpc('get_medicos_from_estab',{
        id_estab: estabSelected
      })

      if(error){
        setEstabMedicos(null)
        console.log(error)
      }
      if(data){
        setEstabMedicos(data)
      }
    }
    //fetch enfermedades
    const fetchEnfermedades=async()=>{
      const {data,error}=await supabase
      .rpc('get_enfermedades')

      if(error){
        setListaEnfermedades(null)
        console.log(error)
      }
      if(data){
        setListaEnfermedades(data)
      }
    }
    //fecth examenes
    const fetchExamenes=async()=>{
      const {data,error}=await supabase
      .rpc('get_examenes')

      if(error){
        setListaExamenes(null)
        console.log(error)
      }
      if(data){
        setListaExamenes(data)
      }
    }
    //fetch cirugias
    const fetchCirugias=async()=>{
      const {data,error}=await supabase
      .rpc('get_cirugias')

      if(error){
        setListaCirugias(null)
        console.log(error)
      }
      if(data){
        setListaCirugias(data)
      }
    }
    fetchCirugias()
    fetchExamenes()
    fetchEnfermedades()
    fetchInventario()
    fetchMedicos()
  }

  const handleInt=(n)=>{
    if(n===''){
      return 0
    }else{
      return n
    }
  }

  const handleSubmit= async(e)=>{
    e.preventDefault()
    //si se seleccionó un insumo
    if(insumoPaciente){
      const {data,error}=await supabase
      .rpc('get_cant_insumo_estab',{
        id_estab:estabSelected,
        id_insumo:insumoPaciente
      })
      if(error){
        setCantInsumo(null)
        console.log(error)
      }
      if(data){
        setCantInsumo(data)
      }
    }else{
      const {data,error}=await supabase
      .rpc('set_ingreso_paciente',{
        dni_pac:dniPaciente,
        dni_med:dniMedico,
        id_establecimiento: estabSelected,
        evolucion_paciente:evolucionPaciente,
        status_paciente:statusPaciente,
        enfermedad_paciente:handleInt(enfermedadPaciente),
        precedentes_paciente:precedentesPaciente,
        desc_diag_paciente:descDiagPaciente,
        examen_paciente:handleInt(examenPaciente),
        desc_result_paciente:descResultPaciente,
        cirugia_paciente:handleInt(cirugiaPaciente),
        desc_realiz_paciente:descRealizPaciente,
        insumo_paciente:handleInt(insumoPaciente),
        cant_insumo_paciente:handleInt(cantInsumoPaciente),
        new_cant_insumo: 0,
        log_mail:sesion,
        log_info: "Se ingresó al paciente con DNI: "+dniPaciente+" con el médio con DNI: "+dniMedico+". Se utilizaron '"+cantInsumoPaciente+"' unidades del insumo con ID: '"+insumoPaciente+"'. Se diagnosticó la enfermedad con ID: '"+enfermedadPaciente+"'. Se realizó el examen con ID: '"+examenPaciente+"'. Se realizó la cirugía con ID: '"+cirugiaPaciente+"'"
      })
      if(error){
        console.log(error)
      }else{
        setDniPaciente('')
        setDniMedico('')
        setEvolucionPaciente('')
        setStatusPaciente('')
        setEnfermedadPaciente('')
        setPrecedentesPaciente('')
        setDescDiagPaciente('')
        setExamenPaciente('')
        setDescResultPaciente('')
        setCirugiaPaciente('')
        setDescRealizPaciente('')
        setInsumoPaciente('')
        setCantInsumoPaciente('')
        alert('Ingresado correctamente.')
      }
      if(data){}
    }
  }

  useEffect(()=>{
    const setIngresoPaciente=async()=>{
      //si existe la cantidad del insumo
      if(parseInt(cantInsumo[0].cantidad_insumo)>=parseInt(cantInsumoPaciente_ref.current)){
        const {data,error}=await supabase
        .rpc('set_ingreso_paciente',{
          dni_pac:dniPaciente_ref.current,
          dni_med:dniMedico_ref.current,
          id_establecimiento: estabSelected_ref.current,
          evolucion_paciente:evolucionPaciente_ref.current,
          status_paciente:statusPaciente_ref.current,
          enfermedad_paciente:handleInt(enfermedadPaciente_ref.current),
          precedentes_paciente:precedentesPaciente_ref.current,
          desc_diag_paciente:descDiagPaciente_ref.current,
          examen_paciente:handleInt(examenPaciente_ref.current),
          desc_result_paciente:descResultPaciente_ref.current,
          cirugia_paciente:handleInt(cirugiaPaciente_ref.current),
          desc_realiz_paciente:descRealizPaciente_ref.current,
          insumo_paciente:handleInt(insumoPaciente_ref.current),
          cant_insumo_paciente:handleInt(cantInsumoPaciente_ref.current),
          new_cant_insumo:parseInt(cantInsumo[0].cantidad_insumo)-parseInt(cantInsumoPaciente_ref.current),
          log_mail:sesion_ref.current,
          log_info: "Se ingresó al paciente con DNI: "+dniPaciente_ref.current+" con el médio con DNI: "+dniMedico_ref.current+". Se utilizaron '"+cantInsumoPaciente_ref.current+"' unidades del insumo con ID: '"+insumoPaciente_ref.current+"'. Se diagnosticó la enfermedad con ID: '"+enfermedadPaciente_ref.current+"'. Se realizó el examen con ID: '"+examenPaciente_ref.current+"'. Se realizó la cirugía con ID: '"+cirugiaPaciente_ref.current+"'"
        })
        if(error){
          console.log(error)
        }else{
          setDniPaciente('')
          setDniMedico('')
          setEvolucionPaciente('')
          setStatusPaciente('')
          setEnfermedadPaciente('')
          setPrecedentesPaciente('')
          setDescDiagPaciente('')
          setExamenPaciente('')
          setDescResultPaciente('')
          setCirugiaPaciente('')
          setDescRealizPaciente('')
          setInsumoPaciente('')
          setCantInsumoPaciente('')
          alert('Ingresado correctamente.')
        }
        if(data){}
      }else{
        alert('No existe tal cantidad de insumo en el inventario, actualmente hay '+cantInsumo[0].cantidad_insumo+' unidades.')
      }
    }
    if(cantInsumo[0]){
      setIngresoPaciente()
    }
  },[cantInsumo])

  useEffect(()=>{
    cantInsumoPaciente_ref.current = cantInsumoPaciente;
    cirugiaPaciente_ref.current = cirugiaPaciente;
    descDiagPaciente_ref.current = descDiagPaciente;
    descRealizPaciente_ref.current = descRealizPaciente;
    descResultPaciente_ref.current = descResultPaciente;
    dniMedico_ref.current = dniMedico;
    dniPaciente_ref.current = dniPaciente;
    enfermedadPaciente_ref.current = enfermedadPaciente;
    estabSelected_ref.current = estabSelected;
    evolucionPaciente_ref.current = evolucionPaciente;
    examenPaciente_ref.current = examenPaciente;
    insumoPaciente_ref.current = insumoPaciente;
    precedentesPaciente_ref.current = precedentesPaciente;
    sesion_ref.current = sesion;
    statusPaciente_ref.current = statusPaciente;
  },[cantInsumoPaciente,cirugiaPaciente,descDiagPaciente,descRealizPaciente,descResultPaciente,dniMedico,dniPaciente,enfermedadPaciente,estabSelected,evolucionPaciente,examenPaciente,insumoPaciente,precedentesPaciente,sesion,statusPaciente])

  return (
    <div className="page">
      <div className="header">
      <nav>
          <h1>Ingreso de paciente</h1>
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
        {estabList&&(
          <form className="estab-selection" onSubmit={handleEstabSelection}> 
            <select name="Establecimientos" required value={estabSelected} onChange={(e) => setEstabSelected(e.target.value)}>
              <option value="">Seleccione un Establecimiento</option>
                    {estabList.map(e=>(
                      <>
                        <option value={e.id}>{e.estab+", "+e.direccion+", "+e.departamento+", "+e.municipio}</option>
                      </>
                    ))}
              </select>
              <button type="submit">Seleccionar</button>
          </form>
        )}
        {estabInventario&&estabMedicos&&(
          <form className="form-registro form-ingreso-paciente" onSubmit={handleSubmit}>
            <h2 className='login_title'>Ingreso de paciente</h2>
            <h6>*Obligatorio</h6>
            <div className="text-box">
              <input type="text" required value={dniPaciente} onChange={(e) => setDniPaciente(e.target.value)}/>
              <label>DNI del paciente*</label>
            </div>
            <div className="select-box">
              <select name="Medicos" required value={dniMedico} onChange={(e) => setDniMedico(e.target.value)}>
                {estabMedicos&&(
                  <>
                    <option value="">Seleccione un médico*</option>
                    {estabMedicos.map(e=>(
                      <>
                        <option value={e.dni_medico}>{e.nombre_medico}</option>
                      </>
                    ))}
                  </>
                )}
              </select>
            </div>
            <div className="text-box">
              <input type="text" required value={evolucionPaciente} onChange={(e) => setEvolucionPaciente(e.target.value)}/>
              <label>Evolución*</label>
            </div>
            <div className="select-box">
              <select name="Status" required value={statusPaciente} onChange={(e) => setStatusPaciente(e.target.value)}>
                <option value="">Seleccione un status*</option>
                <option value="Sano">Sano</option>
                <option value="Enfermo">Enfermo</option>
                <option value="Muerto">Muerto</option>
              </select>
            </div>
            {/*Selección de enfermedad*/}
            <div className="select-box">
              <select name="Enfermedades" value={enfermedadPaciente} onChange={(e) => setEnfermedadPaciente(e.target.value)}>
                {listaEnfermedades&&(
                  <>
                    <option value="">Seleccione una enfermedad</option>
                    {listaEnfermedades.map(e=>(
                      <>
                        <option value={e.id_enfermedad}>{e.nombre_enfermedad}</option>
                      </>
                    ))}
                  </>
                )}
              </select>
            </div>
            {enfermedadPaciente&&(
              <>
              <h4 className="first-child">Datos de diagnóstico</h4>
              <div className="select-box first-child">
                <select name="Examenes" required value={precedentesPaciente} onChange={(e) => setPrecedentesPaciente(e.target.value)}>            
                  <option value="">Seleccione una opción*</option>    
                  <option value="Sin precedentes">Sin precedentes</option> 
                  <option value="Con precedentes">Con precedentes</option> 
                </select>
                <label>Precedentes*</label>
              </div>
              <div className="text-box first-child">
                <input type="text" required value={descDiagPaciente} onChange={(e) => setDescDiagPaciente(e.target.value)}/>
                <label>Desc. de diagnóstico*</label>
              </div>
              </>
            )}
            {/*Selección de examen */}
            <div className="select-box">
              <select name="Examenes" value={examenPaciente} onChange={(e) => setExamenPaciente(e.target.value)}>
                {listaExamenes&&(
                  <>
                    <option value="">Seleccione un examen</option>
                    {listaExamenes.map(e=>(
                      <>
                        <option value={e.id_examen}>{e.nombre_examen}</option>
                      </>
                    ))}
                  </>
                )}
              </select>
            </div>
            {examenPaciente&&(
              <>
              <h4 className="first-child">Datos de resultado</h4>
              <div className="text-box first-child">
                <input type="text" required value={descResultPaciente} onChange={(e) => setDescResultPaciente(e.target.value)}/>
                <label>Desc. de resultado*</label>
              </div>
              </>
            )}
            {/*Selección de cirugia */}
            <div className="select-box">
              <select name="Cirugias" value={cirugiaPaciente} onChange={(e) => setCirugiaPaciente(e.target.value)}>
                {listaCirugias&&(
                  <>
                    <option value="">Seleccione una cirugia</option>
                    {listaCirugias.map(e=>(
                      <>
                        <option value={e.id_cirugia}>{e.nombre_cirugia}</option>
                      </>
                    ))}
                  </>
                )}
              </select>
            </div>
            {cirugiaPaciente&&(
              <>
              <h4 className="first-child">Datos de realización</h4>
              <div className="text-box first-child">
                <input type="text" required value={descRealizPaciente} onChange={(e) => setDescRealizPaciente(e.target.value)}/>
                <label>Desc. de realización*</label>
              </div>
              </>
            )}
            {/*Selección de insumo */}
            <div className="select-box">
              <select name="Insumos" value={insumoPaciente} onChange={(e) => setInsumoPaciente(e.target.value)}>
                {estabInventario&&(
                  <>
                    <option value="">Seleccione un insumo</option>
                    {estabInventario.map(e=>(
                      <>
                        <option value={e.id_insumo}>{e.nombre_insumo}</option>
                      </>
                    ))}
                  </>
                )}
              </select>
            </div>
            {insumoPaciente&&(
              <>
              <h4 className="first-child">Datos de insumo</h4>
              <div className="text-box first-child">
                <input type="text" required value={cantInsumoPaciente} onChange={(e) => setCantInsumoPaciente(e.target.value)}/>
                <label>Cantidad*</label>
              </div>
              </>
            )}
            <div className="submit-button">
              <button className='btn' type='submit'>Registrar</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default IngresoPaciente