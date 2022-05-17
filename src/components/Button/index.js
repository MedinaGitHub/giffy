import React from 'react'
import { Button, Link } from './styles'

export default function ButtonComponent ({children, href, size = 'small'}) {
  return href
    ? <Link size={size} href={href}>{children}</Link>
    : <Button size={size}>{children}</Button>
}