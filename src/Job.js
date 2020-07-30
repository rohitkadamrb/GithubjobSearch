import React, {useState} from 'react'
import {Card , Button , Badge, Collapse } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
 const Job = ({job}) => {
  const [open, setOpen] = useState(false);
  return (
    <Card className='mb-3'>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            
            <Card.Title>
              {job.title} - <span className="text-muted font-weight-light">{job.company}</span>
            </Card.Title>
            <Card.Subtitle className="text-muted mb-2">
              { new Date(job.created_at).toLocaleDateString()}
            </Card.Subtitle>
            <Badge variant="secondary" className="mr-2">{job.type}</Badge>

            <Badge variant="secondary">{job.location}</Badge>
            <div style={{wordBreak: 'break-all'}}>
              <ReactMarkdown source={job.how_to_apply} />
            
            </div>
           
          </div>
         <img src={job.company_logo} alt={job.company} className="d-sm none d-md-block" height="50"/> 
        </div>
    
        <Card.Text> 
          <Button variant="primary" onClick={() => setOpen(!open)}>
            {open?'Hide Details':'View Details'}
          </Button>
          <Collapse in={open}>

          <div className="className-4">
            <ReactMarkdown source={job.description} ></ReactMarkdown>
          </div>
          </Collapse>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
export default Job;