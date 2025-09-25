
import '../styles/availableolor.css'

type Props = {
    colorName: string;
    color: string;
    selectedColor: boolean;
    setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}

export default function AvailableColor({colorName, color,selectedColor, setSelectedColor }: Props){

    return(
        <>
            <div className="available-color" 
            onClick={() => setSelectedColor(colorName)}
            >
                                                <input type="radio" name="color" value={colorName}
                                                checked={selectedColor}
                                                onChange={(e) => setSelectedColor(e.target.value)}
                                                />
                                                <span style={{
                                                    borderColor: selectedColor ? "black" : "transparent",
                                                    background: color,
                                                }}
                                                title={colorName}
                                                />
                                         </div>
        </>
    )
}