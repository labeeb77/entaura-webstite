import { useEffect } from 'react'
import { metaTags } from '../data/pageMeta.js'

export function usePageMeta(meta) {
  useEffect(() => {
    document.title = meta.title
    metaTags.forEach(([key, tag, idAttr, idValue, valueAttr]) => {
      let element = document.head.querySelector(`${tag}[${idAttr}="${idValue}"]`)
      if (meta[key] === undefined) {
        element?.remove()
        return
      }
      if (!element) {
        element = document.createElement(tag)
        element.setAttribute(idAttr, idValue)
        document.head.appendChild(element)
      }
      element.setAttribute(valueAttr, meta[key])
    })
  }, [meta])
}
