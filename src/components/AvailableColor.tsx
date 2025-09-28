
import '../styles/availableColor.css'

type Props = {
    colorName: string;
    color: string;
    selectedColor: boolean;
    setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}

export default function AvailableColor({ colorName, color, selectedColor, setSelectedColor }: Props) {

    return (
        <>
            <div className="available-color"
                style={{
                    borderColor: selectedColor ? "var(--border-color)" : "transparent",
                }}
                onClick={() => setSelectedColor(colorName)}
            >
                <input type="radio" name="color" value={colorName}
                    checked={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                />
                <span style={{

                    background: color,
                }}
                    title={colorName}
                />
            </div>
        </>
    )
}