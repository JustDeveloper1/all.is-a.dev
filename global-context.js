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

import { createContext, useMemo, useContext, useState, useEffect } from 'react'
import { useLocale } from "next-intl";

const GlobalContext = createContext(null)

export const GlobalProvider = ({ initialLocales, children }) => {
  const localeValue = useLocale()
  const [locales, setLocales] = useState(initialLocales ?? [{"name":"English","short":"en"}, {"name":"Russian","short":"ru"}])
  const [locale, setLocale] = useState({"name":"English","short":"en"})
  
  useEffect(() => {
    if (!locales) {
      return
    }

    const currentLangValue = locales.find((el) => el.short === localeValue)
    setLocale(currentLangValue)
  }, [locales])

  const value = useMemo(() => {
    return {
      locales,
      locale,
      setLocales,
      setLocale
    }
  }, [locales, locale])

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider')
  }

  return {
    ...context
  }
}
