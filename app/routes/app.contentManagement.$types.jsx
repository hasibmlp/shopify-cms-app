import { useParams } from "@remix-run/react"
import SearchInput from "../../components/SearchInput"
import { useState } from "react"

export default function ContentManagementTypes() {
    return (
        <div className="w-full h-full p-10 mx-auto">
            <Heading/>
            <TableContent/>
        </div>
    )
}

function Heading() {
    const {types} = useParams()
    return (
        <div className="flex flex-row justify-between items-start mb-8">
            <div className="flex flex-col gap-y-2">
                <h2 className="text-[32px] text-black font-bold">{types}</h2>
                <h2 className="text-[16px] text-gray-500 font-medium">4 entries foundd</h2>
            </div>
            <button className="flex flex-row items-center gap-x-1 rounded-[5px] bg-blue-500 px-2 py-[6px]">
                    <svg className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                    <p className="text-[14px] text-white font-medium">Create new entry</p>
            </button>
        </div>
    )
}

function TableContent() {
    return (
        <div>
            <TableActions/>
            <div className="w-full bg-gray-200 rounded-[5px] overflow-scroll relative">
                <table className="min-w-max border-collapase">
                    <thead className="border-b border-gray-300">
                        <th className="text-left p-4"><CheckBox/></th>
                        <th className="text-left p-4"><TitleHeader label='id'/></th>
                        <th className="text-left p-4"><TitleHeader label='image'/></th>
                        <th className="text-left p-4"><TitleHeader label='title'/></th>
                        <th className="text-left p-4"><TitleHeader label='content available in'/></th>
                        <th className="text-left p-4"><TitleHeader label='state'/></th>
                        <th className="text-left p-4"><TitleHeader label='review stage'/></th>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-300 w-full">
                            <td className="text-left p-4 max-w-[350px]"><CheckBox/></td>
                            <td className="text-left p-4">1</td>
                            <td className="text-left p-4">image url</td>
                            <td className="text-left p-4">this is test product</td>
                            <td className="text-left p-4">English and other languages</td>
                            <td className="text-left p-4">publish</td>
                            <td className="text-left p-4">reviewd</td>
                            <td className="text-left p-4"><RowActionContainer/></td>
                        </tr>
                        <tr>
                            <td className="text-left p-4"><CheckBox/></td>
                            <td className="text-left p-4">content22</td>
                            <td className="text-left p-4">content23</td>
                            <td className="text-left p-4">content24</td>
                            <td className="text-left p-4">content25</td>
                            <td className="text-left p-4">content26</td>
                            <td className="text-left p-4">content27</td>
                            <td className="text-left p-4"><RowActionContainer/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <TableFooter/>
        </div>
    )
}

function TableActions() {
    return (
        <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-x-2">
                <SearchInput style={{width: 200}}/>
                <Menu/>
            </div>
            <div className="flex items-center gap-x-2">
                <ToggleMenuList
                    options={[
                        {
                            value: 'eng',
                            label: 'English (eng)'
                        },
                        {
                            value: 'ar',
                            label: 'Arabic (ar) KSA'
                        },
                        {
                            value: 'sp',
                            label: 'Spanish (sp) special laguage'
                        },
                        {
                            value: 'ind',
                            label: 'India (ind)'
                        },
                        {
                            value: 'pk',
                            label: 'Pakistan (pk)'
                        },
                        {
                            value: 'jp',
                            label: 'Japan (jp)'
                        },
                    ]}
                />
                <SettingsMenuList/>
            </div>
        </div>
    )
}

