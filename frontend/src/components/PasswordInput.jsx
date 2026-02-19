import React, { useState } from 'react';

const PasswordInput = ({ value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <input
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 border rounded-lg"
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="mt-2 text-sm text-blue-500"
            >
                {showPassword ? 'Hide' : 'Show'}
            </button>
        </div>
    );
};

export default PasswordInput;
