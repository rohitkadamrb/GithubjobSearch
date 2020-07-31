import React , {useState} from 'react';
 import { Container } from 'react-bootstrap'
import { useFetchJobs } from './useFetchJobs';
import JobsPagination from './JobsPagination'
import Job from './Job'
import SearchForm from './SearchForm'
function App() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  
  
  function handleParamChange(e) {
    const param = e.target.name
    const value = e.target.value
    setPage(1)
    setParams(prevParams => {
      return { ...prevParams, [param]: value }
    })
  }

 const {jobs, loading, error , hasNextPage} = useFetchJobs();
  return (
    
  <Container className="my-4">
    <h1 className='mb-4'> GitHub Job Search </h1>
    <SearchForm params={params} onParamChange={handleParamChange} />

    <JobsPagination page={page} setPage={setPage} hasNextPage={true}></JobsPagination>
  {loading && <h1>Loading ....</h1>}
  {error && <h1>Error Try Refreshing .</h1>}
  <h3> {jobs.map(job => {
    console.warn(job.title)
    return <Job key={job.id} job={job}> </Job> 
    
  })} </h3>
<JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage}></JobsPagination>
  </Container>
  );
}

export default App;
  