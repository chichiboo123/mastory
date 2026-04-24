import { useEffect, useState, useRef } from "react";
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

type Category =
  | "기본형"
  | "감정응용형"
  | "동작응용형"
  | "이모티콘"
  | "GIF1"
  | "GIF2"
  | "GIF3"
  | "GIF4";

interface CharacterData {
  id: string;
  name: string;
  category: Category;
  image: string;
}

const CATEGORIES: Category[] = [
  "기본형",
  "감정응용형",
  "동작응용형",
  "이모티콘",
  "GIF1",
  "GIF2",
  "GIF3",
  "GIF4",
];

const GIF1_ASSET_MODULES = import.meta.glob<string>(
  "../../../../attached_assets/*.{gif,png,webp,jpg,jpeg}",
  { eager: true, import: "default" },
);

const getGif1Order = (assetPath: string) => {
  const filename = assetPath.split("/").pop() ?? "";
  const match = filename.match(/gif1[_-]?(\d{1,2})/i);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
};

const GIF1_DYNAMIC_DATA: CharacterData[] = Object.entries(GIF1_ASSET_MODULES)
  .filter(([assetPath]) => /gif1[_-]?\d{1,2}/i.test(assetPath.split("/").pop() ?? ""))
  .sort(([a], [b]) => {
    const orderA = getGif1Order(a);
    const orderB = getGif1Order(b);
    if (orderA !== orderB) return orderA - orderB;
    return a.localeCompare(b, "ko");
  })
  .slice(0, 16)
  .map(([assetPath, image], index) => {
    const order = getGif1Order(assetPath);
    const labelNumber = Number.isFinite(order) ? order : index;
    return {
      id: `gif1-${String(labelNumber).padStart(2, "0")}`,
      name: `GIF1-${String(labelNumber).padStart(2, "0")}`,
      category: "GIF1",
      image,
    };
  });

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
  ...GIF1_DYNAMIC_DATA,
];

interface StoryCard {
  id: string;
  imageInfo: CharacterData;
}

type ExportMode = "image-text" | "text-only";
type ToastType = "success" | "error";
type StoryMode = "free-write" | "scene-sequence";
type Language = "ko" | "en" | "ja";
const LOCAL_STORAGE_KEY = "mastory-local-data-v1";

