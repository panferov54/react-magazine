import React from "react";
import {Categories, SortPopup, ItemBlock, LoadingBlock} from "../components";
import {useDispatch, useSelector} from "react-redux";
import {setCategory,setSortBy} from "../redux/actions/filters";
import {fetchPizzas} from "../redux/actions/pizzas";

const categories =[
    'Мясные',
    'Вегеторианские',
    'Гриль',
    'Острые',
    'Закрытые'
];
const sortItems =[
    {name: 'популярности',type:'popular',order:'desc'},
    {name: 'цене',type:'price',order:'desc'},
    {name: 'алфавиту',type:'name',order:'asc'}
]



function Home () {
    const dispatch = useDispatch();
    const items =useSelector(({pizzas}) => pizzas.items);
    const isLoaded =useSelector(({pizzas}) => pizzas.isLoaded);
    const {category,sortBy} =useSelector(({filters}) => filters);

    React.useEffect(()=>{
        dispatch(fetchPizzas(sortBy,category))
    },[category,sortBy]);

    const onSelectCategory = React.useCallback((index) =>{
        dispatch(setCategory(index))
    },[]);
    const onSelectSortType = React.useCallback((type) =>{
        dispatch(setSortBy(type))
    },[]);
    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={category} onClick={onSelectCategory} items={categories} />
                <SortPopup activeSortType={sortBy.type} items={sortItems} onClickSortType={onSelectSortType}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">


                {isLoaded ?
                    items.map((obj)=>(<ItemBlock key={obj.id} isLoading={true} {...obj}/>))
                    : Array(12).fill(0).map((_,index)=><LoadingBlock key={index} />)
                    }






            </div>
        </div>
    );
}

export default Home;