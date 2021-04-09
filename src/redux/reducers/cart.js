


const initialState = {
    items:{},
    totalPrice:0,
    totalCount:0
}
const getTotalPrice=(arr)=>arr.reduce((sum,obj)=>obj.price +sum,0)

const _get=(obj,path)=>{
    const [firstKey,...keys]=path.split('.');
  return  keys.reduce((val,key)=>{
        return val[key];
    },obj[firstKey])
}

const getTotalSum=(obj,path)=>{
    return Object.values(obj)
        .reduce((sum,obj)=>{
            const value = _get(obj,path)
            return sum + value
        },0)
}

const cart = (state = initialState,action)=>{
    switch (action.type){
        case 'ADD_ITEM_CART': {
            const currentItems = !state.items[action.payload.id] ? [action.payload] : [...state.items[action.payload.id].items,
                action.payload]
            const newItems={
                    ...state.items,
                [action.payload.id]:{
                        items:  currentItems,
                    totalPrice: getTotalPrice(currentItems),

                }

            };

            const totalCount=getTotalSum(newItems,'items.length')
            const totalPrice=getTotalSum(newItems,'totalPrice')
            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice
            }
        }
        case 'CLEAR_CART':{
            return {
                totalCount: 0,
                totalPrice: 0,
                items: {},
            }
        }
        case 'PLUS_CART_ITEM':{
            const newObjectItems=[
                ...state.items[action.payload].items,
                state.items[action.payload].items[0]
            ]
            const newItems={
                ...state.items,
                [action.payload]:{
                    items: newObjectItems,
                    totalPrice: getTotalPrice(newObjectItems),
                },
            }
            const totalCount=getTotalSum(newItems,'items.length')
            const totalPrice=getTotalSum(newItems,'totalPrice')
            return {
             ...state,
                items: newItems,
                totalCount,
                totalPrice,
            }
        }
        case 'MINUS_CART_ITEM':{
            const currentItems=state.items[action.payload].items
            const newObjectItems= currentItems.length >1 ? currentItems.slice(1):currentItems;
            const newItems={
                ...state.items,
                [action.payload]:{
                    items: newObjectItems,
                    totalPrice: getTotalPrice(newObjectItems),
                },
            }

            const totalCount=getTotalSum(newItems,'items.length')
            const totalPrice=getTotalSum(newItems,'totalPrice')

            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice,
            }

        }

        case 'REMOVE_CART_ITEM':{
            const newItems={
                ...state.items
            }
            const currentTotalPrice = newItems[action.payload].totalPrice
            const currentTotalCount = newItems[action.payload].items.length
            delete newItems[action.payload]
            return {
                ...state,
                items: newItems,
                totalPrice: state.totalPrice - currentTotalPrice,
                totalCount: state.totalCount - currentTotalCount
            }
        }

        default:
            return state;
    }




}

export default cart;