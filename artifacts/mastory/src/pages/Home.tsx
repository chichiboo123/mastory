import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ddcImage from "@assets/cnt_76_DDC_1776911486802.png";

type Category = "기본형" | "감정응용형" | "동작응용형" | "이모티콘";

interface CharacterData {
  id: string;
  name: string;
  category: Category;
}

const CATEGORIES: Category[] = ["기본형", "감정응용형", "동작응용형", "이모티콘"];

const CHARACTER_DATA: CharacterData[] = [
  // 기본형 (10)
  { id: "basic-1", name: "기본 서있기 1", category: "기본형" },
  { id: "basic-2", name: "기본 서있기 2", category: "기본형" },
  { id: "basic-3", name: "앉아있기 1", category: "기본형" },
  { id: "basic-4", name: "앉아있기 2", category: "기본형" },
  { id: "basic-5", name: "걷기 1", category: "기본형" },
  { id: "basic-6", name: "걷기 2", category: "기본형" },
  { id: "basic-7", name: "인사하기 1", category: "기본형" },
  { id: "basic-8", name: "인사하기 2", category: "기본형" },
  { id: "basic-9", name: "차렷 자세", category: "기본형" },
  { id: "basic-10", name: "편한 자세", category: "기본형" },
  
  // 감정응용형 (12)
  { id: "emotion-1", name: "행복한 디디씨", category: "감정응용형" },
  { id: "emotion-2", name: "슬픈 디디씨", category: "감정응용형" },
  { id: "emotion-3", name: "화난 디디씨", category: "감정응용형" },
  { id: "emotion-4", name: "놀란 디디씨", category: "감정응용형" },
  { id: "emotion-5", name: "신난 디디씨", category: "감정응용형" },
  { id: "emotion-6", name: "부끄러운 디디씨", category: "감정응용형" },
  { id: "emotion-7", name: "궁금한 디디씨", category: "감정응용형" },
  { id: "emotion-8", name: "자랑스러운 디디씨", category: "감정응용형" },
  { id: "emotion-9", name: "감동한 디디씨", category: "감정응용형" },
  { id: "emotion-10", name: "우울한 디디씨", category: "감정응용형" },
  { id: "emotion-11", name: "피곤한 디디씨", category: "감정응용형" },
  { id: "emotion-12", name: "기대하는 디디씨", category: "감정응용형" },

  // 동작응용형 (12)
  { id: "action-1", name: "뛰는 디디씨", category: "동작응용형" },
  { id: "action-2", name: "점프하는 디디씨", category: "동작응용형" },
  { id: "action-3", name: "손 흔드는 디디씨", category: "동작응용형" },
  { id: "action-4", name: "가리키는 디디씨", category: "동작응용형" },
  { id: "action-5", name: "춤추는 디디씨", category: "동작응용형" },
  { id: "action-6", name: "응원하는 디디씨", category: "동작응용형" },
  { id: "action-7", name: "생각하는 디디씨", category: "동작응용형" },
  { id: "action-8", name: "노래하는 디디씨", category: "동작응용형" },
  { id: "action-9", name: "운동하는 디디씨", category: "동작응용형" },
  { id: "action-10", name: "요리하는 디디씨", category: "동작응용형" },
  { id: "action-11", name: "독서하는 디디씨", category: "동작응용형" },
  { id: "action-12", name: "그림그리는 디디씨", category: "동작응용형" },

  // 이모티콘 (8)
  { id: "emo-1", name: "하트 뿅뿅", category: "이모티콘" },
  { id: "emo-2", name: "별 반짝반짝", category: "이모티콘" },
  { id: "emo-3", name: "최고! 엄지척", category: "이모티콘" },
  { id: "emo-4", name: "쿨쿨 자는중", category: "이모티콘" },
  { id: "emo-5", name: "엉엉 우는중", category: "이모티콘" },
  { id: "emo-6", name: "하하하 웃음", category: "이모티콘" },
  { id: "emo-7", name: "오케이!", category: "이모티콘" },
  { id: "emo-8", name: "메롱~", category: "이모티콘" }
];

interface StoryCard {
  id: string;
  imageInfo: CharacterData;
  text: string;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("기본형");
  const [storyCards, setStoryCards] = useState<StoryCard[]>([]);

  const filteredImages = CHARACTER_DATA.filter((char) => char.category === activeCategory);

  const handleAddCard = (char: CharacterData) => {
    const newCard: StoryCard = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      imageInfo: char,
      text: "",
    };
    setStoryCards([...storyCards, newCard]);
    
