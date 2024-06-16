import React, { useState } from "react";

function MyForm() {
    const [name, setName] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        console.log("Form submitted with name:", name);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}

export default MyForm;