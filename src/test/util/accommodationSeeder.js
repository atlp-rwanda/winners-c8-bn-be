import models from "../../database/models";
const { Accommodation } = { ...models };
const accommodationSeeder = async () => {
  const accommodations = await Accommodation.bulkCreate([
    {
      id: 1,
      name: "Toronto Hotel",
      address: "capital street, Toronto, Ontario",
      country: "Canada",
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Reethi beach resort",
      address: "Reethi Beach, Fonimagoodhoo Island 20215",
      country: "Maldives",
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  return accommodations;
};

export default accommodationSeeder;
