import React from 'react';

export default function SearchBar({ value = '', onChange, placeholder }) {
    const handleClear = () => {
        if (onChange) {
            onChange({ target: { value: '' } });
        }
    };

    return (
        <div className="search-box">
            <label htmlFor="search-input">Quick Search</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                    id="search-input"
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder || "Search by name, ID, or email..."}
                />
                {value && (
                    <button 
                        type="button" 
                        onClick={handleClear} 
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                        aria-label="Clear search"
                    >
                        &times;
                    </button>
                )}
            </div>
        </div>
    );
}