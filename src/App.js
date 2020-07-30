import React , {useState} from 'react';
 import { Container } from 'react-bootstrap'
import { useFetchJobs } from './useFetchJobs';
import Job from './Job'

function App() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)

 const {jobs, loading, error} = useFetchJobs();
  return (
    
  <Container className="my-4">
    <h1 className='mb-4'> GitHub Job Search </h1>
  {loading && <h1>Loading ....</h1>}
  {error && <h1>Error Try Refreshing .</h1>}
  <h3> {jobs.map(job => {
    console.warn(job.title)
    return <Job key={job.id} job={job}> </Job> 
    
  })} </h3>

  </Container>
  );
}

export default App;
  