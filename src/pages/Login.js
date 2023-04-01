import { useState } from 'react';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [mail, setMail] = useState('');
    const [password, setPasword] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(mail);
        console.log(password);
        navigate('/home');
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