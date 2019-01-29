
const initialState = {
   jobdetails:"",
   jobid:0,
   applyid:0
  };
  
  export default function (state = initialState, action) {
    

        console.log(action.type+ "a")
        console.log(action.statusCode)
        if(action.type === "JOB_ID"){
          console.log("Reducer : Job id setting for use!");
          console.log(action.payload)
          return {
            ...state,
            applyid:action.payload
          
          }
        }
      if(action.type === "JOB_DISPLAY" && action.statusCode===200 ){
          console.log("Reducer : Job details found successful !");
          console.log(action.payload)
          return {
            ...state,
            jobdetails:action.payload.result,
            jobid:action.payload.jobid
          
          }
        } else {
          console.log("Reducer : Job details fetching failed !");
          console.log(action.type+action.statusCode)
          return {
            ...state,
            
          }
        }
  
    
    
  }