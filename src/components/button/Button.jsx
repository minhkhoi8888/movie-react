import "./Button.scss";
//PROPS TYPE
const Button = (props)=>{
    // console.log("re-render");

    return(
        <button
            className ={`btn ${props.className}`}
            onClick ={props.onClick ? props.onClick : null}
        >
            {props.children}
        </button>
    )
}

export default Button;