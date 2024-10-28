import { IProduct } from '~/types/store'
import withActions, { IWithActions } from '~/utils/with-actions'

const ProductCart = ({
  actions,
  dispatch,
  thumbnail,
  id,
  title,
  description,
  price,
}: IWithActions & IProduct) => {
  return (
    <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow bg-gray-800 border-gray-700">
      <img
        className="m-auto w-40 h-40 mt-4 rounded-t-lg"
        src={thumbnail}
        alt={title}
      />
      <div className="px-5 pb-5 mt-2">
        <h5 className="text-xl  line-clamp-1 font-semibold tracking-tight text-gray-900 text-white">
          {title}
        </h5>
        <p className="line-clamp-2 text-white">{description}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-gray-900 text-white">
            ${price}
          </span>
          <button
            onClick={() => dispatch!(actions!.basket.addBasket({ id }))}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default withActions(ProductCart)
