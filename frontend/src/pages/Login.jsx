import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'

const API_URL = 'http://localhost:3001/api/v1'

const MESSAGES = {
    empty: 'le champ doit être rempli',
    email: 'email invalide',
    password: 'mot de passe invalide',
    server: 'erreur 502 : serveur indisponible',
    serverDisplay: 'la connexion au serveur a échoué',
}

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [errors, setErrors] = useState({ email: '', password: '', server: '' })

    const handleSubmit = async (event) => {
        event.preventDefault()

        // 1. Vérification des champs vides
        const emptyErrors = { email: '', password: '', server: '' }
        if (!email.trim()) emptyErrors.email = MESSAGES.empty
        if (!password) emptyErrors.password = MESSAGES.empty
        if (emptyErrors.email || emptyErrors.password) {
            console.error(MESSAGES.empty)
            setErrors(emptyErrors)
            return
        }

        // 2. Appel à l'API : le serveur vérifie l'utilisateur dans MongoDB et renvoie un JWT
        let response
        let data
        try {
            response = await fetch(`${API_URL}/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), password }),
            })
            data = await response.json()
        } catch {
            // Serveur injoignable (éteint, réseau coupé…) ou réponse illisible
            console.error(MESSAGES.server)
            setErrors({ email: '', password: '', server: MESSAGES.serverDisplay })
            return
        }

        if (response.status >= 500) {
            console.error(MESSAGES.server)
            setErrors({ email: '', password: '', server: MESSAGES.serverDisplay })
            return
        }

        // 3. Erreurs d'identifiants renvoyées par le backend
        if (!response.ok) {
            const message = data?.message ?? ''
            if (message.includes('User not found')) {
                console.error(MESSAGES.email)
                setErrors({ email: MESSAGES.email, password: '', server: '' })
            } else if (message.includes('Password is invalid')) {
                console.error(MESSAGES.password)
                setErrors({ email: '', password: MESSAGES.password, server: '' })
            } else {
                console.error(message)
                setErrors({ email: '', password: '', server: message })
            }
            return
        }

        // 4. Succès : on conserve le JWT pour authentifier les prochaines requêtes
        const token = data.body.token
        const storage = rememberMe ? localStorage : sessionStorage
        storage.setItem('token', token)

        setErrors({ email: '', password: '', server: '' })
        navigate('/dashboard')
    }

    return (
        <div className="login-page">
            <section className="sign-in-content">
                <svg className="sign-in-icon" viewBox="0 0 496 512" aria-hidden="true">
                    <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z" />
                </svg>
                <h1 className="sign-in-title">Sign In</h1>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username </label>
                        <input
                            type="text"
                            id="username"
                            autoComplete="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={errors.email ? 'input-error' : ''}
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={errors.password ? 'input-error' : ''}
                        />
                        {errors.password && <p className="error-message">{errors.password}</p>}
                    </div>
                    <div className="input-remember">
                        <input
                            type="checkbox"
                            id="remember-me"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button type="submit" className="sign-in-button">Sign In</button>
                    {errors.server && <p className="error-message">{errors.server}</p>}
                </form>
            </section>
        </div>
    )
}

export default Login
