const proxy = require('http-proxy-middleware')
const Bundler = require('parcel-bundler')
const express = require('express')

const bundler = new Bundler('src/index.html', {
    cache: false
  })
let app = new express()

app.use(
  '/api',
  proxy({
    target: 'http://localhost:3033'
  })
)

app.use(bundler.middleware())

app.listen(Number(process.env.PORT || 1234))

