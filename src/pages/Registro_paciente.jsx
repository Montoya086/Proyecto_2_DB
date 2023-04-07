import supabase from "../config/supabaseClient"
import { useEffect,useState } from "react"
import { useSearchParams, createSearchParams } from "react-router-dom"
import { Link } from "react-router-dom"

const RegistroPaciente = () => {
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

  const[dni_p, setDni_p]=useState('')
  const[name_p, setName_p]=useState('')
  const[ind_masa_p, setInd_masa_p]=useState('')
  const[altura_p, setAltura_p]=useState('')
  const[peso_p, setPeso_p]=useState('')
  const[addicciones_p, setAddicciones_p]=useState('')
  const[fecha_nac_p, setFecha_nac_p]=useState('')
  const[sexo_p, setSexo_p]=useState('')
  const[telefono_p, setTelefono_p]=useState('')
  const[direccion_p, setDireccion_p]=useState('')

  const handleSubmit = async (e) =>{
    e.preventDefault();

    var fecha_nac_p_date = new Date(fecha_nac_p);
    const {data,error}=await supabase
    .rpc('set_paciente',{
      dni_p:dni_p,
      name_p:name_p,
      ind_masa_p:parseFloat(ind_masa_p),
      altura_p:parseFloat(altura_p),
      peso_p:parseFloat(peso_p),
      addicciones_p:addicciones_p,
      fecha_nac_p:fecha_nac_p_date,
      sexo_p:sexo_p,
      telefono_p:telefono_p,
      direccion_p:direccion_p,
      log_mail:sesion,
      log_info:"Se ingresó el paciente "+name_p+" con el DNI "+dni_p
    })

    if(error){
      console.log(error)
    }else{
      alert("Ingresado correctamente")
      setDni_p('')
      setName_p('')
      setInd_masa_p('')
      setAltura_p('')
      setPeso_p('')
      setAddicciones_p('')
      setFecha_nac_p('')
      setSexo_p('')
      setTelefono_p('')
      setDireccion_p('')
    }
    if(data){
      //alert("Ingresado correctamente")
    }
  
  }

  return (
    <div className="page registro">
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
          <h2 className='login_title'>Registro de paciente</h2>
          <div className="text-box">
            <input type="text" required value={dni_p} onChange={(e) => setDni_p(e.target.value)}/>
            <label>DNI</label>
          </div>
          <div className="text-box">
            <input type="text" required value={name_p} onChange={(e) => setName_p(e.target.value)} />
            <label>Nombre Completo</label>
          </div>
          <div className="text-box">
            <input type="text" required value={ind_masa_p} onChange={(e) => setInd_masa_p(e.target.value)} />
            <label>Índice de masa corporal</label>
          </div>
          <div className="text-box">
            <input type="text" required value={altura_p} onChange={(e) => setAltura_p(e.target.value)} />
            <label>Altura</label>
          </div>
          <div className="text-box">
            <input type="text" required value={peso_p} onChange={(e) => setPeso_p(e.target.value)} />
            <label>Peso</label>
          </div>
          <div className="select-box">
            <select value={addicciones_p} required onChange={(e) => setAddicciones_p(e.target.value)}>
              <option value="">Seleccione una opción</option>
              <option value="No">No</option>
              <option value="Si">Si</option>
            </select>
            <label>Adicciones</label>
          </div>
          <div className="text-box">
            <input type="date" required value={fecha_nac_p} onChange={(e) => setFecha_nac_p(e.target.value)} />
          </div>
          <div className="select-box">
            <select value={sexo_p} required onChange={(e) => setSexo_p(e.target.value)}>
              <option value="">Seleccione una opción</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
            <label>Sexo</label>
          </div>
          <div className="text-box">
            <input type="text" required value={telefono_p} onChange={(e) => setTelefono_p(e.target.value)} />
            <label>Número Telefónico</label>
          </div>
          <div className="text-box">
            <input type="text" required value={direccion_p} onChange={(e) => setDireccion_p(e.target.value)} />
            <label>Dirección</label>
          </div>
          <div className="submit-button">
            <button className='btn' type='submit'>Registrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistroPaciente