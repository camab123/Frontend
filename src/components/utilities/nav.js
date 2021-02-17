import { NavLink } from "react-router-dom";

function NavLinks() {
    const links = [
        {
            name: 'Home',
            path: '/home',
        },
        {
            name: 'Market',
            path: '/market',
        },
    ];

    return (
        <ul className="navbar-nav ml-auto">
            {
                links.map((link) => 
                    <NavLink
                        key={link.name}
                        to={link.path} 
                        activeClassName="active"
                        className="nav-item"
                    >
                        {link.name}
                    </NavLink>
                )
            }
        </ul>
    );
}

function Navbar() {
    return (
        <nav className="navbar navbar-expand navbar-light bg-white">
            <a className="navbar-brand" href="/home">
            </a>
            <NavLinks />
        </nav>
    );
}

export default Navbar;