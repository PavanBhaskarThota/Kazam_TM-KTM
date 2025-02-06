import { useState } from "react"

export const Login = () => {
    const [user, setUser] = useState(
        {
            email: '',
            password: ''
        }
    )

    const handleChange = (e: any) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" value={user.email} onChange={handleChange}/>
            <input type="password" name="password"  value={user.password} onChange={handleChange}/>
            <button type="submit">Login</button>
        </form>
    </div>
  )
}
