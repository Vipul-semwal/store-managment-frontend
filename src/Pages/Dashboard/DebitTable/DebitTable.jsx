import React from 'react'
import { Table } from '../../../component/export'
import dataApi from '../../../Api/DataApi'
import { Filter } from '../../../component/export'
import { Makeoptions } from '../../../utility/Makeoptions'
import { useDashContext } from '../../../Hooks/ContextDashboard'
import { useMemo, useEffect, useCallback, useState } from 'react'
import useFetchdata from '../../../Hooks/useFetchData'
import qs from 'qs'
function DebitTable() {
    const { loading, res, MakeApiReq, Message } = useFetchdata()
    const [ShouldAppend, SetShouldAppend] = useState(false)
    const [RenderCount, SetRenderCount] = useState(0)
    // is filter by default false so it'll just going to fetch first 10 result from the db sorted
    const [Query, SetQuery] = useState({
        PartyName: '',
        // createdAt: new Date(),
        skip: 0,
        isFilter: "false",
    })

    useEffect(() => {
        SetRenderCount((prev) => {
            // console.log('see', prev)
            return prev + 1
        })
        MakeApiReq(dataApi.GetAllbills.bind(dataApi), qs.stringify(Query), ShouldAppend)
    }, [Query])
    const data = useDashContext()
    const partyName = useMemo(() => Makeoptions(data?.Data.parties || [], 'Name'), [data?.Data?.parties]);
    // const itemName = useMemo(() => Makeoptions(data?.Data.items || [], 'itemName'), [data.Data.items]);
    const inputs = [
        {
            inputType: 'select',
            name: "partyName",
            options: partyName

        },
        // {
        //     inputType: 'select',
        //     name: "itemName",
        //     options: itemName
        // },
    ]

    const columns = [
        // {
        //     header: 'saleNo',
        //     accessorKey: 'saleNo',
        //     footer: 'saleNo'
        // },
        {
            header: 'Party Name',
            accessorKey: 'partyName',
            footer: 'partyName'
        },
        {
            header: 'Bill No',
            accessorKey: 'billNumber',
            footer: 'itemName'
        },
        {
            header: 'Total Amount',
            accessorKey: 'totalAmount',
            footer: ''
        },
        {
            header: 'Pending Amount',
            accessorKey: 'pendingAmount',
            footer: ''
        }
    ]

    const [pageNo, SetPageNo] = useState(1)

    // some extra things for the table and also the laod more button increment in the data object
    const extra = {
        pageNo,
        SetPageNo,
        heading: 'Debit Register',
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

export default DebitTable
