import { IncomingMessage, ServerResponse } from 'http'
import { parseRequest } from './_lib/parser'
import { getScreenshot } from './_lib/chromium'
import { getHtml } from './_lib/template'

const isDev = !process.env.AWS_REGION
const isHtmlDebug = false

export default async (req, res) => {
  console.log(req.query)
  const { WebClient } = require('@slack/web-api')

  const token = process.env.SLACK_TOKEN

  const web = new WebClient(token)

  let details = await web.users.info({
    user: req.query.username
  })

  const AirtablePlus = require('airtable-plus')

  const airtable = new AirtablePlus({
    baseID: 'appoBQQwL8ABXjasg',
    apiKey: process.env.AIRTABLE_TICKETS_TOKEN,
    tableName: 'Slack Usernames'
  })

  let paths = await airtable.read()

  let valid = false

  let number

  paths = paths.map((x, index) => {
    if (x['fields']['Usernames'] == req.query.username) {
      valid = true
      number = x['fields']['Number'] 
    }
  })

  if (!valid) {
    const res = await airtable.create({ 'Usernames': req.query.username });
    paths = await airtable.read()
    paths = paths.map((x, index) => {
      if (x['fields']['Usernames'] == req.query.username) {
        valid = true
        number = x['fields']['Number'] 
      }
    })
  }
  const palx = require('palx')
  let colours = []
  Object.entries(palx('#5F8893')).map(x => {
    if (x[0] == 'base' || x[0] == 'black') {
      return
    }
    x[1].map((x, index) => {
      if (index < 6) {
        return
      } else {
        colours.push(x)
      }
    })
  })
  Object.entries(palx('#85865F')).map(x => {
    if (x[0] == 'base' || x[0] == 'black') {
      return
    }
    x[1].map((x, index) => {
      if (index < 6) {
        return
      } else {
        colours.push(x)
      }
    })
  })
  Object.entries(palx('#927B97')).map(x => {
    if (x[0] == 'base' || x[0] == 'black') {
      return
    }
    x[1].map((x, index) => {
      if (index < 6) {
        return
      } else {
        colours.push(x)
      }
    })
  })
  Object.entries(palx('#AA7B78')).map(x => {
    if (x[0] == 'base' || x[0] == 'black') {
      return
    }
    x[1].map((x, index) => {
      if (index < 6) {
        return
      } else {
        colours.push(x)
      }
    })
  })
  Object.entries(palx('#906B52')).map(x => {
    if (x[0] == 'base' || x[0] == 'black') {
      return
    }
    x[1].map((x, index) => {
      if (index < 6) {
        return
      } else {
        colours.push(x)
      }
    })
  })
  Object.entries(palx('#CE9960')).map(x => {
    if (x[0] == 'base' || x[0] == 'black') {
      return
    }
    x[1].map((x, index) => {
      if (index < 6) {
        return
      } else {
        colours.push(x)
      }
    })
  })
  Object.entries(palx('#4E6447')).map(x => {
    if (x[0] == 'base' || x[0] == 'black') {
      return
    }
    x[1].map((x, index) => {
      if (index < 6) {
        return
      } else {
        colours.push(x)
      }
    })
  })
  Object.entries(palx('#A34730')).map(x => {
    if (x[0] == 'base' || x[0] == 'black') {
      return
    }
    x[1].map((x, index) => {
      if (index < 6) {
        return
      } else {
        colours.push(x)
      }
    })
  })
  Object.entries(palx('#5F8893')).map(x => {
    if (x[0] == 'base' || x[0] == 'black') {
      return
    }
    x[1].map((x, index) => {
      if (index < 6) {
        return
      } else {
        colours.push(x)
      }
    })
  })
  console.log(colours.length)
  colours.reduce((unique, item) => {
    return unique.includes(item) ? unique : [...unique, item]
  }, [])
  console.log(colours)
  try {
    const parsedReq = parseRequest(req)
    const html = getHtml(parsedReq, details.user.profile.real_name, number, colours[number > colours.length ? Math.floor(Math.random()*colours.length) : number], details.user.profile.image_192)
    if (isHtmlDebug) {
      res.setHeader('Content-Type', 'text/html')
      res.end(`<div style="width: 1200px; height: 630px">${html}</div>`)
      return
    }
    const { fileType } = parsedReq
    const file = await getScreenshot(html, fileType, isDev)
    res.statusCode = 200
    res.setHeader('Content-Type', `image/${fileType}`)
    res.setHeader(
      'Cache-Control',
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    )
    res.end(file)
  } catch (e) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>')
    console.error(e)
  }
}
