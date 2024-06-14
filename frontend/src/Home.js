import { useState } from "react";

const Home = () => {
    // State to hold the current age and input field value
    const [name, setName] = useState("");
    const [inputValue, setInputValue] = useState('');
    

    // Event handler to update inputValue state
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // Event handler to update age state on button click
    const handleClick = () => {
        setName(inputValue);;
    };

    return (
        <div className="home">
            <h2>Homepage</h2>
            <input
                className="inputField"
                type="string" // Setting input type to number for age
                value={inputValue}
                onChange={handleInputChange}
            />
            <button onClick={handleClick}>Click Me</button>
            <h4>{name}</h4>
        </div>
    );
};

export default Home;
