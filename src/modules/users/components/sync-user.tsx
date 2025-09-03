import { syncUser } from "../server/procedures";


const SyncUser = async () => {

    const user = await syncUser();
  return (
    <div></div>
  )
}

export default SyncUser;