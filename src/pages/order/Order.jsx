import { useGetOrderQuery } from '../../services/orderSlice'
import { useParams } from 'react-router-dom'
import Page from '../../layout/Page'
import PageLoading from '../../components/PageLoading'
import { Rating } from '@mui/material'
import Input from '../../components/form/Input'
import Button from '../../components/form/Button'
import { usePostRatingMutation } from '../../services/ratingSlice'
import ApiErrorModal from '../../components/modal/ApiErrorModal'

const Order = () => {
  const { id } = useParams()

  const response = useGetOrderQuery(id)
  const [postRating, postRatingRes] = usePostRatingMutation()

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      const form = event.target
      if (form.checkValidity()) {

        const rating = form['rating'].value
        const orderId = id
        const review = form['review'].value
        const body = { rating, review, orderId }
        const res = await postRating(body)
        if (res.error) return
        response.refetch()

      } else {
        form.classList.add('was-validated')
      }

    } catch (error) {
      console.log(error)
    }

  }

  if (response.isLoading) return <PageLoading />
  if (response.isError) return <ApiErrorModal res={response} />

  const order = response.data

  return (
    <Page>
      <h3>Rate:</h3>
      <div>{order.rate} </div>

      <h3>Duration:</h3>
      <div>{order.duration} </div>

      <h3>Rate your Order</h3>
      <form onSubmit={handleSubmit} noValidate>
        <Rating
          name="rating"
          value={order?.rating?.rating}
          disabled={order.rating}
        />

        <Input name={"review"} textarea defaultValue={order?.rating?.review} disabled={order.rating} />
        {!order.rating && <Button res={postRatingRes} className={"mt-3"}>Post Review</Button>}
      </form>
    </Page>
  )
}

export default Order;