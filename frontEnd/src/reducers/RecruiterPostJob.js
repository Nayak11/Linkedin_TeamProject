const initialState = {
    postjobstatus:false
   };
   
   export default function (state = initialState, action) {
         console.log(action.type+" a")
         console.log(action.statusCode)
       if(action.type === "JOB_POST" && action.statusCode===200 ){
           console.log("Reducer : Job Successfully posted !");
           console.log(action.payload)
           return {
             ...state,
            postjobstatus:true
           
           }
         } else {
           console.log("Reducer : Job Not posted !");
           console.log(action.type+action.statusCode)
           return {
             ...state,
             postjobstatus:false
           }
      }     
   }