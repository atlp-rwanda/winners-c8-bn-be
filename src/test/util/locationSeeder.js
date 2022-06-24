import models from "../../database/models";
const { Location } = { ...models };

const locationSeeder = async () => {
  try {
    const locations = Location.bulkCreate([
      {
        id: 1,
        city: "Kigali City",
        state: null,
        province: "kigali",
        country: "Rwanda",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        city: "Nairobi City",
        state: null,
        province: "Nairobi",
        country: "Kenya",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        city: "Buffalo",
        state: "New York State",
        province: null,
        country: "United States of America",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    return locations;
  } catch (error) {
    console.error(error);
  }
};

export default locationSeeder;
