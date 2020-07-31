 import {useReducer , useEffect} from 'react'
 import axios from 'axios'
const BASE_URL = 'http://localhost:8010/proxy';
 const ACTION = {
   MAKE_REQUEST: 'make-request',
   GET_DATA:'get_data',
   ERROR:'error',
   UPDATE_HAS_NEXT_PAGE:'update_has_next_page'
 }
 function reducer( state,action )  {
   switch (action.type){
   case ACTION.MAKE_REQUEST:
     return {   loading: true, jobs:[]  }
     case ACTION.GET_DATA:
      return { ...state,  loading: false, jobs: action.payload.jobs  }
       case ACTION.ERROR:
        return { ...state,  loading: false, error: action.payload.error,  jobs: []  }
        case ACTION.UPDATE_HAS_NEXT_PAGE:
          return { ...state,  hasNextPage:action.payload.hasNextPage,  jobs: []  }
  
         default:
           return state

   }
 };
 
export const useFetchJobs = (params,page) => {
  const [state, dispatch] = useReducer(reducer , {jobs:[], loading:true})

  useEffect(() => {
    const cancelToken = axios.CancelToken.source()
    dispatch({type:ACTION.MAKE_REQUEST  })
    axios.get(BASE_URL,{
      cancelToken:cancelToken.token,
      params: {markdown:true , page:page , ...params}

    }).then(res => {
     dispatch({  type: ACTION.GET_DATA , payload: {jobs: res.data}   }) 
    
    }).catch(   
       e => {
        if( axios.isCancel(e)) return;
      dispatch({   type: ACTION.ERROR , payload: {error: e}             })
    })
    const cancelToken1 = axios.CancelToken.source()

    axios.get(BASE_URL,{
      cancelToken:cancelToken1.token,
      params: {markdown:true , page:page + 1 , ...params}

    }).then(res => {
     dispatch({  type: ACTION.UPDATE_HAS_NEXT_PAGE , payload: {hasNextPage: res.data.length !== 0 }   }) 
    
    }).catch(   
       e => {
        if( axios.isCancel(e)) return;
      dispatch({   type: ACTION.ERROR , payload: {error: e}             })
    })

    return() => {
      cancelToken.cancel()
      cancelToken1.cancel()
    }
  },[params, page])

 
 

  return  state;
   
}

