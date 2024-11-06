import { useEffect, useState } from 'react'
import { useGetChatQuery } from '../../services/chatSlice'
import { useNavigate, useParams } from 'react-router-dom'
import Page from '../../layout/Page'
import { usePatchChatMutation } from '../../services/chatSlice'
import ApiErrorModal from '../../components/modal/ApiErrorModal'
import PageLoading from '../../components/PageLoading'

const Chat = () => {
  const { id } = useParams()

  const navigate = useNavigate()
  const response = useGetChatQuery(id)

  const [patchChatStatus, patchChatStatusRes] = usePatchChatMutation()

  const [status, setStatus] = useState(null)


  useEffect(() => {
    if (status) {
      const body = { id, status }
      patchChatStatus(body)
        .then((res) => {
          if (res.error) {
            console.log(res.error);
          }
          response.refetch()
        });
    }
  }, [status])


  useEffect(() => {
    if (response.data?.status === "Active") {
      navigate(`/Chat/${id}/active`)

    }
  }, [response]);

  if (response.isLoading || patchChatStatusRes.isLoading) return <PageLoading />
  if (response.isError || patchChatStatusRes.isError) return <ApiErrorModal res={response} />

  return (
    <Page>
      <h3>Status:</h3>
      <div>{response.data.status} </div>

      {
        response.data.status === "Accepted" &&

        <select className="form-select mt-5 shadow" style={{ width: 200 }} onChange={(e) => {
          setStatus(e.target.value)
        }} aria-label="Default select example">
          <option selected disabled>Change Status</option>
          <option value="UserRejected">UserRejected</option>
          <option value="Active">Active</option>
        </select>
      }

      {
        response.data.status === "Active" &&

        <select className="form-select mt-5 shadow" style={{ width: 200 }} onChange={(e) => {
          setStatus(e.target.value)
        }} aria-label="Default select example">
          <option selected disabled>Change Status</option>
          <option value="Completed">End Chat</option>
        </select>
      }

    </Page>
  )
}

export default Chat