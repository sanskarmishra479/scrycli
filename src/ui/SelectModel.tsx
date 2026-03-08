import React, { useEffect, useState } from "react";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import { setConfig } from "../core/configManage.js";

interface selectModelType {
    onDone?: () => void;
}


const providers = [
    { label: "OpenAI", value: "openai" },
    { label: "StepFun ", value: "stepfun" },
    { label: "Qwen", value: "qwen" },
    { label: "ArceeAI", value: "arceeai" },
    { label: "Mistral", value: "mistral" },
    { label: "Zai", value: "zai" },
];

const modelsMap: Record<string, any[]> = {
    openai: [
        { label: "gpt-oss-120b (Recommended)", value: "openai/gpt-oss-120b:free" },
        { label: "gpt-oss-20b", value: "openai/gpt-oss-20b:free" },
    ],
    arceeai: [
        { label: "Trinity Large (Recommended)", value: "arcee-ai/trinity-large-preview:free" },
        { label: "Trinity Mini", value: "arcee-ai/trinity-mini:free" },
    ],
    mistral: [
        { label: "Mistral Small 3.1 24B", value: "mistralai/mistral-small-3.1-24b-instruct:free" },
    ],
    qwen: [
        { label: "Qwen3 Coder 480B A35B", value: "qwen/qwen3-coder:free" },
        { label: "Qwen3 Next 80B A3B Instruct (Recommended)", value: "qwen/qwen3-next-80b-a3b-instruct:free" },
    ],
    stepfun: [
        { label: "Step 3.5 Flash", value: "stepfun/step-3.5-flash:free" },
    ],
    zai: [
        { label: "GLM 4.5 Air", value: "z-ai/glm-4.5-air:free" },
    ]
};

const SelectModel = (props: selectModelType) => {
    const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
    const [selectedModel, setSelectedModel] = useState<string | null>(null);

    useEffect(() => {
        if (selectedModel) {
            props.onDone && props.onDone();
        }
    }, [selectedModel]);

    return (
        <Box>
            {!selectedProvider && (
                <SelectInput
                    items={providers}
                    onSelect={(item) => setSelectedProvider(item.value)}
                />
            )}

            {selectedProvider && !selectedModel && (
                <SelectInput
                    items={modelsMap[selectedProvider] || []}
                    onSelect={(item) => {
                        setSelectedModel(item.value as string);
                        setConfig('model', { modelProvider: selectedProvider, modelName: item.value });
                    }}
                />
            )}

        </Box>
    );
}

export default SelectModel;