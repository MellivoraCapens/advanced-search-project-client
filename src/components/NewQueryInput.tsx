import React, { useEffect } from "react";

interface NewQueryInputProps {
  option: string;
  setQuery: React.Dispatch<React.SetStateAction<string | DateRange>>;
}

const NewQueryInput: React.FC<NewQueryInputProps> = ({ option, setQuery }) => {
  const DROPDOWN_ARRAY: string[] = ["hobbies", "role", "languages", "sex"];
  const TEXT_INPUT_ARRAY: string[] = ["name", "email", "company"];
  const DATE_INPUT_ARRAY: string[] = ["birthdate", "createdAt"];

  const [dateRange, setDateRange] = React.useState<DateRange>({
    from: null,
    to: null,
  });

  useEffect(() => {
    if (DATE_INPUT_ARRAY.includes(option)) {
      setQuery(dateRange);
    }
  }, [dateRange]);

  if (DROPDOWN_ARRAY.includes(option)) {
    let selectionArray: string[] = [];
    const HOBBIES = [
      "3D printing",
      "Amateur radio",
      "Scrapbook",
      "Acting",
      "Baton twirling",
      "Board games",
      "Book restoration",
      "Cabaret",
      "Calligraphy",
      "Candle making",
      "Computer programming",
      "Coffee roasting",
      "Cooking",
      "Colouring",
      "Cosplaying",
      "Couponing",
      "Creative writing",
      "Crocheting",
      "Cryptography",
      "Dance",
      "Digital arts",
      "Drama",
      "Drawing",
      "Do it yourself",
      "Electronics",
      "Embroidery",
      "Fashion",
      "Flower arranging",
      "Foreign language learning",
      "Gaming",
      "Tabletop games",
      "Role-playing games",
      "Gambling",
      "Genealogy",
      "Glassblowing",
      "Gunsmithing",
      "Homebrewing",
      "Ice skating",
      "Jewelry making",
      "Jigsaw puzzles",
      "Juggling",
      "Knapping",
      "Knitting",
      "Kabaddi",
      "Knife making",
      "Lacemaking",
      "Lapidary",
      "Leather crafting",
      "Lego building",
      "Lockpicking",
      "Machining",
      "Macrame",
      "Metalworking",
      "Magic",
      "Model building",
      "Listening to music",
      "Origami",
      "Painting",
      "Playing musical instruments",
      "Pet",
      "Poi",
      "Pottery",
      "Puzzles",
      "Quilting",
      "Reading",
      "Scrapbooking",
      "Sculpting",
      "Sewing",
      "Singing",
      "Sketching",
      "Soapmaking",
      "Sports",
      "Stand-up comedy",
      "Sudoku",
      "Table tennis",
      "Taxidermy",
      "Video gaming",
      "Watching movies",
      "Web surfing",
      "Whittling",
      "Wood carving",
      "Woodworking",
      "World Building",
      "Writing",
      "Yoga",
      "Yo-yoing",
      "Air sports",
      "Archery",
      "Astronomy",
      "Backpacking",
      "Base jumping",
      "Baseball",
      "Basketball",
      "Beekeeping",
      "Bird watching",
      "Blacksmithing",
      "Board sports",
      "Bodybuilding",
      "Brazilian jiu-jitsu",
      "Community",
      "Cycling",
      "Dowsing",
      "Driving",
      "Fishing",
      "Flag football",
      "Flying",
      "Flying disc",
      "Foraging",
      "Gardening",
      "Geocaching",
      "Ghost hunting",
      "Graffiti",
      "Handball",
      "Hiking",
      "Hooping",
      "Horseback riding",
      "Hunting",
      "Inline skating",
      "Jogging",
      "Kayaking",
      "Kite flying",
      "Kitesurfing",
      "Larping",
      "Letterboxing",
      "Metal detecting",
      "Motor sports",
      "Mountain biking",
      "Mountaineering",
      "Mushroom hunting",
      "Mycology",
      "Netball",
      "Nordic skating",
      "Orienteering",
      "Paintball",
      "Parkour",
      "Photography",
      "Polo",
      "Rafting",
      "Rappelling",
      "Rock climbing",
      "Roller skating",
      "Rugby",
      "Running",
      "Sailing",
      "Sand art",
      "Scouting",
      "Scuba diving",
      "Sculling",
      "Rowing",
      "Shooting",
      "Shopping",
      "Skateboarding",
      "Skiing",
      "Skim Boarding",
      "Skydiving",
      "Slacklining",
      "Snowboarding",
      "Stone skipping",
      "Surfing",
      "Swimming",
      "Taekwondo",
      "Tai chi",
      "Urban exploration",
      "Vacation",
      "Vehicle restoration",
      "Water sports",
    ];
    const ROLE_ARRAY = [
      "Product Manager",
      "Product Owner",
      "Business Analyst",
      "Engineering Manager",
      "Software Architect",
      "Software Developers",
      "UX/UI Designers",
      "QA Engineer",
      "Scrum Master",
      "Tester",
      "Team Lead",
      "Tech Lead",
    ];
    const LANGUAGES = [
      "Abkhazian",
      "Afar",
      "Afrikaans",
      "Akan",
      "Albanian",
      "Amharic",
      "Arabic",
      "Aragonese",
      "Armenian",
      "Assamese",
      "Avaric",
      "Avestan",
      "Aymara",
      "Azerbaijani",
      "Bambara",
      "Bashkir",
      "Basque",
      "Belarusian",
      "Bengali",
      "Bihari languages",
      "Bislama",
      "Bosnian",
      "Breton",
      "Bulgarian",
      "Burmese",
      "Catalan, Valencian",
      "Central Khmer",
      "Chamorro",
      "Chechen",
      "Chichewa, Chewa, Nyanja",
      "Chinese",
      "Church Slavonic, Old Bulgarian, Old Church Slavonic",
      "Chuvash",
      "Cornish",
      "Corsican",
      "Cree",
      "Croatian",
      "Czech",
      "Danish",
      "Divehi, Dhivehi, Maldivian",
      "Dutch, Flemish",
      "Dzongkha",
      "English",
      "Esperanto",
      "Estonian",
      "Ewe",
      "Faroese",
      "Fijian",
      "Finnish",
      "French",
      "Fulah",
      "Gaelic, Scottish Gaelic",
      "Galician",
      "Ganda",
      "Georgian",
      "German",
      "Gikuyu, Kikuyu",
      "Greek (Modern)",
      "Greenlandic, Kalaallisut",
      "Guarani",
      "Gujarati",
      "Haitian, Haitian Creole",
      "Hausa",
      "Hebrew",
      "Herero",
      "Hindi",
      "Hiri Motu",
      "Hungarian",
      "Icelandic",
      "Ido",
      "Igbo",
      "Indonesian",
      "Interlingua (International Auxiliary Language Association)",
      "Interlingue",
      "Inuktitut",
      "Inupiaq",
      "Irish",
      "Italian",
      "Japanese",
      "Javanese",
      "Kannada",
      "Kanuri",
      "Kashmiri",
      "Kazakh",
      "Kinyarwanda",
      "Komi",
      "Kongo",
      "Korean",
      "Kwanyama, Kuanyama",
      "Kurdish",
      "Kyrgyz",
      "Lao",
      "Latin",
      "Latvian",
      "Letzeburgesch, Luxembourgish",
      "Limburgish, Limburgan, Limburger",
      "Lingala",
      "Lithuanian",
      "Luba-Katanga",
      "Macedonian",
      "Malagasy",
      "Malay",
      "Malayalam",
      "Maltese",
      "Manx",
      "Maori",
      "Marathi",
      "Marshallese",
      "Moldovan, Moldavian, Romanian",
      "Mongolian",
      "Nauru",
      "Navajo, Navaho",
      "Northern Ndebele",
      "Ndonga",
      "Nepali",
      "Northern Sami",
      "Norwegian",
      "Norwegian Bokmål",
      "Norwegian Nynorsk",
      "Nuosu, Sichuan Yi",
      "Occitan (post 1500)",
      "Ojibwa",
      "Oriya",
      "Oromo",
      "Ossetian, Ossetic",
      "Pali",
      "Panjabi, Punjabi",
      "Pashto, Pushto",
      "Persian",
      "Polish",
      "Portuguese",
      "Quechua",
      "Romansh",
      "Rundi",
      "Russian",
      "Samoan",
      "Sango",
      "Sanskrit",
      "Sardinian",
      "Serbian",
      "Shona",
      "Sindhi",
      "Sinhala, Sinhalese",
      "Slovak",
      "Slovenian",
      "Somali",
      "Sotho, Southern",
      "South Ndebele",
      "Spanish, Castilian",
      "Sundanese",
      "Swahili",
      "Swati",
      "Swedish",
      "Tagalog",
      "Tahitian",
      "Tajik",
      "Tamil",
      "Tatar",
      "Telugu",
      "Thai",
      "Tibetan",
      "Tigrinya",
      "Tonga (Tonga Islands)",
      "Tsonga",
      "Tswana",
      "Turkish",
      "Turkmen",
      "Twi",
      "Uighur, Uyghur",
      "Ukrainian",
      "Urdu",
      "Uzbek",
      "Venda",
      "Vietnamese",
      "Volap_k",
      "Walloon",
      "Welsh",
      "Western Frisian",
      "Wolof",
      "Xhosa",
      "Yiddish",
      "Yoruba",
      "Zhuang, Chuang",
      "Zulu",
    ];
    const SEX_ARRAY = ["male", "female"];

    if (option === "hobbies") {
      selectionArray = HOBBIES;
    }
    if (option === "role") {
      selectionArray = ROLE_ARRAY;
    }
    if (option === "languages") {
      selectionArray = LANGUAGES;
    }
    if (option === "sex") {
      selectionArray = SEX_ARRAY;
    }

    return (
      <select
        className="bg-gray-50/0 border border-gray-950/25 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700/0 dark:border-gray-100/15 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => setQuery(e.target.value)}
        defaultValue={"default"}
        name="dropdown"
        id="dropdown"
      >
        <option value="default" disabled>
          Select...
        </option>
        {selectionArray.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  }
  if (TEXT_INPUT_ARRAY.includes(option)) {
    return (
      <input
        className="block px-1 text-gray-900 border border-gray-950/25 rounded bg-gray-50/0 text-sm dark:bg-gray-700/0 dark:border-gray-100/15 dark:placeholder-gray-400 dark:text-gray-300"
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Enter ${option}`}
      />
    );
  }
  if (DATE_INPUT_ARRAY.includes(option)) {
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setDateRange((prev) => ({
        ...prev,
        [name]: value === "" ? null : new Date(value),
      }));
    };

    return (
      <div className="flex items-center">
        <label
          className="ms-1 me-2 text-sm text-gray-900 dark:text-gray-300"
          htmlFor="from"
        >
          from:
        </label>
        <input
          className=" border border-gray-950/25 text-gray-900 text-sm rounded focus:border-gray-400 block bg-gray-500/0 dark:border-gray-100/10 dark:placeholder-gray-400 dark:text-gray-300  dark:focus:border-gray-700 "
          max={
            dateRange.to
              ? dateRange.to.toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0]
          }
          onChange={handleDateChange}
          type="date"
          id="from"
          name="from"
        />
        <label className="ms-1 me-2 text-sm text-gray-900" htmlFor="to">
          to:
        </label>
        <input
          className=" border border-gray-950/25 text-gray-900 text-sm rounded focus:border-gray-400 block bg-gray-500/0 dark:border-gray-100/10 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:border-gray-700 "
          min={
            dateRange.from
              ? dateRange.from.toISOString().split("T")[0]
              : undefined
          }
          max={new Date().toISOString().split("T")[0]}
          onChange={handleDateChange}
          type="date"
          id="to"
          name="to"
        />
      </div>
    );
  } else {
    return null;
  }
};

export default NewQueryInput;
