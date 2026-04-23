import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toJpeg, toBlob } from "html-to-image";
import ddcImage from "@assets/cnt_76_DDC_1776911486802.png";
import emotion01 from "@assets/감정응용형_01_행복_1776912123380.png";
import emotion02 from "@assets/감정응용형_02_삐짐_1776912123381.png";
import emotion03 from "@assets/감정응용형_03_슬픔_1776912123381.png";
import emotion04 from "@assets/감정응용형_04_죄송_1776912123381.png";
import emotion05 from "@assets/감정응용형_05_부끄러움_1776912123382.png";
import emotion06 from "@assets/감정응용형_06_사랑_1776912123382.png";
import emotion07 from "@assets/감정응용형_07_축하_1776912123383.png";
import emotion08 from "@assets/감정응용형_08_감사_1776912123383.png";
import emotion09 from "@assets/감정응용형_09_놀람_1776912123383.png";
import emotion10 from "@assets/감정응용형_10_응원(화이팅)_1776912123384.png";
import action01 from "@assets/동작응용형_01_안녕_1776912166267.png";
import action02 from "@assets/동작응용형_02_안내(공지)_1776912166268.png";
import action03 from "@assets/동작응용형_03_축제_1776912166269.png";
import action04 from "@assets/동작응용형_04_관광(여행)_1776912166269.png";
import action05 from "@assets/동작응용형_05_환영(어서오세요)_1776912166269.png";
import action06 from "@assets/동작응용형_06_안전제일_1776912166270.png";
import action07 from "@assets/동작응용형_07_금지_1776912166270.png";
import action08 from "@assets/동작응용형_08_교육_1776912166270.png";
import action09 from "@assets/동작응용형_09_새해_1776912166271.png";
import action10 from "@assets/동작응용형_10_추석_1776912166271.png";
import action11 from "@assets/동작응용형_11_분리수거_1776912166271.png";
import action12 from "@assets/동작응용형_12_힐링_1776912166272.png";
import action13 from "@assets/동작응용형_13_진료(의사)_1776912166272.png";
import action14 from "@assets/동작응용형_14_손씻기_1776912166272.png";
import action15 from "@assets/동작응용형_15_운동_1776912166273.png";
import emoji01 from "@assets/이모티콘형_01_굿모닝_1776912491607.png";
import emoji02 from "@assets/이모티콘형_02_배고파_1776912491607.png";
import emoji03 from "@assets/이모티콘형_03_좋아(OK!)_1776912491607.png";
import emoji04 from "@assets/이모티콘형_04_싫어(단호)_1776912491607.png";
import emoji05 from "@assets/이모티콘형_05_부끄부끄_1776912491608.png";
import emoji06 from "@assets/이모티콘형_06_당황_1776912491608.png";
import emoji07 from "@assets/이모티콘형_07_휴식(힐링)_1776912491608.png";
import emoji08 from "@assets/이모티콘형_08_가는중_1776912491608.png";
import emoji09 from "@assets/이모티콘형_09_ㅋㅋㅋ_1776912491609.png";
import emoji10 from "@assets/이모티콘형_10_뭐해_1776912491609.png";
import emoji11 from "@assets/이모티콘형_11_바쁨_1776912491609.png";
import emoji12 from "@assets/이모티콘형_12_심쿵_1776912491609.png";
import emoji13 from "@assets/이모티콘형_13_잘자_1776912491609.png";
import emoji14 from "@assets/이모티콘형_14_슬퍼(폭풍눈물)_1776912491610.png";
import emoji15 from "@assets/이모티콘형_15_연락해_1776912491610.png";
import emoji16 from "@assets/이모티콘형_16_감동_1776912491610.png";

type Category = "기본형" | "감정응용형" | "동작응용형" | "이모티콘";

interface CharacterData {
  id: string;
  name: string;
  category: Category;
  image: string;
}

const CATEGORIES: Category[] = ["기본형", "감정응용형", "동작응용형", "이모티콘"];

