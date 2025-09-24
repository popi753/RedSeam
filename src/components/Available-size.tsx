
import '../styles/available-size.css'


type props = {
    size:string;
    selectedSize: boolean;
    setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
}

export default function Available_size({size,selectedSize,setSelectedSize}:props) {
        return(
            <>
                <div key={size} className="available-size"
                                            style={{
                                                    borderColor: selectedSize ? "var(--dark-blue)" : "var(--border-color)",
                                                }}
                                onClick={() => setSelectedSize(size)}>
                                                <input type="radio" name="size" value={size}
                                                checked={selectedSize}
                                                onChange={(e) => setSelectedSize(e.target.value)}
                                                />
                                                <span 
                                                title={size}
                                                >
                                                {size}
                                                </span>
                                         </div>
            </>
        )
}