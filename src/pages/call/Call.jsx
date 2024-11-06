import { useEffect, useState } from 'react'
import { useGetCallQuery } from '../../services/callSlice'
import { useNavigate, useParams } from 'react-router-dom'
import Page from '../../layout/Page'
import { usePatchCallMutation } from '../../services/callSlice'
import ApiErrorModal from '../../components/modal/ApiErrorModal'
import PageLoading from '../../components/PageLoading'

const Call = () => {
  const { id } = useParams()

  const navigate = useNavigate()
  const response = useGetCallQuery(id)

  const [patchCallStatus, patchCallStatusRes] = usePatchCallMutation()

  const [status, setStatus] = useState(null)


  useEffect(() => {
    if (status) {
      const body = { id, status }
      patchCallStatus(body)
        .then((res) => {
          if (res.error) console.log(res.error);
          response.refetch()
        });
    }
  }, [status])


  useEffect(() => {
    if (response.data?.status === "Active") {
      if (response.data.type === "AudioCall") navigate("./active/audio")
      else navigate("./active/video")
    }
  }, [response]);

  if (response.isLoading || patchCallStatusRes.isLoading) return <PageLoading />
  if (response.isError || patchCallStatusRes.isError) return <ApiErrorModal res={response} />

  return (
    <Page>
      <h3>Status:</h3>
      <div>{response.data.status} </div>

      {
        response.data.status === "Accepted" &&

        <select className="form-select mt-5 shadow" style={{ width: 200 }} onChange={(e) => { setStatus(e.target.value) }} aria-label="Default select example">
          <option selected disabled>Change Status</option>
          <option value="UserRejected">UserRejected</option>
          <option value="Active">Active</option>
        </select>
      }

      {
        response.data.status === "Active" &&

        <select className="form-select mt-5 shadow" style={{ width: 200 }} onChange={(e) => { setStatus(e.target.value) }} aria-label="Default select example">
          <option selected disabled>Change Status</option>
          <option value="Completed">End Call</option>
        </select>
      }

    </Page>
  )
}

export default Call