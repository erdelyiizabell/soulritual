import { createElement, useEffect, useRef, useState } from "react";
import {
  Flower2,
  Heart,
  Wind,
  Sparkles,
  Sun,
  Flame,
  Users,
  Baby,
  Building2,
  Leaf,
  ChevronDown,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  ArrowUpRight,
  ArrowRight,
  Quote,
  X,
} from "lucide-react";

import EventRegistrationModal, { EventInfo } from "@/components/EventRegistrationModal";

import jurtaHero from "@/assets/jurta-hero.jpg";
import kezTermeszet from "@/assets/kez-termeszet.jpg";
import ritualObject from "@/assets/ritual-object.png";
import sunsetWalk from "@/assets/sunset-walk.png";
import kezekOssze from "@/assets/kezek-osszekapcsolodas.png";
import logoUrl from "@/assets/soul-ritual-logo-transparent.png";
import jurtaInterior from "@/assets/jurta-interior.jpg";
import whyLavender from "@/assets/why-lavender.jpg";
import eventIntimitas from "@/assets/event-intimitas-tere.jpg";
import blogSlowLiving from "@/assets/blog-slow-living.jpg";
import blogCacao from "@/assets/blog-cacao.jpg";
import blogSafeSpace from "@/assets/blog-safe-space.jpg";

const BUDAPEST_YOGA_URL = "https://www.studiopassion.hu/";

const services = [
  { icon: Flower2, name: "Jóga", desc: "Tudatos mozgás, légzés és jelenlét." },
  { icon: Leaf, name: "Meditáció", desc: "Csendes befelé fordulás, vezetett gyakorlatok." },
  { icon: Wind, name: "Légzőgyakorlatok", desc: "A lélegzet ereje a nyugalomhoz." },
  { icon: Sparkles, name: "Access Bars", desc: "Finom energiamunka a fejed 32 pontján." },
  { icon: Heart, name: "Theta Healing", desc: "Mély tudatalatti átprogramozás." },
  { icon: Sun, name: "Kakaó szertartás", desc: "Szív-nyitó rituálé ceremoniális kakaóval." },
  { icon: Flame, name: "Izzasztó kunyhó", desc: "Tisztító hőélmény, ősi hagyomány." },
  { icon: Users, name: "Női körök", desc: "Biztonságos tér a női energia számára." },
  { icon: Baby, name: "Gyerek mindfulness", desc: "Játékos figyelem-gyakorlatok kicsiknek." },
  { icon: Building2, name: "Céges wellbeing", desc: "Csapatok újrahangolása a természetben." },
];

const reasons = [
  "Természetközeli helyszín",
  "Kis létszámú csoportok",
  "Több mint 10 év tapasztalat",
  "Biztonságos, elfogadó közeg",
  "Kezdők számára is",
  "A hétköznapokban is alkalmazható módszerek",
];

const testimonials = [
  {
    text: "Amint beléptem a jurtába, valami elcsendesedett bennem. Évek óta nem éreztem ilyen mély nyugalmat.",
    author: "Eszter, 42",
  },
  {
    text: "Izabella jelenléte biztonságot ad. Nem tanít, hanem terepet nyit — és ez ritka ajándék.",
    author: "Ádám, 51",
  },
  {
    text: "A kakaó szertartás után napokig ott volt bennem az a lágyság. Hazataláltam magamhoz.",
    author: "Nóra, 36",
  },
];

interface BlogSection {
  heading?: string;
  paragraphs: string[];
  questions?: string[];
}

interface BlogPost {
  id: string;
  img: string;
  tag: string;
  title: string;
  subtitle: string;
  excerpt: string;
  sections: BlogSection[];
  closingQuestion?: string;
  closingText?: string[];
}

