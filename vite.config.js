import { defineConfig } from 'vite'
import fs from 'fs'

export default defineConfig ({
    server: {
	open: true,
	https: {
	    key: fs.readFileSync('domain.key'),
	    cert: fs.readFileSync('domain.crt'),
	},
    },
})
