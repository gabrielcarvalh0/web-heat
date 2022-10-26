import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../services/api'

// redirecionar pro github pedindo o e-mail e senha
// github vai direcionar ele

type User = {
  id: string
  name: string
  login: string
  avatar_url: string
}

type AuthResponse = {
  token: string
  user: {
    id: string
    avatar_url: string
    name: string
    login: string
  }
}

type AuthContextData = {
  // ou vai ter o user ou ele vai ser null se nao tiver autinticado
  user: User | null
  signInUrl: string;
  signOut: ()=> void;
}

export const AuthContext = createContext({} as AuthContextData)

type AuthProvider = {
  children: ReactNode
}

export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null)
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=1809cc0e9fe1017b2de4`

  async function signIn(githubCode: string) {
    // response me devolve duas respostas.
    // 1 que é os dados do usuario authenticado
    // 2 que é um token JWT que mantem o usuarior authenticado por um tempo, um dia ou dois.
    const response = await api.post<AuthResponse>('authenticate', {
      code: githubCode,
    })
    const { token, user } = response.data

    localStorage.setItem('@dowhile:token', token);

    // enviando o token para usuarios autenticados
    api.defaults.headers.common.authorization = `Bearer ${token}`

    setUser(user)
  }

function signOut() {
    setUser(null);
    localStorage.removeItem('@dowhile:token');
}

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token')
    if (token) {
      // axios permite que eu set para que toda a requisição dessa linha pra baixo vá com o token
      api.defaults.headers.common.authorization = `Bearer ${token}`

      api.get<User>('profile').then((response) => {
        setUser(response.data);
      })
    }
  }, []);

  useEffect(() => {
    const url = window.location.href
    const hasGithubCode = url.includes('?code=')

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=')

      window.history.pushState({}, '', urlWithoutCode)
      signIn(githubCode)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}