const posts: BlogPost[] = [
  {
    id: "lelassulas-muveszete",
    img: blogSlowLiving,
    tag: "Blog",
    title: "A lelassulás művészete a hétköznapokban",
    subtitle: "Öt apró rituálé, amit már ma bevezethetsz az életedbe",
    excerpt:
      "Öt apró rituálé, amit már ma bevezethetsz — és amitől megváltozik a napod ritmusa.",
    sections: [
      {
        paragraphs: [
          "Van az a pillanat, amikor még el sem kezdődött igazán a nap, de te már fejben ezerfelé jársz. Mi mindent kell elintézni, kinek kell visszaírni, mit nem szabad elfelejteni, és vajon mindenre jut-e időd.",
          "Aztán este lefekszel, és rájössz, hogy bár rengeteg mindent csináltál, valahogy mégsem voltál igazán jelen a saját napodban.",
          "Ismerős?",
          "Sokszor azt gondoljuk, hogy majd akkor pihenhetünk meg, amikor minden feladatunkkal végeztünk. Csakhogy a feladatok ritkán fogynak el. Mindig érkezik valami új, valami sürgős, valami, amit még meg kellene oldanunk.",
          "És közben észrevétlenül elfelejtünk megérkezni a saját életünkbe.",
          "Pedig a lelassulás nem feltétlenül azt jelenti, hogy szabadságra mész, elvonulsz a hegyek közé, vagy mindent magad mögött hagysz. Néha egészen apró dolgokon múlik.",
          "Azon, hogy hogyan indítod a reggeledet. Hogy iszol meg egy csésze teát. Hogy észreveszed-e a levegőt, amely átjárja a testedet.",
          "Hoztam neked öt apró rituálét, amelyeket különösebb előkészület nélkül beépíthetsz a hétköznapjaidba.",
        ],
      },
      {
        heading: "1. Reggeli csend – mielőtt elkezdődik a világ",
        paragraphs: [
          "Próbáld ki, hogy ébredés után nem nyúlsz azonnal a telefonodért. Adj magadnak öt percet, mielőtt beengednéd a külvilágot a figyelmedbe.",
          "Ülj le kényelmesen, figyeld meg a légzésedet, és tedd fel magadnak a kérdést:",
        ],
        questions: ["Hogyan vagyok ma valójában?"],
      },
      {
        paragraphs: [
          "Ne azt keresd, hogy hogyan kellene lenned. Ne próbáld rögtön megoldani azt sem, ami nehéznek tűnik. Csak figyeld meg, mi van benned.",
          "Lehet, hogy fáradt vagy. Lehet, hogy izgatottan várod a napot. Lehet, hogy semmi különöset nem érzel. Minden rendben van.",
          "Nem kell minden reggel motiváltnak és hálásnak lenned. Néha már az is sokat jelent, ha őszintén kapcsolódsz ahhoz, ahogyan éppen vagy.",
        ],
      },
      {
        heading: "2. Tudatos légzés – egy pillanat, ami mindig veled van",
        paragraphs: [
          "Napközben, amikor úgy érzed, hogy túl sok minden történik egyszerre, állj meg egy pillanatra. Nem kell hozzá meditációs párna, csendes szoba vagy különleges technika.",
          "Helyezkedj el kényelmesen, engedd le a válladat, és figyeld meg, ahogy a levegő beáramlik, majd távozik a testedből. Vegyél néhány nyugodt, természetes lélegzetet.",
          "Ha közben elkalandoznak a gondolataid, nincs semmi baj. Egyszerűen térj vissza a légzésedhez.",
          "A cél nem az, hogy kiürítsd az elmédet, hanem hogy néhány pillanatra ne kelljen minden gondolatodat követned. Néha egyetlen tudatos megállás is segíthet abban, hogy ne automatikusan reagálj mindenre, ami történik körülötted.",
        ],
      },
      {
        heading: "3. Egy csésze tea teljes figyelemmel",
        paragraphs: [
          "Készíts magadnak egy teát. Ne közben válaszolj az üzenetekre, ne intézz el még gyorsan valamit, és ne tervezd a következő három órát. Csak készítsd el, és figyelj rá.",
          "Érezd az illatát. Figyeld meg a meleg bögrét a kezedben. Kóstold meg lassan az első kortyot.",
          "Engedd meg magadnak, hogy ez az öt perc ne legyen hasznos semmilyen más értelemben. Nem kell belőle tanulnod. Nem kell fejlődnöd általa. Nem kell kipipálnod a napod újabb feladatát.",
          "Lehet, hogy elsőre furcsa lesz csak ülni és teát inni. Különösen akkor, ha hozzászoktál ahhoz, hogy mindig csinálsz valamit. De éppen ez benne a lényeg.",
          "Nem minden pillanatnak kell valamilyen célt szolgálnia ahhoz, hogy értékes legyen.",
        ],
      },
      {
        heading: "4. Kapcsolódás a természethez – vissza az érzékeidhez",
        paragraphs: [
          "Menj ki néhány percre a szabadba. Nem kell hosszú túrát tervezned. Elég egy rövid séta, néhány perc a kertben, vagy az, hogy tudatosan megállsz egy fa mellett.",
          "Figyeld meg a fényeket, a levelek mozgását, a levegő hőmérsékletét. Hallgasd meg, milyen hangok vesznek körül.",
          "Ha sétálsz, próbálj meg néhány percig nem a következő feladatodra gondolni. Érezd a talajt a lábad alatt. Figyeld meg, hogyan mozog a tested.",
          "A természet nem siettet bennünket, és nem kér számon rajtunk semmit. A jelenléte lehetőséget adhat arra, hogy mi is egy kicsit más ritmusba kerüljünk. Nem kell különleges élményt átélned. Elég, ha valóban ott vagy.",
        ],
      },
      {
        heading: "5. Esti elengedés – nem kell mindent magaddal vinned holnapra",
        paragraphs: [
          "A nap végén gyakran éppen akkor kezdünk el gondolkodni mindenen, amikor végre pihenhetnénk. Újra lejátsszuk a beszélgetéseket, végiggondoljuk, mit kellett volna másképp csinálnunk, és már a holnapi feladatainkon jár az eszünk.",
          "Próbálj ki egy egyszerű esti rituálét. Lefekvés előtt szánj néhány percet arra, hogy felteszel magadnak három kérdést:",
        ],
        questions: [
          "Mi volt ma az a pillanat, amiért hálás vagyok?",
          "Mit tanultam ma magamról?",
          "Mit szeretnék most elengedni, és nem továbbvinni a holnapi napomba?",
        ],
      },
      {
        paragraphs: [
          "Nem kell hosszú naplót írnod. Akár egyetlen mondat is elegendő. És ha valamire nem tudod a választ, hagyd nyitva a kérdést. Nem kell mindent megoldanod ahhoz, hogy megpihenhess.",
        ],
      },
      {
        heading: "A lelassulás nem egy újabb elvárás",
        paragraphs: [
          "Fontos, hogy ezek a rituálék ne váljanak újabb feladatokká, amelyek miatt rosszul érzed magad, ha egy nap kimaradnak. Nem kell mind az ötöt minden egyes nap elvégezned.",
          "Válassz ki egyet, amelyik most a legközelebb áll hozzád. Próbáld ki néhány napon keresztül, és figyeld meg, hogyan érzed magad közben.",
          "A lelassulás nem verseny, és nincs benne teljesítendő szint. Számomra inkább annak az emlékeztetője, hogy az életünk nemcsak abból áll, amit elvégzünk, amit létrehozunk, vagy amit mások számára adunk. Hanem azokból a pillanatokból is, amikor egyszerűen csak jelen vagyunk.",
          "Talán nem kell mindig messzebbre mennünk, többet elérnünk vagy újabb válaszokat keresnünk. Néha elég megállni, és észrevenni azt, ami már most is itt van.",
        ],
      },
    ],
    closingQuestion:
      "Mikor engedted meg magadnak utoljára, hogy ne akarj semmit elérni, megoldani vagy bizonyítani? Csak legyél.",
    closingText: [
      "Ha jól esne egy kicsit lelassulni, és időt adni magadnak a befelé figyelésre, szeretettel várlak a Soul Ritual világában.",
    ],
  },
  {
    id: "kakao-szertartas",
    img: blogCacao,
    tag: "Blog",
    title: "Mi történik egy kakaó szertartáson?",
    subtitle: "Amikor nem kell mást tenned, csak megérkezned",
    excerpt:
      "A kakaó szertartás nem pusztán az italról szól, hanem arról a figyelemről, amelyet magunknak és a jelen pillanatnak adunk.",
    sections: [
      {
        paragraphs: [
          "Képzelj el egy csendes teret. Meleg fények, kényelmes párnák, halk zene. Előtted egy bögre meleg kakaó, körülötted néhány ember, akik ugyanúgy szeretnének egy kicsit kiszakadni a hétköznapokból, mint te.",
          "Nem kell sehová sietned. Nem vár rád feladat, és senkinek nem kell megfelelned.",
          "Csak leülsz, a kezedbe veszed a bögrét, és megengeded magadnak, hogy megérkezz.",
          "Talán elsőre egyszerűnek hangzik. Hiszen mi lehet különleges abban, ha megiszunk egy kakaót?",
          "A kakaó szertartás azonban nem pusztán az italról szól. Sokkal inkább arról a figyelemről, amelyet magunknak, az érzéseinknek és a jelen pillanatnak adunk.",
        ],
      },
      {
        heading: "Mi az a ceremoniális kakaó?",
        paragraphs: [
          "A kakaónak hosszú kulturális és történelmi múltja van. Közép-Amerika és Mezoamerika különböző népei már évezredekkel ezelőtt készítettek kakaóitalokat, amelyeknek társadalmi, gazdasági és egyes közösségekben rituális jelentőségük is volt.",
          "A kakaóhoz kapcsolódó hagyományok azonban nem voltak mindenhol egyformák, és a mai kakaóceremóniák sem tekinthetők egyetlen változatlan, ősi szertartás folytatásának.",
          "A napjainkban tartott kakaóceremóniák sokféle formát ölthetnek. Gyakran ötvözik a tudatos jelenlétet, a meditációt, a légzőgyakorlatokat, a zenét és az önismereti munkát.",
          "A ceremoniális kakaó általában kevésbé feldolgozott kakaótermékből készül, és sokszor fűszerekkel, például fahéjjal vagy chilivel ízesítik.",
          "A kakaó természetes módon tartalmaz teobromint és kisebb mennyiségű koffeint is, ezért élénkítő hatása lehet. Nem csodaszer, és önmagában nem garantál semmilyen különleges lelki élményt.",
          "A lényeg sokkal inkább az, hogy milyen keretet teremtünk az elfogyasztásához.",
        ],
      },
      {
        heading: "Hogyan zajlik egy kakaó szertartás?",
        paragraphs: [
          "Nincs egyetlen kötelező forgatókönyv. Minden kísérő és közösség a saját szemlélete szerint alakítja az alkalmat.",
          "Egy ilyen együttlét gyakran a megérkezéssel kezdődik. Leülünk, elhelyezkedünk, és néhány percig figyelünk a légzésünkre. Lassan magunk mögött hagyjuk a nap eseményeit, a feladatokat és azokat a gondolatokat, amelyekkel érkeztünk.",
          "Ezután következhet a kakaó elfogyasztása. Megfigyelhetjük az illatát, az ízét, a hőmérsékletét. Nem kell közben mással foglalkoznunk.",
          "Az alkalom része lehet vezetett meditáció, finom légzőgyakorlat, zene, közös éneklés, önismereti kérdések vagy egy megosztókör is.",
          "Van, aki csendben szeretne maradni. Másnak jól esik megosztania, mi foglalkoztatja. Egyik sem jobb a másiknál.",
          "Nem kell beszélned, ha nem szeretnél. Nem kell különleges érzéseket átélned, és nem kell semmilyen elvárásnak megfelelned. Az élményed lehet egészen egyszerű: néhány nyugodt perc, amelyben végre nem kell mással foglalkoznod.",
        ],
      },
      {
        heading: "Miért lehet jóleső a közös befelé figyelés?",
        paragraphs: [
          "A hétköznapokban gyakran akkor figyelünk magunkra, amikor valami már nehézzé vált. Amikor feszültek vagyunk, elfáradtunk, vagy úgy érezzük, túl sok minden történik körülöttünk. Ritkábban teremtünk időt arra, hogy egyszerűen csak megfigyeljük, mi zajlik bennünk.",
          "Egy szertartás lehetőséget adhat arra, hogy tudatosan kijelöljünk erre egy időszakot. Nem azért, mert néhány óra alatt minden problémánkra választ kapunk, hanem mert a figyelem önmagában is értékes.",
          "Amikor nem kell rögtön reagálnunk, magyarázkodnunk vagy megoldanunk valamit, talán könnyebben észrevesszük a saját érzéseinket és szükségleteinket.",
          "Lehet, hogy felismerünk valamit. Lehet, hogy egyszerűen csak jól esik együtt lenni másokkal. És az is rendben van, ha nem történik semmi rendkívüli.",
        ],
      },
      {
        heading: "Mit érdemes tudnod, mielőtt részt veszel?",
        paragraphs: [
          "Egy kakaó szertartás nem terápia, és nem helyettesíti a szükséges orvosi vagy pszichológiai segítséget.",
          "Ha érzékeny vagy a koffeinre, várandós vagy, bizonyos gyógyszereket szedsz, vagy egészségügyi okból korlátoznod kell a kakaófogyasztást, érdemes előzetesen egyeztetned egészségügyi szakemberrel, illetve tájékozódnod a kakaó összetételéről és adagjáról.",
          "A részvételhez pedig nem kell semmilyen előzetes tapasztalat. Elég, ha nyitott vagy arra, hogy adj magadnak egy kis időt.",
        ],
      },
      {
        heading: "Egy bögre kakaó, egy kérdés önmagadhoz",
        paragraphs: [
          "Talán éppen ez az egész legfontosabb része. Nem kell megváltoznod a szertartás kedvéért. Nem kell jobb emberré válnod, feldolgoznod mindent, vagy megtalálnod életed nagy válaszát.",
          "Néha elég megengedned magadnak, hogy megállj. Hogy észrevedd, mire vágysz, mi hiányzik, vagy egyszerűen csak hogyan érzed magad most.",
          "A kakaó lehet ennek az együttlétnek a része. A valódi értéket azonban az a figyelem adja, amelyet közben önmagadnak és a körülötted lévőknek szentelsz.",
        ],
      },
    ],
    closingQuestion:
      "Ha most leülnél egy csendes térben egy meleg kakaóval, mit kérdeznél meg önmagadtól?",
    closingText: [
      "Talán ez az a kérdés, amellyel érdemes elkezdened.",
      "Fedezd fel a Soul Ritual programjait, és találj egy alkalmat, amikor egy kicsit magadra is figyelhetsz.",
    ],
  },
  {
    id: "biztonsagos-terek",
    img: blogSafeSpace,
    tag: "Blog",
    title: "Miért van szükségünk biztonságos terekre?",
    subtitle: "Egy hely, ahol nem kell másnak lenned, mint aki vagy",
    excerpt:
      "A modern élet elszakít önmagunktól. A jurta emlékeztet, hogyan találjunk vissza.",
    sections: [
      {
        paragraphs: [
          "Van az a pillanat, amikor belépsz valahová, és szinte észrevétlenül megváltozik benned valami.",
          "Leenged a vállad. Mélyebbet lélegzel. Nem érzed szükségét annak, hogy azonnal megszólalj, megmagyarázz valamit, vagy megmutasd, mennyire vagy jól.",
          "Egyszerűen csak megérkezel.",
          "Talán egy barátod mellett érzed ezt. Talán a természetben, egy csendes szobában, vagy egy olyan közösségben, ahol nem kell mindenáron megfelelned.",
          "Az ilyen pillanatok emlékeztethetnek bennünket arra, mennyire fontos, hogy legyen az életünkben helye a megpihenésnek és az őszinteségnek.",
        ],
      },
      {
        heading: "Hányféle szerepet viszünk magunkkal nap mint nap?",
        paragraphs: [
          "Dolgozunk, gondoskodunk, szervezünk, döntéseket hozunk. Valakinek a gyermekei vagyunk, valakinek a társai, szülei, barátai vagy munkatársai.",
          "Ezek a szerepek önmagukban nem jelentenek problémát. Sokszor éppen ezek adják az életünk legfontosabb kapcsolatait.",
          "A nehézség akkor kezdődhet, amikor már nem tudjuk, kik vagyunk a szerepeinken túl.",
          "Amikor annyira megszokjuk, hogy erősnek kell lennünk, hogy észre sem vesszük a saját fáradtságunkat. Amikor mindenki más szükségleteire figyelünk, de a sajátjainkat mindig későbbre halasztjuk. Amikor attól tartunk, hogy ha őszintén elmondjuk, mit érzünk, csalódást okozunk valakinek.",
          "Ilyenkor különösen sokat jelenthet egy olyan hely vagy kapcsolat, amelyben nem kell folyamatosan fenntartanunk egy rólunk kialakult képet.",
        ],
      },
      {
        heading: "Mitől válik egy tér biztonságossá?",
        paragraphs: [
          "A biztonságos tér nem feltétlenül egy különleges épület, és nem is azt jelenti, hogy ott soha nem érhet bennünket kellemetlenség.",
          "Sokkal inkább egy olyan közeg, amelyben tiszteletben tartják az emberi méltóságot, a személyes határokat és az egyéni különbségeket.",
          "Ahol lehet kérdezni, bizonytalannak lenni, nemet mondani vagy időt kérni. Ahol nem kell megosztanod olyasmit, amiről még nem szeretnél beszélni. Ahol nem az a cél, hogy mindenki ugyanúgy gondolkodjon, hanem az, hogy képesek legyünk tisztelettel jelen lenni egymás mellett.",
          "A valódi biztonság nem azt jelenti, hogy mindig egyetértünk. Hanem azt, hogy a különbözőségeink mellett is törekedhetünk a tiszteletre. És talán azt is, hogy nem kell tökéletesnek lennünk ahhoz, hogy helyünk legyen egy közösségben.",
        ],
      },
      {
        heading: "Miért segíthet, ha néha kilépünk a megszokott környezetünkből?",
        paragraphs: [
          "A mindennapi környezetünk sokszor észrevétlenül visszaterel a megszokott működésünkbe.",
          "Otthon előkerülnek a feladatok. A munkahelyen a teljesítmény kerül előtérbe. A régi kapcsolatainkban pedig könnyen visszacsúszhatunk azokba a szerepekbe, amelyeket már régóta betöltünk.",
          "Amikor időt töltünk egy másik környezetben, lehetőséget kaphatunk arra, hogy egy kicsit kívülről tekintsünk a saját életünkre.",
          "Egy erdei séta, egy csendes meditáció vagy egy közös önismereti alkalom nem old meg automatikusan mindent. De teremthet olyan körülményeket, amelyekben könnyebb megállni és megfigyelni önmagunkat.",
        ],
        questions: [
          "Mit érzek valójában?",
          "Mire lenne most szükségem?",
          "Mi az, amit megszokásból csinálok, és mi az, amit valóban szeretnék?",
        ],
      },
      {
        paragraphs: [
          "Ezekre a kérdésekre nem mindig találunk azonnal választ. Néha már az is fontos lépés, hogy egyáltalán megengedjük magunknak a kérdezést.",
        ],
      },
      {
        heading: "A jurta mint a megérkezés tere",
        paragraphs: [
          "A jurta számomra egy különleges lehetőség arra, hogy egy kicsit más ritmusba kerüljünk.",
          "A körkörös tér, a természetes anyagok, a puha párnák és a külvilágtól eltérő hangulat mind hozzájárulhatnak ahhoz, hogy néhány percre félretegyük a megszokott napi tempót.",
          "Leülhetünk, figyelhetünk a légzésünkre, vagy egyszerűen csak csendben maradhatunk. Nem kell hozzá különleges hitrendszer, és nem kell tudnunk meditálni sem.",
          "Nem szükséges, hogy minden gondolatunk elcsendesedjen, vagy hogy valamilyen rendkívüli élményben legyen részünk. Elég, ha teret adunk annak, hogy észrevegyük, hogyan vagyunk.",
          "A természet közelsége és a tudatosan kialakított környezet támogathatja ezt a folyamatot, de a biztonságot végső soron nem maga az épület teremti meg. Ahhoz a jelenlévő emberek, a tisztelet és a világos keretek is hozzátartoznak.",
        ],
      },
      {
        heading: "Nem kell mindent megosztanod ahhoz, hogy kapcsolódj",
        paragraphs: [
          "Sokszor azt gondoljuk, hogy a mély kapcsolódáshoz fel kell tárnunk a legfájdalmasabb történeteinket. Pedig a kapcsolódásnak sokféle formája van.",
          "Néha egy őszinte beszélgetés segít. Máskor az, ha valaki figyelmesen meghallgat bennünket, anélkül hogy rögtön tanácsot adna. És néha egyszerűen csak jó együtt lenni másokkal, beszélgetés nélkül.",
          "Egy biztonságos közösségben nem kell siettetni a bizalmat. Nem kell többet adnunk magunkból, mint amennyit valóban szeretnénk.",
          "A saját határaink tisztelete nem a kapcsolódás akadálya. Éppen ellenkezőleg: segíthet abban, hogy őszintébben és szabadabban legyünk jelen benne.",
        ],
      },
      {
        heading: "Hol lehetsz önmagad?",
        paragraphs: [
          "Talán nem egy újabb módszerre van szükségünk, hanem több olyan pillanatra, amikor nem kell bizonyítanunk az értékünket.",
          "Ahol nem a teljesítményünk, a szerepeink vagy a mások által rólunk kialakított kép határozza meg, hogy mennyire érezzük magunkat elfogadhatónak. Ahol lehetünk fáradtak, bizonytalanok, lelkesek, csendesek vagy éppen tele kérdésekkel.",
          "Nem azért, mert minden nehézség megszűnik, hanem mert nem kell egyedül, folyamatosan védekezve jelen lennünk benne.",
          "A biztonságos tér nem old meg helyettünk mindent. De emlékeztethet arra, hogy nem kell mindig készen lennünk, és nem kell minden kérdésre azonnal választ találnunk. Néha az első lépés egyszerűen az, hogy megengedjük magunknak a megérkezést.",
        ],
      },
    ],
    closingQuestion:
      "Hol van az a hely az életedben, ahol nem kell erősnek mutatnod magad, ahol nem kell megfelelned, és ahol egyszerűen csak önmagad lehetsz?",
    closingText: [
      "Ha most nem jut eszedbe ilyen hely, talán érdemes elkezdened megteremteni. Lassan, a saját tempódban, olyan emberekkel és olyan környezetben, ahol a jelenléted önmagában is érték.",
      "Találj időt a megérkezésre, a csendre és az önmagaddal való kapcsolódásra a Soul Ritual világában.",
    ],
  },
];

