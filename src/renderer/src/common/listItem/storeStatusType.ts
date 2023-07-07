export enum StoreStatus {
  Open = 'Open',
  Close = 'Close',
  Holiday = 'Holiday'
}

type StoreStatusStyle = {
  textColor: string
  borderColor: string
  bgColor: string
  text: string
}

type StoreStatusRecord = Record<StoreStatus, StoreStatusStyle>

export const storeStatusStyle: StoreStatusRecord = {
  [StoreStatus.Open]: {
    textColor: 'text-blue_cerulean',
    borderColor: 'border-blue_cerulean',
    bgColor: 'bg-grey_pale',
    text: '영업중'
  },
  [StoreStatus.Close]: {
    textColor: 'text-[#d30000]',
    borderColor: 'border-[#d30000]',
    bgColor: 'bg-[#ffe0e0]',
    text: '영업종료'
  },
  [StoreStatus.Holiday]: {
    textColor: 'text-[#d30000]',
    borderColor: 'border-[#d30000]',
    bgColor: 'bg-[#ffe0e0]',
    text: '휴무'
  }
}
