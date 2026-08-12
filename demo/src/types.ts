import type {TypedObject} from '@portabletext/astro/types'

export interface CodeBlock extends TypedObject {
  _type: 'code'
  code: string
  language?: string
}

export interface CurrencyAmountBlock extends TypedObject {
  _type: 'currencyAmount'
  currency: string
  amount: number
}

export interface Geopoint {
  _type: 'geopoint'
  lat: number
  lng: number
}

export interface MapMarker {
  _type: 'mapMarker'
  _key: string
  position: Geopoint
  title: string
  description?: string
}

export interface AnnotatedMapBlock extends TypedObject {
  _type: 'annotatedMap'
  _key?: string
  center?: Geopoint
  markers?: MapMarker[]
}
