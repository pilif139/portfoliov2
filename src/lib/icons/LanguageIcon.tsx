import { SiC, SiCplusplus, SiCss3, SiGo, SiHtml5, SiJavascript, SiMysql, SiPython, SiReact, SiSvelte, SiTailwindcss, SiTypescript, } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { VscTerminalPowershell } from "react-icons/vsc";

const iconDictionary: { [key: string]: React.ReactNode } = {
    "TypeScript": <SiTypescript />,
    "JavaScript": <SiJavascript />,
    "Go": <SiGo />,
    "C++": <SiCplusplus />,
    "C": <SiC />,
    "Shell": <VscTerminalPowershell />,
    "Python": <SiPython />,
    "C#": <TbBrandCSharp />,
    "CSS": <SiCss3 />,
    "HTML": <SiHtml5 />,
    "Svelte": <SiSvelte />,
    "React": <SiReact />,
    "TailwindCSS": <SiTailwindcss />,
    "MySql": <SiMysql />,
}

export default function LanguageIcon({ language }: { language: string }): React.ReactNode {
    return iconDictionary[language] || null;
}