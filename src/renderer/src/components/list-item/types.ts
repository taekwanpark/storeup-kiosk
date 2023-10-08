import type {InjectionKey} from 'vue'

/*
|------------------------------------------------------------------------------------
| List Display Types
|------------------------------------------------------------------------------------
*/
export const ListItemTypes = {
    Search: 'Search',
    Event: 'Event'
} as const
export type ListItemTypeKeys = keyof typeof ListItemTypes

export function getListItemType(type: ListItemTypeKeys): ListItemTypeKeys {
    return ListItemTypes[type]
}

/*
|------------------------------------------------------------------------------------
| Event Status
|------------------------------------------------------------------------------------
*/
export const EventStatusTypes = {
    Ongoing: 'Ongoing',
    Ended: 'Ended'
} as const

export type EventStatusTypeKeys = keyof typeof EventStatusTypes

export function getEventStatusType(type: EventStatusTypeKeys): EventStatusTypeKeys {
    return EventStatusTypes[type]
}

/*
|------------------------------------------------------------------------------------
| Card Display Types
|------------------------------------------------------------------------------------
*/
// export const CardItemDisplayTypes = {
//   Search: 'Search',
//   Map: 'Map'
// } as const
// export type CardItemDisplayTypeKeys = keyof typeof CardItemDisplayTypes
// export function getCardItemDisplayType(type: CardItemDisplayTypeKeys): CardItemDisplayTypeKeys {
//   return CardItemDisplayTypes[type]
// }

/*
|------------------------------------------------------------------------------------
| Store Status Types
|------------------------------------------------------------------------------------
*/
export const StoreStatusTypes = {
    Open: 'Open',
    Close: 'Close',
    Holiday: 'Holiday'
} as const

export type StoreStatusKeys = keyof typeof StoreStatusTypes

export function getStoreStatusType(type: StoreStatusKeys): StoreStatusKeys {
    return StoreStatusTypes[type]
}

/*
|------------------------------------------------------------------------------------
| Store Status Style
|------------------------------------------------------------------------------------
*/
interface StoreStatusStyle {
    textColor: string
    text: string
}

type StoreStatusRecord = Record<StoreStatusKeys, StoreStatusStyle>
export const storeStatusStyle: StoreStatusRecord = {
    [StoreStatusTypes.Open]: {
        textColor: 'text-[#179600]',
        text: '영업중'
    },
    [StoreStatusTypes.Close]: {
        textColor: 'text-[#d30000]',
        text: '영업종료'
    },
    [StoreStatusTypes.Holiday]: {
        textColor: 'text-[#d30000]',
        text: '휴무'
    }
}

export type TabItem = (id: string) => void
export const TabItemKey: InjectionKey<TabItem> = Symbol('tabItem')
