import './HeaderComponent.css'
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom'
function Header () {
    
    let items = [
        {
            label: 'Logout',
            icon: 'pi pi-fw pi-power-off',
            command: () => handleLogount()
        }
    ];

    items = localStorage.getItem("access_token") !== "" ? items : [];

    let navigate = useNavigate(); 
    function handleLogount(): void {
        localStorage.setItem("access_token", "");
        navigate('/');
    }

    return (
        <div>
            <div className="card">
                <Menubar model={items} />
            </div>
        </div>
    );
}
                 
export default Header;