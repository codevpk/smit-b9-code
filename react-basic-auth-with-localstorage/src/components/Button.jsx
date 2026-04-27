const Button = (props) => {
    console.log('props', props)
    const { type = "dark", variant, text = "Button" } = props
    return (
        <button className={`btn btn-${variant ? variant + "-" : ""}${type}`}>{text}</button>
        // <button className={`btn btn-${type || "dark"}`}>{text || "Button"}</button>
    )
}

export default Button