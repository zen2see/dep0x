import React from "react";

export default function abclayout ({ children }: {children: React.ReactNode })
{
    return (
        <div>
            <h1>Hello from the abc layout</h1>
            {children}
        </div>
    )
}