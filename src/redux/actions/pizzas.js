import axios from "axios";

export const setLoaded = (payload)=>({
    type:'SET_LOADED',
    payload,
})


export const fetchPizzas =(sortBy,category)=> (dispatch)=>{
    console.log(sortBy,category)
    dispatch(setLoaded(false));
    axios.get(`/items?${category !==null ?`category=${category}`:''}&_sort=${sortBy.type}&_order=${sortBy.order}`).then(({data})=>{
           dispatch(setItems(data))
        });
}

export const setItems = (items) =>({
    type:'SET_PIZZAS',
    payload:items,
});