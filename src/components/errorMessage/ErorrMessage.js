import img from './error.gif';

const ErrorMessage = () => {
    return (
        <img style={{ display: 'block', width: "100px", height: "100px",objectFit: 'contain'}}  src={img} alt="Error"/>
    )
}

export default ErrorMessage;