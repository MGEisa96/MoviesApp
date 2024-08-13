import { useDispatch, useSelector } from "react-redux";
import {addToFav, removeFromFav } from "../../redux/favouritesSlice";

export default  function useFavourite (){

const dispatch = useDispatch();
const favourites = useSelector(state => state?.favourites?.favourites);



  const handlePressHeart = (item: { id: number; }) => {
    
    
    if (isFavourite(item)) {
      dispatch(removeFromFav(item));
    } else {
      dispatch(addToFav(item));
    }
  };

const isFavourite = (item: { id: number; }) => {
  if(favourites?.length>0){
    return favourites?.some((fav: { id: number; }) => fav.id === item.id);
  }
};

return {
    isFavourite,
    favourites,
    handlePressHeart,
  };
}