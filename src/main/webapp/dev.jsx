import "/css/aladin.css";
import "/css/style.css";

import React from 'react'
// import {render} from 'react-dom'

// render(<ReactMarkdown># Hello, *world*!</ReactMarkdown>, document.body)

import { Main } from "@sjs/main.js";
Main.main();

if (import.meta.hot) {
  import.meta.hot.accept();
}

