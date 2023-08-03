import gulp from 'gulp';
import concat from 'gulp-concat';
import replace from 'gulp-replace';

function runBuild(inputs, output, is_chaos=true) {
	const body = ['src/header.d.ts', 'src/shared/*.d.ts', ...inputs.map(x => `src/${x}/*.d.ts`)];

	gulp.src(body)
		.pipe(concat(output, { newLine: '\n' }))
		.pipe(replace('$npm_package_version$', process.env.npm_package_version))
		.pipe(replace(is_chaos ? /$&/ : 'Chaos', 'CSGO')) // this is really stupid: match impossible regex to avoid replacing anything
		.pipe(gulp.dest('dist/'));
}

export default function(callback) {
	runBuild(['p2ce', 'momentum'], 'panorama.d.ts');
	callback();
}

export function csgo(callback) {
	runBuild([], 'csgo.d.ts', false);
	callback();
}

export function p2ce(callback) {
	runBuild(['p2ce'], 'p2ce.d.ts');
	callback();
}

export function momentum(callback) {
	runBuild(['momentum'], 'momentum.d.ts');
	callback();
}