function SettingsMenuList({align='right'}) {
    const [isBodyVisible, setBodyVisible] = useState(false)
    const bodyAlign = align === 'right' ? 'right-0' : 'left-0'

    return (
        <div className="relative">
            <button onClick={() => setBodyVisible(!isBodyVisible)} className={`h-8 bg-gray-200 px-2 border border-gray-300 rounded-[5px] flex items-center justify-center gap-x-2`}>
                <span><svg className="w-4 h-4 fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.33409 4.54491C6.3494 3.63637 7.55145 2.9322 8.87555 2.49707C9.60856 3.4128 10.7358 3.99928 12 3.99928C13.2642 3.99928 14.3914 3.4128 15.1245 2.49707C16.4486 2.9322 17.6506 3.63637 18.6659 4.54491C18.2405 5.637 18.2966 6.90531 18.9282 7.99928C19.5602 9.09388 20.6314 9.77679 21.7906 9.95392C21.9279 10.6142 22 11.2983 22 11.9993C22 12.7002 21.9279 13.3844 21.7906 14.0446C20.6314 14.2218 19.5602 14.9047 18.9282 15.9993C18.2966 17.0932 18.2405 18.3616 18.6659 19.4536C17.6506 20.3622 16.4486 21.0664 15.1245 21.5015C14.3914 20.5858 13.2642 19.9993 12 19.9993C10.7358 19.9993 9.60856 20.5858 8.87555 21.5015C7.55145 21.0664 6.3494 20.3622 5.33409 19.4536C5.75952 18.3616 5.7034 17.0932 5.0718 15.9993C4.43983 14.9047 3.36862 14.2218 2.20935 14.0446C2.07212 13.3844 2 12.7002 2 11.9993C2 11.2983 2.07212 10.6142 2.20935 9.95392C3.36862 9.77679 4.43983 9.09388 5.0718 7.99928C5.7034 6.90531 5.75952 5.637 5.33409 4.54491ZM13.5 14.5974C14.9349 13.7689 15.4265 11.9342 14.5981 10.4993C13.7696 9.0644 11.9349 8.57277 10.5 9.4012C9.06512 10.2296 8.5735 12.0644 9.40192 13.4993C10.2304 14.9342 12.0651 15.4258 13.5 14.5974Z"></path></svg></span>
            </button>
            {isBodyVisible && (<div className={`absolute top-full ${bodyAlign} z-50`}>
                <dir className="w-[200px] mt-1 p-3 bg-gray-200 rounded-[5px] overflow-hidden border-[.5px] border-gray-300">
                    <span>item</span>
                </dir>
            </div>)}
        </div>
    )
}

function TableFooter() {
    return (
        <div></div>
    )
}

function Menu() {
    const [isBodyVisible, setBodyVisible] = useState(false)
    return (
        <div className="relative">
            <button onClick={() => setBodyVisible(!isBodyVisible)} className={`h-8 bg-gray-200  px-2 rounded-[5px] flex items-center justify-center gap-x-2`}>
                <span><svg className="w-4 h-4" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z" fill="#000000"></path> </g></svg></span>
                <span>Filters</span>
            </button>
            {isBodyVisible && (<div className="absolute top-full left-0 z-50">
                <dir className="w-[200px] mt-1 p-3 bg-gray-200 rounded-[5px] overflow-hidden border-[.5px] border-gray-300">
                    <ToggleMenuList style={{marginBottom: 4}}/>
                    <ToggleMenuList style={{marginBottom: 4}}/>
                    <ToggleMenuList />
                </dir>
            </div>)}
        </div>
    )
}

function ToggleMenuList({style, value, options}) {
    const [activeValue, setCurrentValue] = useState(value)
    const [isBodyVisible, setBodyVisible] = useState(false)
    const previewLabel = options?.find(item => item?.value === activeValue)?.label || 'Select'

    const handleClick = (itemValue) => {
        setCurrentValue(itemValue)
        setBodyVisible(false)
    }

    return (
        <div style={style} className="relative">
            <button onClick={() => setBodyVisible(!isBodyVisible)} className={`w-full h-8 bg-gray-200 px-2 border border-gray-300 rounded-[5px] flex items-center justify-between gap-x-2`}>
                <span>{previewLabel}</span>
                <span><svg className="w-4 h-4 fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 14L8 10H16L12 14Z"></path></svg></span>
            </button>
            {isBodyVisible && (<div className="min-w-full absolute top-full z-[100] max-h-[150px] overflow-y-scroll">
                <div className="mt-1 bg-gray-200 p-1 border-[.5px] border-gray-300 rounded-[5px] overflow-hidden border-[.5px] border-gray-300">
                    {options.map(item => (
                        <MenuBarListItem 
                            style={{marginBottom: 4}} 
                            label={item.label} 
                            onClick={() => handleClick(item.value)}
                            active={item.value === activeValue}
                        />
                    ))}
                </div>
            </div>)}
        </div>
    )
}

function MenuBarListItem({style, active, label, onClick}) {
    const [hovering, setHovering] = useState(false)
    return (
        <button onClick={onClick} style={style} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} className={`w-full ${hovering ? 'bg-gray-300': 'bg-gray-200'} rounded-[5px] py-1.5 px-3 flex justify-start`}>
            <span className={`text-[12px] ${active ? 'text-blue-500' : 'text-black'} font-medium whitespace-nowrap`}>{label}</span>
        </button>
    )
}

