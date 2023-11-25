export default function Button({ label, type = 'primary', size = 'md', style, flex, onPress, active = true, children }) {

    // Button size logic using a ternary operator
    const buttonSize = size === 'sm' ? { container: 'p-2', text: 'text-[13px]' } : size === 'lg' ? { container: 'py-5 px-8', text: 'text-[15px]' } : { container: 'py-4 px-6', text: 'text-[14]' };

    // CSS classes object
    const buttonStyle = {
        secondary: {
            container: `bg-white border border-blue-300 rounded-[5px] ${buttonSize.container} ${children && 'flex flex-row items-center gap-x-1'}`,
            text: 'text-blue-500',
        },
        action: {
            container: `${children && 'flex flex-row items-center gap-x-1'}`,
            text: `text-red-800 underline ${buttonSize.text}`,
        },
        primary: {
            container: `bg-blue-500 py-4 rounded-[5px] ${buttonSize.container} ${children && 'flex flex-row items-center gap-x-1'}`,
            text: 'text-white',
        },
    };

    const classes = `${flex ? 'flex flex-1' : ''} ${buttonStyle[type].container} ${!active && 'bg-blue-200'} items-center`;

    return (
        <button disabled={!active} onClick={onPress} style={style} className={classes}>
            {!children && <p className={`${buttonStyle[type].text} font-medium uppercase`}>{label}</p>}
            {children && children}
        </button>
    );
}
