export interface IProduct {
  id: number
  title: string
  description: string
  category: string
  price: number
  brand: string
  thumbnail: string
  images: string[]
}

export interface IBasketItem {
  quantity: number
  id: number
}

interface User {
  email: string
  token: string
  loginDate: string | null
}

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export type OrderItem = {
  id: number
  name: string
  quantity: number
  price: number
  imageUrl: string
}

interface OrderState {
  orders: {
    orderId: string
    items: OrderItem[]
    date: string
    totalPrice: number
  }[]
}

export type ContainerStore = {
  product: {
    list: IProduct[]
    filter: string
    sort: null | string
    loading: boolean
    error: string
  }
  basket: {
    list: IBasketItem[]
  }
  auth: AuthState
  order: OrderState
}
