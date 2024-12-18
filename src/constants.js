export const LANGUAGES = {
	c: "10.2.0",
	cpp: "10.2.0",
	python: "3.10.0",
	javascript: "18.15.0",
};

export const CODE_SNIPPETS = {
	c: `\n#include <stdio.h>\n\nint main() {\n\tprintf("Hello World");\n\n\treturn 0;\n}\n`,
	cpp: '\n#include <iostream>\nusing namespace std;\n\nint main() {\ncout << "Hello World";\n\nreturn 0;\n}',
	python: `\ndef greet():\n\tprint("Hello World")\ngreet()\n`,
	javascript: `\nfunction greet() {\n\tconsole.log("Hello World");\n}\ngreet();\n`,
};
