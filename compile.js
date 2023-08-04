import { createReadStream, createWriteStream, readFileSync, readdirSync } from 'fs';
import MultiStream from 'multistream';
import ReplaceStream from 'replacestream';

const header = readFileSync('src/header.d.ts', { encoding: 'utf-8' })
	.replace('$npm_package_version$', process.env.npm_package_version);

function build(files, out_name, replace_chaos=false) {
	const output = createWriteStream(`dist/${out_name}.d.ts`, { encoding: 'utf-8' });
	output.write(header);

	const streams = files.map(x => createReadStream(x, { encoding: 'utf-8' }));
	const ms = new MultiStream(streams);

	if (!replace_chaos) ms.pipe(output);
	else ms.pipe(ReplaceStream('Chaos', 'CSGO')).pipe(output);
}

function list_files(sources) {
	const files = [];
	for (const source of sources) {
		const root_dir = `src/${source}/`;
		const rawlist = readdirSync(root_dir, { recursive: true });
		const remapped = rawlist.map(x => root_dir+x.replace(/\\\\/, '/'));
		files.push(...remapped);
	}
	return files.filter(x => x.endsWith('.d.ts'));
}

if (process.argv.length !== 4) throw('Argument count must equal 4!');
const sources = process.argv[2].split(',');
const files = list_files(sources);

const filename = process.argv[3];
build(files, filename, filename === 'csgo');