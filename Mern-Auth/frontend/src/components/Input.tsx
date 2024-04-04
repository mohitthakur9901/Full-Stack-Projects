import React from 'react'
import {Input} from "@nextui-org/react";
type Color = "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
type Size = "sm" | "md" | "lg" | undefined

type Placement = "inside" | "outside" | "outside-left" | undefined;

interface MyInputProps {
    postion : Placement
    className?:string
    placeholder?: string
    value?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    label: string
    type: string
    name?: string
    required: boolean
    color:Color
    size?:Size

}

const MyInput = ({postion, placeholder,className, value, onChange, label, type, name, required , color , size}: MyInputProps) => {
    return (
        <Input
        key={postion}
        className={className}
            color={color}
            size={size}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            label={label}
            type={type}
            name={name}
            required={required}
            labelPlacement={postion}
        />
    )
}

export default MyInput