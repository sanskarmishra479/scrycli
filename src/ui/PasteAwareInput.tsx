import { useEffect, useRef } from 'react';
import { Text, useStdin } from 'ink';

const PASTE_START = '\x1b[200~';
const PASTE_END = '\x1b[201~';

interface PasteAwareInputProps {
	value: string;
	onChange: (value: string) => void;
	onSubmit?: (value: string) => void;
	placeholder?: string;
}

const PasteAwareInput = ({ value, onChange, onSubmit, placeholder }: PasteAwareInputProps) => {
	const { stdin, setRawMode } = useStdin();
	const isPastingRef = useRef(false);
	const pasteBufferRef = useRef('');
	const valueRef = useRef(value);
	const onChangeRef = useRef(onChange);
	const onSubmitRef = useRef(onSubmit);

	useEffect(() => { valueRef.current = value; }, [value]);
	useEffect(() => { onChangeRef.current = onChange; }, [onChange]);
	useEffect(() => { onSubmitRef.current = onSubmit; }, [onSubmit]);

	useEffect(() => {
		setRawMode(true);

		// Bracketed paste mode: terminal wraps pasted text with
		// \x1b[200~ ... \x1b[201~ so we can detect and buffer it.
		process.stdout.write('\x1b[?2004h');

		const onData = (data: Buffer) => {
			const str = data.toString('utf-8');

			if (str.includes(PASTE_START)) {
				isPastingRef.current = true;
				pasteBufferRef.current = '';
				const afterStart = str.slice(str.indexOf(PASTE_START) + PASTE_START.length);
				if (afterStart.includes(PASTE_END)) {
					const content = afterStart.slice(0, afterStart.indexOf(PASTE_END));
					isPastingRef.current = false;
					onChangeRef.current(valueRef.current + content);
				} else {
					pasteBufferRef.current = afterStart;
				}
				return;
			}

			if (isPastingRef.current) {
				if (str.includes(PASTE_END)) {
					const content = str.slice(0, str.indexOf(PASTE_END));
					pasteBufferRef.current += content;
					isPastingRef.current = false;
					onChangeRef.current(valueRef.current + pasteBufferRef.current);
					pasteBufferRef.current = '';
				} else {
					pasteBufferRef.current += str;
				}
				return;
			}

			if (str === '\r' || str === '\n') {
				onSubmitRef.current?.(valueRef.current);
				return;
			}

			if (str === '\x7f' || str === '\x08') {
				onChangeRef.current(valueRef.current.slice(0, -1));
				return;
			}

			if (str === '\x03') {
				process.exit();
				return;
			}

			if (str.startsWith('\x1b')) return;
			if (str.charCodeAt(0) < 32) return;

			onChangeRef.current(valueRef.current + str);
		};

		stdin.on('data', onData);

		return () => {
			stdin.off('data', onData);
			process.stdout.write('\x1b[?2004l');
			setRawMode(false);
		};
	}, [stdin, setRawMode]);

	const showPlaceholder = !value && placeholder;

	return (
		<Text>
			{showPlaceholder ? (
				<>
					<Text backgroundColor="white">{' '}</Text>
					<Text color="gray">{placeholder}</Text>
				</>
			) : (
				<>
					<Text color="white">{value}</Text>
					<Text backgroundColor="white">{' '}</Text>
				</>
			)}
		</Text>
	);
};

export default PasteAwareInput;
