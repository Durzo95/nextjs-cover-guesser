import React from 'react'
import { Row } from 'react-bootstrap'


export default function PixelatedImage({ src, size, enabled }) {
    return (
        <>
            {/* <svg style={{ width: `${width}px`, height: `${height}px` }}> */}
            <svg>
                < filter id="pixelate" x="0" y="0" >
                    <feFlood x={4} y={4} height={1} width={1} />
                    <feComposite width={size * 2} height={size * 2} />
                    <feTile result="a" />
                    <feComposite in="SourceGraphic" in2="a" operator="in" />
                    <feMorphology operator="dilate" radius={size} />
                </filter >
                <image
                    // width='100%'
                    height='100%'
                    preserveAspectRatio="xMidYMid slice"
                    filter={enabled ? "url(#pixelate)" : ""}
                    href={src}
                    className=""
                />
            </svg >
        </>
    )
}
