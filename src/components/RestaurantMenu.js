import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_URL } from "../constant";
import Shimmer from "./Shimmer";

const getMenuData = (menuCardsData) => {
  const menuData = menuCardsData.reduce((acc, cardInfo) => {
    const { itemCards = [] } = cardInfo?.card?.card;
    return [...acc, ...itemCards];
  }, []);
  return menuData;
};

const RestaurantMenu = () => {
  const { id } = useParams();
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [menuItems, setMenuItems] = useState(null);

  const getRestaurantInfo = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.96340&lng=77.58550&restaurantId=" +
        id +
        "&catalog_qa=undefined&isMenuUx4=true&submitAction=ENTER"
    );
    const json = await data.json();
    setRestaurantInfo(json?.data?.cards[2]?.card?.card?.info);
    const menuCardsData =
      json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
    const menuData = getMenuData(menuCardsData);
    setMenuItems(menuData);
  };

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  return !restaurantInfo ? (
    <Shimmer />
  ) : (
    <div className="menu">
      <div>
        <h1>Restaurant id: {id}</h1>
        <h2>{restaurantInfo?.name}</h2>
        <img src={IMG_URL + restaurantInfo?.cloudinaryImageId} />
        <h3>{restaurantInfo?.areaName}</h3>
        <h3>{restaurantInfo?.city}</h3>
        <h3>{restaurantInfo?.avgRating}</h3>
        <h3>{restaurantInfo?.costForTwoMessage}</h3>
      </div>
      <div>
        <h1>Menu</h1>
        <ul>
          {menuItems.map((item) => {
            const { info } = item?.card;
            return <li key={info?.id}>{info?.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
