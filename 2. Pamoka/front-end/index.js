const getId = async () => {
  const response = await fetch(`http://localhost:3000/uniqueID`);
  const uniqueID = await response.json();
  console.log(uniqueID);
  return uniqueID;
};
getId();
