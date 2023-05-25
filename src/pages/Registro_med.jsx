import supabase from "../config/supabaseClient"
import { useEffect,useState } from "react"
import { useSearchParams } from "react-router-dom"
import Header from "./components/Header"

const Registro = () => {
  //get user_id
  const [searchparams] = useSearchParams();
  const [user_id] = useState(searchparams.get('id'));

  const[fetchError, setFetchError]=useState(null)
  const[test, setTest]=useState(null)
  const[estab, setEstab]=useState(null)
  const[rol, setRol]=useState(null)
  const[sesion, setSesion]=useState('')

  //fetch user data
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

  const[name_r, setName_r]=useState('')
  const[dni_r, setDni_r]=useState('')
  const[telefono_r, setTelefono_r]=useState('')
  const[direccion_r, setDireccion_r]=useState('')
  const[ncolegiado_r, setNcolegiado_r]=useState('')
  const[especialidad_r, setEspecialidad_r]=useState('')
  const[mail_r, setMail_r]=useState('')
  const[password_r, setPassword_r]=useState('')
  const[estab_r, setEstab_r]=useState('')

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const {data,error}=await supabase
    .rpc('set_medico',{
      name_r:name_r,
      dni_r:dni_r,
      telefono_r:telefono_r,
      direccion_r:direccion_r,
      ncolegiado_r:ncolegiado_r,
      especialidad_r:especialidad_r,
      mail_r:mail_r,
      password_r:password_r,
      estab_r:estab_r,
      log_mail:sesion,
      log_info:"Se ingresó el médico "+name_r
    })
    if(error){
      console.log(error)
    }else{
      alert("Ingresado correctamente")
      setName_r('')
      setDni_r('')
      setTelefono_r('')
      setDireccion_r('')
      setNcolegiado_r('')
      setEspecialidad_r('')
      setMail_r('')
      setPassword_r('')
      setEstab_r('')
    }
    if(data){
      //alert("Ingresado correctamente")
    }

  }
  return (
    <div className="page registro">
      <Header user_id={user_id} test={test} rol={rol} pageTitle={"Registro de Medico"}/>
      <div className="body">
        <form className="form-registro" onSubmit={handleSubmit}>
          <h2 className='login_title'>Registro de médicos</h2>
          <div className="text-box">
            <input type="text" required value={name_r} onChange={(e) => setName_r(e.target.value)} />
            <label>Nombre Completo</label>
          </div>
          <div className="text-box">
            <input type="text" required value={dni_r} onChange={(e) => setDni_r(e.target.value)} />
            <label>DNI</label>
          </div>
          <div className="text-box">
            <input type="text" required value={telefono_r} onChange={(e) => setTelefono_r(e.target.value)} />
            <label>Número Telefónico</label>
          </div>
          <div className="text-box">
            <input type="text" required value={direccion_r} onChange={(e) => setDireccion_r(e.target.value)} />
            <label>Dirección</label>
          </div>
          <div className="text-box">
            <input type="text" required value={ncolegiado_r} onChange={(e) => setNcolegiado_r(e.target.value)} />
            <label>No. Colegiado</label>
          </div>
          <div className="text-box">
            <input type="text" required value={especialidad_r} onChange={(e) => setEspecialidad_r(e.target.value)} />
            <label>Especialidad</label>
          </div>
          <div className="select-box">
            <select name="Establecimientos" required value={estab_r} onChange={(e) => setEstab_r(e.target.value)}>
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
          <h3>Datos de usuario</h3>
          <div className="text-box">
            <input type="mail" required value={mail_r} onChange={(e) => setMail_r(e.target.value)} />
            <label>Correo Electrónico</label>
          </div>
          <div className="text-box">
            <input type="password" required value={password_r} onChange={(e) => setPassword_r(e.target.value)} />
            <label>Contraseña</label>
          </div>
          <div className="submit-button">
            <button className='btn' type='submit'>Registrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registro