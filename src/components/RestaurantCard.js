import { IMG_URL } from "../constant";

const RestaurantCard = (restaurant) => {
  const { info } = restaurant;
  return (
    <div className="card">
      <img src={IMG_URL + info?.cloudinaryImageId} />
      <h2>{info?.name}</h2>
      <h3>{info?.cuisines?.join(", ")}</h3>
      <h4>{info?.costForTwo}</h4>
    </div>
  );
};

export default RestaurantCard;
