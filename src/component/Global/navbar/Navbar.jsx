import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaGithub } from 'react-icons/fa';


function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
            <div className="container">
                <Link className="navbar-brand me-2" to="/">
                    MSM
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarButtonsExample"
                    aria-controls="navbarButtonsExample"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <FaBars />
                </button>

                <div className="collapse navbar-collapse" id="navbarButtonsExample">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                    </ul>

                    <div className="d-flex flex-column flex-lg-row align-items-lg-center mb-3">
                        <Link to="/login" className="btn  btn-primary px-3 me-2 mt-3">Login</Link>
                        <Link to="/register" className="btn btn-primary me-3 mt-3">Sign up for free</Link>
                        <a
                            href="https://github.com/Vipul-semwal"
                            className="btn btn-dark px-3 mt-3"
                            role="button"
                        >
                            <FaGithub />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
