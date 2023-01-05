import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, sep } from 'path'

// configuration
const __dirname = dirname(fileURLToPath(import.meta.url)) + sep
const cfg = {
    port: process.env.PORT || 5500,
    dir: {
        root: __dirname,
        static: __dirname + 'static' + sep
    }
}
console.dir(cfg, { depth: null, color: true })

// express initialization
const app = express()

// log every request to the terminal
app.use((req, res, next) => {
    console.log(req.url)
    next()
})


// home page route
app.get('/', (req, res) => {
    res.send('hello world!')
})

// another route
app.get('/hello/', (req, res) => {
    res.send('Hello again!')
})

// serve static assets
app.use(express.static(cfg.dir.static))

// start server
app.listen(cfg.port, () => {
    console.log(`Example app listening at http://localhost:${cfg.port}`)
})

// export defaults
export { cfg, app }