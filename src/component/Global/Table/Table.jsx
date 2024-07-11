import React from 'react'
import './Table.css'
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table'
import { FaTimes } from 'react-icons/fa';
import { Button } from '../../export';


function Table({ data, columns, extra }) {

    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: extra.btnLogic ? null : getPaginationRowModel(), getSortedRowModel: getSortedRowModel() })
    // console.log('table', table.getRowModel())
    return (
        <section className="intro">
            <div className="bg-image h-100" >
                <div className="mask d-flex align-items-center h-100">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <div className="card shadow-2-strong" style={{ backgroundColor: '#f5f7fa' }}>
                                    <div className="card-body">
                                        <h5>{extra.extraHeading}</h5>
                                        <div className="table-responsive">
                                            <h3 className='text-center mb-3 '>{extra.heading}</h3>
                                            <h5 className='text-success'>{extra.btnLogic ? "" : `PageNo:${extra.pageNo}`}</h5>
                                            <table className="table table-borderless mb-0">
                                                <thead>
                                                    {
                                                        table.getHeaderGroups().map((headerGroup) => {
                                                            {/* console.log('map', headerGroup) */ }
                                                            return (
                                                                <tr key={headerGroup.id}>
                                                                    {headerGroup.headers.map((header) => {
                                                                        return (
                                                                            <th scope="col" key={header.id}>
                                                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                                            </th>
                                                                        )
                                                                    })}
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </thead>
                                                <tbody>
                                                    {table.getRowModel().rows.map((row) => {
                                                        return (
                                                            <tr key={row.id}>
                                                                {/* <th scope="row">
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" checked={true} />
                                                                    </div>
                                                                </th> */}
                                                                {row.getVisibleCells().map((cell) => {

                                                                    return (
                                                                        <td key={cell.id}>
                                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                                        </td>
                                                                    )

                                                                })}
                                                                {/* <td>
                                                                    <button type="button" className="btn btn-danger btn-sm px-3">
                                                                        <FaTimes />
                                                                    </button>
                                                                </td> */}
                                                            </tr>
                                                        )
                                                    })}
                                                    {/* Other table rows */}
                                                </tbody>
                                            </table>
                                            {extra.btnLogic ? (
                                                <div className='pagination-btn mt-3' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    {
                                                        extra.Message == null ? (<Button onclick={extra.onclick} loader={extra.loading} title={extra.title} />) : (<h3>{extra.Message}</h3>)
                                                    }
                                                </div>
                                            ) : (<div className='pagination-btn mt-3' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <button type="button" disabled={!table.getCanPreviousPage()} class="btn btn-secondary mx-5" onClick={() => {
                                                    table.previousPage()
                                                    extra.SetPageNo((prev) => {
                                                        return prev - 1
                                                    })

                                                }}>prev</button>
                                                <button disabled={!table.getCanNextPage()} type="button" class="btn btn-secondary" onClick={() => {
                                                    table.nextPage()
                                                    extra.SetPageNo((prev) => {
                                                        return prev + 1
                                                    })
                                                }}>next</button>
                                            </div>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Table