function CheckBox(){
    const [active, setActive] = useState(false)
    return (
        <button onClick={() => setActive(!active)} className={`${active ? 'bg-blue-500' : 'bg-gray-100 border border-gray-300' } w-4 h-4 rounded-[5px] overflow-hidden flex items-center justify-center`}>
            {active && (<svg className="w-4 h-4" width="64px" height="64px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>)}
        </button>
    )
}

function TitleHeader({label}) {
    return (
        <p className="text-[12px] text-gray-500 font-bold uppercase">{label}</p>
    )
}

function RowActionContainer() {
    return (
        <div className="w-40 h-10 flex flex-row items-center">
            <button className="w-8 h-6 flex items-center justify-center mr-2">
                <svg className="w-[18px] h-[18px]" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.4001 18.1612L11.4001 18.1612L18.796 10.7653C17.7894 10.3464 16.5972 9.6582 15.4697 8.53068C14.342 7.40298 13.6537 6.21058 13.2348 5.2039L5.83882 12.5999L5.83879 12.5999C5.26166 13.1771 4.97307 13.4657 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L7.47918 20.5844C8.25351 20.3263 8.6407 20.1973 9.00498 20.0237C9.43469 19.8189 9.84082 19.5679 10.2162 19.2751C10.5343 19.0269 10.823 18.7383 11.4001 18.1612Z" fill="#1C274C"></path> <path d="M20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178L14.3999 4.03882C14.4121 4.0755 14.4246 4.11268 14.4377 4.15035C14.7628 5.0875 15.3763 6.31601 16.5303 7.47002C17.6843 8.62403 18.9128 9.23749 19.85 9.56262C19.8875 9.57563 19.9245 9.58817 19.961 9.60026L20.8482 8.71306Z" fill="#1C274C"></path> </g></svg>
            </button>
            <button className="w-8 h-6 flex items-center justify-center mr-2">
            <svg className="w-[18px] h-[18px]" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 11.2C3 10.0799 3 9.51984 3.21799 9.09202C3.40973 8.71569 3.71569 8.40973 4.09202 8.21799C4.51984 8 5.0799 8 6.2 8H7.5012C8.05213 8 8.32759 8 8.58285 8.06868C8.80903 8.12953 9.02275 8.22963 9.21429 8.36443C9.43047 8.51656 9.60681 8.72818 9.95951 9.15141L11.5 11H13.8C14.9201 11 15.4802 11 15.908 11.218C16.2843 11.4097 16.5903 11.7157 16.782 12.092C17 12.5198 17 13.0799 17 14.2V16.8C17 17.9201 17 18.4802 16.782 18.908C16.5903 19.2843 16.2843 19.5903 15.908 19.782C15.4802 20 14.9201 20 13.8 20H9.4C7.15979 20 6.03969 20 5.18404 19.564C4.43139 19.1805 3.81947 18.5686 3.43597 17.816C3 16.9603 3 15.8402 3 13.6V11.2Z" fill="#222222"></path> <path d="M7 7.2C7 6.0799 7 5.51984 7.21799 5.09202C7.40973 4.71569 7.71569 4.40973 8.09202 4.21799C8.51984 4 9.0799 4 10.2 4H11.5012C12.0521 4 12.3276 4 12.5829 4.06868C12.809 4.12953 13.0228 4.22963 13.2143 4.36443C13.4305 4.51656 13.6068 4.72818 13.9595 5.15141L15.5 7H17.8C18.9201 7 19.4802 7 19.908 7.21799C20.2843 7.40973 20.5903 7.71569 20.782 8.09202C21 8.51984 21 9.0799 21 10.2V12.8C21 13.9201 21 14.4802 20.782 14.908C20.5903 15.2843 20.2843 15.5903 19.908 15.782C19.4802 16 18.9201 16 17.8 16H10.2C9.0799 16 8.51984 16 8.09202 15.782C7.71569 15.5903 7.40973 15.2843 7.21799 14.908C7 14.4802 7 13.9201 7 12.8V7.2Z" fill="#222222"></path> <path d="M6 7V15C6 16.1046 6.89543 17 8 17H20" stroke="white" stroke-width="2"></path> </g></svg>
            </button>
            <button className="w-8 h-6 flex items-center justify-center mr-2">
            <svg className="w-[18px] h-[18px]" fill="#000000" width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path></g></svg>
            </button>
        </div>
    )
}