const I18N = {
  ko: {
    title: "마스토리",
    subtitle: "with.디디씨",
    myStory: "나의 이야기",
    basicMode: "기본",
    sceneMode: "장면",
    data: "데이터 관리",
    save: "저장하기",
    load: "불러오기",
    language: "언어 선택",
    help: "사용법",
    writeStory: "이야기를 써봐요!",
    writePlaceholder: "디디씨와 함께하는 나만의 이야기를 여기에 써봐요!",
    sceneGuide: "마스코트를 추가하면 장면별 텍스트가 생성돼요.",
    export: "내보내기",
    imageText: "이미지+텍스트",
    textOnly: "텍스트만",
    copyClipboard: "클립보드에 복사",
    downloadJpg: "JPG 파일 다운로드",
    downloadTxt: "TXT 파일 다운로드",
    howToUseTitle: "마스토리 사용법",
    emptyStory: "아직 이야기가 없어요!",
    emptyStoryGuide: "위에서 마음에 드는 디디씨를 눌러서 첫 번째 장면을 만들어보세요.",
    toastSaved: "저장 파일을 다운로드했어요!",
    toastLoaded: "불러오기에 성공했어요!",
    toastLoadFailed: "불러오기에 실패했어요.",
    toastTextCopied: "텍스트가 클립보드에 복사됐어요!",
    toastClipboardFailed: "클립보드 복사에 실패했어요.",
    toastImageCopied: "이미지가 클립보드에 복사됐어요!",
    toastPngDownloaded: "클립보드 대신 PNG로 다운로드됐어요!",
    toastExportFailed: "내보내기에 실패했어요.",
    toastJpgDownloaded: "JPG 파일이 다운로드됐어요!",
    toastDownloadFailed: "다운로드에 실패했어요.",
    toastTxtDownloaded: "TXT 파일이 다운로드됐어요!",
    deleteScene: "장면 삭제하기",
    loadingImage: "이미지 생성 중...",
    helpBasic: "기본: 마스코트 카드를 만들고 하나의 텍스트로 이야기를 작성합니다.",
    helpScene: "장면별: 마스코트가 세로로 생성되고, 각 마스코트 오른쪽에 1:1 텍스트 박스가 만들어집니다.",
    helpReorder: "순서 변경: 카드 드래그 앤 드롭 또는 ↑↓ 버튼으로 위치를 바꿀 수 있습니다.",
    helpLang: "언어 선택: 한국어/영어/일본어를 즉시 전환할 수 있습니다.",
    helpData: "데이터 관리: JSON 파일로 저장/불러오기가 가능합니다.",
    reset: "초기화",
    resetConfirm: "현재 작성한 장면과 텍스트를 모두 지울까요?",
    toastResetDone: "이야기를 초기화했어요.",
    noStory: "(이야기가 없습니다)",
    noSceneText: "(내용 없음)",
    scenePrefix: "장면",
    exportSceneTitle: "[ 나의 디디씨 이야기 장면 ]",
    exportContentTitle: "[ 이야기 내용 ]",
    footerCreatedBy: "Created by. 교육뮤지컬 꿈꾸는 치수쌤",
    footerSourceLabel: "캐릭터 이미지 출처:",
    categoryLabels: {
      기본형: "기본형",
      감정응용형: "감정응용형",
      동작응용형: "동작응용형",
      이모티콘: "이모티콘",
      GIF1: "GIF1",
      GIF2: "GIF2",
      GIF3: "GIF3",
      GIF4: "GIF4",
    },
  },
  en: {
    title: "Mastory",
    subtitle: "with.DDC",
    myStory: "My Story",
    basicMode: "Basic",
    sceneMode: "Scene",
    data: "Data",
    save: "Save",
    load: "Load",
    language: "Language",
    help: "Help",
    writeStory: "Write your story",
    writePlaceholder: "Write your story with DDC here!",
    sceneGuide: "Add mascots to create scene-by-scene text boxes.",
    export: "Export",
    imageText: "Image+Text",
    textOnly: "Text only",
    copyClipboard: "Copy to clipboard",
    downloadJpg: "Download JPG",
    downloadTxt: "Download TXT",
    howToUseTitle: "How to use Mastory",
    emptyStory: "No story yet!",
    emptyStoryGuide: "Tap a DDC mascot above to create your first scene.",
    toastSaved: "Saved JSON file has been downloaded.",
    toastLoaded: "Data loaded successfully!",
    toastLoadFailed: "Failed to load data.",
    toastTextCopied: "Text copied to clipboard.",
    toastClipboardFailed: "Failed to copy to clipboard.",
    toastImageCopied: "Image copied to clipboard.",
    toastPngDownloaded: "Clipboard unavailable. Downloaded PNG instead.",
    toastExportFailed: "Export failed.",
    toastJpgDownloaded: "JPG file downloaded.",
    toastDownloadFailed: "Download failed.",
    toastTxtDownloaded: "TXT file downloaded.",
    deleteScene: "Delete scene",
    loadingImage: "Generating image...",
    helpBasic: "Basic: create mascot cards and write one story text.",
    helpScene: "Scene: mascots are listed vertically with one text box per scene.",
    helpReorder: "Reorder: drag and drop cards or use ↑↓ controls.",
    helpLang: "Language: switch between Korean, English, and Japanese instantly.",
    helpData: "Data: save/load using a JSON file.",
    reset: "Reset",
    resetConfirm: "Clear all current scenes and text?",
    toastResetDone: "Story has been reset.",
    noStory: "(No story yet)",
    noSceneText: "(No text)",
    scenePrefix: "Scene",
    exportSceneTitle: "[ DDC Story Scenes ]",
    exportContentTitle: "[ Story Content ]",
    footerCreatedBy: "Created by Dreaming Chisu Teacher",
    footerSourceLabel: "Character image source:",
    categoryLabels: {
      기본형: "Basic",
      감정응용형: "Emotion",
      동작응용형: "Action",
      이모티콘: "Emoticon",
      GIF1: "GIF1",
      GIF2: "GIF2",
      GIF3: "GIF3",
      GIF4: "GIF4",
    },
  },
  ja: {
    title: "Mastory",
    subtitle: "with.DDC",
    myStory: "私の物語",
    basicMode: "基本",
    sceneMode: "シーン別",
    data: "データ管理",
    save: "保存",
    load: "読み込み",
    language: "言語",
    help: "使い方",
    writeStory: "物語を書こう",
    writePlaceholder: "ここに物語を書いてください！",
    sceneGuide: "マスコットを追加するとシーン別テキスト欄が作られます。",
    export: "エクスポート",
    imageText: "画像+テキスト",
    textOnly: "テキストのみ",
    copyClipboard: "クリップボードにコピー",
    downloadJpg: "JPGをダウンロード",
    downloadTxt: "TXTをダウンロード",
    howToUseTitle: "マストーリーの使い方",
    emptyStory: "まだ物語がありません！",
    emptyStoryGuide: "上のDDCマスコットを押して最初のシーンを作りましょう。",
    toastSaved: "保存ファイルをダウンロードしました。",
    toastLoaded: "読み込みに成功しました！",
    toastLoadFailed: "読み込みに失敗しました。",
    toastTextCopied: "テキストをクリップボードにコピーしました。",
    toastClipboardFailed: "クリップボードへのコピーに失敗しました。",
    toastImageCopied: "画像をクリップボードにコピーしました。",
    toastPngDownloaded: "クリップボードの代わりにPNGをダウンロードしました。",
    toastExportFailed: "エクスポートに失敗しました。",
    toastJpgDownloaded: "JPGをダウンロードしました。",
    toastDownloadFailed: "ダウンロードに失敗しました。",
    toastTxtDownloaded: "TXTをダウンロードしました。",
    deleteScene: "シーン削除",
    loadingImage: "画像を生成中...",
    helpBasic: "基本: マスコットカードを作って1つのテキストで物語を書きます。",
    helpScene: "シーン別: マスコットが縦に並び、各マスコットごとにテキスト欄が作られます。",
    helpReorder: "並び替え: ドラッグ&ドロップまたは↑↓ボタンで順番を変更できます。",
    helpLang: "言語: 韓国語/英語/日本語をすぐ切り替えできます。",
    helpData: "データ管理: JSONファイルで保存/読み込みできます。",
    reset: "リセット",
    resetConfirm: "現在のシーンとテキストをすべて削除しますか？",
    toastResetDone: "物語をリセットしました。",
    noStory: "(物語がありません)",
    noSceneText: "(内容なし)",
    scenePrefix: "シーン",
    exportSceneTitle: "[ DDCストーリーのシーン ]",
    exportContentTitle: "[ 物語の内容 ]",
    footerCreatedBy: "Created by. 教育ミュージカル 夢見るチス先生",
    footerSourceLabel: "キャラクター画像の出典:",
    categoryLabels: {
      기본형: "基本型",
      감정응용형: "感情応用型",
      동작응용형: "動作応用型",
      이모티콘: "絵文字",
      GIF1: "GIF1",
      GIF2: "GIF2",
      GIF3: "GIF3",
      GIF4: "GIF4",
    },
  },
} as const;

