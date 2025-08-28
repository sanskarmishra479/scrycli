import { Box, Text, useInput } from "ink";
import TextInput from "ink-text-input";
import { useState } from "react";
import Spinner from "ink-spinner";
import { getConfig } from '../config/configManage.js';
import { streamGemini } from '../model/geminiModel.js';
import Cmd from "./Commands/Cmd.js";
import SelectModel from "./SelectModel.js";
import Logout from "./Commands/Logout.js";
import Exit from "./Commands/Exit.js";
import Report from "./Commands/Report.js";
import { systemPrompt } from '../model/systemPrompt.js';

type CommandName = '/model' | '/help' | '/path' | '/apikey' | '/logout' | '/report' | '/exit';

const InputBox = () => {
  const cwd = process.cwd();
  const config = getConfig();
  const [suggestions, setSuggestions] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [value, setValue] = useState("");

  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [activeCmd, setActiveCmd] = useState<null | CommandName>(null);

  useInput((_input, key) => {
    if (key.escape && activeCmd !== null) {
      setActiveCmd(null);
      setSuggestions(false);
      setPrompt("");
    }
  });

  const handleChange = (value: string) => {
    setPrompt(value);
    setErr("");
    if (value.startsWith('/') && value.length >= 1) {
      setSuggestions(true);
    } else {
      setSuggestions(false);
    }
  }

  const handleSubmit = async (val: string) => {
    setValue(val);

    if (val.startsWith('/')) {
      const cmd = val.trim().toLowerCase() as string;
      switch (cmd) {
        case '/model':
        case '/help':
        case '/path':
        case '/apikey':
        case '/logout':
        case '/report':
        case '/exit':
          setActiveCmd(cmd as CommandName);
          return;
        default:
          setActiveCmd('/help');
          return;
      }
    }

    // non-command → Gemini
    setAnswer("");
    setErr("");
    setLoading(true);

    try {
      if (!config?.model?.modelName || !config?.model?.modelKey) {
        setErr("Please select the Gemini model and set its API key first (/model).");
        return;
      }
      if (config.model.modelName !== 'Gemini') {
        setErr("Currently only the Gemini provider is supported for Q&A.");
        return;
      }

      await streamGemini({
        prompt: val,
        apiKey: config.model.modelKey,
        systemPrompt: systemPrompt, // add this line
        onChunk: (text) => setAnswer(prev => prev + text)
      });
    } catch (e: any) {
      setErr(e?.message || "Something went wrong while talking to Gemini.");
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  const EscHint = () => (
    <Box marginBottom={1}><Text color="yellow">Press [Esc] to go back</Text></Box>
  );

  if (activeCmd === '/model')  return (<Box flexDirection="column"><EscHint /><SelectModel /></Box>);
  if (activeCmd === '/help')   return (<Box flexDirection="column"><EscHint /><Cmd /></Box>);
  if (activeCmd === '/path')   return (<Box flexDirection="column"><EscHint /><Cmd /></Box>);
  if (activeCmd === '/apikey') return (<Box flexDirection="column"><EscHint /><SelectModel /></Box>);
  if (activeCmd === '/logout') return (<Box flexDirection="column"><EscHint /><Logout /></Box>);
  if (activeCmd === '/report') return (<Box flexDirection="column"><EscHint /><Report /></Box>);
  if (activeCmd === '/exit')   return (<Box flexDirection="column"><EscHint /><Exit /></Box>);

  return (
    <Box flexDirection="column" marginBottom={1} marginTop={1}>
    {loading && (
        <Box marginTop={1}>
          <Box marginRight={1}><Spinner type="dots" /></Box>
          <Text color="gray">Thinking…</Text>
        </Box>
      )}

      {err && (
        <Box marginTop={1}>
          <Text color="red">❌ {err}</Text>
        </Box>
      )}

    {answer && (
        <Box marginTop={1} borderStyle="single" borderColor="green" paddingX={1}>
          <Text>{answer}</Text>
        </Box>
      )}
      <Text color="gray">{cwd}</Text>
      <Box borderStyle="single" borderColor="white" width="100%" paddingX={0} >
        <Box marginRight={1}><Text color="white">{`>`}</Text></Box>
        <TextInput
          value={prompt}
          onChange={handleChange}
          onSubmit={handleSubmit}
          placeholder="Ask anything about your codebase..."
        />
      </Box>

      <Box alignSelf="flex-end">
        <Text color='yellow'>{`Model: ${config?.model?.modelName ?? 'Not Selected'}`}</Text>
      </Box>

      {suggestions && (
        <Box>
          <Cmd />
        </Box>
      )}

    </Box>
  );
};

export default InputBox;