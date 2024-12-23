export const LANGUAGES = {
	c: 105,
	cpp: 105,
	python: 100,
	javascript: 102
};

export const CODE_SNIPPETS = {
	c: `#include <stdio.h>\n\nint main() {\n\tprintf("Hello World");\n\n\treturn 0;\n}\n`,
	cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\ncout << "Hello World";\n\nreturn 0;\n}',
	python: `def greet():\n\tprint("Hello World")\ngreet()\n`,
	javascript: `function greet(){\n\tconsole.log("Hello World");\n}\ngreet();\n`,
};
