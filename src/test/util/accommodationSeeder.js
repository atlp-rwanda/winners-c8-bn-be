import models from "../../database/models";
const { Accommodation } = { ...models };
const accommodationSeeder = async () => {
  const accommodations = await Accommodation.bulkCreate([
    {
      id: 1,
      name: "Toronto Hotel",
      description: "capital street, Toronto, Ontario",
      location_id: 1,
      latitude: 4,
      longitude: 4,
      images_links: ["https://freesvg.org/img/SC0007.Scribble-house.png","https://freesvg.org/img/maison2.png"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Reethi beach resort",
      description: "Reethi Beach, Fonimagoodhoo Island 20215",
      location_id: 2,
      latitude: 4,
      longitude: 4,
      images_links: ["https://freesvg.org/img/SC0007.Scribble-house.png","https://freesvg.org/img/maison2.png"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  return accommodations;
};

export default accommodationSeeder;
