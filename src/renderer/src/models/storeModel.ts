interface Fee {
  [index: string]: string
}

class StoreModel {
  storeName: string
  contact: string
  status: string
  fee: Fee
  address: string

  constructor(storeName: string, status: string, contact: string, fee: Fee, address: string) {
    this.contact = contact
    this.storeName = storeName
    this.status = status
    this.fee = fee
    this.address = address
  }
}
