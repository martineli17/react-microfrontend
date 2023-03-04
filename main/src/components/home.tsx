import { Link, Outlet } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <>
            <div className="App">
                <button>
                    <Link to="/app-01">Aplicação 01</Link>
                </button>
                <button>
                    <Link to="/app-02">Aplicação 02</Link>
                </button>
                <Outlet />
            </div>
        </>
    )
}

export { Home };