import { useApi } from '../utilities/useApi'
import { getApi } from '../utilities/useApi';
import {
    useQuery,
  } from 'react-query'

function Coins({ name, price }) {
    return (
        <div>
            {name}
            {price}
        </div>
    )
}

function Market (){
    const query = useQuery(`get-coins`, getApi('/coins/'))
    const {isLoading, isError} = query;
    if(isError){
        return <p>ERROR</p>;
    }
    else if(isLoading){
        return <p>Loading...</p>;
    }
    else{
        /* we can only access the data once its loaded and there's no error.
        It's structured data: {data}, this is not a mistake
        */
        const {data: { data }} = query

        console.log(data)
        return (
            <div>
                <h1>Coins</h1>
                {
                    data.map(e =>(
                        <Coins
                            name = {e.name}
                            price = {e.price}
                        />

                    )
                    )
                }
            </div>
        )
}
}
export default Market;