const CHARACTER_DATA: CharacterData[] = [
  { id: "basic-1", name: "디디씨", category: "기본형", image: ddcImage },

  { id: "emotion-1",  name: "행복",         category: "감정응용형", image: emotion01 },
  { id: "emotion-2",  name: "삐짐",         category: "감정응용형", image: emotion02 },
  { id: "emotion-3",  name: "슬픔",         category: "감정응용형", image: emotion03 },
  { id: "emotion-4",  name: "죄송",         category: "감정응용형", image: emotion04 },
  { id: "emotion-5",  name: "부끄러움",     category: "감정응용형", image: emotion05 },
  { id: "emotion-6",  name: "사랑",         category: "감정응용형", image: emotion06 },
  { id: "emotion-7",  name: "축하",         category: "감정응용형", image: emotion07 },
  { id: "emotion-8",  name: "감사",         category: "감정응용형", image: emotion08 },
  { id: "emotion-9",  name: "놀람",         category: "감정응용형", image: emotion09 },
  { id: "emotion-10", name: "응원(화이팅)", category: "감정응용형", image: emotion10 },

  { id: "action-1",  name: "안녕",             category: "동작응용형", image: action01 },
  { id: "action-2",  name: "안내(공지)",        category: "동작응용형", image: action02 },
  { id: "action-3",  name: "축제",             category: "동작응용형", image: action03 },
  { id: "action-4",  name: "관광(여행)",        category: "동작응용형", image: action04 },
  { id: "action-5",  name: "환영(어서오세요)", category: "동작응용형", image: action05 },
  { id: "action-6",  name: "안전제일",          category: "동작응용형", image: action06 },
  { id: "action-7",  name: "금지",             category: "동작응용형", image: action07 },
  { id: "action-8",  name: "교육",             category: "동작응용형", image: action08 },
  { id: "action-9",  name: "새해",             category: "동작응용형", image: action09 },
  { id: "action-10", name: "추석",             category: "동작응용형", image: action10 },
  { id: "action-11", name: "분리수거",          category: "동작응용형", image: action11 },
  { id: "action-12", name: "힐링",             category: "동작응용형", image: action12 },
  { id: "action-13", name: "진료(의사)",        category: "동작응용형", image: action13 },
  { id: "action-14", name: "손씻기",           category: "동작응용형", image: action14 },
  { id: "action-15", name: "운동",             category: "동작응용형", image: action15 },

  { id: "emoji-1",  name: "굿모닝",       category: "이모티콘", image: emoji01 },
  { id: "emoji-2",  name: "배고파",       category: "이모티콘", image: emoji02 },
  { id: "emoji-3",  name: "좋아(OK!)",   category: "이모티콘", image: emoji03 },
  { id: "emoji-4",  name: "싫어(단호)",  category: "이모티콘", image: emoji04 },
  { id: "emoji-5",  name: "부끄부끄",    category: "이모티콘", image: emoji05 },
  { id: "emoji-6",  name: "당황",        category: "이모티콘", image: emoji06 },
  { id: "emoji-7",  name: "휴식(힐링)", category: "이모티콘", image: emoji07 },
  { id: "emoji-8",  name: "가는중",      category: "이모티콘", image: emoji08 },
  { id: "emoji-9",  name: "ㅋㅋㅋ",     category: "이모티콘", image: emoji09 },
  { id: "emoji-10", name: "뭐해",        category: "이모티콘", image: emoji10 },
  { id: "emoji-11", name: "바쁨",        category: "이모티콘", image: emoji11 },
  { id: "emoji-12", name: "심쿵",        category: "이모티콘", image: emoji12 },
  { id: "emoji-13", name: "잘자",        category: "이모티콘", image: emoji13 },
  { id: "emoji-14", name: "슬퍼(폭풍눈물)", category: "이모티콘", image: emoji14 },
  { id: "emoji-15", name: "연락해",      category: "이모티콘", image: emoji15 },
  { id: "emoji-16", name: "감동",        category: "이모티콘", image: emoji16 },
];

interface StoryCard {
  id: string;
  imageInfo: CharacterData;
}

