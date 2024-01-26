import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/hello', (c) => {
  return c.json({
    ok: true,
    message: 'hello Hono!'
  })
})

// req http://localhost:8787/posts/1?page=hoge -> res 'You want see hoge of 1'
app.get('/posts/:id', (c) => {
  const page = c.req.query('page')
  const id = c.req.param('id')
  c.header('X-Message', 'Hi!')
  return c.text(`You want see ${page} of ${id}`)
})

// use jsx
const View = () => {
  return (
    <html>
      <body>
        <h1>Hello Hono JSX! </h1>
      </body>
    </html>
  )
}
app.get('/page', (c) => {
  return c.html(<View />)
})

// use basicAuth
app.use(
  '/admin/*',
  basicAuth({
    username: 'admin',
    password: 'secret',
  })
)

app.get('/admin', (c) => {
  return c.text('You are authorized!')
})

export default app
