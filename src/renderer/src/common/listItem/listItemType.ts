export enum ListType {
  Search = 'Search',
  OngoinEevent = 'OnGoinEvent',
  EndedEvent = 'EndedEvent'
}

export interface ListItemProps {
  listType: ListType
  title: string
  caption: string
  captionAccent?: string
  thumbnail?: string
  queryString?: string
}

export enum CardType {
  Search = 'Search',
  Map = 'Map'
}

export interface CardProps {
  cardType: CardType
}