type ExportMode = "image-text" | "text-only";
type ToastType = "success" | "error";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("기본형");
  const [storyCards, setStoryCards] = useState<StoryCard[]>([]);
  const [storyText, setStoryText] = useState("");
  const [exportOpen, setExportOpen] = useState(false);
  const [exportMode, setExportMode] = useState<ExportMode>("image-text");
  const [exporting, setExporting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: ToastType } | null>(null);

  const exportAreaRef = useRef<HTMLDivElement>(null);

  const filteredImages = CHARACTER_DATA.filter((c) => c.category === activeCategory);

  const showToast = (msg: string, type: ToastType = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleAddCard = (char: CharacterData) => {
    const newCard: StoryCard = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      imageInfo: char,
    };
    setStoryCards((prev) => [...prev, newCard]);
    setTimeout(() => {
      const el = document.getElementById("storyboard-container");
      if (el) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    }, 100);
  };

  const handleRemoveCard = (id: string) => {
    setStoryCards((prev) => prev.filter((c) => c.id !== id));
  };

  const htmlToImageOptions = {
    backgroundColor: "#fffdf0",
    pixelRatio: 2,
    cacheBust: true,
  };

  const handleCopyClipboard = async () => {
    if (exportMode === "text-only") {
      try {
        await navigator.clipboard.writeText(storyText || "(이야기가 없습니다)");
        showToast("텍스트가 클립보드에 복사됐어요!");
      } catch {
        showToast("클립보드 복사에 실패했어요.", "error");
      }
      return;
    }
    if (!exportAreaRef.current) return;
    setExporting(true);
    try {
      const blob = await toBlob(exportAreaRef.current, htmlToImageOptions);
      if (!blob) throw new Error("blob null");
      try {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        showToast("이미지가 클립보드에 복사됐어요!");
      } catch {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "마스토리_이야기.png";
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        showToast("클립보드 대신 PNG로 다운로드됐어요!");
      }
    } catch (e) {
      console.error("export clipboard error", e);
      showToast("내보내기에 실패했어요.", "error");
    }
    setExporting(false);
  };

  const handleDownloadJpg = async () => {
    if (!exportAreaRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toJpeg(exportAreaRef.current, { ...htmlToImageOptions, quality: 0.95 });
      const link = document.createElement("a");
      link.download = "마스토리_이야기.jpg";
      link.href = dataUrl;
      link.click();
      showToast("JPG 파일이 다운로드됐어요!");
    } catch (e) {
      console.error("export jpg error", e);
      showToast("다운로드에 실패했어요.", "error");
    }
    setExporting(false);
  };

  const handleDownloadTxt = () => {
    const content =
      exportMode === "text-only"
        ? storyText || "(이야기가 없습니다)"
        : [
            "[ 나의 디디씨 이야기 장면 ]",
            storyCards.map((c, i) => `장면 ${i + 1}: ${c.imageInfo.name}`).join("\n"),
            "",
            "[ 이야기 내용 ]",
            storyText || "(이야기가 없습니다)",
          ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.download = "마스토리_이야기.txt";
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
    showToast("TXT 파일이 다운로드됐어요!");
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col font-sans selection:bg-primary/30">

      {/* Header */}
      <header className="pt-6 pb-4 md:pt-8 md:pb-6 px-3 md:px-8 flex flex-col items-center justify-center shrink-0">
        <div className="flex items-center gap-3 md:gap-4 mb-1 md:mb-2">
          <img src={ddcImage} alt="디디씨" className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-sm" />
          <h1
            style={{ fontFamily: "'Black Han Sans', sans-serif" }}
            className="text-3xl md:text-5xl text-primary drop-shadow-sm tracking-tight"
          >
            마스토리
          </h1>
        </div>
        <p className="text-sm md:text-xl font-bold text-muted-foreground/80 text-center px-4">
          디디씨와 함께 나만의 동화책을 만들어보아요!
        </p>
      </header>

      {/* Gallery Section */}
      <section className="px-3 md:px-8 max-w-7xl mx-auto w-full shrink-0 flex flex-col gap-3 md:gap-4 mb-5 md:mb-8">

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-1.5 md:gap-3 flex-wrap">
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
                  flex items-center gap-1.5 md:gap-2
                  px-3 py-2 md:px-5 md:py-3
                  rounded-full text-xs md:text-base font-bold
                  transition-all duration-200 touch-manipulation
                  ${isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105"
                    : "bg-white text-muted-foreground border-2 border-transparent active:bg-secondary"
                  }
                `}
              >
                <span className="material-icons-round text-base md:text-xl leading-none">{icon}</span>
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="bg-white/60 p-3 md:p-6 rounded-2xl md:rounded-3xl border-4 border-white shadow-sm">
          <div
            data-testid="gallery-grid"
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-4 overflow-y-auto max-h-[240px] md:max-h-[300px] p-1 md:p-2 custom-scrollbar"
          >
            {filteredImages.map((char) => (
              <button
                key={char.id}
                data-testid={`image-card-${char.id}`}
                onClick={() => handleAddCard(char)}
                className="group flex flex-col items-center gap-1.5 md:gap-2 bg-white p-2 md:p-3 rounded-xl md:rounded-2xl border-2 border-transparent active:border-primary/50 shadow-sm active:shadow-md transition-all duration-150 touch-manipulation active:scale-95"
              >
                <div className="w-full aspect-square flex items-center justify-center bg-secondary/50 rounded-lg md:rounded-xl overflow-hidden group-hover:bg-primary/10 transition-colors">
                  <img
                    src={char.image}
                    alt={char.name}
                    className="w-full h-full object-contain object-center drop-shadow-sm"
                  />
                </div>
                <span className="text-[11px] md:text-sm font-bold text-foreground text-center truncate w-full leading-tight">
                  {char.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Storyboard Section */}
      <section className="flex-1 px-3 md:px-8 pb-4 max-w-7xl mx-auto w-full flex flex-col gap-3 md:gap-4">

        <div className="flex items-center gap-2 md:gap-3 ml-1">
          <div className="bg-accent text-accent-foreground p-1.5 md:p-2 rounded-full shadow-sm">
            <span className="material-icons-round text-xl md:text-2xl block">auto_stories</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-foreground drop-shadow-sm">
            나의 이야기
          </h2>
        </div>

        {/* Export area wrapper — captured for image export */}
        <div ref={exportAreaRef} className="flex flex-col gap-3 md:gap-4 bg-background p-1.5 md:p-2 rounded-2xl">

          {/* Story Cards Row */}
          <div className="bg-white/80 rounded-2xl md:rounded-3xl border-4 border-white shadow-md p-4 md:p-6 relative overflow-hidden">
            {storyCards.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center gap-4 md:gap-6 py-6 md:py-10 animate-in fade-in zoom-in duration-500">
                <div className="relative">
                  <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl"></div>
                  <img src={ddcImage} alt="비어있음" className="w-20 h-20 md:w-28 md:h-28 object-contain opacity-80 relative z-10 animate-pulse" />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-lg md:text-2xl font-bold text-muted-foreground">아직 이야기가 없어요!</h3>
                  <p className="text-sm md:text-lg text-muted-foreground/80 font-medium">
                    위에서 마음에 드는 디디씨를 눌러서<br />
                    첫 번째 장면을 만들어보세요.
                  </p>
                </div>
              </div>
            ) : (
              <div
                id="storyboard-container"
                data-testid="storyboard-area"
                className="flex flex-row gap-3 md:gap-5 overflow-x-auto pb-3 pt-1 px-1 custom-scrollbar snap-x"
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
                      className="shrink-0 w-[130px] md:w-[180px] snap-center"
                    >
                      <div
                        data-testid={`story-card-${card.id}`}
                        className="bg-white rounded-xl md:rounded-2xl p-2.5 md:p-3 shadow-md border border-border/50 flex flex-col gap-1.5 md:gap-2 relative group"
                      >
                        <button
                          data-testid={`delete-card-${card.id}`}
                          onClick={() => handleRemoveCard(card.id)}
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground w-7 h-7 md:w-8 md:h-8 rounded-full shadow-md flex items-center justify-center active:scale-95 transition-all z-10"
                          title="장면 삭제하기"
                        >
                          <span className="material-icons-round text-sm md:text-base">close</span>
                        </button>
                        <div className="h-[110px] md:h-[150px] flex items-center justify-center bg-gradient-to-b from-transparent to-secondary/30 rounded-lg md:rounded-xl p-1.5 md:p-2">
                          <img
                            src={card.imageInfo.image}
                            alt={card.imageInfo.name}
                            className="w-full h-full object-contain drop-shadow-md"
                          />
                        </div>
                        <div className="bg-secondary/70 text-secondary-foreground/80 px-2 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold text-center truncate">
                          {card.imageInfo.name}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Shared Story Textarea */}
          <div className="bg-white/80 rounded-2xl md:rounded-3xl border-4 border-white shadow-md p-4 md:p-5 flex flex-col gap-2 md:gap-3">
            <div className="flex items-center gap-2">
              <span className="material-icons-round text-primary text-lg md:text-xl">edit_note</span>
              <span className="font-bold text-sm md:text-base text-foreground/80">이야기를 써봐요!</span>
            </div>
            <textarea
              data-testid="story-textarea"
              value={storyText}
              onChange={(e) => setStoryText(e.target.value)}
              placeholder="디디씨와 함께하는 나만의 이야기를 여기에 써봐요!"
              className="w-full min-h-[120px] md:min-h-[140px] resize-none bg-background/50 border-2 border-secondary rounded-xl md:rounded-2xl p-3 md:p-4 text-base md:text-lg font-medium text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all custom-scrollbar leading-relaxed"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5 px-4 text-center shrink-0 flex flex-col items-center gap-1.5 md:gap-2 pb-24 md:pb-6">
        <a
          href="https://litt.ly/chichiboo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-muted-foreground/60 hover:text-primary transition-colors duration-200 underline-offset-4 hover:underline"
        >
          <span className="material-icons-round text-sm md:text-base">favorite</span>
          Created by. 교육뮤지컬 꿈꾸는 치수쌤
        </a>
        <p className="text-[11px] md:text-xs text-muted-foreground/40 leading-relaxed">
          캐릭터 이미지 출처:{" "}
          <a
            href="https://www.ddc.go.kr/ddc/contents.do?key=76"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-muted-foreground/70 transition-colors"
          >
            동두천시 누리집
          </a>
        </p>
      </footer>

      {/* Floating Export Button */}
      <div className="fixed bottom-5 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {exportOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl md:rounded-3xl shadow-2xl border-2 border-border/40 p-4 md:p-5 w-[calc(100vw-2rem)] max-w-[17rem] flex flex-col gap-3 md:gap-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-base md:text-lg text-foreground">내보내기</span>
                <button onClick={() => setExportOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors p-1">
                  <span className="material-icons-round text-xl">close</span>
                </button>
              </div>

              {/* Mode Toggle */}
              <div className="flex gap-1.5 bg-secondary rounded-xl md:rounded-2xl p-1">
                {(["image-text", "text-only"] as ExportMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setExportMode(mode)}
                    className={`flex-1 py-2 px-2 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all duration-200 ${
                      exportMode === mode
                        ? "bg-white text-foreground shadow-sm"
                        : "text-muted-foreground"
                    }`}
                  >
                    {mode === "image-text" ? "🖼️ 이미지+텍스트" : "📝 텍스트만"}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={handleCopyClipboard}
                  disabled={exporting}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl md:rounded-2xl bg-secondary active:bg-primary/10 text-foreground font-bold text-sm transition-all duration-150 disabled:opacity-50 text-left touch-manipulation"
                >
                  <span className="material-icons-round text-primary text-xl">content_copy</span>
                  클립보드에 복사
                </button>

                {exportMode === "image-text" && (
                  <button
                    onClick={handleDownloadJpg}
                    disabled={exporting}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl md:rounded-2xl bg-secondary active:bg-primary/10 text-foreground font-bold text-sm transition-all duration-150 disabled:opacity-50 text-left touch-manipulation"
                  >
                    <span className="material-icons-round text-primary text-xl">image</span>
                    JPG 파일 다운로드
                  </button>
                )}

                <button
                  onClick={handleDownloadTxt}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl md:rounded-2xl bg-secondary active:bg-primary/10 text-foreground font-bold text-sm transition-all duration-150 text-left touch-manipulation"
                >
                  <span className="material-icons-round text-primary text-xl">description</span>
                  TXT 파일 다운로드
                </button>
              </div>

              {exporting && (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-1">
                  <span className="material-icons-round text-base animate-spin">refresh</span>
                  이미지 생성 중...
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB */}
        <motion.button
          onClick={() => setExportOpen((o) => !o)}
          whileTap={{ scale: 0.92 }}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 flex items-center justify-center touch-manipulation"
          title="내보내기"
        >
          <span className="material-icons-round text-2xl md:text-3xl">
            {exportOpen ? "close" : "ios_share"}
          </span>
        </motion.button>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-24 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-6 z-50 px-4 py-3 rounded-2xl shadow-lg font-bold text-sm flex items-center gap-2 whitespace-nowrap ${
              toast.type === "error"
                ? "bg-destructive text-destructive-foreground"
                : "bg-foreground text-background"
            }`}
          >
            <span className="material-icons-round text-base">
              {toast.type === "error" ? "error" : "check_circle"}
            </span>
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 8px; width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: hsl(var(--secondary)); border-radius: 100px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: hsl(var(--primary) / 0.5); border-radius: 100px; border: 2px solid hsl(var(--secondary)); }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: hsl(var(--primary)); }
        @media (max-width: 768px) {
          .custom-scrollbar::-webkit-scrollbar { height: 4px; width: 4px; }
        }
      `}</style>
    </div>
  );
}
