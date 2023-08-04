import { createReadStream, createWriteStream, readFileSync } from 'fs';
import { glob } from 'glob';
import MultiStream from 'multistream';

const header = readFileSync('src/header.d.ts', { encoding: 'utf-8' })
	.replace('$npm_package_version$', process.env.npm_package_version);

function build(files, out_name) {
	const output = createWriteStream(`dist/${out_name}.d.ts`, { encoding: 'utf-8' });
	output.write(header);

	const streams = files.map(x => createReadStream(x, { encoding: 'utf-8' }));
	new MultiStream(streams).pipe(output);
}

async function eval_globs(sources) {
	const files = [];

	for (const source of sources)
		files.push(...await glob(`src/${source}/*.d.ts`));

	return files;
}

if (process.argv.length !== 4) throw('Argument count must equal 4!');
const sources = process.argv[2].split(',');
const files = await eval_globs(sources);
build(files, process.argv[3]);