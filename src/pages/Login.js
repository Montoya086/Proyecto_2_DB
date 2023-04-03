import { useState} from 'react';
import { createSearchParams, useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Login = () => {
    const [mail, setMail] = useState('');
    const [password, setPasword] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const {data,error}=await supabase
        .rpc('users',{mail:mail})
        if(error){
            console.log(error)
        }
        if(data){
            if(data[0]){
                if(data[0].password===password){
                    navigate({
                        pathname: '/home',
                        search: createSearchParams({
                            id: data[0].id
                        }).toString()
                    });
                }else{
                    alert('Credenciales incorrectas')
                }
            }else{
                alert('Credenciales incorrectas')
            }
        }

    };

    return (
        <div className="container">
            <div className="login_area">
                <form className="form-signin" onSubmit={handleSubmit}>
                    <h2 className='login_title'>Login</h2>
                    <label>
                        <input className='form-control' placeholder='user@example.com' type="mail" value={mail} onChange={(e) => setMail(e.target.value)}/>
                    </label>
                    <label>
                        <input className='form-control' placeholder='password' type="password" value={password} onChange={(e) => setPasword(e.target.value)}/>
                    </label>
                    <br/>
                    <button className='btn btn-lg btn-primary btn-block' type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
  }
  
  export default Login