import { Children, lazy } from "react";
import Loadable from "../component/Global/Loadable";
import { DashboardLayout } from "../layouts/export";

const ItemMaster = Loadable(lazy(() => import('../Pages/Dashboard/ItemMaster/ItemMaster')));
const PartieRegister = Loadable(lazy(() => import('../Pages/Dashboard/PartieRegister/PartieRegister')));
const PurchaseRegister = Loadable(lazy(() => import('../Pages/Dashboard/PurchaseRegister/PurchaseRegister')));
const SalesEntry = Loadable(lazy(() => import('../Pages/Dashboard/SalesEntry/SalesEntry')));
const PartieTable = Loadable(lazy(() => import('../Pages/Dashboard/PartieTable/PartieTable')));
const ItemTable = Loadable(lazy(() => import('../Pages/Dashboard/itemTable/ItemTable')));
const PurchaseTable = Loadable(lazy(() => import('../Pages/Dashboard/PurchaseTable/PurchaseTable')));
const SalesTable = Loadable(lazy(() => import('../Pages/Dashboard/SalesTable/SalesTable')));
const CashBook = Loadable(lazy(() => import('../Pages/Dashboard/CashBook/CashBook')));
const CashBookTable = Loadable(lazy(() => import('../Pages/Dashboard/CashBookTable/CashBookTable')));
const DashBoardHome = Loadable(lazy(() => import('../Pages/Dashboard/Home/DashBoard')));
const OutOfStockTable = Loadable(lazy(() => import('../Pages/Dashboard/OutOfStock/OutOfStock')))
const Category = Loadable(lazy(() => import('../Pages/Dashboard/Category/Category')))
const Unit = Loadable(lazy(() => import('../Pages/Dashboard/Unit/Unit')))
const DebitTable = Loadable(lazy(() => import('../Pages/Dashboard/DebitTable/DebitTable')))

const DasboarRoutes = {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
        {
            path: '/dashboard/item-master',
            element: <ItemMaster />

        },
        {
            path: '/dashboard/home',
            element: <DashBoardHome />
        }
        ,
        {
            path: '/dashboard/add-partie',
            element: <PartieRegister />

        },
        {
            path: '/dashboard/purchase-entry',
            element: <PurchaseRegister />
        },
        {
            path: '/dashboard/sale-entry',
            element: <SalesEntry />
        },
        {
            path: '/dashboard/partie-table',
            element: <PartieTable />
        },
        {
            path: '/dashboard/item-table',
            element: <ItemTable />
        },
        {
            path: '/dashboard/Purchase-table',
            element: <PurchaseTable />
        },
        {
            path: '/dashboard/sales-table',
            element: <SalesTable />
        },
        {
            path: '/dashboard/cash-book',
            element: <CashBook />
        },
        {
            path: '/dashboard/cash-book-table',
            element: <CashBookTable />

        },
        {
            path: '/dashboard/out-of-stock',
            element: <OutOfStockTable />
        },
        {
            path: '/dashboard/create-category',
            element: <Category />
        },
        {
            path: '/dashboard/create-unit',
            element: <Unit />
        },
        {
            path: '/dashboard/debit-register',
            element: <DebitTable />
        }

    ]
}


export default DasboarRoutes