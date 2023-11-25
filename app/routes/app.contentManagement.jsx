import { Link, Outlet } from "@remix-run/react"
import { useState } from "react"


export default function ContentManagement() {
    return (
        <div className="flex h-full">    
            <div className="max-w-[200px] bg-white h-full">
                <Heading title="Content"/>
                <HorizontalDivider/>
                <SubTitle label="Collection Title"/>
                <SubNavItem label="article"/>
                <SubNavItem label="category"/>
                <SubNavItem label="place"/>
                <SubNavItem label="Restaurent"/>
                <SubNavItem label="Review"/>
                <SubNavItem label="User"/>
                <SubTitle label="Single Types"/>
                <SubNavItem label="Blog Page"/>
                <SubNavItem label="Global"/>
                <SubNavItem label="Restaurent"/>
            </div>
            <div className="flex-1">
                <Outlet/>
            </div>
        </div>
    )
}

function SubNavItem({label}) {
    const active = false

    const activeContainer = `border-r-2 border-blue-500`
    const activeText = `text-blue-500`

    return (
        <Link to={`${label}`}>
            <div className={`${active && activeContainer} ${active && activeText} flex w-full h-10 items-center px-6`}>
                <p className="text-[20px]">•</p>
                <p className={` text-[13px] text-medium ml-2 ${active ? activeText : 'text-black'}`}>{label}</p>
            </div>
        </Link>
    )
}

function Heading({title}) {
    return (
        <div className="h-20 w-full flex justify-between items-center mx-3 relative z-50">
            <h2 className="text-[16px] text-black font-bold">{title}</h2>
            <SearchInput style={{position: 'absolute', width: '90%'}} right /> 
        </div>
    )
}

function SearchInput({style, right}) {
    const [active, setActive] = useState(false)

    const handleOpen = () => {
        setActive(true)
    }
    const handleClose = () => {
        setActive(false)
    }
    return (
        <div style={style} className={`flex ${right && 'justify-end'} w-full relative`}>
            {!active && (
                <button onClick={handleOpen} id="search-icon-pressable" className={` w-8 h-8 bg-gray-200 rounded-[5px] flex items-center justify-center`}>
                    <svg className="w-4 h-4 fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
                </button>
            )}
            {active && (
                <div className="relative flex items-center w-full">
                    <button onClick={handleClose} className="w-8 h-7 absolute left-[2px] bg-gray-100 rounded-[5px] flex items-center justify-center">
                        <svg className="w-4 h-4 fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
                    </button>
                    <input autoFocus onBlur={handleClose} className="w-full p-2 pl-10 bg-gray-100 rounded-[5px]" type="text" />
                </div>
            )}
        </div>
    )
}

function SubTitle({label, style}) {
    return (
        <div style={style} className="flex items-center w-full px-3 justify-between py-2">
            <h4 className="text-[12px] text-black font-bold uppercase">{label}</h4>
            <div className="w-6 h-6 bg-gray-200 rounded-[5px] flex items-center justify-center">
                <p className="text-[12px] text-black font-medium">1</p>
            </div>
        </div>
    )
}

function HorizontalDivider() {
    return (
        <div className="w-30 h-[1px] bg-gray-200"></div>
    )
}