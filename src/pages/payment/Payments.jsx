import { Link } from 'react-router-dom';
import Page from '../../layout/Page';
import { useGetrazorpayPaymentsQuery } from '../../services/razorpayPaymentSlice';
import PageLoading from '../../components/PageLoading';
import ApiErrorModal from '../../components/modal/ApiErrorModal';
import ReactTable from '../../components/ReactTable';

const Payments = () => {


  const paymentsRes = useGetrazorpayPaymentsQuery()


  if (paymentsRes.isLoading) return <PageLoading />
  if (paymentsRes.isError) return <ApiErrorModal res={paymentsRes} />

  const columns = [
    { Header: '#', accessor: 'id', Cell: ({ value }) => <Link to={`./${value}`} className='link-success'>{value}</Link> },
    { Header: 'Amount', accessor: 'amount' },
    { Header: 'Created At', accessor: 'createdAt' },
    { Header: 'Status', accessor: 'status' },
  ]


  return (
    <Page>
      <ReactTable columns={columns} data={paymentsRes.data} />

    </Page>
  );

}

export default Payments