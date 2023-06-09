const Spiner = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto', animationPlayState: 'running', animationDelay: 0}} width="217px" height="217px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="38" cy="50" fill="#fa4776" r="12" style={{animationPlayState: 'running', animationDelay: 0}}>
            <animate attributeName="cx" repeatCount="indefinite" dur="0.970873786407767s" keyTimes="0;0.5;1" values="38;62;38" begin="-0.4854368932038835s" style={{animationPlayState: 'running', animationDelay: 0}}></animate>
            </circle>
            <circle cx="62" cy="50" fill="#ffffff" r="12" style={{animationPlayState: 'running', animationDelay: 0}}>
            <animate attributeName="cx" repeatCount="indefinite" dur="0.970873786407767s" keyTimes="0;0.5;1" values="38;62;38" begin="0s" style={{animationPlayState: 'running', animationDelay: 0}}></animate>
            </circle>
            <circle cx="38" cy="50" fill="#fa4776" r="12" style={{animationPlayState: 'running', animationDelay: 0}}>
            <animate attributeName="cx" repeatCount="indefinite" dur="0.970873786407767s" keyTimes="0;0.5;1" values="38;62;38" begin="-0.4854368932038835s" style={{animationPlayState: 'running', animationDelay: 0}}></animate>
            <animate attributeName="fill-opacity" values="0;0;1;1" calcMode="discrete" keyTimes="0;0.499;0.5;1" dur="0.970873786407767s" repeatCount="indefinite" style={{animationPlayState: 'running', animationDelay: 0}}></animate>
            </circle>
        </svg>
    );
};

export default Spiner;