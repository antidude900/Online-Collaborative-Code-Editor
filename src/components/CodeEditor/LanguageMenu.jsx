import { ChevronDown } from "lucide-react";
import { LANGUAGES } from "../../constants";

// eslint-disable-next-line react/prop-types
export default function LanguageMenu({language,setLanguage}) {
	const languages = Object.entries(LANGUAGES);
	const handleClick = (lang) => {
		const elem = document.activeElement;
		if (elem) {
			elem?.blur();
		}
		if (lang !== language) setLanguage(lang);
	};
	return (
		<div className="dropdown">
			<div tabIndex="0" role="button" className="btn">
				{language} <ChevronDown size={15} />
			</div>
			<ul
				tabIndex="0"
				className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
			>
				{languages.map(([lang]) => (
					<li onClick={() => handleClick(lang)} key={lang}>
						<a className={lang === language ? "text-blue-500 font-black" : ""}>
							{lang}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
