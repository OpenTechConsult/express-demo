import { fileURLToPath } from 'url'
import { dirname, sep } from 'path'
import express from 'express'
import compression from 'compression'

// configuration
const __dirname = dirname(fileURLToPath(import.meta.url)) + sep
const cfg = {
    port: process.env.PORT || 5500,
    dir: {
        root: __dirname,
        static: __dirname + 'static' + sep,
        views: __dirname + 'views' + sep
    }
}
console.dir(cfg, { depth: null, color: true })

// express initialization
const app = express()

// do not identify express
app.disable('X-powered-by')

// Use EJS templates
app.set('view engine', 'ejs')
app.set('views', cfg.dir.views)


// log every request to the terminal
app.use((req, res, next) => {
    console.log(req.url)
    next()
})

// HTTP compression
app.use(compression())


// home page route
app.get('/', (req, res) => {
    // res.send('hello world!')
    res.render('message', { title: 'Hello World!' })
})

// another route
app.get('/hello/', (req, res) => {
    // res.send('Hello again!')
    res.render('message', { title: 'Hello again' })
})

// return a value for a user
app.get('/author/:name/book/:bookName', (req, res) => {
    const authorBook = {
        title: "Node.js Novice to Ninja",
        author: req.params.name,
        book: req.params.bookName
    }
    res.render('message', authorBook)
})

// serve static assets
app.use(express.static(cfg.dir.static))

// 404 error
app.use((req, res) => {
    // res.status(404).send('Not found')
    res.status(404).render('message', { title: 'Not found' })
})

// start server
app.listen(cfg.port, () => {
    console.log(`Example app listening at http://localhost:${cfg.port}`)
})

// export defaults
export { cfg, app }