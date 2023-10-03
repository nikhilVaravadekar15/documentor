import React from 'react'

export default function LargeLoadingSpinner() {
    return (
        <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export function SmallLoadingSpinner() {
    return (
        <div className="spin"></div>
    )
}
