import React from "react"

export interface ButtonProps {
    text: string | React.ReactElement;
    className: string;
    disabled?: boolean;
};