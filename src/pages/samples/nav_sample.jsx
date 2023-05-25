import supabase from "../config/supabaseClient"
import { useEffect,useState } from "react"
import { useSearchParams, createSearchParams } from "react-router-dom"
import { Link } from "react-router-dom"

const Registro = () => {
  const[fetchError, setFetchError]=useState(null)
  const[fecthData, setFetchData]=useState(null)
  const[rol, setRol]=useState(null)

  const [searchparams] = useSearchParams();
  const [user_id] = useState(searchparams.get('id'));

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
  },[user_id])

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleMobileNavClick = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };


  return (
    <div className="page">
      <div className="header">
      <h1></h1>
          {fecthData&&(<h6>Bienvenido {fecthData[0].nombre}</h6>)}
      <nav>
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
          <button className={`hamburger ${isMobileNavOpen ? "active" : ""}`} onClick={handleMobileNavClick}>
          <span />
          <span />
          <span />
        </button>
      </nav>
      <nav className="navbar-right">
        <ul>
          <li>
            <a href="index.html">Shop</a>
          </li>
        </ul>
        <div className={`shadow ${isMobileNavOpen ? "active" : ""}`} />
        <button className={`hamburger ${isMobileNavOpen ? "active" : ""}`} onClick={handleMobileNavClick}>
          <span />
          <span />
          <span />
        </button>
      </nav>
      <nav className={`mobile-nav ${isMobileNavOpen ? "active" : ""}`} style={{ right: isMobileNavOpen ? "0" : "-280px" }}>
        <a href="index.html">Mission</a>
        <a href="index.html">Launches</a>
        <a href="index.html">Careers</a>
        <a href="index.html">Updates</a>
        <a href="index.html">Shop</a>
      </nav>
      </div>
      <div className="body">

      </div>
    </div>
  )
}

export default Registro