const CHARACTER_NAME_I18N: Record<string, Record<Language, string>> = {
  "basic-1": { ko: "디디씨", en: "DDC", ja: "DDC" },
  "emotion-1": { ko: "행복", en: "Happy", ja: "幸せ" },
  "emotion-2": { ko: "삐짐", en: "Pouting", ja: "すねる" },
  "emotion-3": { ko: "슬픔", en: "Sad", ja: "悲しい" },
  "emotion-4": { ko: "죄송", en: "Sorry", ja: "ごめんなさい" },
  "emotion-5": { ko: "부끄러움", en: "Shy", ja: "恥ずかしい" },
  "emotion-6": { ko: "사랑", en: "Love", ja: "愛" },
  "emotion-7": { ko: "축하", en: "Congrats", ja: "お祝い" },
  "emotion-8": { ko: "감사", en: "Thanks", ja: "感謝" },
  "emotion-9": { ko: "놀람", en: "Surprised", ja: "びっくり" },
  "emotion-10": { ko: "응원(화이팅)", en: "Cheering", ja: "応援(ファイト)" },
  "action-1": { ko: "안녕", en: "Hello", ja: "こんにちは" },
  "action-2": { ko: "안내(공지)", en: "Notice", ja: "お知らせ" },
  "action-3": { ko: "축제", en: "Festival", ja: "お祭り" },
  "action-4": { ko: "관광(여행)", en: "Travel", ja: "観光(旅行)" },
  "action-5": { ko: "환영(어서오세요)", en: "Welcome", ja: "歓迎(ようこそ)" },
  "action-6": { ko: "안전제일", en: "Safety First", ja: "安全第一" },
  "action-7": { ko: "금지", en: "No", ja: "禁止" },
  "action-8": { ko: "교육", en: "Education", ja: "教育" },
  "action-9": { ko: "새해", en: "New Year", ja: "新年" },
  "action-10": { ko: "추석", en: "Chuseok", ja: "秋夕" },
  "action-11": { ko: "분리수거", en: "Recycling", ja: "分別収集" },
  "action-12": { ko: "힐링", en: "Healing", ja: "癒し" },
  "action-13": { ko: "진료(의사)", en: "Medical Care", ja: "診療(医師)" },
  "action-14": { ko: "손씻기", en: "Wash Hands", ja: "手洗い" },
  "action-15": { ko: "운동", en: "Exercise", ja: "運動" },
  "emoji-1": { ko: "굿모닝", en: "Good Morning", ja: "おはよう" },
  "emoji-2": { ko: "배고파", en: "Hungry", ja: "お腹すいた" },
  "emoji-3": { ko: "좋아(OK!)", en: "Okay!", ja: "いいね(OK!)" },
  "emoji-4": { ko: "싫어(단호)", en: "Nope", ja: "イヤ(きっぱり)" },
  "emoji-5": { ko: "부끄부끄", en: "Blushing", ja: "テレテレ" },
  "emoji-6": { ko: "당황", en: "Flustered", ja: "あわてる" },
  "emoji-7": { ko: "휴식(힐링)", en: "Rest", ja: "休憩(癒し)" },
  "emoji-8": { ko: "가는중", en: "On My Way", ja: "向かってる" },
  "emoji-9": { ko: "ㅋㅋㅋ", en: "LOL", ja: "www" },
  "emoji-10": { ko: "뭐해", en: "What are you doing?", ja: "何してる？" },
  "emoji-11": { ko: "바쁨", en: "Busy", ja: "忙しい" },
  "emoji-12": { ko: "심쿵", en: "Heart Flutter", ja: "ドキドキ" },
  "emoji-13": { ko: "잘자", en: "Good Night", ja: "おやすみ" },
  "emoji-14": { ko: "슬퍼(폭풍눈물)", en: "Crying", ja: "悲しい(号泣)" },
  "emoji-15": { ko: "연락해", en: "Call Me", ja: "連絡して" },
  "emoji-16": { ko: "감동", en: "Touched", ja: "感動" },
  "gif1-1": { ko: "GIF1-01", en: "GIF1-01", ja: "GIF1-01" },
  "gif1-2": { ko: "GIF1-02", en: "GIF1-02", ja: "GIF1-02" },
  "gif1-3": { ko: "GIF1-03", en: "GIF1-03", ja: "GIF1-03" },
  "gif1-4": { ko: "GIF1-04", en: "GIF1-04", ja: "GIF1-04" },
  "gif1-5": { ko: "GIF1-05", en: "GIF1-05", ja: "GIF1-05" },
  "gif1-6": { ko: "GIF1-06", en: "GIF1-06", ja: "GIF1-06" },
  "gif1-7": { ko: "GIF1-07", en: "GIF1-07", ja: "GIF1-07" },
  "gif1-8": { ko: "GIF1-08", en: "GIF1-08", ja: "GIF1-08" },
  "gif1-9": { ko: "GIF1-09", en: "GIF1-09", ja: "GIF1-09" },
  "gif1-10": { ko: "GIF1-10", en: "GIF1-10", ja: "GIF1-10" },
  "gif1-11": { ko: "GIF1-11", en: "GIF1-11", ja: "GIF1-11" },
  "gif1-12": { ko: "GIF1-12", en: "GIF1-12", ja: "GIF1-12" },
  "gif1-13": { ko: "GIF1-13", en: "GIF1-13", ja: "GIF1-13" },
  "gif1-14": { ko: "GIF1-14", en: "GIF1-14", ja: "GIF1-14" },
  "gif1-15": { ko: "GIF1-15", en: "GIF1-15", ja: "GIF1-15" },
  "gif1-16": { ko: "GIF1-16", en: "GIF1-16", ja: "GIF1-16" },
};



