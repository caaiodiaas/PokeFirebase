import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/images/pokeball.png'

function SignUp() {
  const auth = getAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const equalsPassword =
    password === confirmPassword && password !== '' && confirmPassword !== ''

  const navigate = useNavigate()

  return (
    <div>
      <nav className="navbar">
        <img src={Logo} alt="pokeball" width={50} />
        <h1>PokeFirebase</h1>
      </nav>
      <div className="create">
        <h2>Cadastrar-se</h2>
        <form
          onSubmit={e => {
            e.preventDefault()
            if (equalsPassword)
              createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                  alert('Cadastrado com sucesso!')
                  navigate('/login')
                })
                .catch(error => {
                  alert('Error')
                  console.log(error)
                })
            else alert('As senhas não são iguais')
          }}
        >
          <label>Email:</label>
          <input
            type="text"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label>Senha:</label>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <label>Confirmar Senha:</label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <div className="flex justify-between">
            <button onClick={() => navigate('/login')}>Voltar</button>
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
