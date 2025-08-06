import React, { useState } from 'react';
import { useInput, Text, Box } from 'ink';
import open from 'open';
import TextInput from 'ink-text-input';

const AUTH_URL = 'https://scrycli.com/auth';

const Auth = () => {
	const [step, setStep] = useState<'prompt' | 'waiting' | 'done'>('prompt');
	const [token, setToken] = useState('');
	const [inputMode, setInputMode] = useState(false);
	const [query, setQuery] = useState('');

	useInput((input, key) => {
		if (step === 'prompt' && key.return) {
			open(AUTH_URL); 
			setStep('waiting');
			setInputMode(true);
		} else if (step === 'waiting' && inputMode && key.return) {
			setToken(query);         
			setStep('done');
			setInputMode(false);
			// TODO: validate token here
		}
	});

	return (
		<Box flexDirection="column">
			{step === 'prompt' && (
				<Text>🔐 Press [Enter] to Sign In / Sign Up in browser</Text>
			)}

			{step === 'waiting' && (
				<>
					<Text>🌐 Browser opened at {AUTH_URL}</Text>
					<Text>📥 Paste your token here and press [Enter]:</Text>
					<Box borderStyle="single" borderColor="green">
						<TextInput value={query} onChange={setQuery} placeholder='Add your token here..' />
					</Box>
				</>
			)}

			{step === 'done' && <Text color="cyan">✅ Token received! {token}</Text>}
		</Box>
	);
};

export default Auth;
