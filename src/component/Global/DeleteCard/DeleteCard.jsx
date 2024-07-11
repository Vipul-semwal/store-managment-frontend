import React from 'react'
import './DeleteCard.css'
import useformreq from '../../../Hooks/useformreq';

function DeleteCard({ DeleteFnc, onClose, dltTitle }) {
    const { loading, makeRequest } = useformreq()

    return (
        <div className="dltCard">
            <div className="dltHeader">
                <div className="dltImage">
                    <svg aria-hidden="true" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" fill="none">
                        <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" strokeLinejoin="round" strokeLinecap="round"></path>
                    </svg>
                </div>
                <div className="dltContent">
                    <span className="dltTitle">{`Delete ${dltTitle}`}</span>
                    <p className="dltMessage">Are you sure you want to do this action? this can't be undo</p>
                </div>
                <div className="dltActions">
                    <button className="dltDeactivate" type="button" onClick={() => {
                        makeRequest(DeleteFnc.Fun, null, DeleteFnc.values, DeleteFnc.extraFnc)
                    }}>{loading ? "Deleting..." : "Delete"}</button>
                    <button className="dltCancel" type="button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>

    )
}

export default DeleteCard
