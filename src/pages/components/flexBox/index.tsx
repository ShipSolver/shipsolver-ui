import React from 'react'
import './flexBox.css'

export default function FlexBox({
    children, 
    style,
    classname
} : {
    children: React.ReactNode, 
    style?: React.CSSProperties,
    classname?: string
}){
    return <div style={style} className={'flex-box' + (classname ? ` ${classname}` : '')}>{children}</div>
}