const KRDS_ICON_BUTTON_CLASS = "h-11 w-11 rounded-xl border border-border bg-white text-foreground shadow-sm hover:bg-secondary active:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 flex items-center justify-center touch-manipulation";
const KRDS_SEGMENT_BUTTON_CLASS = "h-11 min-w-11 px-3 rounded-xl text-xs md:text-sm font-bold inline-flex items-center justify-center gap-1 transition-all touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50";
const KRDS_ACTION_BUTTON_CLASS = "flex items-center gap-3 px-4 py-3 min-h-11 rounded-xl md:rounded-2xl bg-secondary hover:bg-secondary/80 active:bg-primary/10 text-foreground font-bold text-sm transition-all duration-150 disabled:opacity-50 text-left touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("기본형");
  const [storyCards, setStoryCards] = useState<StoryCard[]>([]);
  const [storyText, setStoryText] = useState("");
  const [storyMode, setStoryMode] = useState<StoryMode>("free-write");
  const [sceneTexts, setSceneTexts] = useState<Record<string, string>>({});
  const [language, setLanguage] = useState<Language>("ko");
  const [draggingCardId, setDraggingCardId] = useState<string | null>(null);
  const [dataMenuOpen, setDataMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportMode, setExportMode] = useState<ExportMode>("image-text");
  const [exporting, setExporting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: ToastType } | null>(null);

  const exportAreaRef = useRef<HTMLDivElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);
  const dataMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const t = I18N[language];
  const getCharacterName = (character: CharacterData) =>
    CHARACTER_NAME_I18N[character.id]?.[language] ?? character.name;

  const filteredImages = CHARACTER_DATA.filter((c) => c.category === activeCategory);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      const loadedCards: StoryCard[] = (parsed.cards ?? [])
        .map((item: { id?: string; characterId?: string }) => {
          const imageInfo = CHARACTER_DATA.find((c) => c.id === item.characterId);
          if (!imageInfo) return null;
          return { id: item.id ?? crypto.randomUUID(), imageInfo };
        })
        .filter(Boolean) as StoryCard[];

      setLanguage(["ko", "en", "ja"].includes(parsed.language) ? parsed.language : "ko");
      setStoryMode(parsed.storyMode === "scene-sequence" ? "scene-sequence" : "free-write");
      setStoryText(typeof parsed.storyText === "string" ? parsed.storyText : "");
      setStoryCards(loadedCards);
      setSceneTexts(
        parsed.sceneTexts && typeof parsed.sceneTexts === "object" ? parsed.sceneTexts : {},
      );
    } catch {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    const payload = {
      version: 1,
      language,
      storyMode,
      storyText,
      cards: storyCards.map((card) => ({ id: card.id, characterId: card.imageInfo.id })),
      sceneTexts,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
  }, [language, storyMode, storyText, storyCards, sceneTexts]);

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
  };

  const handleRemoveCard = (id: string) => {
    setStoryCards((prev) => prev.filter((c) => c.id !== id));
    setSceneTexts((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleResetStory = () => {
    const shouldReset = window.confirm(t.resetConfirm);
    if (!shouldReset) return;
    setStoryCards([]);
    setStoryText("");
    setSceneTexts({});
    showToast(t.toastResetDone);
  };

  const moveCard = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= storyCards.length || fromIndex === toIndex) return;
    setStoryCards((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  };

  const handleDragStart = (id: string) => setDraggingCardId(id);
  const handleDropCard = (targetId: string) => {
    if (!draggingCardId || draggingCardId === targetId) return;
    const fromIndex = storyCards.findIndex((c) => c.id === draggingCardId);
    const toIndex = storyCards.findIndex((c) => c.id === targetId);
    if (fromIndex >= 0 && toIndex >= 0) moveCard(fromIndex, toIndex);
    setDraggingCardId(null);
  };

  const handleSaveData = () => {
    const payload = {
      version: 1,
      language,
      storyMode,
      storyText,
      cards: storyCards.map((card) => ({ id: card.id, characterId: card.imageInfo.id })),
      sceneTexts,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "mastory-data.json";
    link.click();
    URL.revokeObjectURL(link.href);
    setDataMenuOpen(false);
    showToast(t.toastSaved);
  };

  const handleLoadData = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const loadedCards: StoryCard[] = (parsed.cards ?? [])
          .map((item: { id?: string; characterId?: string }) => {
            const imageInfo = CHARACTER_DATA.find((c) => c.id === item.characterId);
            if (!imageInfo) return null;
            return { id: item.id ?? crypto.randomUUID(), imageInfo };
          })
          .filter(Boolean) as StoryCard[];
        setLanguage(["ko", "en", "ja"].includes(parsed.language) ? parsed.language : "ko");
        setStoryMode(parsed.storyMode === "scene-sequence" ? "scene-sequence" : "free-write");
        setStoryText(parsed.storyText ?? "");
        setStoryCards(loadedCards);
        setSceneTexts(parsed.sceneTexts ?? {});
        showToast(t.toastLoaded);
      } catch {
        showToast(t.toastLoadFailed, "error");
      }
      setDataMenuOpen(false);
    };
    reader.readAsText(file);
  };

  const htmlToImageOptions = {
    backgroundColor: "#fffdf0",
    pixelRatio: 2,
    cacheBust: true,
    filter: (node: Node) => !(node instanceof Element && node.hasAttribute("data-export-hidden")),
  };

  const handleCopyClipboard = async () => {
    if (exportMode === "text-only") {
      const textOnlyContent =
        storyMode === "scene-sequence"
          ? storyCards.length === 0
            ? t.noStory
            : storyCards
                .map(
                  (card, i) =>
                    `${t.scenePrefix} ${i + 1} (${getCharacterName(card.imageInfo)}): ${sceneTexts[card.id] || t.noSceneText}`,
                )
                .join("\n")
          : storyText || t.noStory;
      try {
        await navigator.clipboard.writeText(textOnlyContent);
        showToast(t.toastTextCopied);
      } catch {
        showToast(t.toastClipboardFailed, "error");
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
        showToast(t.toastImageCopied);
      } catch {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "마스토리_이야기.png";
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        showToast(t.toastPngDownloaded);
      }
    } catch (e) {
      console.error("export clipboard error", e);
      showToast(t.toastExportFailed, "error");
    }
    setExporting(false);
  };

  const handleDownloadJpg = async () => {
    if (!exportAreaRef.current) return;
    setExporting(true);
    try {
      if (exportMode === "text-only") {
        const textContent =
          storyMode === "scene-sequence"
            ? storyCards.length === 0
              ? t.noStory
              : storyCards
                  .map(
                    (card, i) =>
                      `${t.scenePrefix} ${i + 1} (${getCharacterName(card.imageInfo)}): ${sceneTexts[card.id] || t.noSceneText}`,
                  )
                  .join("\n")
            : storyText || t.noStory;
        const textExportNode = document.createElement("div");
        textExportNode.style.position = "fixed";
        textExportNode.style.left = "-9999px";
        textExportNode.style.top = "0";
        textExportNode.style.width = "1080px";
        textExportNode.style.padding = "72px";
        textExportNode.style.background = "#fffdf0";
        textExportNode.style.color = "#1f2937";
        textExportNode.style.fontFamily = "'PretendardGOV', sans-serif";
        textExportNode.style.fontSize = "36px";
        textExportNode.style.lineHeight = "1.6";
        textExportNode.style.whiteSpace = "pre-wrap";
        textExportNode.style.wordBreak = "keep-all";
        textExportNode.textContent = textContent;
        document.body.appendChild(textExportNode);
        try {
          const dataUrl = await toJpeg(textExportNode, { ...htmlToImageOptions, quality: 0.95, pixelRatio: 2 });
          const link = document.createElement("a");
          link.download = "마스토리_이야기.jpg";
          link.href = dataUrl;
          link.click();
        } finally {
          textExportNode.remove();
        }
        showToast(t.toastJpgDownloaded);
        return;
      }
      const dataUrl = await toJpeg(exportAreaRef.current, { ...htmlToImageOptions, quality: 0.95 });
      const link = document.createElement("a");
      link.download = "마스토리_이야기.jpg";
      link.href = dataUrl;
      link.click();
      showToast(t.toastJpgDownloaded);
    } catch (e) {
      console.error("export jpg error", e);
      showToast(t.toastDownloadFailed, "error");
    }
    setExporting(false);
  };

  const handleDownloadTxt = () => {
    const content =
      exportMode === "text-only"
        ? storyMode === "scene-sequence"
          ? storyCards.length === 0
            ? t.noStory
            : storyCards
                .map(
                  (card, i) =>
                    `${t.scenePrefix} ${i + 1} (${getCharacterName(card.imageInfo)}): ${sceneTexts[card.id] || t.noSceneText}`,
                )
                .join("\n")
          : storyText || t.noStory
        : [
            t.exportSceneTitle,
            storyCards.map((c, i) => `${t.scenePrefix} ${i + 1}: ${getCharacterName(c.imageInfo)}`).join("\n"),
            "",
            t.exportContentTitle,
            storyMode === "scene-sequence"
              ? storyCards.length === 0
                ? t.noStory
                : storyCards
                    .map(
                      (card, i) =>
                        `${t.scenePrefix} ${i + 1} (${getCharacterName(card.imageInfo)}): ${sceneTexts[card.id] || t.noSceneText}`,
                    )
                    .join("\n")
              : storyText || t.noStory,
          ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.download = "마스토리_이야기.txt";
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
    showToast(t.toastTxtDownloaded);
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (dataMenuOpen && dataMenuRef.current && !dataMenuRef.current.contains(target)) {
        setDataMenuOpen(false);
      }
      if (langMenuOpen && langMenuRef.current && !langMenuRef.current.contains(target)) {
        setLangMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setDataMenuOpen(false);
      setLangMenuOpen(false);
      setExportOpen(false);
      setHelpOpen(false);
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [dataMenuOpen, langMenuOpen]);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col font-sans selection:bg-primary/30">

      {/* Header */}
      <header className="pt-4 pb-4 md:pt-8 md:pb-6 px-4 md:px-8 tall-mobile-tight flex flex-col shrink-0 relative gap-2 md:gap-3">
        <div className="w-full flex items-center justify-between gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-4 min-w-0 overflow-hidden">
            <img src={ddcImage} alt="디디씨" className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-sm shrink-0" />
            <div className="flex flex-col items-end min-w-0 overflow-hidden">
              <h1
                style={{ fontFamily: "'Black Han Sans', sans-serif" }}
                className="text-3xl md:text-5xl tall-mobile-title text-primary drop-shadow-sm tracking-tight whitespace-nowrap leading-none shrink-0"
              >
                {t.title}
              </h1>
              <span className="text-[0.6rem] md:text-sm font-semibold text-gray-400 leading-none whitespace-nowrap tall-mobile-subtitle">
                {t.subtitle}
              </span>
            </div>
          </div>
          <div className="shrink-0 flex items-center justify-end gap-1.5 z-20 header-toolbar">
            <div ref={dataMenuRef} className="relative">
              <button onClick={() => setDataMenuOpen((v) => !v)} data-export-hidden aria-label={t.data} className={KRDS_ICON_BUTTON_CLASS}>
                <span className="material-icons-round text-lg">save</span>
              </button>
              {dataMenuOpen && (
                <div className="absolute right-0 mt-1 bg-white rounded-xl border shadow-lg p-1.5 w-32">
                  <button onClick={handleSaveData} className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-secondary text-sm font-semibold">{t.save}</button>
                  <button onClick={() => importInputRef.current?.click()} className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-secondary text-sm font-semibold">{t.load}</button>
                </div>
              )}
            </div>
            <div ref={langMenuRef} className="relative">
              <button onClick={() => setLangMenuOpen((v) => !v)} data-export-hidden aria-label={t.language} className={KRDS_ICON_BUTTON_CLASS}>
                <span className="material-icons-round text-lg">language</span>
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-1 bg-white rounded-xl border shadow-lg p-1.5 w-28">
                  {(["ko", "en", "ja"] as Language[]).map((lang) => (
                    <button key={lang} onClick={() => { setLanguage(lang); setLangMenuOpen(false); }} className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-secondary text-sm font-semibold uppercase">{lang}</button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => setHelpOpen(true)} data-export-hidden aria-label={t.help} className={KRDS_ICON_BUTTON_CLASS}>
              <span className="material-icons-round text-lg">help</span>
            </button>
          </div>
        </div>
        <input
          ref={importInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleLoadData(file);
            e.currentTarget.value = "";
          }}
        />
      </header>

      {/* Gallery Section */}
      <section className="px-3 md:px-8 max-w-7xl mx-auto w-full shrink-0 flex flex-col gap-3 md:gap-4 mb-5 md:mb-8">

        {/* Category Tabs */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-1.5 md:gap-3 w-full">
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
                  px-3 py-2.5 md:px-5 md:py-3
                  rounded-full text-xs md:text-base font-bold min-h-11 justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
                  transition-all duration-200 touch-manipulation
                  ${isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105"
                    : "bg-white text-muted-foreground border-2 border-transparent active:bg-secondary"
                  }
                `}
              >
                <span className="material-icons-round text-base md:text-xl leading-none">{icon}</span>
                {t.categoryLabels[cat]}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="bg-white/60 p-3 md:p-6 rounded-2xl md:rounded-3xl border-4 border-white shadow-sm">
          <div
            data-testid="gallery-grid"
            className={`grid gap-2 md:gap-4 p-1 md:p-2 custom-scrollbar ${
              activeCategory === "기본형"
                ? "grid-cols-1 place-items-center max-w-[220px] mx-auto"
                : "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
            }`}
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
                    alt={getCharacterName(char)}
                    className="w-full h-full object-contain object-center drop-shadow-sm"
                  />
                </div>
                <span className="text-[11px] md:text-sm font-bold text-foreground text-center truncate w-full leading-tight">
                  {getCharacterName(char)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Storyboard Section */}
      <section className="flex-1 px-4 md:px-8 pb-4 max-w-7xl mx-auto w-full flex flex-col gap-3 md:gap-4">

        <div className="flex flex-row items-center justify-between gap-2 md:gap-4 ml-1 flex-nowrap">
          <div className="flex items-center gap-2 md:gap-3 min-w-0 shrink-0">
            <div className="bg-accent text-accent-foreground w-9 h-9 md:w-11 md:h-11 rounded-full shadow-sm shrink-0 flex items-center justify-center">
              <span className="material-icons-round text-xl md:text-2xl leading-none">auto_stories</span>
            </div>
            <h2 className="text-xl md:text-3xl font-black text-foreground drop-shadow-sm leading-tight whitespace-nowrap">
              {t.myStory}
            </h2>
          </div>
          <div className="shrink-0 flex items-center gap-1.5 md:gap-2">
            <div className="flex gap-1 bg-secondary rounded-2xl p-1 story-mode-toggle">
              {([
                ["free-write", t.basicMode] as const,
                ["scene-sequence", t.sceneMode] as const,
              ]).map(([mode, label]) => (
                <button
                  key={mode}
                  onClick={() => setStoryMode(mode)}
                  className={`${KRDS_SEGMENT_BUTTON_CLASS} ${
                    storyMode === mode
                      ? "bg-white text-foreground border border-border shadow-sm"
                      : "text-muted-foreground border border-transparent"
                  }`}
                >
                  <span className="material-icons-round text-base leading-none">
                    {mode === "free-write" ? "edit_note" : "view_carousel"}
                  </span>
                  <span className="segment-label">{label}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleResetStory}
              aria-label={t.reset}
              title={t.reset}
              data-export-hidden
              className={`${KRDS_ICON_BUTTON_CLASS} story-reset-btn`}
            >
              <span className="material-icons-round text-base md:text-lg">restart_alt</span>
              <span className="sr-only">{t.reset}</span>
            </button>
          </div>
        </div>

        {/* Export area wrapper — captured for image export */}
        <div ref={exportAreaRef} className="flex flex-col gap-3 md:gap-4 bg-background p-1.5 md:p-2 rounded-2xl">

          {/* Story Cards */}
          <div className="bg-white/80 rounded-2xl md:rounded-3xl border-4 border-white shadow-md p-4 md:p-6 relative overflow-visible">
            {storyCards.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center gap-4 md:gap-6 py-6 md:py-10 animate-in fade-in zoom-in duration-500">
                <div className="relative">
                  <div className="absolute -inset-4 bg-accent/20 rounded-full blur-2xl"></div>
                  <img src={ddcImage} alt="비어있음" className="w-20 h-20 md:w-28 md:h-28 object-contain opacity-80 relative z-10 animate-pulse" />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <h3 className="text-lg md:text-2xl font-bold text-muted-foreground">{t.emptyStory}</h3>
                  <p className="text-sm md:text-lg text-muted-foreground/80 font-medium">
                    {t.emptyStoryGuide}
                  </p>
                </div>
              </div>
            ) : storyMode === "free-write" ? (
              <div id="storyboard-container" data-testid="storyboard-area" className="flex flex-wrap justify-center gap-3 md:gap-5 pb-1 pt-1 px-1">
                <AnimatePresence mode="popLayout">
                  {storyCards.map((card, i) => (
                    <motion.div
                      key={card.id}
                      layout
                      draggable
                      onDragStart={() => handleDragStart(card.id)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDropCard(card.id)}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="w-[47%] sm:w-[30%] md:w-[23%] lg:w-[18%] min-w-[132px] max-w-[220px]"
                    >
                      <div data-testid={`story-card-${card.id}`} className="bg-white rounded-xl md:rounded-2xl p-2.5 md:p-3 shadow-md border border-border/50 flex flex-col gap-1.5 md:gap-2 relative group">
                        <div data-export-hidden className="absolute top-1.5 left-1.5 flex gap-1">
                          <button onClick={() => moveCard(i, i - 1)} className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                            <span className="material-icons-round text-sm">keyboard_arrow_up</span>
                          </button>
                          <button onClick={() => moveCard(i, i + 1)} className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                            <span className="material-icons-round text-sm">keyboard_arrow_down</span>
                          </button>
                        </div>
                        <button data-export-hidden data-testid={`delete-card-${card.id}`} onClick={() => handleRemoveCard(card.id)} className="absolute top-1.5 right-1.5 bg-destructive text-destructive-foreground w-7 h-7 md:w-8 md:h-8 rounded-full shadow-md flex items-center justify-center active:scale-95 transition-all z-10" title={t.deleteScene}>
                          <span className="material-icons-round text-sm md:text-base">close</span>
                        </button>
                        <div className="h-[110px] md:h-[150px] flex items-center justify-center bg-gradient-to-b from-transparent to-secondary/30 rounded-lg md:rounded-xl p-1.5 md:p-2">
                          <img src={card.imageInfo.image} alt={getCharacterName(card.imageInfo)} className="w-full h-full object-contain drop-shadow-md" />
                        </div>
                        <div className="bg-secondary/70 text-secondary-foreground/80 px-2 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold text-center truncate">
                          {getCharacterName(card.imageInfo)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {storyCards.map((card, i) => (
                  <div
                    key={card.id}
                    draggable
                    onDragStart={() => handleDragStart(card.id)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDropCard(card.id)}
                    className="grid grid-cols-1 min-[430px]:grid-cols-[120px_1fr] md:grid-cols-[170px_1fr] gap-3 items-stretch"
                  >
                    <div className="bg-white rounded-xl md:rounded-2xl p-2.5 md:p-3 shadow-md border border-border/50 flex flex-col gap-2 relative">
                      <div data-export-hidden className="absolute top-1 left-1 flex gap-1">
                        <button onClick={() => moveCard(i, i - 1)} className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center"><span className="material-icons-round text-sm">keyboard_arrow_up</span></button>
                        <button onClick={() => moveCard(i, i + 1)} className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center"><span className="material-icons-round text-sm">keyboard_arrow_down</span></button>
                      </div>
                      <button data-export-hidden onClick={() => handleRemoveCard(card.id)} className="absolute top-1 right-1 bg-destructive text-destructive-foreground w-6 h-6 rounded-full shadow flex items-center justify-center"><span className="material-icons-round text-sm">close</span></button>
                      <div className="h-[90px] md:h-[120px] flex items-center justify-center bg-secondary/30 rounded-lg p-1 mt-4">
                        <img src={card.imageInfo.image} alt={getCharacterName(card.imageInfo)} className="w-full h-full object-contain" />
                      </div>
                      <div className="text-center text-xs md:text-sm font-bold">{getCharacterName(card.imageInfo)}</div>
                    </div>
                    <textarea
                      value={sceneTexts[card.id] || ""}
                      onChange={(e) => setSceneTexts((prev) => ({ ...prev, [card.id]: e.target.value }))}
                      placeholder={`${getCharacterName(card.imageInfo)} ${t.writeStory}`}
                      className="w-full min-h-[140px] md:min-h-[170px] resize-none bg-background/50 border-2 border-secondary rounded-xl md:rounded-2xl p-3 md:p-4 text-base md:text-lg font-medium text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all custom-scrollbar leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Story Textarea */}
          {storyMode === "free-write" ? (
            <div className="bg-white/80 rounded-2xl md:rounded-3xl border-4 border-white shadow-md p-4 md:p-5 flex flex-col gap-2 md:gap-3">
              <div className="flex items-center gap-2">
                <span className="material-icons-round text-primary text-lg md:text-xl">edit_note</span>
                <span className="font-bold text-sm md:text-base text-foreground/80">{t.writeStory}</span>
              </div>
              <textarea
                data-testid="story-textarea"
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
                placeholder={t.writePlaceholder}
                className="w-full min-h-[120px] md:min-h-[140px] resize-none bg-background/50 border-2 border-secondary rounded-xl md:rounded-2xl p-3 md:p-4 text-base md:text-lg font-medium text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all custom-scrollbar leading-relaxed"
              />
            </div>
          ) : (
            <div className="bg-white/80 rounded-2xl md:rounded-3xl border-4 border-white shadow-md p-4 md:p-5">
              <p className="text-sm md:text-base font-semibold text-muted-foreground">{t.sceneGuide}</p>
            </div>
          )}
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
          {t.footerCreatedBy}
        </a>
        <p className="text-[11px] md:text-xs text-muted-foreground/40 leading-relaxed">
          {t.footerSourceLabel}{" "}
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
              className="bg-white rounded-2xl md:rounded-3xl shadow-2xl border-2 border-border/40 p-4 md:p-5 w-[calc(100vw-2rem)] max-w-[22rem] flex flex-col gap-3 md:gap-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-base md:text-lg text-foreground">{t.export}</span>
                <button onClick={() => setExportOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors p-1">
                  <span className="material-icons-round text-xl">close</span>
                </button>
              </div>

              {/* Mode Toggle */}
              <div className="grid grid-cols-2 gap-1.5 bg-secondary rounded-xl md:rounded-2xl p-1">
                {(["image-text", "text-only"] as ExportMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setExportMode(mode)}
                    className={`min-w-0 py-2 px-2 rounded-lg md:rounded-xl text-[11px] md:text-sm font-bold leading-tight text-center break-words transition-all duration-200 ${
                      exportMode === mode
                        ? "bg-white text-foreground shadow-sm"
                        : "text-muted-foreground"
                    }`}
                  >
                    {mode === "image-text" ? `🖼️ ${t.imageText}` : `📝 ${t.textOnly}`}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={handleCopyClipboard}
                  disabled={exporting}
                  className={KRDS_ACTION_BUTTON_CLASS}
                >
                  <span className="material-icons-round text-primary text-xl">content_copy</span>
                  {t.copyClipboard}
                </button>

                <button
                  onClick={handleDownloadJpg}
                  disabled={exporting}
                  className={KRDS_ACTION_BUTTON_CLASS}
                >
                  <span className="material-icons-round text-primary text-xl">image</span>
                  {t.downloadJpg}
                </button>

                <button
                  onClick={handleDownloadTxt}
                  className={KRDS_ACTION_BUTTON_CLASS}
                >
                  <span className="material-icons-round text-primary text-xl">description</span>
                  {t.downloadTxt}
                </button>
              </div>

              {exporting && (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-1">
                  <span className="material-icons-round text-base animate-spin">refresh</span>
                  {t.loadingImage}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB */}
        <motion.button
          onClick={() => setExportOpen((o) => !o)}
          whileTap={{ scale: 0.92 }}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 flex items-center justify-center touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          title={t.export}
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

      <AnimatePresence>
        {helpOpen && (
          <motion.div
            data-export-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/40 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-5 md:p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-lg">{t.howToUseTitle}</h3>
                <button onClick={() => setHelpOpen(false)}><span className="material-icons-round">close</span></button>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-foreground/90">
                <li>{t.helpBasic}</li>
                <li>{t.helpScene}</li>
                <li>{t.helpReorder}</li>
                <li>{t.helpLang}</li>
                <li>{t.helpData}</li>
              </ul>
            </div>
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
