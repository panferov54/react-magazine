import React from "react";
import {Categories, SortPopup,ItemBlock} from "../components";
import {useDispatch, useSelector} from "react-redux";
import {setCategory} from "../redux/actions/filters";

const categories =[
    'Мясные',
    'Вегеторианские',
    'Гриль',
    'Острые',
    'Закрытые'
];
const sortItems =[
    {name: 'популярности',type:'popular'},
    {name: 'цене',type:'price'},
    {name: 'алфавиту',type:'alphabet'}
]



function Home () {
    const dispatch = useDispatch();
    const items =useSelector(({pizzas}) => pizzas.items);

    const onSelectCategory = React.useCallback((index) =>{
        dispatch(setCategory(index))
    },[]);
    console.log('RERENDER')
    return (
        <div className="container">
            <div className="content__top">
                <Categories onClick={onSelectCategory} items={categories} />
                <SortPopup items={sortItems}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">


                {items && items.map((obj)=>(

                    <ItemBlock key={obj.id} {...obj}/>
                ) )
                    }




            </div>
        </div>
    );
}

export default Home;