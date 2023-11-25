import { Formik } from "formik"
import { useState } from "react"
import * as Yup from 'yup';
import SearchInput from "../../components/SearchInput";

const validationSchema = Yup.object({
    displayName: Yup.string().required(),
    apiIdSingular: Yup.string().required(),
    apiIdPlural: Yup.string().required()
})

export default function ContentType() {
    return (
        <div className="max-w-[200px] bg-white h-full">
            <Heading title="Content Type Builder"/>
            <HorizontalDivider/>
            <SubList title={"Collection Type"} addNewButton={true}>
                <SubNavItem label="article"/>
                <SubNavItem label="category"/>
                <SubNavItem label="place"/>
                <SubNavItem label="Restaurent"/>
                <SubNavItem label="Review"/>
                <SubNavItem label="User"/>
            </SubList>
            <SubList title="Single Types" addNewButton={true}>
            <SubNavItem label="Blog Page"/>
            <SubNavItem label="Global"/>
            <SubNavItem label="Restaurent"/>
            </SubList>
        </div>
    )
}

function SubList({title, children, addNewButton}) {
    const [active, setActive] = useState(true)
    return (
        <div>
             <SubTitle label={title} active={active} handleToggle={() => setActive(!active)}/>
            {active && children}
            {addNewButton && (<CreateSubNavItem label="Collection" />)}
        </div>
    )
}

function SubNavItem({label}) {
    const active = false

    const activeContainer = `border-r-2 border-blue-500`
    const activeText = `text-blue-500`

    return (
        <div className={`${active && activeContainer} ${active && activeText} flex w-full h-10 items-center px-6`}>
            <p className="text-[20px]">•</p>
            <p className={` text-[13px] text-medium ml-2 ${active ? activeText : 'text-black'}`}>{label}</p>
        </div>
    )
}

function CreateSubNavItem({label}) {
    const [isModalVisible, setModalVisible] = useState(false)

    const handleClick = () => {
        setModalVisible(true)
    }
    const handleModalClose = () => {
        setModalVisible(false)
    }
    return (
        <div>
            <button onClick={handleClick} className="flex items-center gap-x-1 px-6 py-1">
                <svg className="w-3 h-3 fill-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                <p className="text-[11px] text-medium text-blue-500">Create new {label}</p>
            </button>
            {isModalVisible && (<div className="fixed top-0 left-0 right-0 bottom-0">
                <button onClick={handleModalClose} className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-[.06]"></button>
                <div className="max-w-[700px] w-full absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] rounded-[5px] overflow-hidden bg-gray-100">
                    <ModalHead handleClose={handleModalClose}/>
                    <Formik
                        initialValues={{}}
                        onSubmit={(values) => console.log(values)}
                        validationSchema={validationSchema}
                    >
                        {({
                             values,
                             errors,
                             touched,
                             handleChange,
                             handleBlur,
                             handleSubmit,
                             isSubmitting,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <ModalContent errors={errors} touched={touched} values={values} handleChange={handleChange} handleBlur={handleBlur}/>
                                <ModalFooter isSubmitting={isSubmitting}/>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>)}
        </div>
    )
}

function InputField({label="label", caption, style, onChange, value, onBlur, name, error, touched}) {

    const errorContainer = `outline-red-500`
    const errorText = `text-red-500`
    return (
        <div style={style} className="flex flex-col gap-y-[1px] w-full">
            <p className="text-[12px] text-black font-bold">{label}</p>
            <input onChange={onChange} onBlur={onBlur} value={value} name={name} className={`${error && errorContainer} w-full py-3 px-3 rounded-[5px]`} type="text"  />
            <p className={`text-[12px] ${error ? errorText : 'text-gray-500'} font-medium`}>{error && touched ? error : caption}</p>
        </div>
    )
}

function TabNav({label, onClick, active}) {
    const activeContainer = `border-b-2 border-blue-500`
    const activeText = `text-blue-500`
    return (
        <div onClick={onClick} className={`${active && activeContainer} h-10 flex items-center px-3 `}>
            <p className={`text-[11px] ${active ? activeText : 'text-black'}  font-medium uppercase `}>{label}</p>
        </div>
    )
}

function ModalHead({handleClose}) {
    return (
        <div className="bg-white h-14 px-3 flex justify-between items-center">
            <h2 className="text-[14px] text-black font-bold">Create a Collection Type</h2>
            <Button onClick={handleClose}>
                <svg className="w-5 h-5 fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path></svg>
            </Button>
        </div>
    )
}

function ModalContent({errors, touched, values, handleChange, handleBlur}) {
    const [activeTab, setActive] = useState(1)
    return (
        <div className="p-5">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-[16px] text-black font-bold ">Configuration</h2>
                    <p className="text-[11px] text-gray-500 font-medium ">A type of modeling data</p>
                </div>
                <div className="flex">
                    <TabNav active={activeTab === 1 ? true : false} onClick={() => setActive(1)} label="Basic Settings"/>
                    <TabNav active={activeTab === 2 ? true : false} onClick={() => setActive(2)} label="Advanced Settings"/>
                </div>
            </div>
            {activeTab === 1 && (<div className="py-5">
                <div className="flex gap-x-4">
                    <InputField 
                        label="Display Name"
                        handleBlur={handleBlur.displayName}
                        handleChange={handleChange.displayName}
                        value={values.displayName}
                        error={errors.displayName}
                        touched={touched.displayName}
                    />
                    <div className="w-full flex flex-col gap-y-4">
                        <InputField 
                        label="API ID (Singular)"
                        handleBlur={handleBlur.apiIdSingular}
                        handleChange={handleChange.apiIdSingular}
                        value={values.apiIdSingular}
                        error={errors.apiIdSingular}
                        touched={touched.apiIdSingular}
                        />
                        <InputField 
                        label="API ID (Plural)"
                        handleBlur={handleBlur.apiIdPlural}
                        handleChange={handleChange.apiIdPlural}
                        value={values.apiIdPlural}
                        error={errors.apiIdPlural}
                        touched={touched.apiIdPlural}
                        />
                    </div>
                </div>
            </div>)}
            {activeTab === 2 && (<div className="py-5">
                <div className="flex gap-x-4">
                    Tab 2
                </div>
            </div>)}
        </div>
    )
}

function ModalFooter() {
    return (
        <div className="bg-white h-14 px-3 flex justify-between items-center">
            <Button>
                <p>cancel</p>
            </Button>
            <Button submit>
                <p>continue</p>
            </Button>
        </div>
    )
}

function Heading({title}) {
    return (
        <div className="h-20 w-full flex justify-between items-center mx-3 relative">
            <h2 className="max-w-[80%] text-[16px] text-black font-bold">{title}</h2>
            <SearchInput style={{position: 'absolute', width: '90%'}} right /> 
        </div>
    )
}



function SubTitle({label, style, handleToggle, active}) {
    return (
        <div style={style} className="flex items-center w-full px-3 justify-between py-2">
            <div className="flex items-center gap-x-1">
                <h4 className="text-[12px] text-black font-bold uppercase">{label}</h4>
                <button onClick={handleToggle} className="p-1 cursor-pointer">
                    {active && (<svg className="w-4 h-4 fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 16L6 10H18L12 16Z"></path></svg>)}
                    {!active && (<svg className="w-4 h-4 fill-black"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 8L18 14H6L12 8Z"></path></svg>)}
                </button>
            </div>
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

function Button({children, style, onClick, submit}) {
    return (
        <button type={submit ? 'submit' : 'button'} onClick={onClick} style={style} className="p-1 rounded-[5px] bg-gray-100 border border-gray-300">
            {children}
        </button>
    )
}