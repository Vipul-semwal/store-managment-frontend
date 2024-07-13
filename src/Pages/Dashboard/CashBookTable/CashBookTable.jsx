import { Table } from "../../../component/export";
import dataApi from "../../../Api/DataApi";
import { Filter } from "../../../component/export";
import { useDashContext } from "../../../Hooks/ContextDashboard";
import { useMemo, useEffect, useCallback, useState } from 'react';
import useFetchdata from "../../../Hooks/useFetchData";
import qs from 'qs'
import { DateTime } from 'luxon'

function CashBookTable() {
    const { loading, res, MakeApiReq, Message } = useFetchdata()
    const [ShouldAppend, SetShouldAppend] = useState(false)
    const [RenderCount, SetRenderCount] = useState(0)
    const [Data, SetData] = useState({
        ReceiptType: '',
        // Ammount: '',
        // Discription: '',
        // createdAt: new Date(),
        skip: 0,
        isFilter: "false",
    })

    useEffect(() => {
        SetRenderCount((prev) => {
            // console.log('see', prev)
            return prev + 1
        })
        MakeApiReq(dataApi.GetCashBook.bind(dataApi), qs.stringify(Data), ShouldAppend)
    }, [Data])
    const data = useDashContext()
    const inputs = [
        {
            inputType: 'select',
            name: "ReceiptType",
            options: [
                { label: "paid", value: "paid" },
                { label: "Sale", value: "Sale" }
            ]

        }
    ]

    const columns = [
        // {
        //     header: 'saleNo',
        //     accessorKey: 'saleNo',
        //     footer: 'saleNo'
        // },
        {
            header: 'Receipt Type',
            accessorKey: 'ReceiptType',
            footer: 'code'
        },
        {
            header: 'RefBillNo',
            accessorKey: 'RefBillNo',
            footer: 'code'
        },
        {
            header: 'category',
            accessorKey: 'category',
            footer: 'type'
        },
        {
            header: 'Ammount',
            accessorKey: 'Ammount',
            footer: 'Ammount'
        },
        {
            header: 'Discription',
            accessorKey: 'Discription',
            footer: 'Discription'
        },
        {
            header: 'Date',
            accessorKey: 'createdAt',
            footer: 'createdAt',
            cell: info => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED)
        }
    ]

    const extra = {
        heading: 'Cash Book ',
        btnLogic: true,
        onclick: () => {
            SetShouldAppend(true)
            SetData((prev) => {
                return {
                    ...prev,
                    skip: prev.skip + 10
                }
            })

        }
        ,
        loader: loading,
        title: "Load more",
        Message,
        extraHeading: `Current Money:${data.Data.AmmountInStore}`

    }

    const count = import.meta.env.VITE_MODE === "Production" ? 1 : 2
    if (loading && RenderCount <= count) {
        return (
            <div className='text-danger text-center'>
                loading...
            </div>
        )
    }
    return (
        <div className='mw-100'>
            <Filter inputs={inputs} Data={Data} Setter={SetData} ShouldAppend={SetShouldAppend} />
            <div className="">
                <Table data={res} columns={columns} extra={extra} />
            </div>
        </div>
    )
}

export default CashBookTable
