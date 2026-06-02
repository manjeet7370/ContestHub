import { useParams } from "react-router-dom";

function ProblemDeatils (){

    const {id} = useParams();

    return (
        <div>
            <h1>Problem Deatils</h1>
            <p>Problem id {id} </p>
        </div>
    )
}

export default ProblemDeatils