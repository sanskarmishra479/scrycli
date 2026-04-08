#!/usr/bin/env bun

import { createCliRenderer } from "@opentui/core"
import { createRoot } from "@opentui/react"
import App from "../ui/App"
import React from "react"

const renderer = await createCliRenderer({
    exitOnCtrlC: true,
    targetFps: 60,
  })

createRoot(renderer).render(<App />)