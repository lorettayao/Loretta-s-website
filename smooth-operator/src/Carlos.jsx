import React, { useState, useEffect, useRef } from 'react'; // 導入 useRef

// Tone.js 聲音合成庫。我們使用它來製作混沌的聲音效果。
// 注意：Canvas 環境已預先載入 Tone 庫，不需要額外安裝。
const Tone = window.Tone;

// --- 網站數據與設定 ---

// 不同的服裝/配件狀態
const OUTFITS = [
    { name: "Smooth Operator", color: "bg-red-600", accessory: "" },
    { name: "Banana Enthusiast", color: "bg-yellow-400", accessory: "🍌" },
    { name: "The Croissant King", color: "bg-amber-800", accessory: "🥐" },
    { name: "Random Tech Bro", color: "bg-blue-500", accessory: "💻" },
    { name: "Spicy Tostada", color: "bg-lime-500", accessory: "🌶️" },
];

// 隨機引言，讓一切更混亂
const BRAINROT_QUOTES = [
    "I'm a smooth operator!",
    "It's just the taste, yeah?",
    "A bit of a moment...",
    "Checo is a good driver, no?",
    "We are checking.",
    "Bwoah.", // 亂入 Kimi 的名言
    "P1 baby!",
    "No... I said 'cranberry sauce'!",
];

// --- 核心組件：Carlos 的臉和點擊效果 ---

const CarlosFace = ({ scale, outfit }) => {
    
    // 圖片 URL 必須是安全的 Placeholder
    const CARLOS_IMAGE_URL = "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRSD5FdUSJh7WcH4fEQPMSOjTZtwEbZKJuzGAPStdSLffk5xBVhhkgGiUVQ8XXGaJ7GQAF7-BHEdP9TXIluhAhNxrNU9obSSB8NhOKr1xkz5NCQAyNzQSSYiGGezkVEfhI2E0INEW1L-xZi";

    return (
        <div 
            className={`
                relative w-48 h-48 rounded-full border-4 border-red-500 shadow-2xl transition-all duration-300 ease-in-out cursor-pointer
                flex items-center justify-center overflow-hidden
                ${outfit.color} 
                ${scale > 1.0 ? 'shadow-[0_0_40px_rgba(255,240,0,1)]' : 'shadow-none'}
            `}
            style={{ transform: `scale(${scale}) rotate(${scale * 360}deg)` }}
        >
            <img 
                src={CARLOS_IMAGE_URL} 
                alt="Carlos Sainz Brainrot Face" 
                className="w-full h-full object-cover rounded-full transition-opacity duration-300" 
            />
            {/* 浮動配件 */}
            <span className="absolute text-5xl top-0 right-0 animate-pulse">{outfit.accessory}</span>
        </div>
    );
};

// --- 主要應用程式 ---

const App = () => {
    const [scale, setScale] = useState(1.0);
    const [outfitIndex, setOutfitIndex] = useState(0);
    const [randomQuote, setRandomQuote] = useState(BRAINROT_QUOTES[0]);

    // 使用 useRef 來保存 Tone.js 實例，確保它在渲染之間持續存在，並避免 React 將其視為要渲染的子元素。
    const synthRef = useRef(null); 

    // 1. 初始化 Tone.js (只執行一次)
    useEffect(() => {
        // 確保 Tone.js 及其方法存在
        if (Tone && Tone.FMSynth) {
            // 使用 FMSynth 產生一個有點刺耳的電子音，並存入 ref
            synthRef.current = new Tone.FMSynth().toDestination();
        } else {
            console.error("Tone.js 或 FMSynth 函式庫尚未載入。");
        }

        return () => {
            // 清理：在組件卸載時釋放資源
            if (synthRef.current) {
                synthRef.current.dispose();
            }
        };
    }, []); // 僅在組件首次加載時運行

    // 2. 隨機更換引言 (每 5 秒)
    useEffect(() => {
        const interval = setInterval(() => {
            setRandomQuote(BRAINROT_QUOTES[Math.floor(Math.random() * BRAINROT_QUOTES.length)]);
        }, 5000);
        return () => clearInterval(interval);
    }, []);


    // 處理點擊，讓臉變大並發出聲音
    const handleFaceClick = () => {
        // 放大效果 (隨機增加 0.1 到 0.5)
        const newScale = Math.min(2.0, scale + Math.random() * 0.4 + 0.1);
        setScale(newScale);

        // 發出混沌音效：使用 synthRef.current 訪問合成器
        if (synthRef.current) {
            // 隨機頻率和持續時間
            const freq = 300 + Math.random() * 500;
            const duration = '8n';
            synthRef.current.triggerAttackRelease(freq, duration);
        }

        // 點擊後短暫延遲，讓臉恢復到 1.0 
        setTimeout(() => setScale(1.0), 300);
    };

    // 換裝邏輯
    const changeOutfit = () => {
        setOutfitIndex((prevIndex) => (prevIndex + 1) % OUTFITS.length);
    };

    // 渲染目前的服裝物件
    const currentOutfit = OUTFITS[outfitIndex];

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-8 font-serif">
            <header className="text-center mb-8">
                <h1 className="text-6xl sm:text-7xl font-extrabold text-yellow-400 mb-2 animate-pulse transition-all duration-1000">
                    S-M-O-O-T-H O-P-E-R-A-T-O-R
                </h1>
                <p className="text-2xl text-red-500 font-bold mb-4 animate-bounce transition-all duration-1000">
                    {randomQuote}
                </p>
                <a 
                    href="https://verstappen.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-lg text-blue-400 hover:text-red-400 underline transition duration-300 border-2 border-dashed p-2"
                >
                    混沌連結：拜訪那個人網站
                </a>
            </header>

            {/* 主要互動區域 */}
            <div 
                className="my-10 p-8 rounded-2xl bg-gray-800 border-4 border-yellow-500 transition-all duration-500 shadow-2xl"
                onClick={handleFaceClick} // 點擊卡片觸發縮放和聲音
            >
                <CarlosFace scale={scale} outfit={currentOutfit} />
                <p className="mt-4 text-center text-xl font-bold">
                    點擊我的臉！<span className="animate-ping">👆</span>
                </p>
            </div>
            
            {/* 服裝控制區 */}
            <div className="mt-6 flex flex-col items-center space-y-4">
                <p className="text-xl font-semibold">當前服裝: {currentOutfit.name}</p>
                <button
                    onClick={changeOutfit}
                    className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg transform transition duration-200 hover:scale-105 active:scale-95 border-b-4 border-red-800"
                >
                    給我換衣服！
                </button>
                <p className="text-sm text-gray-400 mt-2">（警告：服裝配件可能會隨機飄動。）</p>
            </div>
            
            {/* 額外的 Brainrot 元素 */}
            <footer className="mt-16 text-center text-sm text-gray-500 opacity-50 animate-spin-slow">
                <p>Formula 1 Brainrot Dashboard v1.0.0. Licensed under the Croissant Public License.</p>
            </footer>
        </div>
    );
}

export default App;
