import supabase from "../config/supabaseClient"
import { useEffect,useState } from "react"
import { useSearchParams, createSearchParams } from "react-router-dom"
import { BrowserRouter, Link } from "react-router-dom"

const Registro = () => {
  const[fetchError, setFetchError]=useState(null)
  const[test, setTest]=useState(null)
  const[estab, setEstab]=useState(null)
  const[rol, setRol]=useState(null)

  const [searchparams] = useSearchParams();
  const [user_id] = useState(searchparams.get('id'));

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
        console.log(data)
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

  const handleSubmit = async (e) =>{
    e.preventDefault();

  }

  return (
    <div className="page registro">
      <div className="header">
        <nav>
          <h1>Registo de Médicos</h1>
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
            <select name="Establecimientos">
              {estab.map(e=>(
                <>
                  <option>{e.estab+", "+e.direccion+", "+e.departamento+", "+e.municipio}</option>
                </>
              ))}
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
        </form>
      </div>
    </div>
  )
}

export default Registro