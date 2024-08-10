import React from 'react';
import { Link } from 'react-router-dom';
import { BsHouseDoor, BsSpeedometer2, BsCart3, BsGrid3X3, BsPeople, BsCart4, BsTagFill, BsFillCartCheckFill, BsPersonLinesFill, BsInboxFill, BsJournalCheck, BsKanban, BsReceipt, BsUiChecksGrid, BsFillBarChartFill } from 'react-icons/bs';

const Sidebar = () => {
    const NavItems = [
        {
            path: '/dashboard/home',
            icon: <BsSpeedometer2 className="fs-4" />,
            title: 'Dashboard',
        }
        ,
        {
            path: '/dashboard/cash-book-table',
            icon: <BsReceipt className="fs-4" />,
            title: 'Cash Book',
        }
        ,
        // {
        //     path: '/dashboard/item-master',
        //     icon: <BsInboxFill className="fs-4" />,
        //     title: 'Add item',
        // }
        // ,

        // {
        //     path: '/dashboard/add-partie',
        //     icon: <BsPersonLinesFill className="fs-4" />,
        //     title: 'New Partie',
        // }
        // ,
        // {
        //     path: '/dashboard/purchase-entry',
        //     icon: <BsFillCartCheckFill className="fs-4" />,
        //     title: 'Purchase Entry',
        // }
        // ,
        // {
        //     path: '/dashboard/sale-entry',
        //     icon: <BsTagFill className='fs-4' />,
        //     title: 'Sales Entry',
        // }
        // ,
        // {
        //     path: '/dashboard/cash-book',
        //     icon: <BsKanban className='fs-4' />,
        //     title: 'Cash Book Entry',
        // }
        // ,
        {
            path: '/dashboard/create-category',
            icon: <BsUiChecksGrid className="fs-4" />,
            title: 'Add Category'
        },
        {
            path: '/dashboard/create-unit',
            icon: <BsFillBarChartFill className="fs-4" />,
            title: 'Add Unit'
        },
        {
            path: '/dashboard/item-table',
            icon: <BsGrid3X3 className="fs-4" />,
            title: 'Item Register'
        },
        {
            path: '/dashboard/partie-table',
            icon: <BsJournalCheck className="fs-4" />,
            title: 'Parties Register'
        },
        {
            path: '/dashboard/purchase-table',
            icon: <BsJournalCheck className='fs-4' />,
            title: 'Purchase Register',
        },
        {
            path: '/dashboard/sales-table',
            icon: <BsJournalCheck className='fs-4' />,
            title: 'Sale Register',
        },
        {
            path: '/dashboard/debit-register',
            icon: <BsJournalCheck className='fs-4' />,
            title: 'Debit Register',
        }
    ]
    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <Link to="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline">Menu</span>
                </Link>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    {
                        NavItems.map((i, index) => {
                            return (
                                <li key={index}>
                                    <Link to={i.path} className="nav-link px-0 align-middle">
                                        {i.icon} <span className="ms-1 d-none d-sm-inline">{i.title}</span>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <hr />
                <div className="dropdown pb-4">
                    <Link to="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <BsJournalCheck className='fs-4' />
                        <span className="d-none d-sm-inline mx-1">Account</span>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><Link className="dropdown-item" to="#">New project...</Link></li>
                        <li><Link className="dropdown-item" to="#">Settings</Link></li>
                        <li><Link className="dropdown-item" to="#">Profile</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to="#">Sign out</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
