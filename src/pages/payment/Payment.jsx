import { useGetrazorpayPaymentQuery } from '../../services/razorpayPaymentSlice'
import Page from '../../layout/Page'
import { useParams } from 'react-router-dom'
import ApiErrorModal from '../../components/modal/ApiErrorModal'
import PageLoading from '../../components/PageLoading'

const Payment = () => {
  const { id } = useParams()
  const response = useGetrazorpayPaymentQuery(id)

  if (response.isLoading) return <PageLoading />
  if (response.isError) return <ApiErrorModal res={response} />


  return (
    <Page>
      <h3>Amount:</h3>
      <div>{response.data.amount} </div>

      <h3>Status:</h3>
      <div>{response.data.status} </div>


    </Page>
  )
}

export default Payment