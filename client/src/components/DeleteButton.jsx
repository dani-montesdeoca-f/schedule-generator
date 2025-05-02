import React from 'react';

export default function DeleteButton({ onClick, label = "Delete" }) {
    return (
        <button
            onClick={onClick}
            aria-label={label}
            style={{
                marginLeft: '10px',
                background: 'transparent',
                color: 'red',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem'
            }}
        >
            ✖
        </button>
    );
}