    // Scroll to right most after a short delay
    setTimeout(() => {
      const storyboard = document.getElementById("storyboard-container");
      if (storyboard) {
        storyboard.scrollTo({ left: storyboard.scrollWidth, behavior: "smooth" });
      }
    }, 100);
  };

  const handleRemoveCard = (id: string) => {
    setStoryCards(storyCards.filter((card) => card.id !== id));
  };

  const handleTextChange = (id: string, text: string) => {
    setStoryCards(storyCards.map((card) => (card.id === id ? { ...card, text } : card)));
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col font-sans selection:bg-primary/30">
      
      {/* Header */}
      <header className="pt-8 pb-6 px-4 md:px-8 flex flex-col items-center justify-center shrink-0">
        <div className="flex items-center gap-4 mb-2">
          <img src={ddcImage} alt="디디씨" className="w-16 h-16 object-contain drop-shadow-sm" />
          <h1 className="text-4xl md:text-5xl font-black text-primary drop-shadow-sm tracking-tight">
            마스토리
          </h1>
        </div>
        <p className="text-lg md:text-xl font-bold text-muted-foreground/80">
          디디씨와 함께 나만의 동화책을 만들어보아요!
        </p>
      </header>

      {/* Top Section: Gallery */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto w-full shrink-0 flex flex-col gap-4 mb-8">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {CATEGORIES.map((cat) => {
            let icon = "sentiment_satisfied_alt";
            if (cat === "기본형") icon = "emoji_people";
            if (cat === "동작응용형") icon = "directions_run";
            if (cat === "이모티콘") icon = "add_reaction";

            const isActive = activeCategory === cat;
            
            return (
              <button
                key={cat}
                data-testid={`tab-${cat}`}
                onClick={() => setActiveCategory(cat)}
                className={`
                  flex items-center gap-2 px-5 py-3 rounded-full text-base font-bold transition-all duration-200
                  ${isActive 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105" 
                    : "bg-white text-muted-foreground hover:bg-secondary border-2 border-transparent hover:border-primary/20 hover:scale-105"
                  }
                `}
              >
                <span className="material-icons-round text-xl">{icon}</span>
                {cat}
              </button>
            )
          })}
        </div>

        {/* Gallery Grid */}
        <div className="bg-white/60 p-4 md:p-6 rounded-3xl border-4 border-white shadow-sm">
          <div 
            data-testid="gallery-grid"
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4 overflow-y-auto max-h-[300px] p-2 custom-scrollbar"
          >
            {filteredImages.map((char) => (
              <button
                key={char.id}
                data-testid={`image-card-${char.id}`}
                onClick={() => handleAddCard(char)}
                className="group flex flex-col items-center gap-2 bg-white p-3 rounded-2xl border-2 border-transparent hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 hover:-translate-y-1"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-secondary/50 rounded-xl overflow-hidden group-hover:bg-primary/10 transition-colors">
                  <img 
                    src={ddcImage} 
                    alt={char.name} 
                    className="w-full h-full object-contain object-center drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="text-sm font-bold text-foreground text-center truncate w-full px-1">
                  {char.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Section: Storyboard */}
      <section className="flex-1 px-4 md:px-8 pb-8 max-w-7xl mx-auto w-full flex flex-col gap-4">
        
        <div className="flex items-center gap-3 ml-2">
          <div className="bg-accent text-accent-foreground p-2 rounded-full shadow-sm">
            <span className="material-icons-round text-2xl block">auto_stories</span>
          </div>
          <h2 className="text-3xl font-black text-foreground drop-shadow-sm">
            나의 이야기
          </h2>
        </div>

        <div className="flex-1 bg-white/80 rounded-3xl border-4 border-white shadow-md p-6 relative overflow-hidden flex flex-col">
          
          {storyCards.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-12 animate-in fade-in zoom-in duration-500">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl"></div>
                <img src={ddcImage} alt="비어있음" className="w-32 h-32 object-contain opacity-80 relative z-10 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-muted-foreground">아직 이야기가 없어요!</h3>
                <p className="text-lg text-muted-foreground/80 font-medium">
                  위에서 마음에 드는 디디씨를 눌러서<br />
                  첫 번째 장면을 만들어보세요.
                </p>
              </div>
            </div>
          ) : (
            <div 
              id="storyboard-container"
              data-testid="storyboard-area"
              className="flex-1 flex flex-row gap-6 overflow-x-auto pb-4 pt-2 px-2 custom-scrollbar snap-x"
            >
              <AnimatePresence mode="popLayout">
                {storyCards.map((card) => (
                  <motion.div
                    key={card.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="shrink-0 w-[280px] md:w-[320px] snap-center"
                  >
                    <div 
                      data-testid={`story-card-${card.id}`}
                      className="bg-white rounded-[2rem] p-5 shadow-lg border border-border/50 flex flex-col gap-4 h-full relative group"
                    >
                      
                      {/* Delete Button */}
                      <button
                        data-testid={`delete-card-${card.id}`}
                        onClick={() => handleRemoveCard(card.id)}
                        className="absolute -top-3 -right-3 bg-destructive text-destructive-foreground w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all md:opacity-0 md:group-hover:opacity-100 z-10"
                        title="장면 삭제하기"
                      >
                        <span className="material-icons-round">delete_forever</span>
                      </button>

                      {/* Header Badge */}
                      <div className="self-center bg-secondary text-secondary-foreground/80 px-4 py-1.5 rounded-full text-sm font-bold shadow-inner">
                        {card.imageInfo.category} · {card.imageInfo.name}
                      </div>

                      {/* Character Image */}
                      <div className="h-[160px] flex items-center justify-center bg-gradient-to-b from-transparent to-secondary/30 rounded-2xl p-4">
                        <img 
                          src={ddcImage} 
                          alt={card.imageInfo.name} 
                          className="w-full h-full object-contain drop-shadow-md"
                        />
                      </div>

                      {/* Text Area */}
                      <div className="flex-1 flex flex-col">
                        <textarea
                          data-testid={`story-textarea-${card.id}`}
                          value={card.text}
                          onChange={(e) => handleTextChange(card.id, e.target.value)}
                          placeholder="여기에 이야기를 써봐요!"
                          className="w-full flex-1 min-h-[120px] resize-none bg-background/50 border-2 border-secondary rounded-2xl p-4 text-lg font-medium text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all custom-scrollbar leading-relaxed"
                        />
                      </div>

                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

        </div>
      </section>

      <style>{`
        /* Custom Scrollbar for better children UI */
        .custom-scrollbar::-webkit-scrollbar {
          height: 12px;
          width: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--secondary));
          border-radius: 100px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary) / 0.5);
          border-radius: 100px;
          border: 3px solid hsl(var(--secondary));
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary));
        }
      `}</style>
    </div>
  );
}