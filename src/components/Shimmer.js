const Shimmer = () => {
  return (
    <div className="restaurant-list">
      {Array(20)
        .fill("")
        .map((value, index) => (
          <div key={index} className="shimmer-card"></div>
        ))}
    </div>
  );
};

export default Shimmer;
