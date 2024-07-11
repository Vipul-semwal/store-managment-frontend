import React from 'react'
import { Table } from '../../../component/export'
import dataApi from '../../../Api/DataApi'
import { Filter } from '../../../component/export'
import { Makeoptions } from '../../../utility/Makeoptions'
import { useDashContext } from '../../../Hooks/ContextDashboard'
import { useMemo, useEffect, useCallback, useState } from 'react'
import useFetchdata from '../../../Hooks/useFetchData'
import qs from 'qs'
import { DateTime } from 'luxon'
function SalesTable() {
    const { loading, res, MakeApiReq, Message } = useFetchdata()
    const [ShouldAppend, SetShouldAppend] = useState(false)
    const [RenderCount, SetRenderCount] = useState(0)

    // is filter by default false so it'll just going to fetch first 10 result from the db sorted
    const [Query, SetQuery] = useState({
        itemName: '',
        partyName: '',
        saleType: '',
        // createdAt: new Date(),
        skip: 0,
        isFilter: "false",
    })

    useEffect(() => {
        SetRenderCount((prev) => {
            // console.log('see', prev)
            return prev + 1
        })
        MakeApiReq(dataApi.GetSalesData.bind(dataApi), qs.stringify(Query), ShouldAppend)
    }, [Query])
    const data = useDashContext()
    const partyName = useMemo(() => Makeoptions(data?.Data.parties || [], 'Name'), [data.Data.parties]);
    const itemName = useMemo(() => Makeoptions(data?.Data.items || [], 'itemName'), [data.Data.items]);


    // for filter inputs
    const inputs = [
        {
            inputType: 'select',
            name: "partyName",
            options: partyName

        },
        {
            inputType: 'select',
            name: "itemName",
            options: itemName

        },
        {
            inputType: 'select',
            name: "saleType",
            options: [
                { label: "Credit", value: "Credit" },
                { label: "Cash", value: "Cash" }
            ]

        }
    ]

    // what should be the colums of table
    const columns = [
        // {
        //     header: 'saleNo',
        //     accessorKey: 'saleNo',
        //     footer: 'saleNo'
        // },
        {
            header: 'partyName',
            accessorKey: 'partyName',
            footer: 'partyName'
        },
        {
            header: 'itemName',
            accessorKey: 'itemName',
            footer: 'itemName'
        },
        {
            header: 'saleType',
            accessorKey: 'saleType',
            footer: 'saleType'
        },
        {
            header: 'rate',
            accessorKey: 'rate',
            footer: 'rate'
        },
        {
            header: 'quantity',
            accessorKey: 'quantity',
            footer: 'quantity'
        },
        {
            header: 'Net Payable',
            accessorKey: 'netPayable',
            footer: 'netPayable'
        },
        {
            header: 'Date',
            accessorKey: 'Date',
            footer: 'createdAt',
            // cell: info => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED)
        }
    ]

    const [pageNo, SetPageNo] = useState(1)

    // some extra things for the table and also the laod more button increment in the data object
    const extra = {
        pageNo,
        SetPageNo,
        heading: 'Sales Register',
        btnLogic: true,
        onclick: () => {
            SetShouldAppend(true)
            SetQuery((prev) => {
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

    }

    if (loading && RenderCount <= 2) {
        return (
            <div className='text-danger text-center'>
                loading...
            </div>
        )
    }

    return (
        <div className='mw-100'>
            {/* {filter actuly just add to data object if user wants to add some filter} */}
            <Filter inputs={inputs} Data={Query} Setter={SetQuery} ShouldAppend={SetShouldAppend} />
            <Table data={res} columns={columns} extra={extra} />
        </div>
    )
}

export default SalesTable