const faqs = [
  {
    q: "Alkalmas a Soul Ritual kezdőknek is?",
    a: "Igen. Minden foglalkozás és rituálé úgy épül fel, hogy kezdők és haladók egyaránt biztonságosan részt vehessenek benne.",
  },
  {
    q: "Mit vigyek magammal egy alkalomra?",
    a: "Kényelmes ruhát, egy meleg réteget, vizet, nyitott szívet és a jógaszőnyegedet.",
  },
  {
    q: "Hol található a jurta?",
    a: "Egy csendes, természetközeli helyen, levendulamezők és fák között. A pontos helyszínt a foglalás megerősítésekor küldjük.",
  },
  {
    q: "Lehet egyénileg is időpontot foglalni?",
    a: "Természetesen. Az Access Bars, Theta Healing és egyéni konzultációk mind személyre szabott időpontban is elérhetők.",
  },
  {
    q: "Van lehetőség céges csoportokat fogadni?",
    a: "Igen — külön programokat állítunk össze csapatoknak, akik szeretnének kiszakadni a mindennapokból.",
  },
];

function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    const observe = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)").forEach((el) =>
        io.observe(el)
      );
    };

    observe();

    // Watch for newly mounted data-reveal elements (e.g. lazy components)
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}

function Header() {
  const scrolled = useScrolled(60);
  const [open, setOpen] = useState(false);
  const nav = [
    ["Bemutatkozás", "#about"],
    ["Szolgáltatások", "#services"],
    ["Események", "#events"],
    ["A jurta", "#jurta"],
    ["Blog", "#blog"],
    ["Kapcsolat", "#contact"],
  ] as const;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-earth/90 backdrop-blur-md shadow-[0_1px_0_0_color-mix(in_oklab,var(--gold)_35%,transparent)]"
          : "bg-gradient-to-b from-earth/50 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <a href="#top" className="flex shrink-0 items-center gap-3">
          <img
            src={logoUrl}
            alt="Soul Ritual"
            className={`transition-all duration-500 ${scrolled ? "h-14 sm:h-16" : "h-20 sm:h-28"} w-auto`}
            style={{
              filter:
                "drop-shadow(0 2px 6px rgba(0,0,0,0.55)) drop-shadow(0 6px 24px rgba(0,0,0,0.45))",
            }}
          />
        </a>
        <nav className="hidden items-center gap-5 2xl:flex">
          {nav.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="whitespace-nowrap text-[13px] font-medium tracking-[0.1em] uppercase text-cream transition hover:text-gold-soft"
            >
              {label}
            </a>
          ))}
          <a
            href={BUDAPEST_YOGA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 whitespace-nowrap text-[13px] font-medium tracking-[0.1em] uppercase text-gold-soft transition hover:text-cream"
          >
            Budapesti jógaóráim
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </nav>
        <div className="hidden shrink-0 items-center gap-2 2xl:flex">
          <a
            href="https://app.minup.io/book/soulritual"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-cream whitespace-nowrap px-4 py-2.5 text-[11px] font-medium tracking-[0.12em] uppercase text-earth transition hover:bg-gold hover:text-cream"
          >
            Időpontfoglalás
          </a>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 p-2 2xl:hidden"
          aria-label="Menü"
        >
          <span
            className={`h-px w-6 bg-cream transition ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`h-px w-6 bg-cream transition ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-px w-6 bg-cream transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>
      {open && (
        <div className="border-t border-cream/20 bg-earth/95 backdrop-blur-md 2xl:hidden">
          <nav className="flex flex-col gap-1 px-6 py-4">
            {nav.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="border-b border-cream/15 py-3 text-sm tracking-widest uppercase text-cream"
              >
                {label}
              </a>
            ))}
            <a
              href={BUDAPEST_YOGA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-1.5 border-b border-cream/15 py-3 text-sm tracking-widest uppercase text-gold-soft"
            >
              Budapesti jógaóráim
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://app.minup.io/book/soulritual"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2.5 rounded-full bg-cream py-3 text-center text-[11px] tracking-[0.28em] uppercase text-earth transition hover:bg-gold hover:text-cream"
            >
              Időpontfoglalás
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable parallax on touch / small screens to prevent image jump
    if (window.matchMedia("(max-width: 1023px), (pointer: coarse)").matches) return;
    const onScroll = () => {
      if (!heroRef.current) return;
      const y = window.scrollY;
      heroRef.current.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(${1 + y * 0.0004})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative h-[100svh] min-h-[560px] w-full overflow-hidden">
      <div ref={heroRef} className="absolute inset-0 will-change-transform">
        <img
          src={jurtaHero}
          alt="Soul Ritual jurta a levendulamező szélén"
          className="ken-burns h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-earth/25 via-earth/10 to-earth/60" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="fade-up eyebrow text-gold-soft" style={{ animationDelay: "0.1s" }}>
          Soul Ritual · természetközeli elvonulás
        </p>
        <h1
          className="fade-up mt-6 max-w-4xl text-5xl leading-[1.05] text-cream sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          style={{ animationDelay: "0.25s" }}
        >
          Találj vissza <em className="italic text-gold-soft">önmagadhoz</em>
        </h1>
        <p
          className="fade-up mt-8 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg"
          style={{ animationDelay: "0.5s" }}
        >
          Egy hely, ahol lelassulhatsz, feltöltődhetsz és újra kapcsolódhatsz önmagadhoz.
        </p>
        <div
          className="fade-up mt-12 flex flex-col items-center gap-4 sm:flex-row"
          style={{ animationDelay: "0.75s" }}
        >
          <a
            href="https://app.minup.io/book/soulritual"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-cream px-8 py-4 text-[11px] tracking-[0.28em] uppercase text-earth transition hover:bg-gold hover:text-cream shadow-lg"
          >
            <span>Időpontot foglalok</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Tovább"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/70"
      >
        <span className="text-[10px] tracking-[0.32em] uppercase">Tovább</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative bg-cream px-6 py-28 lg:py-40">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5" data-reveal>
          <div className="relative">
            <img src={kezTermeszet} alt="Izabella" className="aspect-[4/5] w-full object-cover" />
            <div className="absolute -bottom-6 -right-6 hidden h-40 w-40 border border-gold sm:block" />
          </div>
        </div>
        <div className="lg:col-span-7 lg:pt-10" data-reveal>
          <p className="eyebrow">Bemutatkozás</p>
          <h2 className="mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Izabella <em className="italic text-gold">vagyok</em>.
          </h2>
          <div className="mt-10 space-y-6 text-base leading-relaxed text-earth/80 sm:text-lg">
            <p>
              Építőmérnökként éveken át nagy projekteken dolgoztam, miközben több mint tíz éve a
              jóga, a meditáció és az önismeret is meghatározó része az életemnek.
            </p>
            <p>
              A Soul Ritual azért született, hogy létrehozzak egy elfogadó és biztonságos teret,
              ahol mindenki megpihenhet, feltöltődhet és újra kapcsolódhat önmagához.
            </p>
            <p className="text-earth/60">
              Nem egy tanárt kapsz, hanem egy társat az úton — aki maga is jár rajta.
            </p>
          </div>
          <div className="mt-12 flex items-center gap-4">
            <div className="hairline max-w-[80px]" />
            <span className="font-display text-lg italic text-gold">— Izabella</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative bg-linen px-6 py-28 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow">Szolgáltatások</p>
          <h2 className="mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Tíz út, egyetlen <em className="italic text-gold">cél</em>.
          </h2>
          <p className="mt-6 text-earth/70 sm:text-lg">
            Bármelyiket választod, ugyanoda vezet: befelé. A módszer más, a lényeg ugyanaz —
            lelassulás, jelenlét, kapcsolódás.
          </p>
        </div>

        <div className="mt-16 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, name, desc }, i) => (
            <div
              key={name}
              data-reveal
              style={{ transitionDelay: `${i * 40}ms` }}
              className="group relative bg-linen p-8 transition duration-500 hover:bg-cream lg:p-10"
            >
              <Icon
                strokeWidth={1}
                className="h-8 w-8 text-gold transition duration-500 group-hover:scale-110"
              />
              <h3 className="mt-6 text-2xl">{name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-earth/65">{desc}</p>
              <ArrowUpRight className="absolute right-6 top-6 h-4 w-4 text-earth/20 transition duration-500 group-hover:text-gold" />
            </div>
          ))}
        </div>
        <div className="mt-16 flex justify-center" data-reveal>
          <a
            href="https://app.minup.io/book/soulritual"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-earth px-8 py-4 text-[11px] tracking-[0.28em] uppercase text-cream transition hover:bg-gold hover:text-cream"
          >
            Időpontot foglalok egyéni folyamatra
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Jurta() {
  return (
    <section id="jurta" className="relative bg-cream px-6 py-28 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 lg:pt-16" data-reveal>
            <p className="eyebrow">A jurta</p>
            <h2 className="mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Nem csupán egy <em className="italic text-gold">épület</em>.
            </h2>
            <div className="mt-10 space-y-6 text-base leading-relaxed text-earth/75 sm:text-lg">
              <p>
                Egy hely, ahol kiszakadhatsz a mindennapokból, lelassulhatsz, és biztonságos térben
                kapcsolódhatsz önmagadhoz.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7" data-reveal>
            <img
              src={jurtaInterior}
              alt="A jurta belső tere"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-3" data-reveal>
          <img
            src={sunsetWalk}
            alt="Séta a természetben"
            className="aspect-square w-full object-cover"
          />
          <img
            src={ritualObject}
            alt="Rituális tárgy"
            className="aspect-square w-full object-cover"
          />
          <img src={kezekOssze} alt="Kapcsolódás" className="aspect-square w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section
      className="relative overflow-hidden bg-earth px-6 py-28 text-cream lg:py-40"
      style={{
        backgroundImage: `linear-gradient(to bottom, color-mix(in oklab, var(--earth) 92%, transparent), color-mix(in oklab, var(--earth) 96%, transparent)), url(${whyLavender})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow text-gold-soft">Miért a Soul Ritual</p>
          <h2 className="mt-6 text-4xl leading-tight text-cream sm:text-5xl lg:text-6xl">
            <em className="italic text-gold-soft">Hat</em> ok, amiért ide térsz vissza.
          </h2>
        </div>

        <ul className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {reasons.map((r, i) => (
            <li
              key={r}
              data-reveal
              className="flex items-start gap-5 border-t border-cream/15 pt-6"
            >
              <span className="font-display text-2xl italic text-gold-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-lg text-cream/90">{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Events ──────────────────────────────────────────────────────────────────
const STRIPE_PUBLISHABLE_KEY =
  "pk_live_51TuujmV05iqq8bsGEcHVCXqFKMY0AxcMuwOwl5qe5TvQjDsGHeim19TM3GD0052Ou0iGQVf8ekIiA5Qlue28GEx600agL81W3h";

const EVENTS: EventInfo[] = [
  {
    id: "budapest-yoga",
    title: "Budapesti jógaórák",
    subtitle: "Szerdánként · Studio Passion",
    date: "Minden szerdán",
    time: "10:00-tól",
    location: "Studio Passion, Budapest",
    color: "gold",
  },
  {
    id: "jurta-yoga-thursday",
    title: "Csütörtöki jóga a jurtában",
    subtitle: "Heti rendszerességgel",
    date: "Minden csütörtökön",
    time: "10:00–11:15",
    location: "Soul Ritual Jurta, Tök",
    capacity: 8,
    price: "3 800 Ft / fő",
    stripeBuyButtonId: "buy_btn_1UVVb0V05iqq8bsGQ4d23T9e",
    color: "earth",
  },
  {
    id: "onismereti-workshop-nov12",
    title: "Ki vagyok én a hozott mintáimon túl?",
    subtitle: "Önismereti workshop · 3 óra",
    date: "2026. november 12. (csütörtök)",
    time: "10:00–13:00",
    location: "Soul Ritual Jurta, Tök",
    price: "9 000 Ft / fő",
    stripeBuyButtonId: "buy_btn_1UVVcCV05iqq8bsGWNmLygrW",
    color: "earth",
  },
];

const EVENT_DESCRIPTIONS: Record<string, string> = {
  "budapest-yoga":
    "Rendszeres jóga Budapesten, a Studio Passion stúdióban. Minden szinten fogadlak — kezdőként és haladóként egyaránt.",
  "jurta-yoga-thursday":
    "Kis létszámú, személyes légkörű jóga a természetben. Maximum 8 főnek — hogy mindenkire jusson figyelem.",
  "onismereti-workshop-nov12":
    "3 órás mélymerülés önmagadba: feltérképezzük a hozott mintákat, és megkeressük, ki vagy te azokon túl.",
};

function EventCard({
  event,
  onRegister,
}: {
  event: EventInfo;
  onRegister: (e: EventInfo) => void;
}) {
  const isExternal = event.id === "budapest-yoga";
  const accent = event.color === "gold" ? "var(--gold)" : "var(--earth)";

  // Live capacity from localStorage (only for non-Stripe modal events)
  const [spotsLeft, setSpotsLeft] = useState<number | null>(null);
  useEffect(() => {
    try {
      localStorage.removeItem("soulritual_event_regs_v2");
    } catch {}
    if (event.capacity === undefined) return;
    setSpotsLeft(event.capacity);
  }, [event.id, event.capacity]);

  return (
    <article
      data-reveal
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-earth/10 bg-cream shadow-sm transition duration-500 hover:shadow-lg hover:-translate-y-1"
    >
      {/* Accent line top */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(to right, ${accent}, color-mix(in oklab, ${accent} 40%, transparent))` }}
      />

      <div className="flex flex-1 flex-col gap-5 p-7 lg:p-8">
        {/* Badge row */}
        <div className="flex flex-wrap items-center gap-2">
          {event.subtitle && (
            <span
              className="rounded-full px-3 py-1 text-[10px] font-semibold tracking-widest uppercase"
              style={{
                background: `color-mix(in oklab, ${accent} 12%, transparent)`,
                color: accent,
              }}
            >
              {event.subtitle}
            </span>
          )}
          {event.capacity !== undefined && (
            <span className="rounded-full bg-earth/10 px-3 py-1 text-[10px] font-semibold tracking-widest uppercase text-earth/60">
              Max. {event.capacity} fő
            </span>
          )}
          {event.price && (
            <span className="rounded-full bg-gold/15 border border-gold/30 px-3 py-1 text-[10px] font-semibold tracking-widest uppercase text-earth">
              {event.price}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl leading-snug text-earth lg:text-3xl">
          {event.title}
        </h3>

        {/* Description */}
        <p className="flex-1 text-sm leading-relaxed text-earth/65">
          {EVENT_DESCRIPTIONS[event.id]}
        </p>

        {/* Meta */}
        <ul className="space-y-2 text-sm text-earth/70">
          <li className="flex items-center gap-2.5">
            <svg className="h-4 w-4 shrink-0" style={{ color: accent }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            {event.date}
          </li>
          <li className="flex items-center gap-2.5">
            <svg className="h-4 w-4 shrink-0" style={{ color: accent }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
            {event.time}
          </li>
          <li className="flex items-center gap-2.5">
            <svg className="h-4 w-4 shrink-0" style={{ color: accent }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z"/><circle cx="12" cy="10" r="2"/></svg>
            {event.location}
          </li>
          {event.price && (
            <li className="flex items-center gap-2.5 font-medium text-earth">
              <svg className="h-4 w-4 shrink-0" style={{ color: accent }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
              Részvételi díj: {event.price}
            </li>
          )}
        </ul>

        {/* CTA */}
        {isExternal ? (
          <a
            href="https://www.studiopassion.hu/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border-2 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition"
            style={{
              borderColor: accent,
              color: accent,
            }}
          >
            Megnézem a stúdiót
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        ) : event.stripeBuyButtonId ? (
          <div className="mt-2 flex w-full justify-center">
            {createElement("stripe-buy-button", {
              "buy-button-id": event.stripeBuyButtonId,
              "publishable-key": STRIPE_PUBLISHABLE_KEY,
            })}
          </div>
        ) : (
          <button
            type="button"
            disabled={spotsLeft === 0}
            onClick={() => onRegister(event)}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-cream transition disabled:opacity-40 cursor-pointer"
            style={{ background: accent }}
          >
            {spotsLeft === 0 ? "Megtelt" : "Bejelentkezem"}
            {spotsLeft !== 0 && <ArrowRight className="h-3.5 w-3.5" />}
          </button>
        )}
      </div>
    </article>
  );
}

function Events() {
  const [activeEvent, setActiveEvent] = useState<EventInfo | null>(null);

  return (
    <section id="events" className="relative bg-linen px-6 py-28 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow">Programok & Eseménynaptár</p>
          <h2 className="mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Csatlakozz <em className="italic text-gold">hozzánk</em>.
          </h2>
          <p className="mt-6 text-earth/70 sm:text-lg">
            Hetente, a természetben és a városban — válaszd azt, ami most illeszkedik az életedbe.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((e, i) => (
            <div key={e.id} style={{ transitionDelay: `${i * 80}ms` }}>
              <EventCard event={e} onRegister={setActiveEvent} />
            </div>
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      {activeEvent && (
        <EventRegistrationModal
          isOpen={!!activeEvent}
          onClose={() => setActiveEvent(null)}
          event={activeEvent}
        />
      )}
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="bg-cream px-6 py-28 lg:py-40">
      <div className="mx-auto max-w-4xl text-center" data-reveal>
        <Quote className="mx-auto h-8 w-8 text-gold" strokeWidth={1} />
        <div className="relative mt-10 min-h-[220px]">
          {testimonials.map((t, idx) => (
            <blockquote
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                idx === i ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="font-display text-2xl italic leading-relaxed text-earth sm:text-3xl lg:text-4xl">
                „{t.text}”
              </p>
              <footer className="mt-8 text-[11px] tracking-[0.28em] uppercase text-gold">
                — {t.author}
              </footer>
            </blockquote>
          ))}
        </div>
        <div className="mt-16 flex justify-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Vélemény ${idx + 1}`}
              className={`h-px transition-all duration-500 ${
                idx === i ? "w-12 bg-gold" : "w-6 bg-earth/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Blog() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (!activePost) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActivePost(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activePost]);

  return (
    <section id="blog" className="bg-cream px-6 py-28 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <div
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
          data-reveal
        >
          <div className="max-w-xl">
            <p className="eyebrow">Blog</p>
            <h2 className="mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Gondolatok az <em className="italic text-gold">útról</em>.
            </h2>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          {posts.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePost(p)}
              data-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
              className="group block text-left cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-105"
                />
              </div>
              <p className="eyebrow mt-6">{p.tag}</p>
              <h3 className="mt-4 text-2xl leading-snug transition group-hover:text-gold">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-earth/65">{p.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-gold">
                Elolvasom <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Blog Article Reader Modal */}
      {activePost && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-modal-title"
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-6"
        >
          <div
            onClick={() => setActivePost(null)}
            className="fixed inset-0 bg-earth/75 backdrop-blur-md transition-opacity"
          />

          <article className="relative z-10 w-full max-w-3xl max-h-[94vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-gold/25 bg-cream shadow-2xl text-earth">
            {/* Hero image */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img
                src={activePost.img}
                alt={activePost.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth/70 via-earth/20 to-transparent" />
              <button
                type="button"
                onClick={() => setActivePost(null)}
                aria-label="Bezárás"
                className="fixed sm:absolute right-5 top-5 z-20 grid h-10 w-10 place-items-center rounded-full bg-cream/90 text-earth shadow-md transition hover:bg-gold hover:text-cream cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-10">
                <p className="eyebrow text-gold-soft">Gondolatok az útról</p>
                <h2
                  id="blog-modal-title"
                  className="mt-2 font-display text-2xl sm:text-4xl leading-tight text-cream"
                >
                  {activePost.title}
                </h2>
              </div>
            </div>

            {/* Article body */}
            <div className="px-6 py-8 sm:px-12 sm:py-12 space-y-8">
              <p className="font-display text-xl sm:text-2xl italic text-gold border-b border-gold/20 pb-6">
                {activePost.subtitle}
              </p>

              {activePost.sections.map((sec, idx) => (
                <div key={idx} className="space-y-4">
                  {sec.heading && (
                    <h3 className="pt-2 font-display text-2xl leading-snug text-earth">
                      {sec.heading}
                    </h3>
                  )}
                  {sec.paragraphs.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-base leading-relaxed text-earth/80"
                    >
                      {para}
                    </p>
                  ))}
                  {sec.questions && sec.questions.length > 0 && (
                    <div className="my-4 rounded-2xl border-l-2 border-gold bg-linen/80 px-6 py-4 space-y-2">
                      {sec.questions.map((q, qIdx) => (
                        <p
                          key={qIdx}
                          className="font-display text-lg italic text-earth"
                        >
                          „{q}”
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {(activePost.closingQuestion || activePost.closingText) && (
                <div className="mt-10 rounded-2xl border border-gold/30 bg-linen p-6 sm:p-8 space-y-4">
                  {activePost.closingQuestion && (
                    <>
                      <p className="text-xs font-semibold tracking-widest uppercase text-gold">
                        És most hadd kérdezzek valamit:
                      </p>
                      <p className="font-display text-xl sm:text-2xl italic leading-relaxed text-earth">
                        {activePost.closingQuestion}
                      </p>
                    </>
                  )}
                  {activePost.closingText?.map((ct, cIdx) => (
                    <p key={cIdx} className="text-sm sm:text-base leading-relaxed text-earth/75">
                      {ct}
                    </p>
                  ))}
                </div>
              )}

              <div className="pt-6 border-t border-earth/10 flex flex-wrap items-center justify-between gap-4">
                <a
                  href="#events"
                  onClick={() => setActivePost(null)}
                  className="inline-flex items-center gap-2 rounded-full bg-earth px-7 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-cream transition hover:bg-gold"
                >
                  Programok & Események
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setActivePost(null)}
                  className="inline-flex items-center justify-center rounded-full border border-earth/25 px-7 py-3.5 text-xs tracking-[0.2em] uppercase text-earth/70 transition hover:border-gold hover:text-earth cursor-pointer"
                >
                  Bezárom
                </button>
              </div>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-linen px-6 py-28 lg:py-40">
      <div className="mx-auto max-w-3xl">
        <div data-reveal className="text-center">
          <p className="eyebrow">Gyakori kérdések</p>
          <h2 className="mt-6 text-4xl leading-tight sm:text-5xl">
            Mielőtt <em className="italic text-gold">megérkeznél</em>.
          </h2>
        </div>
        <div className="mt-16 space-y-px bg-border">
          {faqs.map((f, i) => (
            <div key={f.q} className="bg-linen">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="text-lg text-earth">{f.q}</span>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-earth/30 text-earth transition ${
                    open === i ? "rotate-45 border-gold text-gold" : ""
                  }`}
                >
                  <span className="relative block h-3 w-3">
                    <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                    <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current" />
                  </span>
                </span>
              </button>
              <div
                className={`grid overflow-hidden transition-all duration-500 ${
                  open === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0">
                  <p className="max-w-2xl pr-14 text-earth/70">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative bg-cream px-6 py-28 lg:py-40">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5" data-reveal>
          <p className="eyebrow">Kapcsolat</p>
          <h2 className="mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Írj, <em className="italic text-gold">érkezz meg</em>.
          </h2>
          <p className="mt-6 max-w-md text-earth/70">
            Kérdésed van a foglalkozásokkal, egyéni alkalmakkal vagy a jurtás eseményekkel
            kapcsolatban? Keress meg közvetlenül, szívesen válaszolok.
          </p>

          <ul className="mt-12 space-y-5 text-earth/80">
            <li className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.25} />
              <span>Természetközeli helyszín · pontos cím a foglalás után</span>
            </li>
            <li className="flex items-start gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.25} />
              <a href="tel:+36304078583" className="hover:text-gold">
                +36 30 407 85 83
              </a>
            </li>
            <li className="flex items-start gap-4">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.25} />
              <a href="mailto:info@soulritual.hu" className="hover:text-gold">
                info@soulritual.hu
              </a>
            </li>
          </ul>

          <div className="mt-10 flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="grid h-11 w-11 place-items-center rounded-full border border-earth/30 text-earth transition hover:border-gold hover:text-gold"
            >
              <Instagram className="h-4 w-4" strokeWidth={1.25} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="grid h-11 w-11 place-items-center rounded-full border border-earth/30 text-earth transition hover:border-gold hover:text-gold"
            >
              <Facebook className="h-4 w-4" strokeWidth={1.25} />
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-center lg:col-span-7" data-reveal>
          <div className="border border-gold/40 bg-linen p-10 text-center lg:p-14">
            <p className="eyebrow">Egyéni & Csoportos alkalmak</p>
            <h3 className="mt-6 font-display text-3xl leading-snug text-earth sm:text-4xl">
              Foglald le a <em className="italic text-gold">helyed</em>.
            </h3>
            <p className="mx-auto mt-6 max-w-md text-earth/70">
              Egyéni konzultációra, Access Bars vagy Theta Healing folyamatra online tudsz
              időpontot foglalni, a csoportos jurtás eseményekre pedig az eseménynaptárban
              jelentkezhetsz.
            </p>
            <a
              href="https://app.minup.io/book/soulritual"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-earth px-8 py-4 text-[11px] tracking-[0.28em] uppercase text-cream transition hover:bg-gold"
            >
              Időpontot foglalok
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-earth px-6 py-20 text-cream/80">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <img src={logoUrl} alt="Soul Ritual" className="h-32 w-auto" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/70">
            Egy hely, ahol lelassulhatsz, feltöltődhetsz és újra kapcsolódhatsz önmagadhoz.
          </p>
        </div>

        <div className="lg:col-span-4">
          <p className="eyebrow text-gold-soft">Időpontfoglalás</p>
          <p className="mt-4 text-sm text-cream/70">
            Foglalj időpontot egyéni folyamatra online, vagy csatlakozz a jurtás csoportos
            alkalmakhoz.
          </p>
          <a
            href="https://app.minup.io/book/soulritual"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-gold-soft hover:text-cream"
          >
            Időpontot foglalok <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="lg:col-span-3">
          <p className="eyebrow text-gold-soft">Menü</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="#about" className="hover:text-gold">
                Bemutatkozás
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-gold">
                Szolgáltatások
              </a>
            </li>
            <li>
              <a href="#events" className="hover:text-gold">
                Események
              </a>
            </li>
            <li>
              <a href="#blog" className="hover:text-gold">
                Blog
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gold">
                Kapcsolat
              </a>
            </li>
            <li>
              <a
                href={BUDAPEST_YOGA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-gold-soft hover:text-gold"
              >
                Budapesti jógaóráim <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col items-start justify-between gap-4 border-t border-cream/15 pt-8 text-xs text-cream/50 sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} Soul Ritual · Minden jog fenntartva</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-cream">
            Adatkezelési tájékoztató
          </a>
          <a href="#" className="hover:text-cream">
            ÁSZF
          </a>
        </div>
      </div>
    </footer>
  );
}

function RevealStyles() {
  return (
    <style>{`
      [data-reveal]{opacity:0;transform:translateY(24px);transition:opacity 1s cubic-bezier(.22,1,.36,1),transform 1s cubic-bezier(.22,1,.36,1);}
      [data-reveal].is-visible{opacity:1;transform:none;}
    `}</style>
  );
}

export default function Index() {
  useReveal();
  return (
    <div className="bg-cream">
      <RevealStyles />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Jurta />
        <Why />
        <Events />
        <Testimonials />
        <Blog />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
