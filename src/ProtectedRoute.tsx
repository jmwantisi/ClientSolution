import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {

    let auth = { token: localStorage.getItem('access_token') != "" && localStorage.getItem('access_token') != null ? true  : false }
    console.log("Auth Token", localStorage.getItem('access_token'))

    return (
        auth.token ? <Outlet /> : <Navigate to='/' />
    )
}

export default ProtectedRoute;

