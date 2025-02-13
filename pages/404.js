/*

MIT License

Copyright (c) 2025 JustDeveloper <https://justdeveloper.is-a.dev/>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

// this is unused thing that next.js need anyway ¯\_(ツ)_/¯

import React from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

const NotFound = (props) => {
  return (
    <>
      <div className="not-found-container1">
        <Head>
          <title>404 - Not Found</title>
        </Head>
        <h3>OOPS! PAGE NOT FOUND</h3>
        <div className="not-found-container2">
          <h1 className="not-found-text2">404</h1>
        </div>
        <div className="not-found-container3">
          <h2 className="not-found-text3">
            WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND
          </h2>
        </div>
      </div>
      <style jsx>
        {`
          .not-found-container1 {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .not-found-container2 {
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .not-found-text2 {
            color: rgb(38, 38, 38);
            font-size: 252px;
            margin-top: -20px;
            font-weight: 900;
            margin-bottom: -20px;
            letter-spacing: -20px;
          }
          .not-found-container3 {
            width: 421px;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .not-found-text3 {
            text-align: center;
            font-weight: 400;
          }
        `}
      </style>
    </>
  )
}

export default NotFound

export async function getStaticProps(context) {
  const messages = (await import('/locales/' + context.locale + '.json'))
    .default
  return {
    props: {
      messages,
      ...context,
    },
  }
}