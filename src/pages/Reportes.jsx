import supabase from "../config/supabaseClient"
import { useEffect,useState } from "react"
import { useSearchParams } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"

const Reportes = () => {
  const [searchparams] = useSearchParams();
  const [user_id] = useState(searchparams.get('id'));

  //variables
  const[fetchError, setFetchError]=useState(null)
  const[fecthData, setFetchData]=useState(null)
  const[rol, setRol]=useState(null)
  const[estabList, setEstabList]=useState(null)
  const[estabSelected, setEstabSelected]=useState('')
  const[limitInv, setLimitInv]=useState(15)
  const[is1, setIs1]=useState(true)
  const[is2, setIs2]=useState(false)
  const[is3, setIs3]=useState(false)
  const[is4, setIs4]=useState(false)
  const[is5, setIs5]=useState(false)
  const[r1Data, setR1Data]=useState(null)
  const[r2Data, setR2Data]=useState(null)
  const[r3Data, setR3Data]=useState(null)
  const[r4Data, setR4Data]=useState(null)
  const[r5Data, setR5Data]=useState(null)

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
        console.log(error)
      }
      if(data){
        setEstabList(data)
      }
    }
    fetchTest()
  },[])

  //fetch reporte 1
  useEffect(()=>{
    const fetchTest= async ()=>{
      const {data,error}=await supabase
        .rpc('get_reporte1')
        if(error){
          console.log(error)
        }
        if(data){
          setR1Data(data)
        }
    }
    fetchTest()
  },[])

  //fetch reporte 2
  useEffect(()=>{
    const fetchTest= async ()=>{
      const {data,error}=await supabase
        .rpc('get_reporte2')
        if(error){
          console.log(error)
        }
        if(data){
          setR2Data(data)
        }
    }
    fetchTest()
  },[])

  //fetch reporte 3
  useEffect(()=>{
    const fetchTest= async ()=>{
      const {data,error}=await supabase
        .rpc('get_reporte3')
        if(error){
          console.log(error)
        }
        if(data){
          setR3Data(data)
        }
    }
    fetchTest()
  },[])

  //fetch reporte 4
  const handleInt=(n)=>{
    if(n===''){
      return 0
    }else{
      return n
    }
  }
  useEffect(()=>{
    const fetchTest= async ()=>{
      const {data,error}=await supabase
        .rpc('get_reporte4',{
          limit_inv:limitInv,
          id_establecimiento:handleInt(estabSelected)
        })
        if(error){
          console.log(error)
        }
        if(data){
          setR4Data(data)
        }
    }
    fetchTest()
  },[limitInv, estabSelected])

  //fetch reporte 5
  useEffect(()=>{
    const fetchTest= async ()=>{
      const {data,error}=await supabase
        .rpc('get_reporte5')
        if(error){
          console.log(error)
        }
        if(data){
          setR5Data(data)
        }
    }
    fetchTest()
  },[])

  //radio handle
  const handleRadio1=()=>{
    setIs1(true)
    setIs2(false)
    setIs3(false)
    setIs4(false)
    setIs5(false)
  }
  const handleRadio2=()=>{
    setIs1(false)
    setIs2(true)
    setIs3(false)
    setIs4(false)
    setIs5(false)
  }
  const handleRadio3=()=>{
    setIs1(false)
    setIs2(false)
    setIs3(true)
    setIs4(false)
    setIs5(false)
  }
  const handleRadio4=()=>{
    setIs1(false)
    setIs2(false)
    setIs3(false)
    setIs4(true)
    setIs5(false)
  }
  const handleRadio5=()=>{
    setIs1(false)
    setIs2(false)
    setIs3(false)
    setIs4(false)
    setIs5(true)
  }

  return (
    <div className="page">
      <Header user_id={user_id} test={fecthData} rol={rol} />
      <div className="body">
        <form className="radio-selection">
          <div className="radio-button">
            <input type="radio" onChange={handleRadio1} id="radio1" checked={is1===true}/>
            <label htmlFor="radio1">Reporte 1</label>
          </div>
          <div className="radio-button">
            <input type="radio" onChange={handleRadio2} id="radio2" checked={is2===true}/>
            <label htmlFor="radio2">Reporte 2</label>
          </div>
          <div className="radio-button">
            <input type="radio" onChange={handleRadio3} id="radio3" checked={is3===true}/>
            <label htmlFor="radio3">Reporte 3</label>
          </div>
          <div className="radio-button">
            <input type="radio" onChange={handleRadio4} id="radio4" checked={is4===true}/>
            <label htmlFor="radio4">Reporte 4</label>
          </div>
          <div className="radio-button">
            <input type="radio" onChange={handleRadio5} id="radio5" checked={is5===true}/>
            <label htmlFor="radio5">Reporte 5</label>
          </div>
        </form>
        {/*Reporte 1 */}
        {is1&&(
          <>
          {r1Data&&(
            <>
              <div className="table-area">
                <table className="rwd-table">
                  <tbody>
                    <tr>
                        <th>Enfermedad</th>
                        <th>Número de muertes</th>
                    </tr>
                    {r1Data.map(e=>(
                        <>
                            <tr>
                                <td>{e.nombre_enfermedad}</td>
                                <td>{e.muertes}</td>
                            </tr>
                        </>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          </>
        )}

        {/*Reporte 2 */}
        {is2&&(
          <>
          {r2Data&&(
            <>
              <div className="table-area">
                <table className="rwd-table">
                  <tbody>
                    <tr>
                        <th>Médico</th>
                        <th>Pacientes atendidos</th>
                    </tr>
                    {r2Data.map(e=>(
                        <>
                            <tr>
                                <td>{e.nombre_medico}</td>
                                <td>{e.pacientes}</td>
                            </tr>
                        </>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          </>
        )}

        {/*Reporte 3 */}
        {is3&&(
          <>
          {r3Data&&(
            <>
              <div className="table-area">
                <table className="rwd-table">
                  <tbody>
                    <tr>
                        <th>Nombre</th>
                        <th>Indice de masa</th>
                        <th>Altura(m)</th>
                        <th>Peso(Lb)</th>
                        <th>Adicciones</th>
                        <th>Sexo</th>
                        <th>Número de intervenciones</th>
                    </tr>
                    {r3Data.map(e=>(
                        <>
                          <tr>
                            <td>{e.nombre_paciente}</td>
                            <td>{e.ind_masa_paciente}</td>
                            <td>{e.altura_paciente}</td>
                            <td>{e.peso_paciente}</td>
                            <td>{e.adicciones_paciente}</td>
                            <td>{e.sexo_paciente}</td>
                            <td>{e.intervenciones}</td>
                          </tr>
                        </>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          </>
        )}

        {/*Reporte 4 */}
        {is4&&(
          <>
          <form className="estab-selection" onSubmit={(e)=>e.preventDefault()}>
            <select name="Establecimientos" required value={estabSelected} onChange={(e) => setEstabSelected(e.target.value)}>
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
            <label htmlFor="limite" className="limit-inv">Limite: </label>
            <input type="number" value={limitInv} onChange={(e) => setLimitInv(e.target.value)} id="limite" min="0" className="limit-inv-input"/>
          </form>
          {r4Data&&(
            <>
              <div className="table-area">
                <table className="rwd-table">
                  <tbody>
                    <tr>
                        <th>Nombre</th>
                        <th>Cantidad en existencia</th>
                    </tr>
                    {r4Data.map(e=>(
                        <>
                          <tr>
                            <td>{e.nombre_insumo}</td>
                            <td>{e.cantidad}</td>
                          </tr>
                        </>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          </>
        )}

        {/*Reporte 5 */}
        {is5&&(
          <>
          {r5Data&&(
            <div className="table-area">
              <table className="rwd-table">
                <tbody>
                  <tr>
                    <th>Establecimiento</th>
                    <th>Pacientes atendidos</th>
                  </tr>
                  {r5Data.map(e=>(
                    <>
                      <tr>
                        <td>{e.nombre_estab+", "+e.direccion+", "+e.departamento+", "+e.municipio}</td>
                        <td>{e.cantidad}</td>
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
      <Footer/>
    </div>
  )
}

export default Reportes